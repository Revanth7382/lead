/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode via class strategy (required for your toggle)
  darkMode: 'class',

  // Scan all your component files for Tailwind classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // ----- Custom animations used across the app -----
      keyframes: {
        // Fade + scale – perfect for DarkModeToggle icon swap
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        // Slide in from top – used for form validation errors
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Modal entrance – smooth scale + fade
        modalEnter: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        slideIn: 'slideIn 0.2s ease-out',
        modalEnter: 'modalEnter 0.25s ease-out',
      },
    },
  },

  // No extra plugins are required, but you can add them if needed
  plugins: [],
};