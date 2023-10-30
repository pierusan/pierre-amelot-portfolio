// eslint-disable-next-line no-restricted-imports
import './globals.css';
import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  // Prefer no font than a wrong font.
  // TODO: Might want to change this to follow best practices
  display: 'block',
});

export const metadata: Metadata = {
  title: 'Pierre Amelot',
  description: 'Portfolio of Pierre Amelot',
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body
        className={cn(
          // Add max width for body and center the content on very large screens
          'relative mx-auto max-w-[theme(screens.2xl)]',
          'font-mono text-body-md text-main'
        )}
      >
        {children}
      </body>
    </html>
  );
}
