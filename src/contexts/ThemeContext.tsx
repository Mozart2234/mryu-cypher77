/**
 * CONTEXTO DE TEMA
 *
 * Maneja el tema activo de la aplicación
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  // Leer tema de localStorage o URL, default a 'newspaper'
  const getInitialTheme = (): ThemeType => {
    // Primero intentar leer de URL
    const urlParams = new URLSearchParams(window.location.search);
    const themeFromUrl = urlParams.get('theme') as ThemeType;
    if (themeFromUrl && themes[themeFromUrl]) {
      return themeFromUrl;
    }

    // Luego de localStorage
    const stored = localStorage.getItem('wedding-theme') as ThemeType;
    if (stored && themes[stored]) {
      return stored;
    }

    return 'newspaper';
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(getInitialTheme);
  const themeConfig = themes[currentTheme];

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('wedding-theme', theme);

    // Actualizar URL sin recargar página
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme);
    window.history.replaceState({}, '', url.toString());
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
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme, themeConfig]);

  const availableThemes = Object.values(themes);

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
