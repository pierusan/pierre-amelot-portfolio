import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    future: {
      // Only apply hover styles on devices that support it. Forces better usage
      // of hover interactions on touch devices.
      // https://github.com/tailwindlabs/tailwindcss/pull/8394
      hoverOnlyWhenSupported: true,
    },
    extend: {
      fontFamily: {
        mono: ['var(--font-space-mono)'],
      },
    },
  },
  plugins: [],
};
export default config;
