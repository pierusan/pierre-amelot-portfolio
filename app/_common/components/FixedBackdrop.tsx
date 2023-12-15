import { cn } from '@/cn';

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
      className={cn('fixed left-0 top-0 h-screen w-screen', className)}
    >
      <div
        className={cn('absolute inset-0 ', {
          'bg-[hsl(var(--backdrop-hue),var(--backdrop-saturation),var(--backdrop-value-xs))]':
            variant === 'main',
          'bg-[hsl(var(--backdrop-hue),var(--backdrop-saturation),var(--backdrop-value-sm))]':
            variant === 'strong',
        })}
      />
      {/* Radial light coming from top center */}
      <div
        className={cn('absolute inset-0')}
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% -20%,hsla(var(--backdrop-hue),var(--backdrop-saturation),var(--backdrop-value-xl),1),hsla(var(--backdrop-hue),61%,var(--backdrop-value-xl),0))',
        }}
      />
    </div>
  );
}
