import { type CSSProperties } from 'react';
import { ToCHighlighter } from './_gsapScrollAnimations/tocHighlight';
import { cn } from '@/cn';
import { Icon } from '@/components/Icon';
import {
  type ProjectKey,
  animationClasses,
  navIds,
  projects,
} from '@/constants';
import {
  DesktopLeftNav,
  DesktopVerticalLink,
  MobileNavPopover,
} from '@/components/Nav';

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
  navLinkId: ProjectKey;
  rockEllipse: Ellipse;
  translationYInStack: number;
  translationYLessonsLearnedToMainStack: number;
}[] = [
  {
    navLinkId: 'hypnovr',
    rockEllipse: { cx: 13, cy: 5, rx: 8, ry: 4 },
    translationYInStack: 50.5,
    translationYLessonsLearnedToMainStack: -101.5,
  },
  {
    navLinkId: 'nrec-ar',
    rockEllipse: { cx: 16, cy: 7, rx: 10.2, ry: 6 },
    translationYInStack: 32,
    translationYLessonsLearnedToMainStack: -94,
  },
  {
    navLinkId: 'ouster-data-app',
    rockEllipse: { cx: 17, cy: 8, rx: 11, ry: 7 },
    translationYInStack: 17,
    translationYLessonsLearnedToMainStack: -82,
  },
  {
    navLinkId: 'fleetguide-360-view',
    rockEllipse: { cx: 15, cy: 8, rx: 12, ry: 7 },
    translationYInStack: 4,
    translationYLessonsLearnedToMainStack: -67,
  },
  {
    navLinkId: 'ouster-studio',
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
      {rockNavLinks.map(({ rockEllipse, navLinkId, translationYInStack }) => {
        const linkName = projects[navLinkId].linkName;
        return (
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
        );
      })}
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

function RocksStackMobileNav() {
  return (
    <ul
      className={cn(
        '[&_a]:flex [&_a]:items-center [&_a]:gap-sm [&_a]:py-[0.125rem]',
        // Needed so that the link highlighter can use z-index on it
        '[&_a]:relative'
      )}
    >
      {/* Rocks -> project nav links */}
      {[...rockNavLinks].map(({ rockEllipse, navLinkId }) => {
        const linkName = projects[navLinkId].linkName;
        return (
          <li key={linkName}>
            <a href={`#${navIds.rocks[navLinkId]}`}>
              <RockSVG translateY={0} ellipse={rockEllipse} />
              <span>{linkName}</span>
            </a>
          </li>
        );
      })}
      {/* Rock stack -> Lessons Learned link */}
      <li className="mt-[1rem]">
        <a href={`#${navIds.rocks['lessons-learned']}`}>
          <div
            className={cn(
              'relative',
              '[&>svg:nth-child(1)]:[transform:translate(0,-3px)_scale(0.5)]',
              '[&>svg:nth-child(3)]:[transform:translate(0,-0.5px)_scale(0.5)]',
              '[&>svg:nth-child(5)]:[transform:translate(0,6px)_scale(0.5)]',
              '[&>svg:nth-child(2n)]:hidden',
              '[&>svg:not(:last-child)]:absolute'
            )}
          >
            {rockNavLinks.map(({ navLinkId, rockEllipse }) => (
              <RockSVG key={navLinkId} ellipse={rockEllipse} translateY={0} />
            ))}
          </div>
          <span>Lessons Learned</span>
        </a>
      </li>
    </ul>
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
    <DesktopLeftNav
      id={id}
      className={cn(
        // Enable pointer events on the children directly so the project cards
        // pointer-events are not blocked by the nav overlapping
        'pointer-events-none',
        // Highlight the nav link when the corresponding section is in view
        animationClasses.navHighlightedOnScroll,
        className
      )}
    >
      <ol className="flex h-full flex-col items-start justify-between">
        <li>
          <DesktopVerticalLink
            className="pointer-events-auto"
            href={`#${navIds.intro}`}
            linkName="Intro"
          />
        </li>
        <li>
          <RocksStackDesktopNav />
        </li>
        <li>
          <DesktopVerticalLink
            className="pointer-events-auto"
            href={`#${navIds.about}`}
            linkName="About"
          />
        </li>
      </ol>
    </DesktopLeftNav>
  );
}

export function MobileHomeNav({ className }: { className?: string }) {
  return (
    <MobileNavPopover
      triggerClassName={cn('md:hidden', className)}
      // Highlight the nav link when the corresponding section is in view
      className={animationClasses.navHighlightedOnScroll}
    >
      <ul className={cn('flex flex-col')}>
        {/* The ToC links only appear in the dom when the popover is opened so the
            animation has to be registered within the PopoverContent component */}
        <ToCHighlighter />
        <li className={cn('mb-2')}>
          <a
            className={cn('block p-2xs pl-[3.125rem]')}
            href={`#${navIds.intro}`}
          >
            Intro
          </a>
        </li>
        <li>
          <RocksStackMobileNav />
        </li>
        <li className={cn('mt-2')}>
          <a
            className={cn('block p-2xs pl-[3.125rem]')}
            href={`#${navIds.about}`}
          >
            About
          </a>
        </li>
      </ul>
    </MobileNavPopover>
  );
}

export function DesktopAboutNav({ className }: { className?: string }) {
  return (
    <DesktopLeftNav className={cn('text-main', className)}>
      <ol className="flex h-full flex-col justify-between">
        <li>
          <DesktopVerticalLink
            href={`#${navIds.intro}`}
            linkName="Intro"
            className={cn('hover:text-main-subtle active:text-main')}
          />
        </li>
        <li className={cn('self-stretch')}>
          <a
            className={cn(
              'grid p-md transition-colors hover:text-main-subtle active:text-main'
            )}
            href={`#${navIds.rocks['lessons-learned']}`}
          >
            <Icon
              name="arrowUp"
              size="2rem"
              className={cn('place-items-center')}
            />
          </a>
        </li>
      </ol>
    </DesktopLeftNav>
  );
}
