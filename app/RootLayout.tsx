import './globals.css';
import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import { type ReactNode } from 'react';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  // Prefer no font than a wrong font. TODO: Might want to change this to follow
  // best practices
  display: 'block',
});

export const metadata: Metadata = {
  title: 'Pierre Amelot',
  description: 'Portfolio of Pierre Amelot',
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body className={'font-mono'}>{children}</body>
    </html>
  );
}
