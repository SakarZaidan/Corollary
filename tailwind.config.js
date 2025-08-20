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
          dark: '#0F172A', 
          main: '#1E293B',
          light: '#334155' 
        },
        secondary: { 
          dark: '#1A1A2E', 
          main: '#16213E',
          light: '#0F3460' 
        },
        accent: { 
          purple: '#8B5CF6', 
          teal: '#14B8A6',
          blue: '#3B82F6',
          pink: '#EC4899' 
        },
        neutral: { 
          dark: '#1F2937',
          main: '#4B5563',
          light: '#9CA3AF',
          lightest: '#F3F4F6'
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: { 
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'], 
        mono: ['Fira Code', 'Roboto Mono', 'monospace'] 
      },
      fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',     // 2px
        DEFAULT: '0.25rem',  // 4px
        md: '0.375rem',     // 6px
        lg: '0.5rem',       // 8px
        xl: '0.75rem',      // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
        full: '9999px',     // Circle
      },
    },
  },
  plugins: [],
}