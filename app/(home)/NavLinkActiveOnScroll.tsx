'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useMemo } from 'react';
import { animationClasses, navIds } from '@/constants';
import { useMobileFirstBreakpoint } from '@/hooks/useMobileFirstBreakpoint';

// Scroll animation highlighting the nav link which is currently in view as the
// user scrolls
export function NavLinkActiveOnScroll({ desktopNav }: { desktopNav: boolean }) {
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
    // Prevent the animation from being initialized twice
    if ((isSmallScreen && desktopNav) || (!isSmallScreen && !desktopNav)) {
      return;
    }

    const gsapContext = gsap.context(() => {
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
    });

    return () => gsapContext.revert();
  }, [isSmallScreen, desktopNav]);

  return null;
}
