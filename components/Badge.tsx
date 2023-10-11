import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Badge({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-sm bg-main px-2xs py-3xs text-body-xs text-main-strong',
        'whitespace-nowrap tracking-wide'
      )}
    >
      {children}
    </div>
  );
}
