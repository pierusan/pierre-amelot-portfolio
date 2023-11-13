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
      <DesktopLeftNav className={cn('z-10')}>
        <DesktopVerticalLink linkName="Pierre Amelot" href={'/'} />
      </DesktopLeftNav>
      <main
        className={cn(
          'w-fit mx-auto',
          'pl-[6.5rem] pr-[5rem] pt-main-y-xl',
          'grid',
          'grid-cols-[theme(width.paragraph-md)]',
          'xl:grid-cols-[theme(width.paragraph-md)_minmax(10rem,20rem)] xl:gap-x-2xl',
          // Make sure the ToC height is the same as its content so that it can be sticky
          'xl:items-start'
        )}
      >
        {children}
      </main>
      <FixedBackdrop className={cn('-z-10')} />
    </>
  );
}
