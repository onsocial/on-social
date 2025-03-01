import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './App.tsx',
    './index.ts',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx,mdx}',
    './src/screens/**/*.{js,jsx,ts,tsx,mdx}',
    './src/hooks/**/*.{js,jsx,ts,tsx,mdx}',
    './src/contexts/**/*.{js,jsx,ts,tsx,mdx}',
    './src/navigation/**/*.{js,jsx,ts,tsx,mdx}',
    './src/services/**/*.{js,jsx,ts,tsx,mdx}',
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
    },
  },
  darkMode: 'class', // Enable dark mode using class-based approach
  plugins: [],
};

export default config;
