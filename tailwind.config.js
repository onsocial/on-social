/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.tsx", // Explicitly include App.tsx if it's at the root
    "./index.ts", // Add index.tsx if needed
    "./app/**/*.{js,jsx,ts,tsx}", // Match files in app folder
    "./src/**/*.{js,jsx,ts,tsx}", // Include src directory if you have one
  ],
  presets: [require("nativewind/preset")], // Enable NativeWind preset
  theme: {
    extend: {
      // Add custom theme configuration if needed, e.g., colors, spacing, etc.
    },
  },
  plugins: [],
}
