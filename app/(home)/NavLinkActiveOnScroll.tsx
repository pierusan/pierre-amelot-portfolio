'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { animationClasses, navIds } from '@/constants';

// Scroll animation highlighting the nav link which is currently in view as the
// user scrolls
export function NavLinkActiveOnScroll() {
  useLayoutEffect(() => {
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

      navLinks.forEach((navLink) => {
        const linkTargetSelector = navLink.getAttribute('href');
        if (!linkTargetSelector) {
          return;
        }

        ScrollTrigger.create({
          trigger: linkTargetSelector,
          start: 'top 60%',
          end: 'bottom 40%',
          id: linkTargetSelector,
          onToggle: (self) => {
            if (!self.isActive) {
              return;
            }

            // Highlight link when referenced element is in view
            navLinks.forEach((navLink) => {
              navLink.classList.remove('text-main');
            });
            navLink.classList.add('text-main');

            // Special treatment for projects. Because the nav link 'rocks'
            // overlap between the 'Lessons Learned' and the projects, we move
            // the highlighted one to the front so it's visible
            if (
              Object.values(navIds.rocks).includes(linkTargetSelector.slice(1))
            ) {
              projectNavLinksTargetElements.forEach((navLink) => {
                navLink.classList.remove('z-20');
                navLink.classList.add('z-10');
              });
              navLink.classList.remove('z-10');
              navLink.classList.add('z-20');
            }
          },
        });
      });
    });

    return () => gsapContext.revert();
  }, []);

  return null;
}
