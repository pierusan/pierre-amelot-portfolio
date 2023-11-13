import { type ReactNode } from 'react';
import { cn } from '@/cn';

// TODO: Move back to just root since we're not using for projects anymore
export function MainContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <main
      className={cn(
        'px-md md:px-xl xl:px-[clamp(theme(padding.xl),11.875vw,theme(padding.2xl))]',
        className
      )}
    >
      {children}
    </main>
  );
}
