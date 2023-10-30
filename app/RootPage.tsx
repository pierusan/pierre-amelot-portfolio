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
import { Rocks3DScene } from './Rocks3DScene';
import { GsapPluginsRegisterer } from './GsapPluginsRegisterer';
import { LessonsLearnedIntroReveal } from './LessonsLearnedIntroReveal';
import { NavLinkActiveOnScroll } from './NavLinkActiveOnScroll';
import { cn } from '@/lib/cn';
import { FixedBackdrop } from '@/components/FixedBackdrop';
import { animationClasses, animationIds, navIds } from '@/lib/constants';

export function RootPage() {
  return (
    <>
      {/* At the top so that all other components can use gsap */}
      <GsapPluginsRegisterer />
      <DesktopHomeNav
        className={cn('z-30', animationClasses.homeCurtainToPull)}
      />
      <MobileHomeNav className={cn('z-30')} />
      <MobileContactLinks className={cn('z-30')} />
      <DesktopContactLinks
        fixedSectionClassName={animationClasses.homeCurtainToPull}
        className={cn('z-30')}
      />
      {/* Below Curtain, displayed with the about section */}
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
        {/* Invisible div that we use to scroll to the 'about section'. 
            We need this because the 'real' about section right below has 
            a negative top margin */}
        <div className={cn('relative overflow-hidden')}>
          <div id={navIds.about} className={cn('absolute h-[10vh]')} />
        </div>
        <AboutSection
          id={animationIds.homeAboutSection}
          // Lift by 100vh to reveal it when pinned and curtain is pulled
          className={cn('z-0 mt-[-100vh]')}
        />
      </main>
      <Rocks3DScene
        className={cn('z-[15]', animationClasses.homeCurtainToPull)}
      />
      <LessonsLearnedIntroReveal />
      {/* Important to have the curtain animation after the lessons intro reveal so
          the pin spacers are properly positioned and the curtain scroll trigger
          happens at the right time */}
      <AboutBehindCurtainAnimation />
      {/* Scroll animation to highlight the nav link whose target element is currently
          in view. We add this as the last animation to initialize it once all the 
          pin spacers are added and the viewport scroll length is all set */}
      <NavLinkActiveOnScroll />
      {/* Dark backdrop for most of the page, lifted like a curtain at the end */}
      <FixedBackdrop
        className={cn('z-10', animationClasses.homeCurtainToPull)}
      />
      {/* Bright backdrop for final about section */}
      <FixedBackdrop variant="strong" className={cn('-z-10')} />
    </>
  );
}
