'use client';

import {
  type ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  createContext,
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
} from '@floating-ui/react';
import cursorCircle from './cursors/cursor_circle.svg?url';
import cursorDoubleDiamond from './cursors/cursor_double_diamond.svg?url';
import cursorDevEmoji from './cursors/cursor_dev_emoji.svg?url';
import cursorLearnEmoji from './cursors/cursor_learning_emoji.svg?url';
import cursorReact from './cursors/cursor_react_logo_with_bg_30.png';
import cursorCalifornia from './cursors/cursor_california_flag_36.jpg';
import cursorUnity from './cursors/cursor_unity_logo_30.png';
import cursorWarming from './cursors/cursor_warming_stripes_42.jpg';
import captionStyles from './caption.module.css';
import scrollCtaStyles from './scrollCTAAnimations.module.css';
import { cn } from '@/cn';
import { navIds } from '@/constants';

const gapTextCaptions = 88;
const dotSize = 14;

function CaptionLineStartingDot() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dotSize}
      height={dotSize}
      viewBox="0 0 10 10"
      fill="currentColor"
    >
      <circle cx="5" cy="5" r="5" />
    </svg>
  );
}

function CaptionedText({
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

  // Floating Caption
  const {
    refs: captionRefs,
    middlewareData: captionMiddlewareData,
    y: captionY,
    context,
  } = useFloating({
    placement: 'right-start',
    middleware: [
      // Caption shouldn't be flush with the edge of the screen
      shift({ padding: 20 }),
      // Horizontally link the caption to the text for visual reference
      arrow({ element: captionLineEndRef }),
    ],
    // Tie captioned text interaction (controlled by Floating UI) to React
    open: isCaptionOpen,
    onOpenChange: onOpenChange,
    // As long as the caption is mounted, keep the floating styles updated even
    // on scroll and resize
    whileElementsMounted: autoUpdate,
  });

  // Where final line to the caption is at the same level as the text
  const { arrow: captionMiddlewareDataArrow } = captionMiddlewareData;
  const captionLineEndY = captionMiddlewareDataArrow?.y || 0;

  // Hook the caption open state to hover
  const captionHover = useHover(context);
  const {
    getReferenceProps: getCaptionedTextProps,
    getFloatingProps: getFloatingCaptionProps,
  } = useInteractions([captionHover]);

  // Floating Dot starting the connection from the text to the caption
  const {
    refs: dotRefs,
    placement: dotPlacement,
    floatingStyles: dotStyles,
    x: dotX,
    y: dotY,
  } = useFloating({
    placement: 'top',
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
              // TODO: Tweak this based on screen size?
              'min-w-aside-sm max-w-aside-md',
              'text-body-md text-main',
              captionStyles.caption
            )}
            style={{
              top: captionY,
              // fixed x position on the right area
              right: `-${gapTextCaptions}px`,
              transform: 'translateX(100%)',
            }}
            {...getFloatingCaptionProps}
          >
            {caption}
            {/* Just for floating UI to run the computations. We use the coordinates below */}
            <div ref={captionLineEndRef} />
          </aside>
          {/*  */}
          <div className={cn('inline', captionStyles['caption-line'])}>
            {/* Dot */}
            <div
              ref={dotRefs.setFloating}
              className={cn(
                'absolute text-[theme(borderColor.action.DEFAULT)]'
              )}
              style={dotStyles}
            >
              <CaptionLineStartingDot />
            </div>
            {/* Lines going from dot to the caption */}
            <div
              className={cn('absolute border-l border-action')}
              style={{
                left: dotX + dotSize / 2,
                ...(dotIsOnTop
                  ? { top: 0, bottom: `calc(100% - ${dotY + dotSize / 2}px)` }
                  : { top: dotY + dotSize / 2, bottom: 0 }),
              }}
            />
            <div
              className={cn('absolute border-t border-action')}
              style={{
                left: dotX + dotSize / 2,
                right: 0,
                ...(dotIsOnTop
                  ? { top: Math.min(0, dotY + dotSize / 2) }
                  : {
                      bottom: `min(0px,calc(100% - ${dotY + dotSize / 2}px))`,
                    }),
              }}
            />
            <div
              className={cn('absolute border-l border-action')}
              style={{
                right: 0,
                ...(dotIsOnTop
                  ? {
                      top: Math.min(0, dotY + dotSize / 2),
                      bottom: `calc(100% - ${captionLineEndY + captionY}px)`,
                    }
                  : {
                      top: captionLineEndY + captionY,
                      bottom: `min(0px,calc(100% - ${dotY + dotSize / 2}px))`,
                    }),
              }}
            />
            <div
              className={cn('absolute border-t border-action')}
              style={{
                right: `-${gapTextCaptions - 16}px`,
                width: `${gapTextCaptions - 16}px`,
                top: captionLineEndY + captionY,
              }}
            />
          </div>
        </>
      )}
    </>
  );
}

function RolesParagraph() {
  return (
    <div className={cn('relative')}>
      I&apos;m a{' '}
      <CaptionedText
        caption={
          <p>
            My background brings a mix of computer science and design, both of
            which I studied academically (at Ecole Polytechnique and Carnegie
            Mellon University) and practiced professionally. I have brought
            teams this diverse background at every step of the product
            development cycle, from initial user research to wireframes and
            interactive prototypes, all the way to production code and
            analytics.
          </p>
        }
        cursorSvgUrl={cursorDevEmoji.src}
      >
        software engineer trained in UX design and research
      </CaptionedText>
      , and I&apos;m always eager to{' '}
      <CaptionedText
        caption={
          <p>
            I like to dive deep into people&apos;s workflows (whether
            they&apos;re soldiers, engineers, sales people, or garbage truck
            drivers!). I also love learning about very technical topics (lidar
            optics pipeline, firmware, robotic arms, or image processing
            algorithms). What drives me everyday is learning new things, and
            Youtube is a big part of how I improve as a developer.
          </p>
        }
        cursorSvgUrl={cursorLearnEmoji.src}
      >
        learn something new
      </CaptionedText>
      !
    </div>
  );
}

function SanFranciscoParagraph() {
  return (
    <div className={cn('relative')}>
      Over the last{' '}
      <CaptionedText
        caption={
          <p>
            In San Francisco, I worked for Ouster, a start-up building lidar
            sensor, as their 30th employee. When I left Ouster at the end of
            2022, the company had grown to 300 employees and I had worked a many
            different software projects at the company. It&apos;s in the Silicon
            Valley that I learned to ship production software and work with a
            team of talented software engineers.
          </p>
        }
        cursorSvgUrl={cursorCalifornia.src}
        // cursorSvgUrl={cursorUS.src}
      >
        4 years in San Francisco
      </CaptionedText>
      , I designed and built 3D visualization software for a lidar company.
    </div>
  );
}

function CodingParagraph() {
  return (
    <div className={cn('relative')}>
      Lately,{' '}
      <CaptionedText
        caption={
          <p>
            As you can see with this website and other recent projects on my
            Github, React, Next, Vite, Storybook, Chakra UI, Styled Components,
            Electron are some of the libraries I used recently. I have also
            built component libraries, 3D visualization library. Working on the
            web has been a great way for me to quickly bring UX decisions to
            life, and I have really enjoyed the developer experience and the
            broad outreach web projects immediately have.
          </p>
        }
        cursorSvgUrl={cursorReact.src}
      >
        web front-end
      </CaptionedText>{' '}
      code is mainly what I shipped, but I have also worked on{' '}
      <CaptionedText
        caption={
          <p>
            3D Graphics is what I focused on in my last years of underground.
            After HCI grad school, I continued on this path and worked on some
            AR and VR projects. I have always also been interested in working
            close to hardware (headsets, lidars), and when I joined Ouster I
            mostly wrote C++ for embedded UIs installed trucks.
          </p>
        }
        cursorSvgUrl={cursorUnity.src}
      >
        back-end, 3D, embedded UIs
      </CaptionedText>
      , and image processing algorithms.
    </div>
  );
}

function UXParagraph() {
  return (
    <div className={cn('relative')}>
      I have also owned the{' '}
      <CaptionedText
        caption={
          <p>
            Masters of Human-Computer Interaction at Carnegie Mellon University,
            studying a mix of prototyping, design classes, and interviewing.
            Some of these skills could be considered the realm of consultants in
            France.
          </p>
        }
        cursorSvgUrl={cursorDoubleDiamond.src}
      >
        user-centered design process
      </CaptionedText>{' '}
      of every project I worked on, no matter the product stages.
    </div>
  );
}

function RelocationParagraph() {
  return (
    <div className={cn('relative')}>
      I am now relocating to Paris and hope to make an impact towards{' '}
      <CaptionedText
        caption={
          <p>
            I believe climate change is the biggest challenge of our century and
            I would really like my day-to-day job to contribute to solving it.
          </p>
        }
        cursorSvgUrl={cursorWarming.src}
      >
        climate change attenuation
      </CaptionedText>
      .
    </div>
  );
}

function AnimatedDownArrow({
  scale = 1,
  className,
}: {
  scale?: number;
  className?: string;
}) {
  return (
    <svg
      className={cn(scrollCtaStyles['animated-arrow'], className)}
      width={`${15 * scale}`}
      height={`${31 * scale}`}
      viewBox="0 0 15 31"
      fill="none"
      stroke="currentColor"
      strokeWidth={1 / scale}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.5 0v1" />
      <path d="M14.5 -7L7.5 0L0.5 -7" />
    </svg>
  );
}

// TODO: Don't reveal if user has already scrolled to projects
function ScrollCTA() {
  // Assume we need the scroll CTA, but hide it if it's not visible when it
  // loads because that means the intro text is relatively long and almost
  // cropped by the viewport, which is already enough of a CTA to scroll
  const [needsScrollCTA, setNeedsScrollCTA] = useState(true);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const observer = new IntersectionObserver(([entry], observer) => {
      setNeedsScrollCTA(entry.isIntersecting);
      observer.disconnect();
    });

    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    needsScrollCTA && (
      <div
        ref={ctaRef}
        className={cn(
          'self-center',
          'w-[min(30rem,80%)] sm:w-[min(60rem,100%)]',
          'flex items-center pb-sm text-body-md text-main-subtle',
          scrollCtaStyles['scroll-cta'] // fade-in
        )}
      >
        <AnimatedDownArrow scale={0.75} className={cn('shrink-0')} />
        <p className={cn('grow text-center text-[0.875rem]')}>
          Don&apos;t miss the rest
        </p>
        <AnimatedDownArrow scale={0.75} className={cn('shrink-0')} />
        <p
          className={cn('hidden sm:block', 'grow text-center text-[0.875rem]')}
        >
          Scroll for more
        </p>
        <AnimatedDownArrow
          scale={0.75}
          className={cn('hidden sm:block', 'shrink-0')}
        />
      </div>
    )
  );
}

// Assumes the parent element is a block with relative positioning
const appendWrappingDivsToSpan = (span: HTMLSpanElement) => {
  const parentRelativeParagraph = span.parentElement;
  if (!parentRelativeParagraph) return;

  // Call getClientRects because the span might be broken into multiple lines
  const spanRects = span.getClientRects();
  const paragraphRect = parentRelativeParagraph.getBoundingClientRect();
  const highlightDivs = [...spanRects].map((rect) => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.pointerEvents = 'none';
    // Wrap the div around the bounding box, knowing the parent has relative
    // positioning
    div.style.top = `${rect.top - paragraphRect.top}px`;
    div.style.left = `${rect.left - paragraphRect.left}px`;
    div.style.width = `${rect.width}px`;
    div.style.height = `${rect.height}px`;
    span.append(div);
    return div;
  });

  return highlightDivs;
};

const removeDivsFromSpan = (span: HTMLSpanElement) => {
  const existingHighlightDivs = span.querySelectorAll('div');
  existingHighlightDivs.forEach((div) => div.remove());
};

const CaptionInteractionContext = createContext<{
  incrementNumberOfCaptionsHovered: () => void;
  numberCaptionsHovered: number;
  captionsShouldFlicker: boolean;
}>({
  incrementNumberOfCaptionsHovered: () => {
    throw 'Should be implemented';
  },
  numberCaptionsHovered: 0,
  captionsShouldFlicker: false,
});

export function IntroWithCaptions({ className }: { className?: string }) {
  const [revealScrollCTA, setRevealScrollCTA] = useState(false);
  const [numberCaptionsHovered, setNumberCaptionsHovered] = useState(0);
  const incrementNumberOfCaptionsHovered = useCallback(() => {
    setNumberCaptionsHovered((previous) => previous + 1);
  }, []);
  const [captionsShouldFlicker, setCaptionsShouldFlicker] = useState(false);

  const introContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (numberCaptionsHovered === 0) {
      timeoutId = setTimeout(() => {
        setCaptionsShouldFlicker(true);
      }, 10_000);
    }

    return () => {
      if (timeoutId) {
        setCaptionsShouldFlicker(false);
        clearTimeout(timeoutId);
      }
    };
  }, [numberCaptionsHovered]);

  useEffect(() => {
    if (numberCaptionsHovered === 2) {
      setTimeout(() => {
        setRevealScrollCTA(true);
      }, 2000);
    }

    // TODO: See if we need a cleanup function
  }, [numberCaptionsHovered]);

  // Add 'highlight' boxes around the captioned text that will be animated as a
  // CTA for users to hover and reveal the caption. We need to create them
  // dynamically with JS because span is an inline element over potentially
  // multiple lines
  useEffect(() => {
    if (!introContentRef.current) return;

    const spanElements = introContentRef.current.querySelectorAll('span');
    [...spanElements].forEach((span) => {
      appendWrappingDivsToSpan(span);
    });

    // When the screen resizes and line breaks might get added, recompute the
    // bounding boxes of the span
    const resizeObserver = new ResizeObserver(() => {
      [...spanElements].forEach((span) => {
        removeDivsFromSpan(span);
        appendWrappingDivsToSpan(span);
      });
    });

    // Resize observers only work on the block elements so we need to set it on
    // the container
    resizeObserver.observe(introContentRef.current);

    return () => {
      [...spanElements].forEach((span) => {
        removeDivsFromSpan(span);
      });
    };
  }, []);

  return (
    <CaptionInteractionContext.Provider
      value={{
        numberCaptionsHovered,
        incrementNumberOfCaptionsHovered,
        captionsShouldFlicker,
      }}
    >
      <div
        id={navIds.intro}
        className={cn(
          'min-h-[calc(100dvh_-_theme(height.header-mobile))] md:min-h-screen',
          'pt-[5rem]  md:pt-[min(16.5vw,theme(padding.xl))]',
          // On large screens, take the full width with captions on the side, On
          // smaller screens, center the text and have captions overlayed on top
          'md:mx-auto xl:mx-0',
          'text-main [&:not(:has(span:hover))_span]:text-main-strong',
          '[&:has(span:hover)]:text-main-subtle [&:has(span:hover)_span:hover]:text-main',
          // Place scroll CTA at the bottom of the screen
          'flex flex-col justify-between gap-[3rem]',
          className
        )}
      >
        <div>
          <h1
            className={cn(
              'mb-[theme(gap.2xl)] text-heading-lg ',
              // On small screens, the name will be in the header
              'hidden md:block'
            )}
          >
            Pierre Amelot
          </h1>
          <article
            className={cn(
              'grid grid-cols-[auto] [grid-template-areas:"paragraph"]',
              'xl:grid-cols-[auto_1fr] xl:gap-2xl xl:[grid-template-areas:"paragraphs_funStuff"]'
            )}
          >
            <div
              className={cn(
                'max-w-paragraph-md [grid-area:paragraphs]',
                'text-body-md sm:text-body-lg',
                'flex flex-col gap-lg'
              )}
              ref={introContentRef}
            >
              <RolesParagraph />
              <SanFranciscoParagraph />
              <CodingParagraph />
              <UXParagraph />
              <RelocationParagraph />
            </div>
            <aside
              className={cn('hidden [grid-area:funStuff] xl:block')}
              // TODO: brainstorm what/whether to put into fun stuff
            />
          </article>
        </div>
        {revealScrollCTA && <ScrollCTA />}
      </div>
    </CaptionInteractionContext.Provider>
  );
}
