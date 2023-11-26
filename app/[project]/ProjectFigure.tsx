import { type ReactNode } from 'react';
import { cn } from '@/cn';

export function ProjectFigure({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure
      className={cn(
        'mb-8 mt-9 w-full md:mb-14',
        'flex flex-col gap-[0.5rem]',
        '[&>*:first-child]:w-full'
      )}
    >
      {children}
      {caption && (
        <figcaption className="text-center text-details-md uppercase text-main-subtle">
          <p>{caption}</p>
        </figcaption>
      )}
    </figure>
  );
}
