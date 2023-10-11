import { IntroWithCaptions } from './IntroWithCaptions';
import { DesktopContactLinks, MobileContactLinks } from './ContactLinks';
import {
  DesktopBackToTopButton,
  DesktopHomeNav,
  MobileHomeNav,
} from './HomeNav';
import { LessonsLearnedSection } from './LessonsLearnedSection';
import { AboutBehindCurtainAnimation } from './AboutBehindCurtainAnimation';
import { AboutSection } from './AboutSection';
import { ProjectCards } from './ProjectCards';
import { cn } from '@/lib/cn';
import { FixedBackdrop } from '@/components/FixedBackdrop';
import { animationClasses, animationIds } from '@/lib/constants';

export function RootPage() {
  return (
    <>
      <DesktopHomeNav
        className={cn('z-30', animationClasses.homeCurtainToPull)}
      />
      <MobileHomeNav className={cn('z-30')} />
      <MobileContactLinks className={cn('z-30')} />
      <DesktopContactLinks
        fixedSectionClassName={animationClasses.homeCurtainToPull}
        className={cn('z-30')}
      />
      {/* Below Curtain with About section */}
      <DesktopContactLinks variant="strong" className={cn('z-0')} />
      <DesktopBackToTopButton className={cn('z-0')} />
      <main
        className={cn(
          'px-md md:px-xl xl:px-[clamp(theme(padding.xl),11.875vw,theme(padding.2xl))]',
          // Easier to center things inside if we use flex
          'flex flex-col'
        )}
      >
        <IntroWithCaptions className={cn('z-20')} />
        <ProjectCards className={cn('z-20')} />
        <LessonsLearnedSection className={cn('z-20')} />
        <AboutSection
          id={animationIds.homeAboutSection}
          // Lift by 100vh to reveal it when pinned and curtain is pulled
          className={cn('z-0 mt-[-100vh]')}
        />
      </main>
      <AboutBehindCurtainAnimation />
      {/* Dark backdrop for most of the page, lifted like a curtain at the end */}
      <FixedBackdrop
        className={cn('z-10', animationClasses.homeCurtainToPull)}
      />
      {/* Bright backdrop for final about section */}
      <FixedBackdrop variant="strong" className={cn('-z-10')} />
    </>
  );
}
