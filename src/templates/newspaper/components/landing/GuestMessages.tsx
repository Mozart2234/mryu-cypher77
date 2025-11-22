/**
 * COMPONENTE: Guest Messages (Muro Público)
 *
 * Cuadrícula de 6 mensajes con scroll vertical automático
 */

import { useState, useEffect } from 'react';
import { messageService } from '@/services/messageService';
import type { GuestMessage, MessageType } from '@/types/message';
import { MessageSquare, Heart, Lightbulb, Camera, Sparkles, Mail, Diamond, X, Maximize2 } from 'lucide-react';

const MESSAGE_TYPE_CONFIG: Record<MessageType, { icon: typeof Heart; label: string; color: string }> = {
  wishes: { icon: Heart, label: 'Buenos Deseos', color: 'text-red-600' },
  advice: { icon: Lightbulb, label: 'Consejos', color: 'text-yellow-600' },
  memory: { icon: Camera, label: 'Recuerdos', color: 'text-blue-600' },
  other: { icon: Sparkles, label: 'Mensajes', color: 'text-purple-600' }
};

const TRUNCATE_LENGTH = 150; // Caracteres antes de truncar

// Componente para cada card en el grid - Estilo Carta al Editor
interface MessageCardProps {
  message: GuestMessage;
  index: number;
  onReadMore?: (message: GuestMessage) => void;
}

function MessageCard({ message, index, onReadMore }: MessageCardProps) {
  const config = MESSAGE_TYPE_CONFIG[message.messageType];
  const Icon = config.icon;
  const isLongMessage = message.message.length > TRUNCATE_LENGTH;
  const displayMessage = isLongMessage
    ? message.message.substring(0, TRUNCATE_LENGTH) + '...'
    : message.message;

  return (
    <article
      className="group bg-white border-2 border-newspaper-black shadow-lg transition-all duration-500 hover:shadow-2xl hover:translate-y-[-4px] relative overflow-hidden"
      style={{
        animationDelay: `${index * 80}ms`
      }}
    >
      {/* Header estilo carta de periódico */}
      <div className="bg-newspaper-black px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
          <span className="text-sm font-bold uppercase tracking-wider text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {config.label}
          </span>
        </div>
        <span className="text-xs text-newspaper-gray-300" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          {new Date(message.createdAt).toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>

      <div className="p-5">
        {/* Comilla decorativa grande */}
        <div className="absolute top-12 right-4 text-6xl text-newspaper-gray-200 font-serif leading-none select-none group-hover:text-newspaper-gray-300 transition-colors">
          "
        </div>

        {/* Contenido del mensaje */}
        <blockquote className="relative z-10 mb-4">
          <p className="font-serif text-newspaper-black leading-relaxed text-base md:text-lg min-h-[100px]">
            "{displayMessage}"
          </p>
          {isLongMessage && onReadMore && (
            <button
              onClick={() => onReadMore(message)}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-newspaper-black hover:underline underline-offset-2"
            >
              <Maximize2 className="w-4 h-4" />
              Ver mensaje completo
            </button>
          )}
        </blockquote>

        {/* Firma del autor - estilo editorial */}
        <div className="border-t-2 border-newspaper-black pt-3 mt-auto">
          <div className="flex items-center gap-3">
            {/* Avatar inicial */}
            <div className="w-11 h-11 bg-newspaper-gray-200 border-2 border-newspaper-black flex items-center justify-center shrink-0 group-hover:bg-newspaper-black group-hover:text-white transition-colors">
              <span className="font-headline text-base font-bold">
                {message.guestName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-headline text-base font-bold text-newspaper-black uppercase tracking-wide truncate">
                {message.guestName}
              </p>
              <p className="font-sans text-sm text-newspaper-gray-600">
                Invitado Especial
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de esquina doblada */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-newspaper-gray-200 border-l-[24px] border-l-transparent group-hover:border-t-newspaper-gray-300 transition-colors"></div>
    </article>
  );
}

// Modal fullscreen para ver mensaje completo
interface MessageModalProps {
  message: GuestMessage | null;
  onClose: () => void;
}

function MessageModal({ message, onClose }: MessageModalProps) {
  if (!message) return null;

  const config = MESSAGE_TYPE_CONFIG[message.messageType];
  const Icon = config.icon;

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-newspaper-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-newspaper-black px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
            <span className="text-base font-bold uppercase tracking-wider text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {config.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-8">
          {/* Comilla decorativa */}
          <div className="text-8xl text-newspaper-gray-200 font-serif leading-none select-none mb-4">
            "
          </div>

          <blockquote className="mb-8">
            <p className="font-serif text-xl md:text-2xl text-newspaper-black leading-relaxed">
              {message.message}
            </p>
          </blockquote>

          {/* Firma */}
          <div className="border-t-2 border-newspaper-black pt-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-newspaper-black text-white flex items-center justify-center shrink-0">
                <span className="font-headline text-xl font-bold">
                  {message.guestName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-headline text-xl font-bold text-newspaper-black uppercase tracking-wide">
                  {message.guestName}
                </p>
                <p className="font-sans text-sm text-newspaper-gray-600">
                  {new Date(message.createdAt).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GuestMessages() {
  const [allMessages, setAllMessages] = useState<GuestMessage[]>([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<GuestMessage | null>(null);

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
      let data = await messageService.getPublicMessages();

      // En desarrollo, agregar mensajes mock para probar el scroll
      if (import.meta.env.DEV && data.length < 12) {
        const mockMessages: GuestMessage[] = [
          { id: 'mock-1', reservationId: 'r1', guestName: 'María García', message: '¡Felicidades a los novios! Que este día sea el comienzo de una vida llena de amor y felicidad. Los queremos mucho.', messageType: 'wishes', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-2', reservationId: 'r2', guestName: 'Carlos Rodríguez', message: 'Nunca se vayan a dormir enojados. Siempre hablen las cosas y recuerden por qué se enamoraron.', messageType: 'advice', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-3', reservationId: 'r3', guestName: 'Ana Martínez', message: 'Recuerdo cuando se conocieron. Desde ese momento supe que estaban destinados a estar juntos.', messageType: 'memory', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-4', reservationId: 'r4', guestName: 'Pedro Sánchez', message: '¡Que vivan los novios! Este es solo el principio de una hermosa historia de amor. ¡Salud!', messageType: 'wishes', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-5', reservationId: 'r5', guestName: 'Laura Torres', message: 'Mi consejo: viajen mucho juntos, creen recuerdos y nunca dejen de reírse. El humor es la clave de un matrimonio feliz.', messageType: 'advice', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-6', reservationId: 'r6', guestName: 'Roberto Díaz', message: '¡Qué emoción verlos dar este paso! Son la pareja perfecta y merecen toda la felicidad del mundo.', messageType: 'wishes', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-7', reservationId: 'r7', guestName: 'Carmen Flores', message: 'Me acuerdo cuando me contaron que estaban saliendo. La emoción en sus ojos era evidente. ¡Que sigan brillando!', messageType: 'memory', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-8', reservationId: 'r8', guestName: 'Fernando López', message: 'Un matrimonio exitoso requiere enamorarse muchas veces, siempre de la misma persona. ¡Felicidades!', messageType: 'advice', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-9', reservationId: 'r9', guestName: 'Isabel Ramírez', message: 'Desde que los conozco, siempre supe que terminarían juntos. Son el uno para el otro. ¡Los amo!', messageType: 'wishes', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-10', reservationId: 'r10', guestName: 'Miguel Herrera', message: 'Que cada día juntos sea una nueva aventura. El amor verdadero solo crece con el tiempo. ¡Felicidades!', messageType: 'other', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: 'mock-12', reservationId: 'r12', guestName: 'Andrés Vargas', message: 'No hay secreto para un matrimonio feliz, solo dos personas que se niegan a rendirse. ¡Éxitos!', messageType: 'advice', isPublic: true, isBlocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ];
        data = [...data, ...mockMessages.slice(0, 12 - data.length)];
      }

      // Si hay 5 mensajes o menos, no duplicar, mostrar solo los que hay
      if (data.length <= 5) {
        setAllMessages(data);
      } else if (data.length < VISIBLE_COUNT * 2) {
        // Solo duplicar si hay entre 6 y 11 mensajes para crear efecto de loop
        setAllMessages([...data, ...data, ...data]);
      } else {
        setAllMessages(data);
      }
    } catch (error) {
      console.error('Error loading public messages:', error);
      setAllMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener los mensajes visibles actuales (adaptar cantidad si hay menos de 6)
  const getVisibleMessages = () => {
    const messages: GuestMessage[] = [];
    const count = Math.min(VISIBLE_COUNT, allMessages.length);
    for (let i = 0; i < count; i++) {
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
        {/* Encabezado estilo sección de opinión de periódico */}
        <div className="text-center mb-12">
          {/* Banner superior */}
          <div className="inline-block bg-newspaper-black text-white px-8 py-2.5 mb-6">
            <span className="font-headline text-sm uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Sección de Opinión <Sparkles className="w-4 h-4" />
            </span>
          </div>

          {/* Título principal con estilo editorial */}
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 md:w-24 h-1 bg-newspaper-black"></div>
              <MessageSquare className="w-8 h-8 text-newspaper-black" />
              <div className="w-16 md:w-24 h-1 bg-newspaper-black"></div>
            </div>

            <h2 className="font-headline text-4xl md:text-5xl font-black text-newspaper-black mb-3 tracking-tight">
              CARTAS AL EDITOR
            </h2>

            <p className="font-serif text-lg md:text-xl text-newspaper-gray-700 italic max-w-2xl mx-auto mb-4">
              "Los mejores deseos de nuestros queridos invitados"
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 md:w-24 h-0.5 bg-newspaper-gray-400"></div>
              <span className="font-headline text-base uppercase tracking-wider text-newspaper-gray-600">
                {allMessages.length} {allMessages.length === 1 ? 'Carta Publicada' : 'Cartas Publicadas'}
              </span>
              <div className="w-16 md:w-24 h-0.5 bg-newspaper-gray-400"></div>
            </div>
          </div>
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
                  <MessageCard message={message} index={index} onReadMore={setSelectedMessage} />
                </div>
              ))}
            </div>
          </div>

          {/* Controles de navegación - estilo slide minimalista */}
          {allMessages.length > VISIBLE_COUNT && (
            <div className="mt-10 flex items-center justify-center gap-6">
              {/* Flecha anterior */}
              <button
                onClick={handleScrollPrevious}
                disabled={isTransitioning}
                className="w-10 h-10 flex items-center justify-center border border-newspaper-gray-300 hover:border-newspaper-black hover:bg-newspaper-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Anterior"
              >
                <span className="text-lg">←</span>
              </button>

              {/* Indicadores de slide - barras */}
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.ceil(allMessages.length / VISIBLE_COUNT) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setVisibleStartIndex(idx * VISIBLE_COUNT);
                          setIsTransitioning(false);
                        }, 600);
                      }
                    }}
                    disabled={isTransitioning}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      Math.floor(visibleStartIndex / VISIBLE_COUNT) === idx
                        ? 'bg-newspaper-black w-8'
                        : 'bg-newspaper-gray-300 hover:bg-newspaper-gray-500 w-4'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Flecha siguiente */}
              <button
                onClick={handleScrollNext}
                disabled={isTransitioning}
                className="w-10 h-10 flex items-center justify-center border border-newspaper-gray-300 hover:border-newspaper-black hover:bg-newspaper-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Siguiente"
              >
                <span className="text-lg">→</span>
              </button>
            </div>
          )}
        </div>

        {/* Nota al pie - Estilo Anuncio Clasificado */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-white border-4 border-double border-newspaper-black p-1">
            <div className="border border-newspaper-gray-400 p-6 text-center">
              <div className="inline-block bg-newspaper-black text-white px-4 py-1.5 mb-3">
                <span className="font-headline text-sm uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Sé Parte de Esta Sección
                </span>
              </div>
              <p className="font-headline text-base font-bold text-newspaper-black mb-2">
                ¿Quieres que tu mensaje aparezca aquí?
              </p>
              <p className="font-serif text-base text-newspaper-gray-700 leading-relaxed">
                Confirma tu asistencia en tu invitación digital y podrás enviar tus mejores deseos a los novios.
              </p>
            </div>
          </div>
        </div>

        {/* FOLIO - pie de página estilo editorial */}
        <div className="mt-10 border-t-2 border-newspaper-black pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm font-headline uppercase tracking-wider text-newspaper-gray-600">
            <span>Sección: Opinión & Cartas</span>
            <Diamond className="hidden sm:inline w-3 h-3" />
            <span>Total: {allMessages.length} {allMessages.length === 1 ? 'Carta' : 'Cartas'} Publicadas</span>
          </div>
        </div>
      </div>

      {/* Modal para ver mensaje completo */}
      <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />

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
