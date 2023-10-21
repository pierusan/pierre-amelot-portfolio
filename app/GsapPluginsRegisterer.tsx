'use client';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

export function GsapPluginsRegisterer() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: Linear.easeIn });
  }, []);
  return null;
}
