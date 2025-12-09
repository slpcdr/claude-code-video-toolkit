import type { Theme } from './types';

// Default theme - Digital Samba orange/slate palette
export const defaultTheme: Theme = {
  colors: {
    // Primary palette - orange accent
    primary: '#ea580c',
    primaryLight: '#fb923c',

    // Text colors - slate palette
    textDark: '#1e293b',      // slate-800
    textMedium: '#334155',    // slate-700
    textLight: '#64748b',     // slate-500

    // Backgrounds
    bgLight: '#ffffff',
    bgDark: '#1a1a2e',
    bgOverlay: 'rgba(255, 255, 255, 0.95)',

    // UI elements
    divider: '#e2e8f0',       // slate-200
    shadow: 'rgba(0, 0, 0, 0.12)',
  },
  fonts: {
    primary: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 48,
    xl: 80,
    xxl: 120,
  },
  borderRadius: {
    sm: 7,
    md: 12,
    lg: 16,
  },
};

// Alternative themes
export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#ff6b35',
    primaryLight: '#ff8c5a',
    textDark: '#f1f5f9',
    textMedium: '#cbd5e1',
    textLight: '#94a3b8',
    bgLight: '#0f172a',
    bgDark: '#020617',
    bgOverlay: 'rgba(15, 23, 42, 0.95)',
    divider: '#334155',
  },
};

export const blueTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#2563eb',
    primaryLight: '#3b82f6',
  },
};

export const greenTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#16a34a',
    primaryLight: '#22c55e',
  },
};

// Theme context for components
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: React.FC<{
  theme?: Theme;
  children: React.ReactNode;
}> = ({ theme = defaultTheme, children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Helper to generate common styles
export const createStyles = (theme: Theme) => ({
  // Typography
  h1: {
    fontFamily: theme.fonts.primary,
    fontSize: 88,
    fontWeight: 700,
    color: theme.colors.textDark,
  },
  h2: {
    fontFamily: theme.fonts.primary,
    fontSize: 72,
    fontWeight: 700,
    color: theme.colors.textDark,
  },
  h3: {
    fontFamily: theme.fonts.primary,
    fontSize: 48,
    fontWeight: 700,
    color: theme.colors.textDark,
  },
  body: {
    fontFamily: theme.fonts.primary,
    fontSize: 44,
    color: theme.colors.textMedium,
  },
  label: {
    fontFamily: theme.fonts.primary,
    fontSize: 34,
    fontWeight: 500,
    color: theme.colors.primary,
    textTransform: 'uppercase' as const,
    letterSpacing: 3,
  },

  // Cards/Labels
  card: {
    backgroundColor: theme.colors.bgOverlay,
    borderRadius: theme.borderRadius.md,
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    boxShadow: `0 4px 12px ${theme.colors.shadow}`,
  },

  // Accent elements
  bullet: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.primary,
  },
});
