// eslint-disable-next-line no-restricted-imports
import './globals.css';
import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import Script from 'next/script';
import { type ReactNode } from 'react';
import { AsciiArtLog } from './AsciiArtLog';
import { NoiseFilter } from './(home)/NoiseFilter';
import { cn } from '@/cn';
import { remoteImages } from '@/components/RemoteMedia/RemoteImage';

const vercelEnvironment = process.env.VERCEL_ENV;
const isProduction = vercelEnvironment === 'production';
const isPreview = vercelEnvironment === 'preview';

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
        url: new URL(openGraphImage.src),
        width: openGraphImage.width,
        height: openGraphImage.height,
      },
    ],
  },
  // This apparently is only used in development, and is needed to remove the
  // annoying Next.js warning
  // https://github.com/vercel/next.js/discussions/57251
  metadataBase: new URL('http://localhost:3000/'),
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
      {/* TODO: Remove isPreview when analytics events have been set */}
      {(isProduction || isPreview) && (
        <Script
          async
          src="/stats/script.js"
          data-website-id="817aa10d-c906-457c-9e34-5625c31661be"
        />
      )}
    </html>
  );
}
