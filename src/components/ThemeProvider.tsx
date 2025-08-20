import React, { createContext, useContext, ReactNode } from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import theme from '../styles/designSystem';

// Create a context for theme-related values and functions
interface ThemeContextType {
  toggleColorScheme: () => void;
  colorScheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType>({
  toggleColorScheme: () => {},
  colorScheme: 'dark',
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // For now, we'll use a fixed dark theme, but this could be expanded to support theme switching
  const colorScheme: 'dark' | 'light' = 'dark';
  
  const toggleColorScheme = () => {
    // This would toggle between light and dark themes if we implement that feature
    console.log('Theme toggle functionality not implemented yet');
  };
  
  // Configure Mantine theme based on our design system
  const mantineTheme: MantineThemeOverride = {
    colorScheme,
    colors: {
      // Convert our design system colors to Mantine format
      dark: [
        theme.colors.neutral.lightest,
        theme.colors.neutral.light,
        theme.colors.neutral.main,
        theme.colors.neutral.dark,
        theme.colors.secondary.light,
        theme.colors.secondary.main,
        theme.colors.secondary.dark,
        theme.colors.primary.light,
        theme.colors.primary.main,
        theme.colors.primary.dark,
      ],
      // Add accent colors
      purple: [
        '#F3E8FF', // Lightest purple
        '#E9D5FF',
        '#D8B4FE',
        '#C084FC',
        '#A855F7',
        '#9333EA',
        theme.colors.accent.purple, // Our main purple
        '#7E22CE',
        '#6B21A8',
        '#581C87', // Darkest purple
      ],
      teal: [
        '#CCFBF1', // Lightest teal
        '#99F6E4',
        '#5EEAD4',
        '#2DD4BF',
        theme.colors.accent.teal, // Our main teal
        '#0D9488',
        '#0F766E',
        '#115E59',
        '#134E4A',
        '#042F2E', // Darkest teal
      ],
    },
    primaryColor: 'teal',
    primaryShade: 4,
    fontFamily: theme.typography.fontFamily.sans,
    fontFamilyMonospace: theme.typography.fontFamily.mono,
    headings: {
      fontFamily: theme.typography.fontFamily.sans,
      fontWeight: 700,
    },
    defaultRadius: 'md',
    // Custom properties
    other: {
      transitions: theme.transitions,
      spacing: theme.spacing,
      borders: theme.borders,
      shadows: theme.shadows,
    },
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
}