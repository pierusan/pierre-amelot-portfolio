import { cn } from '@/cn';
import { svgIds } from '@/constants';

// To give glass effect to other elements with CSS:
// filter: url(#`${svgIds.noiseFilter}`);
export function NoiseFilter() {
  return (
    <span
      className={cn(
        'absolute m-[-1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap border-0 p-0'
      )}
      style={{ clip: 'rect(0px, 0px, 0px, 0px)', overflowWrap: 'normal' }}
    >
      <svg aria-hidden="true">
        <filter id={svgIds.noiseFilter}>
          <feTurbulence
            type="fractalNoise"
            // We keep baseFrequency and numOctaves low because it seems to be
            // too computationally expensive on mobile and the texture isn't
            // fully rendered
            baseFrequency="1.09"
            numOctaves="1"
            stitchTiles="stitch"
          ></feTurbulence>
        </filter>
      </svg>
    </span>
  );
}
