import { type CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { Icon } from '@/components/Icon';
import { navIds } from '@/lib/constants';

type Ellipse = { cx: number; cy: number; rx: number; ry: number };

function RockSVG({
  className,
  ellipse,
  translateY = 0,
}: {
  className?: string;
  ellipse: Ellipse;
  translateY: number;
}) {
  const { cx, cy, rx, ry } = ellipse;
  const svgHeight = ry * 2 + 2;

  return (
    <svg
      width="34"
      height={svgHeight}
      viewBox={`0 0 34 ${svgHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={1.5}
      className={cn('[transform:translateY(var(--translation-y))]', className)}
      style={{ '--translation-y': `${translateY}px` } as CSSProperties}
      vectorEffect="non-scaling-stroke" // TODO: Check why this doesn't seem to work
    >
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
    </svg>
  );
}

const rockNavLinks: {
  navLinkId: keyof typeof navIds.rocks;
  linkName: string;
  rockEllipse: Ellipse;
  translationYInStack: number;
  translationYLessonsLearnedToMainStack: number;
}[] = [
  {
    navLinkId: 'ouster-studio',
    linkName: 'Ouster Studio',
    rockEllipse: { cx: 13, cy: 5, rx: 8, ry: 4 },
    translationYInStack: 50.5,
    translationYLessonsLearnedToMainStack: -101.5,
  },
  {
    navLinkId: 'fleetguide-surround-view',
    linkName: 'Surround View',
    rockEllipse: { cx: 16, cy: 7, rx: 10.2, ry: 6 },
    translationYInStack: 32,
    translationYLessonsLearnedToMainStack: -94,
  },
  {
    navLinkId: 'ouster-data-app',
    linkName: 'Data App',
    rockEllipse: { cx: 17, cy: 8, rx: 11, ry: 7 },
    translationYInStack: 17,
    translationYLessonsLearnedToMainStack: -82,
  },
  {
    navLinkId: 'nrec-ar',
    linkName: 'Demining in AR',
    rockEllipse: { cx: 15, cy: 8, rx: 12, ry: 7 },
    translationYInStack: 4,
    translationYLessonsLearnedToMainStack: -67,
  },
  {
    navLinkId: 'hypnovr',
    linkName: 'HypnoVR',
    rockEllipse: { cx: 17, cy: 9, rx: 16, ry: 8 },
    translationYInStack: -10,
    translationYLessonsLearnedToMainStack: -54,
  },
];

function RocksStackDesktopNav() {
  return (
    <ul
      className={cn(
        'relative gap-3xs rounded-sm p-md',
        'flex flex-col',
        // Only reveal the nav menu and its content when the hover zone is hovered
        '[&:hover>div:first-child]:hidden [&>div:first-child]:pointer-events-auto',
        'pointer-events-none hover:pointer-events-auto',
        'transition-colors hover:bg-[theme(gradientColorStops.bg-main-stop)]',
        '[&:hover_span]:opacity-100 [&_span]:opacity-0 [&_span]:transition-opacity',
        // When the nav menu is revealed, move the rocks back out of the stack
        // and inside their nav link element
        '[&:hover_svg]:[transform:translate(0)] [&_svg]:transition',
        // Lessons learned icon has a different treatment because it goes from a
        // big stack to a small one so the translation when hovered is different
        '[&:hover>li:last-of-type_svg:nth-child(1)]:[transform:translate(0,-3px)_scale(0.5)]',
        '[&:hover>li:last-of-type_svg:nth-child(2)]:[transform:translate(0,-0.5px)_scale(0.5)]',
        '[&:hover>li:last-of-type_svg:nth-child(2)]:opacity-0',
        '[&:hover>li:last-of-type_svg:nth-child(3)]:[transform:translate(0,-0.5px)_scale(0.5)]',
        '[&:hover>li:last-of-type_svg:nth-child(4)]:[transform:translate(0,-0.5px)_scale(0.5)]',
        '[&:hover>li:last-of-type_svg:nth-child(4)]:opacity-0',
        '[&:hover>li:last-of-type_svg:nth-child(5)]:[transform:translate(0,6px)_scale(0.5)]'
      )}
    >
      {/* Hover zone */}
      <div className="absolute left-0 top-[55px] h-[134px] w-[98px] opacity-50" />
      {/* Rocks -> project nav links */}
      {rockNavLinks.map(
        ({ rockEllipse, navLinkId, linkName, translationYInStack }) => (
          <li key={linkName}>
            <a
              href={`#${navIds.rocks[navLinkId]}`}
              className={cn(
                'flex items-center gap-md',
                'text-body-md hover:text-main active:text-main-strong',
                // Needed so that the link highlighter can use z-index on it
                'relative'
              )}
            >
              <RockSVG translateY={translationYInStack} ellipse={rockEllipse} />
              <span>{linkName}</span>
            </a>
          </li>
        )
      )}
      {/* Rock stack -> Lessons Learned link */}
      <li className="mt-[1rem]">
        <a
          href={`#${navIds.rocks['lessons-learned']}`}
          className={cn(
            'flex items-center gap-md',
            'text-body-md hover:text-main active:text-main-strong',
            // Needed so that the link highlighter can use z-index on it
            'relative'
          )}
        >
          <div className={cn('relative')}>
            {rockNavLinks.map(
              (
                {
                  navLinkId,
                  rockEllipse,
                  translationYLessonsLearnedToMainStack,
                },
                index
              ) => (
                <RockSVG
                  key={navLinkId}
                  ellipse={rockEllipse}
                  translateY={translationYLessonsLearnedToMainStack}
                  className={index < rockNavLinks.length - 1 ? 'absolute' : ''}
                />
              )
            )}
          </div>
          <span>Lessons Learned</span>
        </a>
      </li>
    </ul>
  );
}

function DesktopVerticalLink({
  navLinkId,
  linkName,
}: {
  navLinkId: keyof typeof navIds;
  linkName: string;
}) {
  return (
    <a
      className={cn(
        'rotate-180 p-md uppercase [writing-mode:vertical-lr]',
        'hover:text-main active:text-main-strong',
        'pointer-events-auto'
      )}
      href={`#${navIds[navLinkId]}`}
    >
      {linkName}
    </a>
  );
}

export function DesktopHomeNav({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  return (
    <nav
      id={id}
      className={cn(
        'hidden md:block',
        'fixed top-0 h-screen',
        'text-details-xl text-main-subtle',
        // Enable pointer events on the children directly so the project cards
        // pointer-events are not blocked by the nav overlapping
        'pointer-events-none',
        className
      )}
    >
      <ol className="flex h-full flex-col items-start justify-between">
        <li>
          <DesktopVerticalLink navLinkId="intro" linkName="Intro" />
        </li>
        <li>
          <RocksStackDesktopNav />
        </li>
        <li>
          <DesktopVerticalLink navLinkId="about" linkName="About" />
        </li>
      </ol>
    </nav>
  );
}

export function MobileHomeNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn('md:hidden', 'fixed -right-[1px] bottom-[20vh]', className)}
    >
      <Popover>
        <PopoverTrigger className="rounded-l-sm border border-action-subtle p-3xs text-main-subtle">
          <Icon name="toc" size="1.5rem" />
        </PopoverTrigger>
        {/* TODO: Replace with actual ToC */}
        <PopoverContent className="bg-main p-2xs" sideOffset={2} side="left">
          This is just a placeholder
        </PopoverContent>
      </Popover>
    </nav>
  );
}

export function DesktopBackToTopButton({ className }: { className?: string }) {
  return (
    <div className={cn('hidden md:flex', 'fixed top-0', 'p-md', className)}>
      <a
        className="hover:text-main-subtle active:text-main"
        href={`#${navIds.intro}`}
      >
        <Icon name="arrowUp" size="2rem" />
      </a>
    </div>
  );
}
