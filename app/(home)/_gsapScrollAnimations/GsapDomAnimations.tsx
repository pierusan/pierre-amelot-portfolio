'use client';

import { gsap } from 'gsap';
import { useLayoutEffect, useMemo } from 'react';
import { registerCurtainLiftAnimation } from './curtainLift';
import { registerToCHighlightAnimation } from './tocHighlight';
import { registerLessonsLearnedRevealAnimation } from './lessonsLearnedReveal';
import { useMobileFirstBreakpoint } from '@/hooks/useMobileFirstBreakpoint';
import { useAnimationStore } from '@/store';

// We keep the animation modify and use the DOM together because the result of
// one animation (ie adding a pin spacer) can have an influence on the next one.
// Here we can better control their order and re-execution
export function GsapDomAnimations() {
  const {
    setLessonsLearnedSubtitleScaleDownTl,
    resetLessonsLearnedSubtitleScaleDownTl,
  } = useAnimationStore();

  const breakpoint = useMobileFirstBreakpoint();
  const isSmallScreen = useMemo(() => {
    switch (breakpoint) {
      case 'md':
      case 'lg':
      case 'xl':
      case '2xl': {
        return false;
      }
      case '0':
      case 'sm': {
        return true;
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = breakpoint;
        return true;
      }
    }
  }, [breakpoint]);

  useLayoutEffect(() => {
    const gsapContext = gsap.context(() => {
      const cleanupLessonsLearned = registerLessonsLearnedRevealAnimation(
        isSmallScreen,
        setLessonsLearnedSubtitleScaleDownTl,
        resetLessonsLearnedSubtitleScaleDownTl
      );

      // Important to have the curtain animation after the lessons intro reveal
      // so the pin spacers are properly positioned and the curtain scroll
      // trigger happens at the right time
      registerCurtainLiftAnimation();

      // We add this as the last animation to initialize it once all the pin
      // spacers are added and the viewport scroll length is all set. We only
      // add the desktop animation here. For mobile it has to be added when the
      // popover for the ToC is opened otherwise the animation won't be
      // initialized properly because the anchors are not in the DOM yet
      if (!isSmallScreen) {
        registerToCHighlightAnimation();
      }

      return () => {
        cleanupLessonsLearned();
      };
    });

    return () => {
      gsapContext.revert();
    }; // <- Cleanup!
  }, [
    setLessonsLearnedSubtitleScaleDownTl,
    resetLessonsLearnedSubtitleScaleDownTl,
    isSmallScreen,
  ]);

  return null;
}
