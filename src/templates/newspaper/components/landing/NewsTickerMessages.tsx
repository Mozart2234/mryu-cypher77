/**
 * NEWS TICKER MESSAGES
 *
 * Ticker de noticias estilo noticiero que muestra mensajes de invitados
 * con scroll automático horizontal
 */

import { useState, useEffect } from 'react';
import { messageService } from '@/services/messageService';
import type { GuestMessage } from '@/types/message';
import { MessageSquare } from 'lucide-react';

export function NewsTickerMessages() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-newspaper-gray-800 text-white py-3 overflow-hidden border-y-4 border-newspaper-black relative">
      {/* Label fijo */}
      <div className="absolute left-0 top-0 bottom-0 bg-newspaper-accent z-10 flex items-center px-4 border-r-4 border-newspaper-black">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="font-headline text-xs uppercase tracking-wider whitespace-nowrap">
            Mensajes de Invitados
          </span>
        </div>
      </div>

      {/* Ticker con scroll automático */}
      <div className="ticker-wrapper pl-52">
        <div className="ticker-content flex items-center gap-8 animate-ticker">
          {messages.map((message, index) => (
            <div
              key={`${message.id}-${index}`}
              className="flex items-center gap-3 whitespace-nowrap"
            >
              <span className="text-newspaper-gray-400">•</span>
              <span className="font-serif text-sm italic text-newspaper-gray-100">
                "{message.message}"
              </span>
              <span className="font-headline text-xs text-newspaper-gray-400">
                — {message.guestName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS personalizado para la animación */}
      <style>{`
        .ticker-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .ticker-content {
          display: flex;
          animation: scroll-ticker 40s linear infinite;
          will-change: transform;
        }

        @keyframes scroll-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .ticker-content:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .ticker-wrapper {
            padding-left: 9rem;
          }

          .ticker-content {
            animation-duration: 25s;
          }
        }
      `}</style>
    </div>
  );
}
