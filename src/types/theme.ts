/**
 * TIPOS DE TEMAS
 *
 * Define los 5 estilos visuales diferentes disponibles
 */

export type ThemeType =
  | 'newspaper'      // Estilo periódico minimalista (actual mejorado)
  | 'fluid'          // Estilo Squarespace fluid (minimalista, animaciones)
  | 'romantic'       // Romantic Garden (florales, pasteles)
  | 'modern'         // Modern Geometric (líneas limpias, colores vibrantes)
  | 'vintage';       // Vintage Polaroid (nostálgico, cálido)

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
  },
  fluid: {
    id: 'fluid',
    name: 'Fluid Minimal',
    description: 'Diseño fluido minimalista con animaciones suaves',
    colors: {
      primary: '#2c2c2c',
      secondary: '#f5f5f5',
      accent: '#d4a574',
      background: '#ffffff',
      text: '#2c2c2c',
      textLight: '#8c8c8c',
      border: '#e0e0e0'
    },
    fonts: {
      heading: 'Cormorant Garamond',
      body: 'Lato',
      accent: 'Montserrat'
    },
    features: {
      animations: true,
      parallax: true,
      gradients: true
    }
  },
  romantic: {
    id: 'romantic',
    name: 'Romantic Garden',
    description: 'Estilo romántico con elementos florales y colores pasteles',
    colors: {
      primary: '#a67c8c',
      secondary: '#f4e8e8',
      accent: '#c9a9b3',
      background: '#fef9f9',
      text: '#4a4a4a',
      textLight: '#9e9e9e',
      border: '#e8d4d8'
    },
    fonts: {
      heading: 'Crimson Text',
      body: 'Libre Baskerville',
      accent: 'Dancing Script'
    },
    features: {
      animations: true,
      parallax: false,
      gradients: true
    }
  },
  modern: {
    id: 'modern',
    name: 'Modern Geometric',
    description: 'Diseño moderno con líneas limpias y colores vibrantes',
    colors: {
      primary: '#2d3748',
      secondary: '#4a5568',
      accent: '#ed8936',
      background: '#f7fafc',
      text: '#1a202c',
      textLight: '#718096',
      border: '#cbd5e0'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      accent: 'Space Grotesk'
    },
    features: {
      animations: true,
      parallax: false,
      gradients: true
    }
  },
  vintage: {
    id: 'vintage',
    name: 'Vintage Polaroid',
    description: 'Estilo vintage nostálgico con tonos cálidos',
    colors: {
      primary: '#5c4a3c',
      secondary: '#8b7355',
      accent: '#d4a574',
      background: '#fef7f0',
      text: '#3e3028',
      textLight: '#9e8b7e',
      border: '#c9b8a8'
    },
    fonts: {
      heading: 'Abril Fatface',
      body: 'Merriweather',
      accent: 'Pacifico'
    },
    features: {
      animations: true,
      parallax: false,
      gradients: true
    }
  }
};
