// eslint-disable-next-line no-restricted-imports
import './globals.css';
import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import { type ReactNode } from 'react';
import { AsciiArtLog } from './AsciiArtLog';
import { NoiseFilter } from './(home)/NoiseFilter';
import { cn } from '@/cn';
import { remoteImages } from '@/components/RemoteMedia/RemoteImage';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  // Prefer no font than a wrong font.
  // TODO: Might want to change this to follow best practices
  display: 'block',
});

const openGraphImage = remoteImages['opengraph-image'];
export const metadata: Metadata = {
  title: 'Pierre Amelot',
  description: "Pierre Amelot's Portfolio",
  openGraph: {
    title: "Pierre Amelot's Portfolio",
    description:
      "Read about Pierre's skills in development and UX, the projects he worked on, his personality, and the lessons he learnt over the years.",
    url: 'https://www.pierreamelot.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: openGraphImage.src,
        width: openGraphImage.width,
        height: openGraphImage.height,
      },
    ],
  },
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
        <AsciiArtLog />
        {children}
        <NoiseFilter />
      </body>
    </html>
  );
}
