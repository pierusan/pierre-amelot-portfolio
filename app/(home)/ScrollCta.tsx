'use client';

import { useState, useRef, useEffect } from 'react';
import scrollCtaStyles from './scrollCtaAnimations.module.css';
import { cn } from '@/cn';

function AnimatedDownArrow({
  scale = 1,
  className,
}: {
  scale?: number;
  className?: string;
}) {
  return (
    <svg
      className={cn(scrollCtaStyles['animated-arrow'], className)}
      width={`${15 * scale}`}
      height={`${31 * scale}`}
      viewBox="0 0 15 31"
      fill="none"
      stroke="currentColor"
      strokeWidth={1 / scale}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.5 0v1" />
      <path d="M14.5 -7L7.5 0L0.5 -7" />
    </svg>
  );
}

export function ScrollCta() {
  // Assume we need the scroll CTA, but hide it if it's not visible when it
  // loads because that means the intro text is relatively long and almost
  // cropped by the viewport, which is already enough of a CTA to scroll
  const [needsScrollCta, setNeedsScrollCta] = useState(true);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const observer = new IntersectionObserver(([entry], observer) => {
      setNeedsScrollCta(entry.isIntersecting);
      observer.disconnect();
    });

    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    needsScrollCta && (
      <div
        ref={ctaRef}
        className={cn(
          'self-center',
          'w-[min(30rem,80%)] sm:w-[min(60rem,100%)]',
          'flex items-center pb-sm text-body-md text-main-subtle',
          scrollCtaStyles['scroll-cta'] // fade-in
        )}
      >
        <AnimatedDownArrow scale={0.75} className={cn('shrink-0')} />
        <p className={cn('grow text-center text-[0.875rem]')}>
          Don&apos;t miss the rest
        </p>
        <AnimatedDownArrow scale={0.75} className={cn('shrink-0')} />
        <p
          className={cn('hidden sm:block', 'grow text-center text-[0.875rem]')}
        >
          Scroll for more
        </p>
        <AnimatedDownArrow
          scale={0.75}
          className={cn('hidden sm:block', 'shrink-0')}
        />
      </div>
    )
  );
}
