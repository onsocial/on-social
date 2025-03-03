import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx,mdx}',
    './src/screens/**/*.{js,jsx,ts,tsx,mdx}',
    './src/hooks/**/*.{js,jsx,ts,tsx,mdx}',
    './src/contexts/**/*.{js,jsx,ts,tsx,mdx}',
    './src/navigation/**/*.{js,jsx,ts,tsx,mdx}',
    './src/services/**/*.{js,jsx,ts,tsx,mdx}',
    './src/assets/**/*.{js,jsx,ts,tsx,mdx}',
    './src/utils/**/*.{js,jsx,ts,tsx,mdx}',
    './src/styles/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ffffff',
          text: '#20252b',
        },
        dark: {
          background: '#20252b',
          text: '#ffffff',
        },
      },
      fontFamily: {
        light: 'PublicSans_300Light',
        regular: 'PublicSans_400Regular',
        semiBold: 'PublicSans_600SemiBold',
        bold: 'PublicSans_700Bold',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
      },
    },
  },
  darkMode: 'class', // Enable dark mode using class-based approach
  plugins: [],
};

export default config;
