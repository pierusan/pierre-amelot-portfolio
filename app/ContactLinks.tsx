import { type ComponentProps } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';

function LinksList({
  id,
  className,
  iconsSize,
}: {
  className?: string;
  id?: string;
  iconsSize: ComponentProps<typeof Icon>['size'];
}) {
  return (
    <ol
      id={id}
      className={cn(
        'uppercase [&_li:hover]:text-main [&_li]:transition-colors',
        className
      )}
    >
      <li>
        <a
          href="https://storage.googleapis.com/pierre-portfolio-assets/pierre-portfolio-v2/2023_08_Pierre_Amelot.pdf"
          target="_blank"
          rel="noreferrer"
          // If ever want to switch copy to "Resume"
          // className="before:content-['CV'] sm:before:content-['Resume']"
        >
          CV
        </a>
      </li>
      <li>
        <a href="https://github.com/Bierro" target="_blank" rel="noreferrer">
          <Icon name="github" size={iconsSize} />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/pierre-amelot-ba6a77107/"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="linkedin" size={iconsSize} />
        </a>
      </li>
    </ol>
  );
}

export function MobileContactLinks({ className }: { className?: string }) {
  return (
    <header
      aria-label="Contact links"
      className={cn(
        'md:hidden',
        'sticky top-0 h-[4.5rem]',
        'border-b-[1px] border-b-action-subtle bg-[theme(gradientColorStops.bg-main-stop)] ',
        'flex items-center justify-between px-md',
        'text-details-lg',
        className
      )}
    >
      <p className="whitespace-nowrap text-heading-xs">Pierre Amelot</p>
      <LinksList
        className={cn(
          'flex items-center gap-sm',
          'text-details-xl text-main-subtle'
        )}
        iconsSize={'1.25rem'}
      />
    </header>
  );
}

export function DesktopContactLinks({
  fixedSectionClassName,
  className,
  variant = 'subtle',
}: {
  fixedSectionClassName?: string;
  className?: string;
  variant?: 'subtle' | 'strong';
}) {
  return (
    <section
      aria-label="Contact links"
      className={cn(
        'hidden md:block',
        // Position contact links to the top right of the screen but still
        // within the bounds of the body. We use absolute positioning to align
        // right with the body, and then position fixed for the links list so it
        // stays as the top of the viewport
        'absolute right-0 text-details-xl',
        { 'text-main-subtle [&_li:hover]:text-main': variant === 'subtle' },
        { 'text-main [&_li:hover]:text-main-strong': variant === 'strong' },
        className
      )}
    >
      {/* This is the one which will be moved up when the curtain is drawn */}
      <LinksList
        className={cn(
          'fixed -translate-x-full p-md',
          'flex flex-col items-end gap-sm',
          fixedSectionClassName
        )}
        iconsSize={'1.5rem'}
      />
    </section>
  );
}
