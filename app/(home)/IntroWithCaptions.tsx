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
            My background brings a mix of computer science and UX design /
            research. I studied both academically (at Ecole Polytechnique and
            Carnegie Mellon University) and practiced them professionally since
            2017.
          </p>
        }
        cursorSvgUrl={cursorDevEmoji.src}
      >
        software engineer trained in product design
      </CaptionedText>
      , and I&apos;m always eager to{' '}
      <CaptionedText
        caption={
          <p>
            I enjoy diving into the workflow of users - soldiers, engineers,
            salespeople, or garbage truck drivers! I&apos;m always excited about
            technical topics like lidar optics, firmware development, or image
            processing algorithms. What drives me every day is learning new
            things - Youtube and Hacker News are a big part of how I improve as
            a developer.
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

function CodingParagraph() {
  return (
    <div className={cn('relative')}>
      Over the last{' '}
      <CaptionedText
        caption={
          <p>
            Between 2018 and 2022, Ouster, the lidar startup I worked for, grew
            from 30 to 300 employees. It&apos;s in Silicon Valley that I learned
            to ship production code rapidly and reliably.
          </p>
        }
        cursorSvgUrl={cursorCalifornia.src}
        // cursorSvgUrl={cursorUS.src}
      >
        5 years in San Francisco
      </CaptionedText>
      , I largely wrote{' '}
      <CaptionedText
        caption={
          <p>
            The web lets me quickly turn design ideas into reality. I recently
            built web apps, static sites, component libraries, 3D visualization
            libraries, and Electron apps with a mix of React, Next, Vite,
            Storybook, Tailwind, Chakra UI, or Three.js. I also played with
            workers and WASM in some computationally heavy contexts.
          </p>
        }
        cursorSvgUrl={cursorReact.src}
      >
        web front-end
      </CaptionedText>{' '}
      code, but I also worked on{' '}
      <CaptionedText
        caption={
          <p>
            At the start of my career, I built AR/VR experiences with Unity and
            embedded 3D apps with C++ and OpenGL. On recent full-stack projects,
            I maintained a Python backend with Flask, Postgres, Docker, GCP, and
            Terraform as parts of the stack.
          </p>
        }
        cursorSvgUrl={cursorUnity.src}
      >
        back-end, 3D graphics, and embedded UIs
      </CaptionedText>
      .
    </div>
  );
}

function UXParagraph() {
  return (
    <div className={cn('relative')}>
      I also owned the{' '}
      <CaptionedText
        caption={
          <p>
            I led products through various stages from initial UX research to
            low-fidelity wireframes to interactive prototypes, all the way to
            production code and analytics. I believe taking a user-centered
            approach is key to building useful and usable products that drives
            business forward.
          </p>
        }
        cursorSvgUrl={cursorDoubleDiamond.src}
      >
        user-centered design
      </CaptionedText>{' '}
      process of every project I worked on.
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
            I believe climate change is the biggest challenge of our century. I
            want my day-to-day job to contribute to solving it.
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
