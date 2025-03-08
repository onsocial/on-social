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
    './src/server/**/*.{js,jsx,ts,tsx,mdx}',
    './src/store/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ffffff',
          text: '#20252b',
          inactive: '#cccccc', 
        },
        dark: {
          background: '#20252b',
          text: '#ffffff',
          inactive: '#888888',
        },
      },
    },
  },
  darkMode: 'class', 
};

export default config;
