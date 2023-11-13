'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { cn } from '@/cn';

type SectionBounds = {
  id: string;
  start: HTMLElement;
  end: HTMLElement;
  previousId: string | undefined;
  nextId: string | undefined;
};

type TocHeading = { value: string; id: string };

export function ProjectTableOfContents({
  headings2,
  className,
}: {
  headings2: TocHeading[];
  className?: string;
}) {
  const tocRef = useRef<HTMLElementTagNameMap['nav']>(null);

  // Add an 'Overview' ToC element that links to the root (-> will scroll to the
  // top of the project page which contains title, badges, and intro)
  const tocList = useMemo(
    () => [{ value: 'Overview', id: '' }, ...headings2],
    [headings2]
  );

  const highlightTocLink = useCallback((headingId?: string) => {
    if (headingId === undefined) {
      return;
    }

    const allTocLinks = tocRef.current?.querySelectorAll(`a`);
    const tocLinkToHighlight = tocRef.current?.querySelector(
      `a[href="#${headingId}"]`
    );

    allTocLinks?.forEach((tocLink) => {
      tocLink.classList.remove('in-view');
    });
    tocLinkToHighlight?.classList.add('in-view');
  }, []);

  // Highlight ToC link when corresponding section gets in view
  useEffect(() => {
    // First and last element in a section. A 'section' starts with a heading2
    // and ends right before the next heading2. Here I tried to not have to add
    // section wrappers to the document and keep the HTML lean so I have to find
    // the create the sections by hand.
    const sectionBounds = tocList
      .map(({ id }, index) => {
        const nextId =
          index < tocList.length - 1 ? tocList[index + 1].id : undefined;
        const previousId = index > 0 ? tocList[index - 1].id : undefined;

        return {
          id: id,
          start:
            index === 0
              ? document.querySelector('h1') // Overview is a special case because it's not a heading2
              : document.querySelector(`#${id}`),
          end: nextId
            ? document.querySelector(`:has(+#${nextId})`)
            : document.querySelector(`#${id}~*:last-child`), // Last section edge case
          nextId,
          previousId,
        };
      })
      .filter((sectionBounds): sectionBounds is SectionBounds => {
        const { start, end } = sectionBounds;
        if (!start || !end) {
          console.error(
            'Table of contents section bounds not found. Something went wrong'
          );
        }
        return start !== null && end !== null;
      });

    // Pass info about the section to the DOM so we can use it in the
    // intersection observer
    sectionBounds.forEach(({ start, end, id, nextId, previousId }) => {
      start.dataset.sectionId = id;
      start.dataset.isSectionStart = 'true';
      start.dataset.nextSectionId = nextId;
      start.dataset.previousSectionId = previousId;
      end.dataset.sectionId = id;
      end.dataset.isSectionStart = 'false';
      end.dataset.nextSectionId = nextId;
      end.dataset.previousSectionId = previousId;
    });

    // Use intersection observer to check when the ToC sections become in view.
    // I could have used GSAP here like with the home page but I wanted to try
    // the native API.
    let initialRender = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = (entry.target as HTMLElement).dataset.sectionId;
          const nextSectionId = (entry.target as HTMLElement).dataset
            .nextSectionId;
          const previousSectionId = (entry.target as HTMLElement).dataset
            .previousSectionId;

          const isSectionStart =
            (entry.target as HTMLElement).dataset.isSectionStart === 'true';
          const isSectionEnd =
            (entry.target as HTMLElement).dataset.isSectionStart === 'false';

          const isEnteringFromTop =
            entry.isIntersecting &&
            Math.abs(entry.intersectionRect.top - entry.rootBounds!.top) <
              Math.abs(entry.intersectionRect.top - entry.rootBounds!.bottom);
          const isEnteringFromBottom =
            entry.isIntersecting &&
            Math.abs(entry.intersectionRect.top - entry.rootBounds!.bottom) <
              Math.abs(entry.intersectionRect.top - entry.rootBounds!.top);
          const isExitingFromTop =
            !entry.isIntersecting &&
            Math.abs(entry.boundingClientRect.bottom - entry.rootBounds!.top) <
              Math.abs(entry.boundingClientRect.top - entry.rootBounds!.bottom);
          const isExitingFromBottom =
            !entry.isIntersecting &&
            Math.abs(entry.boundingClientRect.top - entry.rootBounds!.bottom) <
              Math.abs(entry.boundingClientRect.top - entry.rootBounds!.top);

          if (
            (isSectionStart && isEnteringFromBottom) ||
            (isSectionEnd && isEnteringFromTop)
          ) {
            highlightTocLink(sectionId);
          }

          // Edge cases when one section has entered the intersection but the
          // other one hasn't left and the user reverses scroll direction
          if (isSectionEnd && isExitingFromTop) {
            highlightTocLink(nextSectionId);
          }
          if (isSectionStart && isExitingFromBottom) {
            highlightTocLink(previousSectionId);
          }
        });

        // On initial render, highlight the link whose section center is the
        // closest to the intersection zone center
        if (initialRender) {
          // eslint-disable-next-line unicorn/no-array-reduce
          const sectionClosestToViewportCenter = entries.reduce<{
            id: string | undefined;
            distanceToCenter: number;
          }>(
            (accumulator, entry) => {
              const sectionCenter =
                entry.boundingClientRect.top +
                entry.boundingClientRect.height / 2;
              const intersectionRootCenter =
                entry.rootBounds!.top + entry.rootBounds!.height / 2;

              const distanceToCenter = Math.abs(
                sectionCenter - intersectionRootCenter
              );

              return distanceToCenter < accumulator.distanceToCenter
                ? {
                    id: (entry.target as HTMLElement).dataset.sectionId,
                    distanceToCenter,
                  }
                : accumulator;
            },
            { id: undefined, distanceToCenter: Number.POSITIVE_INFINITY }
          );
          highlightTocLink(sectionClosestToViewportCenter.id);

          initialRender = false;
        }
      },

      // Trigger whenever a sliver of the element is in the center 40% of the
      // viewport
      {
        threshold: 0.001,
        rootMargin: '-30% 0px',
      }
    );

    sectionBounds.forEach(({ start, end }) => {
      observer.observe(start);
      observer.observe(end);
    });

    return () => {
      observer.disconnect();

      sectionBounds.forEach(({ start, end }) => {
        delete start.dataset.sectionId;
        delete start.dataset.isSectionStart;
        delete start.dataset.nextSectionId;
        delete start.dataset.previousSectionId;
        delete end.dataset.sectionId;
        delete end.dataset.isSectionStart;
        delete end.dataset.nextSectionId;
        delete end.dataset.previousSectionId;
      });
    };
  }, [tocList, highlightTocLink]);

  return (
    <nav
      ref={tocRef}
      className={cn('flex flex-col items-start', 'sticky top-16', className)}
    >
      <ol>
        {tocList.map(({ value, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                'p-2xs',
                'text-details-md uppercase text-main-subtle',
                'flex items-center gap-sm',
                'transition-all',
                'group hover:text-main [&.in-view]:text-main'
              )}
            >
              <div
                className={cn(
                  'w-[80px] border-t border-action-subtle transition-all',
                  'group-hover:w-[96px] group-hover:border-t-2 group-hover:border-[theme(textColor.main.DEFAULT)]',
                  'group-[.in-view]:w-[96px] group-[.in-view]:border-t-2 group-[.in-view]:border-[theme(textColor.main.DEFAULT)]'
                )}
              />
              {value}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
