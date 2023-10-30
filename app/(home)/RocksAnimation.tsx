'use client';

import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { animationIds } from '@/constants';

const nRocks = animationIds.homeProjects.length;

// Debug
// const rockStartYOffsets = Array.from<number>({ length: nRocks }).fill(0);
const rockStartYOffsets = Array.from<number>({ length: nRocks }).fill(5);

export function RocksAnimation() {
  const { camera, scene } = useThree();

  useLayoutEffect(() => {
    const gsapContext = gsap.context(() => {
      animationIds.homeProjects.forEach(
        ({ card: cardId, rock: rockName }, index) => {
          const rockObject = scene.getObjectByName(rockName);

          if (!rockObject) {
            return;
          }

          const rockEndY = rockObject.position.y;
          const rockStartY = rockEndY + rockStartYOffsets[index];

          gsap.set(rockObject.position, { y: rockStartY });

          ScrollTrigger.create({
            trigger: `#${cardId}`,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: rockDrop,
            onLeave: undefined,
            onEnterBack: undefined,
            onLeaveBack: rockDrop,
          });

          let animClosure: gsap.core.Tween | undefined;
          function rockDrop(st: ScrollTrigger) {
            const forward = st.direction > 0;
            animClosure?.kill();

            if (!rockObject) {
              return;
            }

            animClosure = gsap.to(rockObject.position, {
              y: forward ? rockEndY : rockStartY,
              ease: forward ? Power3.easeOut : Power3.easeOut,
              duration: forward ? 1 : 2,
            });
          }
        }
      );
    });

    return () => {
      gsapContext.revert();
    };
  }, [camera, scene]);

  return null;
}
