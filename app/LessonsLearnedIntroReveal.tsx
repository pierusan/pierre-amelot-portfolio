'use client';

import SplitType from 'split-type';
import { gsap } from 'gsap';
import resolveConfig from 'tailwindcss/resolveConfig';
import { type RecursiveKeyValuePair } from 'tailwindcss/types/config';
import { useLayoutEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { animationClasses } from '@/lib/constants';
import tailwindConfig from '@/tailwind.config';

const textColors = resolveConfig(tailwindConfig).theme?.textColor;
const textColorMain =
  ((textColors?.main as RecursiveKeyValuePair<string, string>)
    ?.DEFAULT as string) ?? 'white';

export function LessonsLearnedIntroReveal() {
  const paragraphRef = useRef<HTMLElementTagNameMap['p'] | null>(null);

  // Reveal the paragraph one word at a time to push people to read it as they
  // scroll and emphasize its importance
  useLayoutEffect(() => {
    if (!paragraphRef.current || !paragraphRef.current.parentElement) return;

    const splitParagraph = new SplitType(paragraphRef.current, {
      types: 'words',
    });

    const gsapContext = gsap.context(() => {
      const paragraphPinningTl = gsap.timeline({
        scrollTrigger: {
          trigger: paragraphRef.current?.parentElement,
          start: 'top top',
          end: `+=100%`, // Scroll for one vh
          scrub: true,
          pin: paragraphRef.current?.parentElement,
          // The docs seem to imply that this should be true by default, but it
          // doesn't seem to be the case
          pinSpacing: true,
        },
      });

      splitParagraph.words?.forEach((word) => {
        paragraphPinningTl.to(word, {
          duration: 1,
          color: textColorMain,
        });
      });

      const contentRevealTL = gsap.timeline({
        scrollTrigger: {
          trigger: paragraphRef.current?.parentElement,
          start: 'top -1%',
          toggleActions: 'play none none reverse',
        },
      });

      contentRevealTL.from(`.${animationClasses.homeLessonsLearnedToReveal}`, {
        opacity: 0,
        duration: 0.25,
        stagger: 0.1,
      });
    }, paragraphRef.current.parentElement); // <- Scope!

    return () => {
      gsapContext.revert();
      splitParagraph.revert();
    };
  }, []);

  return (
    <p ref={paragraphRef} className={cn('text-body-lg text-main-subtle')}>
      As my career progressed, so did my approach to technical issues, product
      creation, and team dynamics. Here are some of my takeaways over the years
    </p>
  );
}
