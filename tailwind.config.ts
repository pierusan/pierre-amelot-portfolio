import type { Config } from 'tailwindcss';
import defaultThemeColors from 'tailwindcss/colors';

const primitiveColors = {
  teal: {
    ...defaultThemeColors.teal,
    950: '#0D3533',
  },
  slate: {
    ...defaultThemeColors.slate,
  },
};

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
    screens: {
      sm: '460px',
      md: '800px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '2000px',
    },
    textColor: {
      main: {
        DEFAULT: primitiveColors.slate[300],
        strong: primitiveColors.teal[400],
        subtle: primitiveColors.teal[700],
      },
    },
    backgroundColor: {
      main: {
        DEFAULT: primitiveColors.teal[950],
      },
      surface: {
        DEFAULT: primitiveColors.teal[900],
      },
      highlight: {
        DEFAULT: primitiveColors.teal[700],
      },
      action: {
        subtle: {
          DEFAULT: primitiveColors.teal[950],
          hover: '#0b2c2a', //TODO: Use primitive?
        },
      },
    },
    borderColor: {
      action: {
        DEFAULT: primitiveColors.teal[400],
        subtle: {
          DEFAULT: primitiveColors.teal[700],
          hover: primitiveColors.teal[500],
        },
      },
    },

    colors: {
      // Force ourselves to use semantic colors
      // ...primitiveColors,
    },
    borderRadius: {
      sm: '0.25rem', // 4px
      md: '0.5rem', // 8px
      full: '9999px',
    },
    padding: {
      '0': '0',
      '3xs': '0.25rem', // 4px
      '2xs': '0.5rem', // 8px
      sm: '1rem', // 16px
      md: '2rem', // 32px
      xl: '9.5rem', // 152px pour 1280px
      '2xl': '12.5rem', // 200px pour 1280px
    },
    // TODO: Revert to defaults for sizing?
    gap: {
      '0': '0',
      '3xs': '0.25rem', // 4px
      xs: '0.75rem', // 12px
      sm: '1rem', // 16px
      md: '1.25rem', // 20px
      lg: '1.75rem', // 28px
      '2xl': '5.5rem', // 88px
      '3xl': '7.5rem', // 120px
    },
    // TODO: Switch to ch units?
    width: {
      'paragraph-md': '45rem',
      'paragraph-min': '37.5rem',
      'aside-md': '22.5rem',
      'aside-sm': '18.5rem',
      screen: '100vw',
      full: '100%',
    },
    maxWidth: ({ theme }) => ({
      ...theme('width'),
    }),
    minWidth: ({ theme }) => ({
      ...theme('width'),
    }),
    gradientColorStops: {
      'bg-main-start': '#0C312F',
      // 'bg-main-stop': '#092523', // Original
      'bg-main-stop': '#051513',
      'bg-strong-start': '#0E4E4A',
      'bg-strong-stop': '#093431',
    },
    fontSize: {
      'heading-lg': [
        '3.125rem', // 50px
        { letterSpacing: '0.3125rem', lineHeight: 'normal' },
      ],
      'heading-md': ['2.375rem', { lineHeight: 'normal' }], // 38px
      'heading-sm': ['1.75rem', { lineHeight: 'normal' }], // 28px
      'heading-xs': ['1.25rem', { lineHeight: 'normal' }], // 20px
      'body-lg': ['1.25rem', { lineHeight: 'normal' }], // 20px
      'body-md': ['1rem', { lineHeight: 'normal' }], // 16px
      'body-sm': ['0.75rem', { lineHeight: 'normal' }], // 12px
      'body-xs': ['0.625rem', { lineHeight: 'normal' }], // 10px
      'details-xl': ['1.25rem', { lineHeight: 'normal' }], // 20px
      'details-md': ['0.75rem', { lineHeight: 'normal' }], // 12px
    },
    // From shadcn?
    darkMode: ['class'],
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        mono: ['var(--font-space-mono)'],
      },
      fontWeight: {
        'details-light': '400',
        details: '700',
      },
      height: {
        'header-mobile': '4.5rem',
      },
      // From shadcn?
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [require('tailwindcss-animate')],
};
export default config;
