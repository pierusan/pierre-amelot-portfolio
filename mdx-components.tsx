import type { MDXComponents } from 'mdx/types';
import { cn } from '@/cn';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // MDX will be used for project pages so we tailor the components to them
  return {
    h1: ({ children, className, ...rest }) => (
      <h1
        className={cn(
          className,
          'col-span-full [&+p]:col-span-full',
          'text-heading-md md:text-heading-lg',
          'mb-8 md:mb-4',
          '[text-wrap:balance] [&+p]:[text-wrap:balance]'
        )}
        {...rest}
      >
        {children}
      </h1>
    ),
    h2: ({ children, className, ...rest }) => (
      // Add a bit of padding instead of only margin so the heading isn't too
      // high after clicking on the ToC and scrolling to the section
      <h2 className={cn(className, 'mt-16 pt-sm text-heading-md')} {...rest}>
        {children}
      </h2>
    ),
    a: ({ children, className, ...rest }) => (
      // Project links opened in a new tab by default
      <a
        {...rest}
        target="_blank"
        referrerPolicy="no-referrer"
        className={cn(className, 'underline')}
      >
        {children}
      </a>
    ),
    p: ({ children, className, ...rest }) => (
      <p
        className={cn(
          className,
          ' my-6 text-body-md',
          '[h1+&]:mb-16 [h1+&]:mt-0 [h1+&]:text-body-lg'
        )}
        {...rest}
      >
        {children}
      </p>
    ),
    em: ({ children, className, ...rest }) => (
      <em
        className={cn(className, 'font-normal not-italic text-main-strong')}
        {...rest}
      >
        {children}
      </em>
    ),
    ...components,
  };
}
