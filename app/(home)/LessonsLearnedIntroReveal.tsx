'use client';

import SplitType from 'split-type';
import { gsap, Power1 } from 'gsap';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useLayoutEffect } from 'react';
import { useAnimationStore } from '@/store';
import { animationClasses, animationIds, navIds } from '@/constants';
import tailwindConfig from '@configs/tailwind.config';

const textColors = resolveConfig(tailwindConfig).theme.textColor;
const textColorMain = textColors.main.DEFAULT;
const textColorMainSubtle = textColors.main.subtle;

const sectionSelector = `#${animationIds.homeLessonsLearnedSection}`;
const subtitleSelector = `#${animationIds.homeLessonsLearnedIntroSubtitle}`;
const paragraphSelector = `#${animationIds.homeLessonsLearnedIntroParagraph}`;

// 1. Reveal subtitle one word at a time
// 2. Scale down subtitle and reveal intro paragraph
// 3. Highlight intro paragraph one word at a time
// 4. Reveal further content
export function LessonsLearnedIntroReveal() {
  // Keep in a state so we can
  const {
    setLessonsLearnedSubtitleScaleDownTl,
    resetLessonsLearnedSubtitleScaleDownTl,
  } = useAnimationStore();

  useLayoutEffect(() => {
    // Highlight the paragraph one word at a time to push people to read it as
    // they scroll and emphasize its importance
    const splitIntroParagraph = new SplitType(paragraphSelector, {
      types: 'words',
    });

    const gsapContext = gsap.context(() => {
      gsap.set(subtitleSelector, {
        transformOrigin: 'top left',
      });

      const subtitleRevealTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionSelector,
            start: 'top top',
            end: `+=100%`, // Scroll for one vh to reveal the subtitle
            scrub: true,
            pin: sectionSelector,
            // The docs seem to imply that this should be true by default, but it
            // doesn't seem to be the case
            pinSpacing: true,
          },
        })
        .from(`${subtitleSelector} > span`, {
          opacity: 0,
          // Reveal instantly without fade
          duration: 0.01,
          stagger: 1,
        })
        .from(`${subtitleSelector} > span`, {
          duration: 1,
        }); // add a bit of padding at the end of the timeline to leave users time to digest

      const subtitleScaleDownTl = gsap
        .timeline({
          defaults: { ease: Power1.easeOut },
          scrollTrigger: {
            start: () => subtitleRevealTl.scrollTrigger!.end,
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        })
        .from(subtitleSelector, {
          scale: 1.75,
          translateY: '300%',
          duration: 0.5,
          // Prevent paragraph from overflowing due to the added scale
          width: 'calc(100%/1.75)',
        })
        .to(
          // Change the color in a separate selector due to CSS specificity
          `${subtitleSelector} > span`,
          {
            color: textColorMainSubtle,
            duration: 0.5,
          },
          '<'
        )
        .from(
          splitIntroParagraph.words,
          {
            opacity: 0,
            delay: 0.25,
            duration: 0.5,
          },
          '<'
        );

      const introParagraphWordHighlightTween = gsap.to(
        splitIntroParagraph.words,
        {
          color: textColorMain,
          duration: 1,
          stagger: 1,
          scrollTrigger: {
            start: () => subtitleRevealTl.scrollTrigger!.end,
            end: `+=100%`, // Scroll for one vh to highlight intro paragraph
            scrub: true,
            pin: sectionSelector,
            pinSpacing: true,
          },
        }
      );

      const furtherContentRevealTL = gsap.timeline({
        scrollTrigger: {
          start: () => introParagraphWordHighlightTween.scrollTrigger!.end,
          toggleActions: 'play none none reverse',
        },
      });
      furtherContentRevealTL.from(
        `.${animationClasses.homeLessonsLearnedMainContent}`,
        {
          opacity: 0,
          duration: 0.25,
          stagger: 0.1,
        }
      );

      setLessonsLearnedSubtitleScaleDownTl(subtitleScaleDownTl);
    }); // <- Scope!

    // Add the 'lessons learned' nav target link to the pin spacer that gsap has
    // created around the lessons learned section. This will make sure the nav
    // links are highlighted properly and scroll to the expected location
    document
      .querySelector(
        `.pin-spacer:has(>#${animationIds.homeLessonsLearnedSection})`
      )
      ?.setAttribute('id', navIds.rocks['lessons-learned']);

    return () => {
      gsapContext.revert();
      splitIntroParagraph.revert();
      resetLessonsLearnedSubtitleScaleDownTl();
    };
  }, [
    setLessonsLearnedSubtitleScaleDownTl,
    resetLessonsLearnedSubtitleScaleDownTl,
  ]);

  return null;
}
