/**
 * CONTEXTO DE TEMA
 *
 * Solo tema newspaper disponible (simplificado)
 */

import { createContext, useContext, useEffect, ReactNode } from 'react';
import type { ThemeType, ThemeConfig } from '@/types/theme';
import { themes } from '@/types/theme';

interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Solo newspaper está disponible
  const currentTheme: ThemeType = 'newspaper';
  const themeConfig = themes.newspaper;

  const setTheme = (_theme: ThemeType) => {
    // No-op: solo newspaper está disponible
    console.log('Solo el tema newspaper está disponible');
  };

  // Aplicar variables CSS del tema al documento
  useEffect(() => {
    const root = document.documentElement;

    // Colores
    root.style.setProperty('--color-primary', themeConfig.colors.primary);
    root.style.setProperty('--color-secondary', themeConfig.colors.secondary);
    root.style.setProperty('--color-accent', themeConfig.colors.accent);
    root.style.setProperty('--color-background', themeConfig.colors.background);
    root.style.setProperty('--color-text', themeConfig.colors.text);
    root.style.setProperty('--color-text-light', themeConfig.colors.textLight);
    root.style.setProperty('--color-border', themeConfig.colors.border);

    // Agregar clase de tema al body
    document.body.className = 'theme-newspaper';
  }, [themeConfig]);

  const availableThemes = [themes.newspaper];

  return (
    <ThemeContext.Provider value={{ currentTheme, themeConfig, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
