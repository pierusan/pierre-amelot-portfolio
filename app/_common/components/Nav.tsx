import { type ComponentProps, type ReactNode } from 'react';
import Link from 'next/link';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from './Popover';
import { Icon } from './Icon';
import { cn } from '@/cn';

export function DesktopVerticalLink({
  linkName,
  className,
  href,
}: {
  linkName: string;
  className?: string;
  href: ComponentProps<typeof Link>['href'];
}) {
  return (
    <Link
      className={cn(
        'rotate-180 p-md uppercase [writing-mode:vertical-lr]',
        'transition-colors hover:text-main active:text-main-strong',
        className
      )}
      href={href}
    >
      {linkName}
    </Link>
  );
}

export function DesktopLeftNav({
  children,
  className,
  id,
}: {
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <nav
      id={id}
      className={cn(
        'hidden md:block',
        'fixed top-0 h-screen',
        'text-details-xl text-main-subtle',
        className
      )}
    >
      {children}
    </nav>
  );
}

export function MobileNavPopover({
  triggerClassName,
  className,
  children,
}: {
  triggerClassName?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <nav>
      <Popover>
        <PopoverTrigger
          className={cn(
            'fixed -right-[1px] bottom-[20vh]',
            'rounded-l-sm p-3xs',
            'border border-action-subtle bg-[theme(gradientColorStops.bg-main-stop)]',
            'text-main-subtle',
            triggerClassName
          )}
        >
          <Icon name="toc" size="1.25rem" />
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'border-action-subtle bg-[theme(gradientColorStops.bg-main-stop)]',
            className
          )}
          sideOffset={2}
          side="left"
        >
          {/* Close popover when any of the links inside is clicked */}
          <PopoverClose
            className={cn(
              'px-sm py-2xs',
              'text-body-md',
              'text-main-subtle [&_li]:text-left',
              '[&_a:active]:text-main-strong [&_a:hover]:text-main [&_a:hover]:transition-colors',
              // Only register clicks to close the popover on the links
              'pointer-events-none [&_a]:pointer-events-auto'
            )}
          >
            {children}
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
