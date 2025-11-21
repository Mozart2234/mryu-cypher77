/**
 * COMPONENTE: Message Form
 *
 * Formulario para que los invitados envíen mensajes a la pareja
 */

import { useState } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { messageService } from '@/services/messageService';
import type { MessageType, CreateMessageDTO } from '@/types/message';

interface MessageFormProps {
  reservationId: string;
  guestName: string;
  onSuccess?: () => void;
}

const MESSAGE_TYPES: { value: MessageType; label: string; emoji: string }[] = [
  { value: 'wishes', label: 'Buenos deseos', emoji: '💝' },
  { value: 'advice', label: 'Un consejo', emoji: '💡' },
  { value: 'memory', label: 'Un recuerdo', emoji: '📸' },
  { value: 'other', label: 'Otro mensaje', emoji: '✨' }
];

export function MessageForm({ reservationId, guestName, onSuccess }: MessageFormProps) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('wishes');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const maxChars = 500;
  const charsRemaining = maxChars - message.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validaciones
    if (!message.trim()) {
      setError('Por favor escribe un mensaje');
      return;
    }

    if (message.length > maxChars) {
      setError(`El mensaje no puede exceder ${maxChars} caracteres`);
      return;
    }

    try {
      setIsSubmitting(true);

      const messageData: CreateMessageDTO = {
        reservationId,
        guestName,
        message: message.trim(),
        messageType,
        isPublic
      };

      await messageService.create(messageData);

      setSuccess(true);
      setMessage('');

      if (onSuccess) {
        onSuccess();
      }

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-2 border-newspaper-black p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <MessageSquare className="w-6 h-6 text-newspaper-black" />
          <h3 className="font-headline text-2xl font-bold text-newspaper-black">
            Mensaje para los Novios
          </h3>
        </div>
        <p className="font-serif text-sm text-newspaper-gray-700 leading-relaxed">
          Deja unas palabras para Alexei y Estephanie en este día especial
        </p>
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-50 border-2 border-green-600 rounded-sm">
          <p className="font-sans text-sm text-green-800 text-center font-semibold">
            ¡Gracias! Tu mensaje ha sido enviado exitosamente
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-2 border-red-600 rounded-sm">
          <p className="font-sans text-sm text-red-800 text-center font-semibold">
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de mensaje */}
        <div>
          <label className="block font-serif font-semibold text-sm mb-2 text-newspaper-black">
            Tipo de mensaje
          </label>
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value as MessageType)}
            className="w-full px-4 py-3 border-2 border-newspaper-gray-400 rounded-sm font-sans text-sm focus:outline-none focus:border-newspaper-black transition-colors"
            disabled={isSubmitting}
          >
            {MESSAGE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.emoji} {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mensaje */}
        <div>
          <label className="block font-serif font-semibold text-sm mb-2 text-newspaper-black">
            Tu mensaje
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe aquí tus buenos deseos, consejos o recuerdos..."
            rows={5}
            maxLength={maxChars}
            className="w-full px-4 py-3 border-2 border-newspaper-gray-400 rounded-sm font-sans text-sm leading-relaxed focus:outline-none focus:border-newspaper-black transition-colors resize-none"
            disabled={isSubmitting}
          />
          <p className={`text-xs font-sans mt-1 text-right ${
            charsRemaining < 50 ? 'text-red-600 font-semibold' : 'text-newspaper-gray-600'
          }`}>
            {charsRemaining} caracteres restantes
          </p>
        </div>

        {/* Checkbox público */}
        <div className="flex items-start gap-3 p-4 bg-newspaper-gray-50 border border-newspaper-gray-300 rounded-sm">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mt-1 w-4 h-4 border-2 border-newspaper-gray-400 rounded-sm focus:ring-2 focus:ring-newspaper-black cursor-pointer"
            disabled={isSubmitting}
          />
          <label htmlFor="isPublic" className="flex-1 cursor-pointer">
            <span className="block font-serif font-semibold text-sm text-newspaper-black">
              Permitir mostrar públicamente
            </span>
            <span className="block text-xs text-newspaper-gray-700 mt-1">
              Si lo activas, tu mensaje podrá aparecer en la página de la boda para que otros invitados lo vean
            </span>
          </label>
        </div>

        {/* Botón submit */}
        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="w-full bg-newspaper-black text-white py-4 px-6 font-headline text-lg font-bold uppercase tracking-wider hover:bg-newspaper-gray-900 disabled:bg-newspaper-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 border-2 border-newspaper-black"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar Mensaje
            </>
          )}
        </button>
      </form>

      {/* Nota informativa */}
      <p className="text-xs text-center text-newspaper-gray-600 mt-4 font-sans italic">
        Tu mensaje será enviado directamente a la pareja
      </p>
    </div>
  );
}
