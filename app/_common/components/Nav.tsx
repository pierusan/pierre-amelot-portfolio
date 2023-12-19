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
  const classNames = cn(
    'rotate-180 p-md uppercase [writing-mode:vertical-lr]',
    'transition-colors hover:text-main active:text-main-strong',
    className
  );

  // When the link is just a page fragment to scroll to, no need to prefetch the
  // page and use next/link, which would also cause an umami page view tracking
  // event which we don't want
  if (href.toString().startsWith('#')) {
    return (
      <a
        className={classNames}
        href={href.toString()}
        data-umami-event={`Scroll to ${linkName}`}
      >
        {linkName}
      </a>
    );
  }

  return (
    <Link className={classNames} href={href}>
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
            'border border-action-subtle bg-[hsl(var(--backdrop-hue),var(--backdrop-saturation),var(--backdrop-value-xs))]',
            'text-main-subtle',
            triggerClassName
          )}
        >
          <Icon name="toc" size="1.25em" />
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'border-action-subtle bg-[hsl(var(--backdrop-hue),var(--backdrop-saturation),var(--backdrop-value-sm))]',
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
            tabIndex={-1}
          >
            {children}
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
