'use client';

import { flushSync } from 'react-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import cursorDoubleDiamond from './_cursors/cursor_double_diamond.svg?url';
import cursorDevEmoji from './_cursors/cursor_dev_emoji.svg?url';
import cursorLearnEmoji from './_cursors/cursor_learning_emoji.svg?url';
import cursorReact from './_cursors/cursor_react_logo_with_bg_30.png';
import cursorCalifornia from './_cursors/cursor_california_flag_36.jpg';
import cursorUnity from './_cursors/cursor_unity_logo_30.png';
import cursorWarming from './_cursors/cursor_warming_stripes_42.jpg';
import { CaptionedText } from './Caption';
import { CaptionInteractionContext } from './CaptionInteractionContext';
import { ScrollCta } from './ScrollCta';
import { cn } from '@/cn';
import { navIds } from '@/constants';

const DELAY_REVEAL_HOVER_CTA_MS = 6000;
const NUM_CAPTIONS_HOVER_BEFORE_SCROLL_CTA_MS = 2;
const DELAY_REVEAL_SCROLL_CTA_MS = 2000;

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
  const [revealScrollCta, setRevealScrollCta] = useState(false);
  const [blockScrollCtaReveal, setBlockScrollCtaReveal] = useState(false);
  const [numberCaptionsHovered, setNumberCaptionsHovered] = useState(0);
  const incrementNumberOfCaptionsHovered = useCallback(() => {
    setNumberCaptionsHovered((previous) => previous + 1);
  }, []);
  const [captionsShouldFlicker, setCaptionsShouldFlicker] = useState(false);

  const introContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.time('CaptionFlicker');
    let timeoutId: NodeJS.Timeout | undefined;
    if (numberCaptionsHovered === 0) {
      timeoutId = setTimeout(() => {
        // console.timeLog('CaptionFlicker', 'setCaptionsShouldFlicker(true)');

        // I'm not sure if it happens in production, but at least in dev mode,
        // there have sometimes been inconsistent delays between the state
        // update schedule and when it is run (sometimes even 10 seconds). It
        // was hard to reproduce and clearing Next cache seems to actually have
        // fixed it I but just to be safe we use flushSync here.
        flushSync(() => {
          setCaptionsShouldFlicker(true);
        });
      }, DELAY_REVEAL_HOVER_CTA_MS);
    }

    return () => {
      if (timeoutId) {
        setCaptionsShouldFlicker(false);
        clearTimeout(timeoutId);
      }
      // console.timeEnd('CaptionFlicker');
    };
  }, [numberCaptionsHovered]);

  // useEffect(() => {
  //   if (captionsShouldFlicker) {
  //     console.timeLog(
  //       'CaptionFlicker',
  //       'captionsShouldFlicker set to true in IntroWithCaptions'
  //     );
  //   }
  // }, [captionsShouldFlicker]);

  useEffect(() => {
    if (numberCaptionsHovered === NUM_CAPTIONS_HOVER_BEFORE_SCROLL_CTA_MS) {
      setTimeout(() => {
        setRevealScrollCta(true);
      }, DELAY_REVEAL_SCROLL_CTA_MS);
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

  // If the intro goes of the viewport, we don't need to start revealing the
  // scroll, but if it's already revealed, let it be
  useEffect(() => {
    if (!introContentRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setRevealScrollCta((wasAlreadyRevealed) => {
          if (!wasAlreadyRevealed) {
            setBlockScrollCtaReveal(true);
            return wasAlreadyRevealed;
          }
          return wasAlreadyRevealed;
        });
      }
    });

    observer.observe(introContentRef.current);
    return () => observer.disconnect();
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
          'pt-[3rem] md:pt-[min(16.5vw,theme(padding.xl))]',
          // On large screens, take the full width with captions on the side, On
          // smaller screens, center the text and have captions overlayed on top
          'md:mx-auto xl:mx-0',
          'text-main [&:not(:has(span[data-open="true"]))_span]:text-main-strong',
          '[&:has(span[data-open="true"])]:text-main-subtle [&:has(span[data-open="true"])_span[data-open="true"]]:text-main',
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
        {revealScrollCta && !blockScrollCtaReveal && <ScrollCta />}
      </div>
    </CaptionInteractionContext.Provider>
  );
}
