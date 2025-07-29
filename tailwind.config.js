/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { 
          dark: '#111827', 
          light: '#FFFFFF' 
        },
        secondary: { 
          dark: '#1F2937', 
          light: '#F9FAFB' 
        },
        accent: { 
          purple: '#8B5CF6', 
          teal: '#14B8A6' 
        },
        neutral: { 
          DEFAULT: '#6B7280', 
          light: '#D1D5DB' 
        },
      },
      fontFamily: { 
        sans: ['Inter', 'sans-serif'], 
        mono: ['JetBrains Mono', 'monospace'] 
      },
    },
  },
  plugins: [],
}