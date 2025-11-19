/**
 * TIPOS DE TEMAS
 *
 * Solo tema newspaper disponible
 */

export type ThemeType = 'newspaper';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
    accent: string;
  };
  features: {
    animations: boolean;
    parallax: boolean;
    gradients: boolean;
  };
}

export const themes: Record<ThemeType, ThemeConfig> = {
  newspaper: {
    id: 'newspaper',
    name: 'Classic Newspaper',
    description: 'Estilo periódico clásico, minimalista y elegante',
    colors: {
      primary: '#1a1a1a',
      secondary: '#404040',
      accent: '#666666',
      background: '#ffffff',
      text: '#1a1a1a',
      textLight: '#666666',
      border: '#000000'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Georgia',
      accent: 'system-ui'
    },
    features: {
      animations: false,
      parallax: false,
      gradients: false
    }
  }
};
