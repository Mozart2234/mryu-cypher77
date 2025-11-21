/**
 * NEWS TICKER MESSAGES
 *
 * Ticker de noticias estilo periódico con scroll automático
 * y efecto de pausa en hover
 */

import { useState, useEffect } from 'react';
import { messageService } from '@/services/messageService';
import type { GuestMessage } from '@/types/message';
import { MessageSquare } from 'lucide-react';

export function NewsTickerMessages() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getPublicMessages();
      // Duplicar mensajes para loop infinito suave
      setMessages([...data, ...data, ...data]);
    } catch (error) {
      console.error('Error loading public messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || messages.length === 0) {
    return null;
  }

  return (
    <div
      className="bg-newspaper-gray-900 text-white py-0 overflow-hidden relative border-y-2 border-newspaper-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Barra con estilo periódico */}
      <div className="flex items-stretch">
        {/* Label fijo estilo periódico */}
        <div className="relative bg-newspaper-black z-10 flex items-center px-4 md:px-5 py-2.5 shrink-0 border-r-2 border-newspaper-gray-700">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-newspaper-accent" />
            <span className="font-headline text-xs md:text-sm uppercase tracking-wider whitespace-nowrap font-bold">
              Mensajes
            </span>
          </div>
        </div>

        {/* Ticker con scroll automático */}
        <div className="flex-1 overflow-hidden py-2.5 pl-4 bg-newspaper-gray-800">
          <div
            className={`ticker-content flex items-center gap-8 md:gap-12 ${isPaused ? 'ticker-paused' : ''}`}
          >
            {messages.map((message, index) => (
              <div
                key={`${message.id}-${index}`}
                className="flex items-center gap-2 md:gap-3 whitespace-nowrap group"
              >
                <span className="text-newspaper-accent text-lg">❖</span>
                <span className="font-serif text-sm md:text-base italic text-newspaper-gray-200 group-hover:text-white transition-colors">
                  "{message.message}"
                </span>
                <span className="font-headline text-xs text-newspaper-gray-400 uppercase tracking-wide">
                  — {message.guestName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Indicador de pausa */}
        {isPaused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-newspaper-black/80 px-2 py-1 text-xs uppercase tracking-wide border border-newspaper-gray-600">
            ⏸ Pausado
          </div>
        )}
      </div>

      {/* CSS personalizado para la animación */}
      <style>{`
        .ticker-content {
          display: flex;
          animation: scroll-ticker 50s linear infinite;
          will-change: transform;
        }

        .ticker-content.ticker-paused {
          animation-play-state: paused;
        }

        @keyframes scroll-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @media (max-width: 768px) {
          .ticker-content {
            animation-duration: 35s;
          }
        }
      `}</style>
    </div>
  );
}
