/**
 * BOTÓN CTA FLOTANTE
 *
 * Botón sticky estilo periódico que permanece visible
 */

import { Ticket, X, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FloatingCTAProps {
  onOpenModal: () => void;
}

export function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // Expandir automáticamente después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Detener el pulso después de 10 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPulse(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      {/* Efecto de pulso */}
      {showPulse && (
        <div className="absolute inset-0 bg-newspaper-black rounded-sm animate-ping opacity-20"></div>
      )}

      {/* Contenedor principal estilo periódico */}
      <div className="relative bg-white border-4 border-newspaper-black shadow-2xl">
        {/* Barra superior decorativa */}
        <div className="bg-newspaper-black px-3 py-1.5 flex items-center justify-between">
          <span className="font-headline text-[10px] md:text-xs uppercase tracking-[0.15em] text-white flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" /> Acceso Directo <Star className="w-3 h-3 fill-current" />
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white transition-colors ml-2"
            aria-label="Cerrar botón flotante"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Botón principal */}
        <button
          onClick={onOpenModal}
          onMouseEnter={() => setIsExpanded(true)}
          className="group flex items-center gap-3 px-4 py-3 hover:bg-newspaper-gray-100 transition-all duration-300 cursor-pointer w-full"
          aria-label="Ver mi invitación digital"
        >
          <div className="w-10 h-10 bg-newspaper-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Ticket className="w-5 h-5 text-white" aria-hidden="true" />
          </div>

          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-w-[160px] opacity-100' : 'max-w-0 opacity-0 sm:max-w-[160px] sm:opacity-100'}`}>
            <span className="font-headline text-sm uppercase tracking-wider text-newspaper-black whitespace-nowrap block">
              Ver Mi Invitación
            </span>
            <span className="font-sans text-[11px] text-newspaper-gray-600 whitespace-nowrap block">
              Ingresa tu código
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
