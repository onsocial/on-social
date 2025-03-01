/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./index.ts",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/screens/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/hooks/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/contexts/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/navigation/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/services/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
