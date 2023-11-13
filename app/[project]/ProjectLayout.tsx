import { type ReactNode } from 'react';
import { FixedBackdrop } from '@/components/FixedBackdrop';
import { MainContainer } from '@/components/MainContainer';
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
      <MainContainer
        className={cn(
          'pt-main-y-xl',
          'grid',
          'xl:grid-cols-[theme(width.paragraph-md)_1fr] xl:gap-x-3xl',
          // Make sure the ToC height is the same as its content so that it can be sticky
          'xl:items-start'
        )}
      >
        {children}
      </MainContainer>
      <FixedBackdrop className={cn('-z-10')} />
    </>
  );
}
