import { gsap } from 'gsap';
import { animationIds } from '@/constants';

export function registerCardsEntranceAnimation() {
  animationIds.homeProjects.forEach(({ card: cardId }) => {
    gsap.from(`#${cardId}`, {
      opacity: 0.5,
      scale: 0.9,
      scrollTrigger: {
        trigger: `#${cardId}`,
        start: 'top bottom',
        end: '40% bottom',
        scrub: true,
      },
    });
  });
}
