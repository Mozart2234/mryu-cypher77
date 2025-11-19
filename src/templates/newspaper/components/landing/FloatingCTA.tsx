/**
 * BOTÓN CTA FLOTANTE
 *
 * Botón sticky que permanece visible para que los invitados
 * puedan acceder fácilmente a su invitación
 */

import { Ticket } from 'lucide-react';
import { useState } from 'react';

interface FloatingCTAProps {
  onOpenModal: () => void;
}

export function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <button
        onClick={onOpenModal}
        className="group flex items-center gap-3 bg-newspaper-black text-white px-6 py-4 rounded-lg shadow-2xl hover:bg-newspaper-accent transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-newspaper-accent focus:ring-offset-2"
        aria-label="Ver mi invitación digital"
      >
        <Ticket className="w-5 h-5" aria-hidden="true" />
        <span className="font-sans font-medium text-sm hidden sm:inline">
          Ver Mi Invitación
        </span>
      </button>

      {/* Botón para ocultar */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-newspaper-gray-300 hover:bg-newspaper-gray-400 rounded-full flex items-center justify-center text-xs text-newspaper-black transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-black focus:ring-offset-2"
        aria-label="Cerrar botón flotante"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
