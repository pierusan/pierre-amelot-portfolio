import { cn } from '@/lib/cn';

// Gradient bg going from top to bottom of the screen and not of the whole page
// to better see color progression on screen
export function FixedBackdrop({
  variant = 'main',
  className,
  id,
}: {
  id?: string;
  variant?: 'main' | 'strong';
  className?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        'fixed left-0 top-0 h-screen w-screen',
        'bg-gradient-to-b',
        { 'from-bg-main-start to-bg-main-stop': variant === 'main' },
        { 'from-bg-strong-start to-bg-strong-stop': variant === 'strong' },
        className
      )}
    />
  );
}
