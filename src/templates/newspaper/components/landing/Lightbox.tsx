/**
 * COMPONENTE LIGHTBOX
 *
 * Modal para visualizar fotos en tamaño completo con navegación
 */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  photoUrl: string;
  photoCaption: string;
  photoAlt: string;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  isOpen,
  photoUrl,
  photoCaption,
  photoAlt,
  currentIndex,
  totalPhotos,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Manejar teclas (ESC, flechas)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Prevenir scroll del body cuando el lightbox está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Manejar gestos táctiles (swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next
        onNext();
      } else {
        // Swipe right - prev
        onPrev();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!isOpen) return null;

  const lightboxContent = (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      ref={lightboxRef}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-10 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
        aria-label="Cerrar lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Contador */}
      <div className="fixed top-4 left-4 z-10 text-white text-sm">
        {currentIndex + 1} / {totalPhotos}
      </div>

      {/* Contenedor principal - Imagen */}
      <div
        className="fixed inset-0 flex items-center justify-center"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={photoUrl}
          alt={photoAlt}
          onClick={(e) => e.stopPropagation()}
          className="max-w-[90vw] max-h-[90vh] object-contain"
        />
      </div>

      {/* Caption */}
      {photoCaption && (
        <div
          id="lightbox-caption"
          className="fixed bottom-16 left-0 right-0 text-center px-4"
        >
          <p className="text-white text-sm bg-black/70 px-4 py-2 rounded-lg inline-block max-w-2xl">
            {photoCaption}
          </p>
        </div>
      )}

      {/* Botones de navegación */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < totalPhotos - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Hint móvil */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">
          Desliza para navegar
        </div>
      </div>
    </div>
  );

  return createPortal(lightboxContent, document.body);
}
