import { IntroWithCaptions } from './IntroWithCaptions';
import { DesktopAboutNav, DesktopHomeNav, MobileHomeNav } from './HomeNav';
import { LessonsLearnedSection } from './LessonsLearnedSection';
import { AboutBehindCurtainAnimation } from './AboutBehindCurtainAnimation';
import { AboutSection } from './AboutSection';
import { ProjectCards } from './ProjectCards';
import { GsapPluginsRegisterer } from './GsapPluginsRegisterer';
import { Rocks3DScene } from './_3D/Rocks3DScene';
import { LessonsLearnedIntroReveal } from './LessonsLearnedIntroReveal';
import { NavLinkActiveOnScroll } from './NavLinkActiveOnScroll';
import { cn } from '@/cn';
import {
  DesktopContactLinks,
  MobileContactLinks,
} from '@/components/ContactLinks';
import { FixedBackdrop } from '@/components/FixedBackdrop';
import { animationClasses, animationIds, navIds } from '@/constants';
import { MainContainer } from '@/components/MainContainer';

export function HomePage() {
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
      <DesktopAboutNav className={cn('z-0')} />
      <MainContainer
        className={cn(
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
      </MainContainer>
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
