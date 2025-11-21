/**
 * COMPONENTE: Guest Messages (Muro Público)
 *
 * Cuadrícula de 6 mensajes con scroll vertical automático
 */

import { useState, useEffect } from 'react';
import { messageService } from '@/services/messageService';
import type { GuestMessage, MessageType } from '@/types/message';
import { MessageSquare, Heart, Lightbulb, Camera, Sparkles } from 'lucide-react';

const MESSAGE_TYPE_CONFIG: Record<MessageType, { icon: typeof Heart; label: string; color: string }> = {
  wishes: { icon: Heart, label: 'Buenos Deseos', color: 'text-red-600' },
  advice: { icon: Lightbulb, label: 'Consejos', color: 'text-yellow-600' },
  memory: { icon: Camera, label: 'Recuerdos', color: 'text-blue-600' },
  other: { icon: Sparkles, label: 'Mensajes', color: 'text-purple-600' }
};

// Componente para cada card en el grid
interface MessageCardProps {
  message: GuestMessage;
  index: number;
}

function MessageCard({ message, index }: MessageCardProps) {
  const config = MESSAGE_TYPE_CONFIG[message.messageType];
  const Icon = config.icon;

  return (
    <article
      className="bg-white border-4 border-newspaper-black shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-4px]"
      style={{
        animationDelay: `${index * 80}ms`
      }}
    >
      {/* Decoración de esquina superior */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-t-newspaper-black border-r-[20px] border-r-transparent"></div>

      <div className="p-4">
        {/* Header del mensaje */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-newspaper-black">
          <div className="w-8 h-8 bg-newspaper-black flex items-center justify-center text-white">
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <span className="font-headline text-[9px] uppercase tracking-widest text-newspaper-gray-700 block">
              {config.label}
            </span>
          </div>
        </div>

        {/* Contenido del mensaje con comillas decorativas */}
        <blockquote className="mb-3 relative">
          <span className="absolute -top-2 -left-1 text-4xl text-newspaper-gray-300 font-serif leading-none">"</span>
          <p className="font-serif text-newspaper-black leading-snug relative z-10 pl-4 text-xs md:text-sm min-h-[100px]">
            {message.message.length > 120 ? message.message.substring(0, 120) + '...' : message.message}
          </p>
        </blockquote>

        {/* Autor y fecha */}
        <div className="pt-2 border-t border-newspaper-gray-300">
          <p className="font-headline text-xs font-bold text-newspaper-black uppercase tracking-wider">
            {message.guestName}
          </p>
          <p className="font-sans text-[9px] text-newspaper-gray-600 mt-1 uppercase tracking-wide">
            {new Date(message.createdAt).toLocaleDateString('es-ES', {
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Decoración de esquina inferior */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-b-newspaper-black border-l-[20px] border-l-transparent"></div>
    </article>
  );
}

export function GuestMessages() {
  const [allMessages, setAllMessages] = useState<GuestMessage[]>([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const VISIBLE_COUNT = 6; // Mostrar 6 mensajes a la vez

  useEffect(() => {
    loadMessages();
  }, []);

  // Auto-scroll vertical cada 7 segundos
  useEffect(() => {
    if (allMessages.length <= VISIBLE_COUNT || isPaused || isTransitioning) return;

    const interval = setInterval(() => {
      handleScrollNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [allMessages.length, isPaused, isTransitioning, visibleStartIndex]);

  const handleScrollNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Calcular siguiente índice con wrap circular
    const nextIndex = (visibleStartIndex + VISIBLE_COUNT) % allMessages.length;

    setTimeout(() => {
      setVisibleStartIndex(nextIndex);
      setIsTransitioning(false);
    }, 600); // Duración de la animación
  };

  const handleScrollPrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Calcular índice anterior con wrap circular
    const prevIndex = (visibleStartIndex - VISIBLE_COUNT + allMessages.length) % allMessages.length;

    setTimeout(() => {
      setVisibleStartIndex(prevIndex);
      setIsTransitioning(false);
    }, 600);
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getPublicMessages();
      // Duplicar mensajes si hay pocos para crear efecto de loop infinito
      const displayMessages = data.length < VISIBLE_COUNT * 2
        ? [...data, ...data, ...data]
        : data;
      setAllMessages(displayMessages);
    } catch (error) {
      console.error('Error loading public messages:', error);
      setAllMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener los 6 mensajes visibles actuales
  const getVisibleMessages = () => {
    const messages: GuestMessage[] = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const index = (visibleStartIndex + i) % allMessages.length;
      messages.push(allMessages[index]);
    }
    return messages;
  };

  if (loading) {
    return (
      <section className="newspaper-page py-12 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="inline-block animate-pulse">
            <MessageSquare className="w-12 h-12 text-newspaper-gray-400 mx-auto mb-4" />
            <p className="newspaper-meta">Cargando mensajes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (allMessages.length === 0) {
    return (
      <section className="newspaper-page py-16 px-4 md:px-8 bg-newspaper-gray-50">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="bg-white border-4 border-newspaper-black p-8">
            <MessageSquare className="w-16 h-16 text-newspaper-gray-400 mx-auto mb-4" />
            <h3 className="font-headline text-xl font-bold text-newspaper-black mb-3">
              Aún no hay mensajes publicados
            </h3>
            <p className="newspaper-body text-newspaper-gray-700 leading-relaxed">
              Sé el primero en dejar tus palabras para los novios.<br />
              Confirma tu asistencia en tu invitación digital y podrás enviar tu mensaje.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const visibleMessages = getVisibleMessages();

  return (
    <section
      className="newspaper-page py-16 px-4 md:px-8 bg-newspaper-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Título estilo periódico */}
        <div className="text-center mb-12">
          <div className="newspaper-divider-thick mb-8"></div>

          {/* Kicker */}
          <p className="newspaper-kicker mb-3">
            Opinión & Cartas
          </p>

          {/* Headline principal */}
          <h2 className="newspaper-headline mb-4">
            Cartas al Editor
          </h2>

          {/* Deck */}
          <p className="newspaper-deck max-w-3xl mx-auto mb-6">
            Nuestros invitados comparten sus palabras de cariño, consejos y buenos deseos
            para este día especial que celebraremos juntos
          </p>

          <div className="newspaper-divider-thick mt-8"></div>

          {/* Byline */}
          <p className="newspaper-byline mt-6">
            {allMessages.length} {allMessages.length === 1 ? 'mensaje publicado' : 'mensajes publicados'}
          </p>
        </div>

        {/* CUADRÍCULA DE 6 MENSAJES CON SCROLL VERTICAL */}
        <div className="relative w-full py-8">
          {/* Contenedor con animación de scroll vertical */}
          <div
            className={`grid-container ${isTransitioning ? 'scrolling' : ''}`}
            key={`grid-${visibleStartIndex}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
              {visibleMessages.map((message, index) => (
                <div
                  key={`${message.id}-${visibleStartIndex}-${index}`}
                  className="message-card-wrapper"
                >
                  <MessageCard message={message} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Controles de navegación */}
          {allMessages.length > VISIBLE_COUNT && (
            <div className="flex items-center justify-center gap-6 mt-8">
              {/* Botón anterior */}
              <button
                onClick={handleScrollPrevious}
                disabled={isTransitioning}
                className="p-4 bg-newspaper-black text-white hover:bg-newspaper-gray-900 transition-all border-2 border-newspaper-black hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Mensajes anteriores"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>

              {/* Indicador de página */}
              <div className="flex items-center gap-2">
                <span className="font-headline text-sm text-newspaper-gray-700">
                  Página {Math.floor(visibleStartIndex / VISIBLE_COUNT) + 1} de {Math.ceil(allMessages.length / VISIBLE_COUNT)}
                </span>
              </div>

              {/* Botón siguiente */}
              <button
                onClick={handleScrollNext}
                disabled={isTransitioning}
                className="p-4 bg-newspaper-black text-white hover:bg-newspaper-gray-900 transition-all border-2 border-newspaper-black hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Mensajes siguientes"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Nota al pie */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white border-2 border-newspaper-black p-6 text-center">
            <p className="newspaper-body text-sm text-newspaper-gray-700">
              <strong>¿Quieres enviar tu mensaje?</strong><br />
              Confirma tu asistencia en tu invitación digital y podrás dejar tus palabras para los novios
            </p>
          </div>
        </div>

        {/* FOLIO - pie de página */}
        <div className="newspaper-folio mt-8">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs font-sans uppercase tracking-wider text-newspaper-gray-600">
            <span>Sección: Cartas</span>
            <span>•</span>
            <span>{allMessages.length} mensajes publicados</span>
          </div>
        </div>
      </div>

      {/* Animaciones CSS para scroll vertical suave */}
      <style>{`
        /* Contenedor principal con transición */
        .grid-container {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.6s ease-out;
          will-change: transform, opacity;
        }

        /* Estado de scroll - fade out hacia arriba con blur */
        .grid-container.scrolling {
          animation: verticalScrollOut 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Animación de salida - mensajes salen hacia arriba con blur */
        @keyframes verticalScrollOut {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
          50% {
            opacity: 0.5;
            filter: blur(6px);
          }
          100% {
            transform: translateY(-40px) scale(0.98);
            opacity: 0;
            filter: blur(10px);
          }
        }

        /* Animación de entrada - nuevos mensajes entran desde abajo con fade in */
        .message-card-wrapper {
          animation: verticalScrollIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        @keyframes verticalScrollIn {
          0% {
            transform: translateY(40px) scale(0.98);
            opacity: 0;
            filter: blur(10px);
          }
          40% {
            opacity: 0.4;
            filter: blur(6px);
          }
          70% {
            opacity: 0.8;
            filter: blur(2px);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }

        /* Staggered delays para efecto cascada */
        .message-card-wrapper:nth-child(1) { animation-delay: 0ms; }
        .message-card-wrapper:nth-child(2) { animation-delay: 80ms; }
        .message-card-wrapper:nth-child(3) { animation-delay: 160ms; }
        .message-card-wrapper:nth-child(4) { animation-delay: 240ms; }
        .message-card-wrapper:nth-child(5) { animation-delay: 320ms; }
        .message-card-wrapper:nth-child(6) { animation-delay: 400ms; }

        /* Optimización de rendering */
        .grid-container,
        .message-card-wrapper {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
        }

        /* Responsive: en mobile reducir blur y ajustar timing */
        @media (max-width: 768px) {
          @keyframes verticalScrollOut {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
              filter: blur(0);
            }
            50% {
              opacity: 0.5;
              filter: blur(4px);
            }
            100% {
              transform: translateY(-30px) scale(0.98);
              opacity: 0;
              filter: blur(8px);
            }
          }

          @keyframes verticalScrollIn {
            0% {
              transform: translateY(30px) scale(0.98);
              opacity: 0;
              filter: blur(8px);
            }
            40% {
              opacity: 0.4;
              filter: blur(5px);
            }
            70% {
              opacity: 0.8;
              filter: blur(2px);
            }
            100% {
              transform: translateY(0) scale(1);
              opacity: 1;
              filter: blur(0);
            }
          }
        }
      `}</style>
    </section>
  );
}
