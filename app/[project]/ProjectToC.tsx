'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { TocHeading, useHighlightToCLinks } from './useHighlightToCLinks';
import { cn } from '@/cn';
import { Icon } from '@/components/Icon';
import { ProjectKey, projects } from '@/constants';
import { MobileNavPopover } from '@/components/Nav';

export function DesktopProjectToC({
  headings2,
  className,
  nextProject,
  previousProject,
}: {
  headings2: TocHeading[];
  nextProject: ProjectKey;
  previousProject: ProjectKey;
  className?: string;
}) {
  const tocRef = useRef<HTMLElementTagNameMap['nav']>(null);

  const tocList = useHighlightToCLinks(tocRef, headings2, 'in-view');

  return (
    <nav
      ref={tocRef}
      className={cn(
        'sticky top-16',
        'lg:justify-self-center xl:justify-self-auto',
        className
      )}
    >
      <ol>
        {tocList.map(({ value, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                'p-2xs',
                'text-details-md uppercase text-main-subtle xl:whitespace-nowrap',
                'flex items-center gap-sm',
                'transition-all',
                'group hover:text-main [&.in-view]:text-main'
              )}
            >
              <div
                className={cn(
                  'hidden xl:block', // Only show the line on large screens
                  'min-w-[80px] border-t border-action-subtle transition-all',
                  'group-hover:min-w-[96px] group-hover:border-t-2 group-hover:border-[theme(textColor.main.DEFAULT)]',
                  'group-[.in-view]:min-w-[96px] group-[.in-view]:border-t-2 group-[.in-view]:border-[theme(textColor.main.DEFAULT)]'
                )}
              />
              {value}
            </a>
          </li>
        ))}
      </ol>
      <ol
        className={cn(
          'mt-10 flex',
          'lg:flex-col',
          'xl:flex-row xl:justify-between xl:gap-xs'
        )}
      >
        <li>
          <Link
            href={`/${previousProject}`}
            className={cn(
              'px-2xs py-sm', // Larger hover zone
              'flex flex-nowrap items-center gap-[0.5rem]',
              'text-details-md uppercase',
              'text-main-subtle transition-colors hover:text-main',
              'xl:whitespace-nowrap'
            )}
          >
            <Icon name="pinLeft" size="1.33em" className={cn('shrink-0')} />
            <p>{projects[previousProject].linkName}</p>
          </Link>
        </li>
        <li>
          <Link
            href={`/${nextProject}`}
            className={cn(
              'px-2xs py-sm', // Larger hover zone
              'flex flex-nowrap items-center gap-[0.5rem]',
              'text-details-md uppercase',
              'text-main-subtle transition-colors hover:text-main',
              'xl:whitespace-nowrap'
            )}
          >
            <p className={cn('xl:order-0 lg:order-1', className)}>
              {projects[nextProject].linkName}
            </p>
            <Icon
              name="pinRight"
              size="1.33em"
              className={cn('lg:order-0 shrink-0 xl:order-1')}
            />
          </Link>
        </li>
      </ol>
    </nav>
  );
}

function MobileProjectToCList({
  headings2,
  nextProject,
  previousProject,
}: {
  headings2: TocHeading[];
  nextProject: ProjectKey;
  previousProject: ProjectKey;
  className?: string;
}) {
  const tocRef = useRef<HTMLOListElement>(null);

  const tocList = useHighlightToCLinks(tocRef, headings2, 'in-view');

  return (
    <>
      <ol ref={tocRef} className={cn('flex flex-col pt-3xs')}>
        {tocList.map(({ value, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                'block p-3xs',
                'xl:whitespace-nowrap',
                ' [&.in-view]:text-main'
              )}
            >
              {value}
            </a>
          </li>
        ))}
      </ol>
      <ol className={cn('mt-4 flex flex-col gap-3xs pb-3xs')}>
        <li>
          <Link
            href={`/${previousProject}`}
            className={cn(
              'p-3xs', // Larger hover zone
              'flex flex-nowrap items-center gap-[0.5rem]',
              'xl:whitespace-nowrap'
            )}
          >
            <Icon name="pinLeft" size="1em" className={cn('shrink-0')} />
            {projects[previousProject].linkName}
          </Link>
        </li>
        <li>
          <Link
            href={`/${nextProject}`}
            className={cn(
              'p-3xs', // Larger hover zone
              'flex flex-nowrap items-center gap-[0.5rem]',
              'xl:whitespace-nowrap'
            )}
          >
            <Icon name="pinRight" size="1em" className={cn('shrink-0')} />
            {projects[nextProject].linkName}
          </Link>
        </li>
      </ol>
    </>
  );
}

export function MobileProjectToC({
  headings2,
  className,
  nextProject,
  previousProject,
}: {
  headings2: TocHeading[];
  nextProject: ProjectKey;
  previousProject: ProjectKey;
  className?: string;
}) {
  return (
    <MobileNavPopover triggerClassName={cn('lg:hidden', className)}>
      {/* The TOC link highlight hooks have to be inside the PopoverContent
          so it is initialized properly when the popover gets into view */}
      <MobileProjectToCList
        headings2={headings2}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </MobileNavPopover>
  );
}
