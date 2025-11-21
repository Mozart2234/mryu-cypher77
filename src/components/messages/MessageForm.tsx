/**
 * COMPONENTE: Message Form
 *
 * Formulario para que los invitados envíen mensajes a la pareja
 * Refactorizado con React Hook Form para mejor manejo de estado
 */

import { useImperativeHandle, forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { messageService } from '@/services/messageService';
import type { MessageType, CreateMessageDTO } from '@/types/message';

interface MessageFormProps {
  reservationId: string;
  guestName: string;
  onSuccess?: () => void;
  showSubmitButton?: boolean;
  onCanSubmitChange?: (canSubmit: boolean) => void;
  hideHeader?: boolean;
  hideWrapper?: boolean;
}

export interface MessageFormRef {
  submit: () => Promise<void>;
  isSubmitting: boolean;
  canSubmit: boolean;
}

interface MessageFormData {
  message: string;
  messageType: MessageType;
  isPublic: boolean;
}

const MESSAGE_TYPES: { value: MessageType; label: string; emoji: string }[] = [
  { value: 'wishes', label: 'Buenos deseos', emoji: '💝' },
  { value: 'advice', label: 'Un consejo', emoji: '💡' },
  { value: 'memory', label: 'Un recuerdo', emoji: '📸' },
  { value: 'other', label: 'Otro mensaje', emoji: '✨' }
];

// Límites de caracteres según tipo de mensaje
const MAX_CHARS_PUBLIC = 300;  // Mensajes públicos (se muestran en cards)
const MAX_CHARS_PRIVATE = 500; // Mensajes privados (solo los novios los ven)

export const MessageForm = forwardRef<MessageFormRef, MessageFormProps>(({
  reservationId,
  guestName,
  onSuccess,
  showSubmitButton = true,
  onCanSubmitChange,
  hideHeader = false,
  hideWrapper = false
}, ref) => {
  const {
    register,
    handleSubmit: handleRHFSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<MessageFormData>({
    defaultValues: {
      message: '',
      messageType: 'wishes',
      isPublic: true
    }
  });

  const messageValue = watch('message');
  const isPublicValue = watch('isPublic');
  const maxChars = isPublicValue ? MAX_CHARS_PUBLIC : MAX_CHARS_PRIVATE;
  const charsRemaining = maxChars - (messageValue?.length || 0);
  const canSubmit = (messageValue?.trim().length || 0) > 0 && !isSubmitting;

  // Notificar cambios en canSubmit
  useEffect(() => {
    if (onCanSubmitChange) {
      onCanSubmitChange(canSubmit);
    }
  }, [canSubmit, onCanSubmitChange]);

  const onSubmit = async (data: MessageFormData) => {
    try {
      const messageData: CreateMessageDTO = {
        reservationId,
        guestName,
        message: data.message.trim(),
        messageType: data.messageType,
        isPublic: data.isPublic
      };

      await messageService.create(messageData);
      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error sending message:', err);
      // Los errores se manejan automáticamente por React Hook Form
      throw err;
    }
  };

  // Exponer métodos para que el modal pueda llamarlos
  useImperativeHandle(ref, () => ({
    submit: async () => {
      await handleRHFSubmit(onSubmit)();
    },
    isSubmitting,
    canSubmit
  }));

  const wrapperClasses = hideWrapper
    ? ""
    : "bg-white border-2 border-newspaper-black p-6 md:p-8 scroll-mt-8";

  return (
    <div id="message-form" className={wrapperClasses}>
      {/* Header */}
      {!hideHeader && (
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
      )}

      <form onSubmit={handleRHFSubmit(onSubmit)} className="space-y-4">
        {/* Tipo de mensaje */}
        <div>
          <label className="block font-serif font-semibold text-sm mb-2 text-newspaper-black">
            Tipo de mensaje
          </label>
          <select
            {...register('messageType')}
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
            {...register('message', {
              required: 'Por favor escribe un mensaje',
              maxLength: {
                value: maxChars,
                message: `El mensaje no puede exceder ${maxChars} caracteres`
              },
              validate: (value) => value.trim().length > 0 || 'El mensaje no puede estar vacío'
            })}
            placeholder="Escribe aquí tus buenos deseos, consejos o recuerdos..."
            rows={5}
            className="w-full px-4 py-3 border-2 border-newspaper-gray-400 rounded-sm font-sans text-sm leading-relaxed focus:outline-none focus:border-newspaper-black transition-colors resize-none"
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p className="text-xs text-red-600 font-semibold">{errors.message.message}</p>
            ) : (
              <span />
            )}
            <p className={`text-xs font-sans ${
              charsRemaining < 50 ? 'text-red-600 font-semibold' : 'text-newspaper-gray-600'
            }`}>
              {charsRemaining} caracteres restantes
            </p>
          </div>
        </div>

        {/* Checkbox público */}
        <div className="flex items-start gap-3 p-4 bg-newspaper-gray-50 border border-newspaper-gray-300 rounded-sm">
          <input
            {...register('isPublic')}
            type="checkbox"
            id="isPublic"
            className="mt-1 w-5 h-5 accent-newspaper-black cursor-pointer"
            disabled={isSubmitting}
          />
          <label htmlFor="isPublic" className="flex-1 cursor-pointer">
            <span className="block font-serif font-semibold text-sm text-newspaper-black">
              Permitir mostrar públicamente
            </span>
            <span className="block text-xs text-newspaper-gray-700 mt-1">
              {isPublicValue
                ? `Tu mensaje podrá aparecer en la página de la boda (máx. ${MAX_CHARS_PUBLIC} caracteres)`
                : `Mensaje privado solo para los novios (máx. ${MAX_CHARS_PRIVATE} caracteres)`
              }
            </span>
          </label>
        </div>

        {/* Botón submit - solo mostrar si no está en modal */}
        {showSubmitButton && (
          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
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
        )}
      </form>

      {/* Nota informativa */}
      {!hideWrapper && (
        <p className="text-xs text-center text-newspaper-gray-600 mt-4 font-sans italic">
          Tu mensaje será enviado directamente a la pareja
        </p>
      )}
    </div>
  );
});

MessageForm.displayName = 'MessageForm';
