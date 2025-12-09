/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        // Shree Hari Agritech Brand Colors (from brand flyer)
        primary: {
          DEFAULT: '#116530',      // Deep Green - main brand color
          dark: '#0d4d26',         // Darker green for hover states
          light: '#1a7a3d',        // Lighter green variant
          lighter: '#2d9a5a',      // Even lighter for subtle accents
        },
        accent: {
          DEFAULT: '#D4A017',      // Mustard Yellow - from logo leaf
          dark: '#b88714',         // Darker mustard for hover
          light: '#e6b530',       // Lighter mustard variant
          lighter: '#f0c85a',     // Very light mustard for backgrounds
        },
        // Brand grey tones (matching "AGRITECH" text color)
        brand: {
          grey: '#6b7280',        // Grey for secondary text
          greyLight: '#9ca3af',   // Lighter grey
          greyDark: '#4b5563',    // Darker grey
        },
      },
    },
  },
  plugins: [],
}

