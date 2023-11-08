'use client';

import {
  ReactNode,
  useState,
  useRef,
  useContext,
  useCallback,
  CSSProperties,
  useEffect,
} from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
  inline,
  hide,
  useClick,
  useDismiss,
} from '@floating-ui/react';
import cursorCircle from './_cursors/cursor_circle.svg?url';
import captionStyles from './caption.module.css';
import { CaptionInteractionContext } from './CaptionInteractionContext';
import {
  CaptionLineStartingDot,
  CaptionPolylineXL,
  dotSize,
  CaptionPolylineSm,
  CaptionLineSm,
  gapTextCaptions,
} from './CaptionLines';
import { cn } from '@/cn';
import {
  type ForwardDataMiddlewareData,
  forwardData,
  reactiveShift,
} from '@/floatingUiMiddlewares';
import { useMobileFirstBreakpoint } from '@/hooks/useMobileFirstBreakpoint';
import { useViewportDims } from '@/hooks/useViewportDims';
import { useCanHover } from '@/hooks/useCanHover';

export function CaptionedText({
  caption,
  children,
  cursorSvgUrl = cursorCircle.src,
}: {
  caption: ReactNode;
  children: string;
  cursorSvgUrl?: string;
}) {
  const [isCaptionOpen, setIsCaptionOpen] = useState(false);
  const captionLineEndRef = useRef(null);
  const {
    captionsShouldFlicker,
    numberCaptionsHovered,
    incrementNumberOfCaptionsHovered,
  } = useContext(CaptionInteractionContext);

  const hasEverOpened = useRef(false);
  const onOpenChange = useCallback(
    (open: boolean) => {
      setIsCaptionOpen(open);

      if (open && !hasEverOpened.current) {
        incrementNumberOfCaptionsHovered();
        hasEverOpened.current = true;
      }
    },
    [incrementNumberOfCaptionsHovered]
  );

  const canHover = useCanHover();
  const viewportDims = useViewportDims();
  const breakpoint = useMobileFirstBreakpoint();
  let screenSizeRange: 'sm' | 'md' | 'xl';
  switch (breakpoint) {
    case '2xl':
    case 'xl': {
      screenSizeRange = 'xl';
      break;
    }
    case 'lg':
    case 'md': {
      screenSizeRange = 'md';
      break;
    }

    default: {
      screenSizeRange = 'sm';
      break;
    }
  }

  type FloatingOptions = Parameters<typeof useFloating>[0];
  let captionFloatingOptions: FloatingOptions;

  switch (screenSizeRange) {
    case 'xl': {
      captionFloatingOptions = {
        placement: 'right-start',
        middleware: [
          // Move the caption up or down if it overflows on screen
          shift({ padding: 20 }),
          // Horizontally link the caption to the text for visual reference
          arrow({ element: captionLineEndRef }),
          forwardData(),
        ],
      };
      break;
    }
    default: {
      captionFloatingOptions = {
        placement: 'bottom',
        middleware: [
          // Gracefully deal with line breaks on the text
          inline(),

          // Caption is away from the text
          offset(64),
          // Always have the caption visible
          flip({ padding: 20 }),
          // Move the caption up or down if it overflows vertically, and horizontally out of the paragraph
          reactiveShift(
            (state) => {
              const { elements } = state;
              const { reference: spanElement } = elements;
              const paragraphElement = (spanElement as HTMLSpanElement)
                .parentElement;
              const paragraphRect = paragraphElement?.getBoundingClientRect();
              return {
                rootBoundary: {
                  x: paragraphRect?.x ?? 0,
                  y: 0,
                  width: paragraphRect?.width ?? 0,
                  height: window.innerHeight,
                },
                padding: {
                  top: screenSizeRange === 'sm' ? 80 : 20, // Higher padding to be below header on small screens
                  bottom: 20,
                  // Flush horizontally with the paragraph edge
                },
                crossAxis: true,
              };
            },
            [viewportDims]
          ),
          // We need the caption rect in further steps
          forwardData(),
          hide({
            padding: {
              top: screenSizeRange === 'sm' ? 20 : -52, // Hide faster when below header on small screens
              bottom: -52,
            },
          }),
        ],
      };
      break;
    }
  }

  // Floating Caption
  const {
    refs: captionRefs,
    middlewareData: captionMiddlewareData,
    x: captionX,
    y: captionY,
    floatingStyles: captionFloatingStyles,
    placement: captionPlacement,
    context,
  } = useFloating({
    ...captionFloatingOptions,
    // Tie captioned text interaction (controlled by Floating UI) to React
    open: isCaptionOpen,
    onOpenChange: onOpenChange,
    // As long as the caption is mounted, keep the floating styles updated even
    // on scroll and resize
    whileElementsMounted: autoUpdate,
  });

  // Where final line to the caption is at the same level as the text
  const {
    arrow: captionMiddlewareDataArrow,
    forwardData: captionForwardDataMiddlewareData,
    hide: captionHideMiddlewareData,
  } = captionMiddlewareData;
  const captionLineEndY = captionMiddlewareDataArrow?.y ?? 0;
  const captionRect = (
    captionForwardDataMiddlewareData as ForwardDataMiddlewareData | undefined
  )?.floatingRect;
  const captionWidth = captionRect?.width ?? 0;
  const captionHeight = captionRect?.height ?? 0;
  const captionedTextHidden =
    captionHideMiddlewareData?.referenceHidden ?? false;

  // Hook the caption open state to hover on desktop and click on touch screens
  const captionHover = useHover(context, {
    mouseOnly: true,
    enabled: canHover,
  });
  const captionClick = useClick(context, { enabled: !canHover });
  const captionDismiss = useDismiss(context, {
    enabled: !canHover,
    // Only dismiss once users click instead of pointer-down. This lets touch
    // users scroll with the caption open
    outsidePressEvent: 'click',
  });
  const {
    getReferenceProps: getCaptionedTextProps,
    getFloatingProps: getFloatingCaptionProps,
  } = useInteractions([captionHover, captionClick, captionDismiss]);

  // Close the caption when the text is hidden
  useEffect(() => {
    if (captionedTextHidden) {
      setIsCaptionOpen(false);
    }
  }, [captionedTextHidden]);

  // Floating Dot starting the connection from the text to the caption
  const {
    refs: dotRefs,
    placement: dotPlacement,
    floatingStyles: dotStyles,
    x: dotX,
    y: dotY,
  } = useFloating({
    // Override the placement for md and small
    placement: screenSizeRange === 'xl' ? 'top' : captionPlacement,
    middleware: [
      // Gracefully deal with line breaks on the text
      inline(),
      // Dot is a bit offset from the text
      offset(2),
      // Always have the dot visible
      flip({ padding: 32 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dotIsOnTop = dotPlacement === 'top';

  // Merge the 2 refs for the text
  const captionedTextRef = useMergeRefs([
    captionRefs.setReference,
    dotRefs.setReference,
  ]);

  let captionStyleAttribute: CSSProperties;
  switch (screenSizeRange) {
    case 'xl': {
      captionStyleAttribute = {
        top: captionY,
        // fixed x position on the right area
        right: `-${gapTextCaptions}px`,
        transform: 'translateX(100%)',
      };
      break;
    }
    case 'md':
    case 'sm': {
      captionStyleAttribute = captionFloatingStyles;
      break;
    }
  }

  return (
    <>
      <span
        ref={captionedTextRef}
        style={{ cursor: `url(${cursorSvgUrl}), auto` }}
        {...getCaptionedTextProps()}
        className={cn(
          captionStyles['captioned-text'],
          `${
            numberCaptionsHovered === 0
              ? captionStyles['captioned-text-initial-load']
              : ''
          }`,
          `${
            captionsShouldFlicker
              ? captionStyles['flickering-captioned-text']
              : ''
          }`
        )}
        data-open={isCaptionOpen}
      >
        {children}
      </span>
      {isCaptionOpen && (
        <>
          <aside
            ref={captionRefs.setFloating}
            className={cn(
              // position relative to the parent paragraph
              'absolute',
              // Dot and polylines above the text. Caption above the dot and polylines
              'z-20 [&~div]:z-10',

              'w-[min(100%,theme(width.paragraph-min))]',
              // screen: 1370px -->  caption: 360px
              // screen: 1280px -->  caption: 280px
              'xl:w-[min(calc(280px_+_(100vw-1280px)*(360_-_280)/(1370_-_1280)),theme(width.aside-md))]',

              'rounded-md border border-action bg-main p-sm',
              'xl:border-0 xl:bg-[unset] xl:p-0',
              'text-body-md text-main',

              // Prevent messing with the hover on the span if the aside and span overlap
              'pointer-events-none',
              captionStyles.caption
            )}
            style={captionStyleAttribute}
            {...getFloatingCaptionProps}
          >
            {caption}
            {/* Just for floating UI to run the computations. We use the coordinates in the polyline */}
            <div ref={captionLineEndRef} />
          </aside>
          {/* Dot */}
          <div
            ref={dotRefs.setFloating}
            className={cn('absolute text-[theme(borderColor.action.DEFAULT)]')}
            style={dotStyles}
          >
            <CaptionLineStartingDot />
          </div>
          {screenSizeRange === 'xl' ? (
            <CaptionPolylineXL
              dotX={dotX}
              dotY={dotY}
              dotIsOnTop={dotIsOnTop}
              captionY={captionY}
              captionLineEndY={captionLineEndY}
            />
          ) : Math.abs(captionX + captionWidth / 2 - (dotX + dotSize / 2)) >
            24 ? (
            <CaptionPolylineSm
              dotX={dotX}
              dotY={dotY}
              dotIsOnTop={dotIsOnTop}
              captionX={captionX}
              captionY={captionY}
              captionWidth={captionWidth}
              captionHeight={captionHeight}
            />
          ) : (
            <CaptionLineSm
              dotX={dotX}
              dotY={dotY}
              dotIsOnTop={dotIsOnTop}
              captionY={captionY}
              captionHeight={captionHeight}
            />
          )}
        </>
      )}
    </>
  );
}
