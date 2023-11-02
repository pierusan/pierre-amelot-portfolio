'use client';

import { type ReactNode, useState, useRef, useEffect } from 'react';
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
    onOpenChange: setIsCaptionOpen,
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

  // Add 'highlight' boxes around the captioned text that will be animated as a
  // CTA for users to hover and reveal the caption
  useEffect(() => {
    if (!captionRefs.domReference.current) return;
    const spanElement = captionRefs.domReference
      .current as HTMLElementTagNameMap['span'];
    const paragraphElement = spanElement.parentElement;
    if (!paragraphElement) return;

    // Call getClientRects because the span might be broken into multiple lines
    const spanRects = spanElement.getClientRects();
    const paragraphRect = paragraphElement.getBoundingClientRect();
    const highlightDivs = [...spanRects].map((rect) => {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.pointerEvents = 'none';
      // The relative parent is the paragraph
      div.style.top = `${rect.top - paragraphRect.top}px`;
      div.style.left = `${rect.left - paragraphRect.left}px`;
      div.style.width = `${rect.width}px`;
      div.style.height = `${rect.height}px`;
      spanElement.append(div);
      return div;
    });

    // Because the animation only runs once when the window opens, we don't need
    // to deal with screen resize

    return () => {
      highlightDivs.forEach((div) => div.remove());
    };
  }, [captionRefs.domReference]);

  return (
    <>
      <span
        ref={captionedTextRef}
        style={{ cursor: `url(${cursorSvgUrl}), auto` }}
        {...getCaptionedTextProps()}
        className={cn(captionStyles['captioned-text'])}
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

export function IntroWithCaptions({ className }: { className?: string }) {
  return (
    <div
      id={navIds.intro}
      className={cn(
        'min-h-screen pt-[8rem] md:pt-[clamp(8rem,16.5vw,theme(padding.xl))]',
        // On large screens, take the full width with captions on the side, On
        // smaller screens, center the text and have captions overlayed on top
        'md:mx-auto xl:mx-0',
        'text-main [&:not(:has(span:hover))_span]:text-main-strong',
        '[&:has(span:hover)]:text-main-subtle [&:has(span:hover)_span:hover]:text-main',
        className
      )}
    >
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
  );
}
