/**
 * SELECTOR DE TEMA
 *
 * Botón flotante para cambiar entre los 5 temas disponibles
 */

import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeType } from '@/types/theme';

export function ThemeSelector() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-110"
        aria-label="Cambiar tema"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
      </button>

      {/* Panel de temas */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl p-6 max-w-sm animate-fade-in border-2 border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-gray-900">Elige un Estilo</h3>
          <div className="space-y-3">
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  currentTheme === theme.id
                    ? 'border-gray-900 bg-gray-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-6 h-6 rounded-full border-2"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <span className="font-semibold text-gray-900">{theme.name}</span>
                </div>
                <p className="text-sm text-gray-600">{theme.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
