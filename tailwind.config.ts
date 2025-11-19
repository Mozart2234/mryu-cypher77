import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta estilo periódico (principalmente blanco y negro con acentos suaves)
        newspaper: {
          black: '#1a1a1a',
          gray: {
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
          accent: '#8b4513', // Marrón suave tipo sepia
          border: '#d1d1d1',
        },
        // Mantener compatibilidad con componentes admin
        primary: '#1a1a1a',
        secondary: '#f5f5f5',
        dark: '#1a1a1a',
      },
      fontFamily: {
        // Tipografía tipo periódico
        headline: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'], // Para titulares grandes
        serif: ['Libre Baskerville', 'Georgia', 'serif'], // Para subtítulos
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'], // Para cuerpo de texto
        mono: ['Courier New', 'monospace'], // Para detalles tipo typewriter
      },
      fontSize: {
        'headline': ['4rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'subheadline': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      borderWidth: {
        '0.5': '0.5px',
        '3': '3px',
      },
      backgroundImage: {
        'newsprint': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
} satisfies Config
