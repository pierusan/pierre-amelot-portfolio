import { type ReactNode } from 'react';
import { FixedBackdrop } from '@/components/FixedBackdrop';
import {
  DesktopContactLinks,
  MobileContactLinks,
} from '@/components/ContactLinks';
import { cn } from '@/cn';
import { DesktopLeftNav, DesktopVerticalLink } from '@/components/Nav';

export function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DesktopContactLinks className={cn('z-10')} />
      <MobileContactLinks className={cn('z-10')} />
      <DesktopLeftNav className={cn('pointer-events-none z-10')}>
        <DesktopVerticalLink
          linkName="Pierre Amelot"
          href={'/'}
          className="pointer-events-auto"
        />
      </DesktopLeftNav>
      <main
        className={cn(
          'w-fit lg:w-full xl:w-fit',
          'mx-auto lg:mx-0 xl:mx-auto',
          'pt-main-y-sm px-md md:pl-[6.5rem] md:pr-[5rem] md:pt-main-y-xl',
          'grid',
          'grid-cols-[minmax(1fr,theme(width.paragraph-md))]',
          'lg:grid-cols-[theme(width.paragraph-md)_minmax(0,1fr)] lg:gap-x-[3rem]',
          'xl:grid-cols-[theme(width.paragraph-md)_minmax(10rem,20rem)] xl:gap-x-2xl',
          // Make sure the ToC height is the same as its content so that it can be sticky
          'lg:items-start'
        )}
      >
        {children}
      </main>
      <FixedBackdrop className={cn('-z-10')} />
    </>
  );
}
