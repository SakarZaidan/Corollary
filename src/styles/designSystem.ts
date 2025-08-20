/**
 * Design System for Corollary
 * 
 * This file contains design tokens, theme configuration, and utility functions
 * to maintain consistent styling across the application.
 */

// Color Palette
export const colors = {
  // Primary colors
  primary: {
    dark: '#0F172A',    // Deep blue background
    main: '#1E293B',    // Main blue
    light: '#334155',   // Lighter blue
  },
  
  // Secondary colors
  secondary: {
    dark: '#1A1A2E',    // Deep navy background
    main: '#16213E',    // Navy blue
    light: '#0F3460',   // Lighter navy
  },
  
  // Accent colors
  accent: {
    purple: '#8B5CF6',  // Vibrant purple
    teal: '#14B8A6',    // Teal
    blue: '#3B82F6',    // Blue
    pink: '#EC4899',    // Pink
  },
  
  // Neutral colors
  neutral: {
    dark: '#1F2937',    // Dark gray
    main: '#4B5563',    // Medium gray
    light: '#9CA3AF',   // Light gray
    lightest: '#F3F4F6', // Almost white
  },
  
  // Semantic colors
  success: '#10B981',   // Green
  warning: '#F59E0B',   // Amber
  error: '#EF4444',     // Red
  info: '#3B82F6',      // Blue
};

// Typography
export const typography = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"Fira Code", "Roboto Mono", monospace',
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
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Spacing
export const spacing = {
  0: '0',
  0.5: '0.125rem',      // 2px
  1: '0.25rem',         // 4px
  1.5: '0.375rem',      // 6px
  2: '0.5rem',          // 8px
  2.5: '0.625rem',      // 10px
  3: '0.75rem',         // 12px
  3.5: '0.875rem',      // 14px
  4: '1rem',            // 16px
  5: '1.25rem',         // 20px
  6: '1.5rem',          // 24px
  7: '1.75rem',         // 28px
  8: '2rem',            // 32px
  9: '2.25rem',         // 36px
  10: '2.5rem',         // 40px
  11: '2.75rem',        // 44px
  12: '3rem',           // 48px
  14: '3.5rem',         // 56px
  16: '4rem',           // 64px
  20: '5rem',           // 80px
  24: '6rem',           // 96px
  28: '7rem',           // 112px
  32: '8rem',           // 128px
  36: '9rem',           // 144px
  40: '10rem',          // 160px
  44: '11rem',          // 176px
  48: '12rem',          // 192px
  52: '13rem',          // 208px
  56: '14rem',          // 224px
  60: '15rem',          // 240px
  64: '16rem',          // 256px
  72: '18rem',          // 288px
  80: '20rem',          // 320px
  96: '24rem',          // 384px
};

// Borders
export const borders = {
  radius: {
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
  width: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  // Glow effects
  'glow-sm': '0 0 5px rgba(139, 92, 246, 0.5)',  // Purple glow
  'glow-md': '0 0 15px rgba(139, 92, 246, 0.5)', // Medium purple glow
  'glow-lg': '0 0 25px rgba(139, 92, 246, 0.5)', // Large purple glow
  'glow-teal': '0 0 15px rgba(20, 184, 166, 0.5)', // Teal glow
};

// Z-index
export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modalBackdrop: '1040',
  modal: '1050',
  popover: '1060',
  tooltip: '1070',
};

// Transitions
export const transitions = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Breakpoints (for responsive design)
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Utility functions

/**
 * Creates a CSS variable reference string
 * @param name - The CSS variable name without the -- prefix
 * @returns CSS variable reference string
 */
export const cssVar = (name: string): string => `var(--${name})`;

/**
 * Creates a responsive style object for different breakpoints
 * @param property - CSS property name
 * @param values - Object with breakpoint keys and values
 * @returns CSS-in-JS style object
 */
export const responsive = (property: string, values: Record<string, string | number>) => {
  const result: Record<string, string | number> = {};
  
  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint === 'base') {
      result[property] = value;
    } else {
      result[`@media (min-width: ${breakpoints[breakpoint as keyof typeof breakpoints]})`] = {
        [property]: value,
      };
    }
  });
  
  return result;
};

// Export all design tokens as a single theme object
export const theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  zIndex,
  transitions,
  breakpoints,
};

export default theme;