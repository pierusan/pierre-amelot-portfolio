import { cn } from '@/cn';
import { Icon } from '@/components/Icon';

export function SchoolProjectsFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        'absolute bottom-0 right-0 flex items-end gap-xs p-md text-main-subtle',
        className
      )}
    >
      <p className={cn('inline')}>
        Interested in my school projects?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          className={cn('underline transition-colors hover:text-main')}
          href="https://v1.pierreamelot.com"
        >
          v1.pierreamelot.com
        </a>
      </p>
      <Icon className={cn('inline')} name="school" size="1.25em" />
    </footer>
  );
}
