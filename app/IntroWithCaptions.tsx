'use client';

import { type ReactNode, useState } from 'react';
import { cn } from '@/lib/cn';

const captions = {
  swEngineer: (
    <Caption>
      <p>
        I have on the latest stack React. I built component libraries, and .
        Focusing on web has been a great way for me to quickly bring UX
        decisions to life. React, Next, Vite, Storybook, Chakra UI, Styled
        Components, Electron are some of the libraries I used recently.
      </p>
    </Caption>
  ),
  learningNew: (
    <Caption>
      <p>I like learning new things</p>
    </Caption>
  ),
  ouster: (
    <Caption>
      <p>
        In 2018 I joined Ouster, a start-up building lidar sensor, as their 30th
        employee. When I left Ouster in 2022, the company had gone public and
        grown to 300 employees.
      </p>
    </Caption>
  ),
} as const;
type CaptionKeys = keyof typeof captions;

function Caption({ children }: { children?: ReactNode }) {
  return <div className="min-w-aside-sm max-w-aside-md">{children}</div>;
}

function CaptionTrigger({
  setOpenedCaption,
  caption,
  children,
}: {
  setOpenedCaption: (caption: CaptionKeys | null) => void;
  caption: CaptionKeys;
  children: ReactNode;
}) {
  return (
    <strong
      onMouseEnter={() => {
        setOpenedCaption(caption);
      }}
      onMouseLeave={() => {
        setOpenedCaption(null);
      }}
      className="font-normal"
    >
      {children}
    </strong>
  );
}

function IntroParagraphs({
  isCaptionOpened,
  setOpenedCaption,
  className,
}: {
  isCaptionOpened: boolean;
  setOpenedCaption: (caption: CaptionKeys | null) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex max-w-paragraph-md flex-col gap-lg text-body-md sm:text-body-lg',
        { 'text-main [&_strong]:text-main-strong': !isCaptionOpened },
        {
          'text-main-subtle [&_strong:hover]:text-main-strong': isCaptionOpened,
        },
        className
      )}
    >
      <p>
        I&apos;m a{' '}
        <CaptionTrigger
          setOpenedCaption={setOpenedCaption}
          caption="swEngineer"
        >
          software engineer trained in UX design and research
        </CaptionTrigger>
        , and I&apos;m always eager to{' '}
        <CaptionTrigger
          setOpenedCaption={setOpenedCaption}
          caption="learningNew"
        >
          learn something new
        </CaptionTrigger>
        !
      </p>
      <p>
        Over the last{' '}
        <CaptionTrigger setOpenedCaption={setOpenedCaption} caption="ouster">
          4 years in San Francisco
        </CaptionTrigger>
        , I designed and built 3D visualization software for a lidar company.
      </p>
      <p>
        Lately,{' '}
        <CaptionTrigger setOpenedCaption={setOpenedCaption} caption="ouster">
          web front-end
        </CaptionTrigger>{' '}
        code is what I mainly shipped, but I have also worked on{' '}
        <CaptionTrigger setOpenedCaption={setOpenedCaption} caption="ouster">
          back-end, 3D graphics, embedded UIs
        </CaptionTrigger>
        , and image processing algorithms.
      </p>
      <p>
        I have also owned the{' '}
        <CaptionTrigger setOpenedCaption={setOpenedCaption} caption="ouster">
          user-centered design process
        </CaptionTrigger>{' '}
        of every project I worked on, no matter the product stages.
      </p>
      <p>
        I am now relocating to Paris and hope to make an impact towards{' '}
        <CaptionTrigger setOpenedCaption={setOpenedCaption} caption="ouster">
          climate change attenuation
        </CaptionTrigger>
        .
      </p>
    </div>
  );
}

export function IntroWithCaptions({ className }: { className?: string }) {
  const [openedCaption, setOpenedCaption] = useState<CaptionKeys | null>(null);
  const isCaptionOpened = openedCaption !== null;

  return (
    <div
      className={cn(
        'pt-[8rem] md:pt-[clamp(8rem,16.5vw,theme(padding.xl))]',
        // On large screens, take the full width with captions on the side, On
        // smaller screens, center the text and have captions overlayed on top
        'md:mx-auto xl:mx-0',
        'min-h-screen',
        className
      )}
    >
      {/* The h1 is part of this Intro component here because it will be colored differently based on isCaptionOpened */}
      <h1
        className={cn(
          'hidden md:block',
          'mb-[theme(gap.2xl)] text-heading-lg ',
          isCaptionOpened ? 'text-main-subtle' : 'text-main'
        )}
      >
        Pierre Amelot
      </h1>
      <article
        className={cn(
          'grid',
          'grid-cols-[auto] [grid-template-areas:"paragraph"]',
          'xl:grid-cols-[auto_1fr] xl:gap-2xl xl:[grid-template-areas:"paragraph_captions"]'
        )}
      >
        <IntroParagraphs
          isCaptionOpened={isCaptionOpened}
          setOpenedCaption={setOpenedCaption}
          className="[grid-area:paragraph]"
        />
        <aside
          className={cn(
            'xl:[grid-area:captions]',
            // On mobile, the captions are overlayed on top of the paragraph
            'pointer-events-none [grid-area:paragraph]'
          )}
        >
          {openedCaption && captions[openedCaption]}
        </aside>
      </article>
    </div>
  );
}
