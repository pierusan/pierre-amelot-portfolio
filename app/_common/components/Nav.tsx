import { type ComponentProps, type ReactNode } from 'react';
import Link from 'next/link';
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
