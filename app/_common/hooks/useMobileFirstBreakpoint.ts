import resolveConfig from 'tailwindcss/resolveConfig';
import { useEffect, useState } from 'react';
import tailwindConfig from '@configs/tailwind.config';

const breakpoints = resolveConfig(tailwindConfig).theme.screens;

type MobileFirstBreakpoint = keyof typeof breakpoints | '0';

function getCurrentMobileFirstBreakpoint(): MobileFirstBreakpoint {
  // Sort breakpoints by size
  const sortedBreakpoints = Object.entries(breakpoints)
    .sort(([, a], [, b]) => Number.parseInt(a) - Number.parseInt(b))
    .reverse();

  for (const [breakpoint, size] of sortedBreakpoints) {
    if (window.matchMedia(`(min-width: ${size})`).matches) {
      return breakpoint as MobileFirstBreakpoint;
    }
  }

  return '0';
}

export function useMobileFirstBreakpoint() {
  // Assume like CSS that we start with the smallest breakpoint
  const [breakpoint, setBreakpoint] = useState<MobileFirstBreakpoint>('0');

  useEffect(() => {
    setBreakpoint(getCurrentMobileFirstBreakpoint());

    const handleWindowResize = () => {
      setBreakpoint(getCurrentMobileFirstBreakpoint());
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return breakpoint;
}
