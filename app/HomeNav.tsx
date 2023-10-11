import RocksStackSVG from './svgs/RocksStack.svg';
import { cn } from '@/lib/cn';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { Icon } from '@/components/Icon';

export function DesktopHomeNav({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  return (
    <nav
      id={id}
      className={cn(
        'hidden md:block',
        'fixed top-0 h-screen',
        'text-details-xl uppercase',
        className
      )}
    >
      <ol className="flex h-full flex-col items-center justify-between">
        <li className="rotate-180 p-md [writing-mode:vertical-lr]">Intro</li>
        <li className="[&>svg>path]:[stroke:theme(textColor.main.subtle)]">
          <RocksStackSVG />
        </li>
        <li className="rotate-180 p-md text-main-subtle [writing-mode:vertical-lr]">
          About
        </li>
      </ol>
    </nav>
  );
}

export function MobileHomeNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn('md:hidden', 'fixed -right-[1px] bottom-[20vh]', className)}
    >
      <Popover>
        <PopoverTrigger className="rounded-l-sm border border-action-subtle p-3xs text-main-subtle">
          <Icon name="toc" size="1.5rem" />
        </PopoverTrigger>
        {/* TODO: Replace with actual ToC */}
        <PopoverContent className="bg-main p-2xs" sideOffset={2} side="left">
          This is just a placeholder
        </PopoverContent>
      </Popover>
    </nav>
  );
}

export function DesktopBackToTopButton({ className }: { className?: string }) {
  return (
    <nav className={cn('hidden md:flex', 'fixed top-0', 'p-md', className)}>
      <Icon name="arrowUp" size="2rem" />
    </nav>
  );
}
