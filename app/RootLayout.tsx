import './globals.css';
import { type ReactNode } from 'react';

export const metadata: Metadata = {};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
