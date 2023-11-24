'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { animationClasses, navIds } from '@/constants';

// Scroll animation highlighting the nav link which is currently in view as the
// user scrolls
export function registerToCHighlightAnimation() {
  const navLinks: HTMLElementTagNameMap['a'][] = gsap.utils.toArray(
    `.${animationClasses.navHighlightedOnScroll} a`
  );

  const projectNavLinksTargetElements = navLinks.filter((navLink) => {
    const linkTargetElementId = navLink.getAttribute('href')?.slice(1);

    if (!linkTargetElementId) {
      return false;
    }

    return Object.values(navIds.rocks).includes(linkTargetElementId);
  });

  // Handle the case where there are multiple nav links pointing to the same
  // target element (here mobile nav and desktop nav both in the DOM)

  // eslint-disable-next-line unicorn/no-array-reduce
  const selectorsAndLinks = navLinks.reduce<
    Record<string, HTMLAnchorElement[]>
  >((accumulator, navLink) => {
    const linkTargetSelector = navLink.getAttribute('href');
    if (!linkTargetSelector) {
      return accumulator;
    }

    if (accumulator[linkTargetSelector]) {
      accumulator[linkTargetSelector].push(navLink);
    } else {
      accumulator[linkTargetSelector] = [navLink];
    }

    return accumulator;
  }, {});

  Object.entries(selectorsAndLinks).forEach(
    ([selector, navLinksToHighlight]) => {
      ScrollTrigger.create({
        trigger: selector,
        start: 'top 60%',
        end: 'bottom 40%',
        id: selector,
        onToggle: (self) => {
          if (!self.isActive) {
            return;
          }

          // Highlight link when referenced element is in view
          navLinks.forEach((navLink) => {
            navLink.classList.remove('text-main');
          });
          navLinksToHighlight.forEach((navLink) => {
            navLink.classList.add('text-main');
          });

          // Special treatment for projects. Because the nav link 'rocks'
          // overlap between the 'Lessons Learned' and the projects, we move
          // the highlighted one to the front so it's visible
          if (Object.values(navIds.rocks).includes(selector.slice(1))) {
            projectNavLinksTargetElements.forEach((navLink) => {
              navLink.classList.remove('z-20');
              navLink.classList.add('z-10');
            });
            navLinksToHighlight.forEach((navLink) => {
              navLink.classList.remove('z-10');
              navLink.classList.add('z-20');
            });
          }
        },
      });
    }
  );
}

// This will be used on mobile inside the ToC popover. Until the Popover is
// clicked, the ToC is not in the DOM so we can't initialize the animation just
// yet
export function ToCHighlighter() {
  useLayoutEffect(() => {
    const gsapContext = gsap.context(() => {
      registerToCHighlightAnimation();
    });

    return () => gsapContext.revert();
  }, []);

  return null;
}
