import { type ReactNode } from 'react';
import { cn } from '@/cn';

export function Badge({
  variant = 'default',
  children,
}: {
  variant?: 'default' | 'strong';
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-sm  px-2xs py-3xs text-body-xs ',
        'whitespace-nowrap tracking-wide',
        variant === 'strong' && 'bg-surface text-main',
        variant === 'default' && 'bg-surface text-main-strong'
      )}
    >
      {children}
    </div>
  );
}
