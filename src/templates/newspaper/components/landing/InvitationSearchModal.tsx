/**
 * MODAL DE BÚSQUEDA DE INVITACIÓN
 *
 * Modal para que los invitados busquen su pase digital
 * ingresando su código de invitación
 * Refactorizado con React Hook Form
 */

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { X, Search, Ticket, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InvitationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchFormData {
  code: string;
}

export function InvitationSearchModal({ isOpen, onClose }: InvitationSearchModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SearchFormData>({
    defaultValues: {
      code: ''
    }
  });

  // Trap focus dentro del modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Trap focus
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, input, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const onSubmit = async (data: SearchFormData) => {
    const normalizedCode = data.code.trim().toUpperCase();

    // Simular pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // Navegar al pase digital con el código
    navigate(`/invitacion/${normalizedCode}`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-newspaper-black/70 z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-2xl max-w-md w-full animate-fade-in"
        >
          {/* Header */}
          <div className="bg-newspaper-black text-white p-6 rounded-t-lg relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-newspaper-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-newspaper-black rounded-lg p-1"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-3">
              <Ticket className="w-8 h-8" aria-hidden="true" />
              <div>
                <h2 id="modal-title" className="font-headline text-2xl font-bold">
                  Ver Mi Invitación
                </h2>
                <p id="modal-description" className="font-serif text-base text-newspaper-gray-300 mt-1">
                  Ingresa tu código para acceder
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="mb-6">
              <label
                htmlFor="invitation-code"
                className="block font-headline text-base font-bold text-newspaper-gray-700 mb-2 uppercase tracking-wide"
              >
                Código de Invitación
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-newspaper-gray-400" aria-hidden="true" />
                <input
                  {...register('code', {
                    required: 'Por favor ingresa tu código de invitación',
                    pattern: {
                      value: /^[A-Z]{3}-\d{4}$/i,
                      message: 'El código debe tener el formato WED-1234'
                    },
                    setValueAs: (value) => value.toUpperCase()
                  })}
                  id="invitation-code"
                  type="text"
                  placeholder="Ej: WED-1234"
                  className="w-full pl-11 pr-4 py-3 border-2 border-newspaper-gray-300 rounded-lg font-mono text-lg uppercase focus:ring-4 focus:ring-newspaper-black focus:border-newspaper-black outline-none transition-all"
                  autoFocus
                  aria-invalid={!!errors.code}
                  aria-describedby={errors.code ? 'code-error' : 'code-help'}
                />
              </div>
              {errors.code && (
                <div id="code-error" className="mt-3 bg-red-50 border-2 border-red-600 rounded-lg p-3 flex items-start gap-2" role="alert">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-base font-semibold text-red-900 font-headline">
                      Código inválido
                    </p>
                    <p className="text-sm text-red-700 font-serif mt-0.5">
                      {errors.code.message}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div id="code-help" className="bg-newspaper-gray-100 p-4 rounded-lg mb-6">
              <p className="font-serif text-base text-newspaper-gray-700">
                <strong className="font-headline font-bold">¿Dónde encuentro mi código?</strong>
                <br />
                Tu código fue enviado por WhatsApp o correo electrónico.
                Tiene el formato <code className="bg-white px-2 py-1 rounded font-mono text-sm">WED-XXXX</code>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border-2 border-newspaper-gray-300 text-newspaper-gray-700 rounded-lg font-sans font-medium hover:bg-newspaper-gray-100 transition-colors focus:outline-none focus:ring-4 focus:ring-newspaper-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-newspaper-black text-white rounded-lg font-sans font-medium hover:bg-newspaper-gray-800 transition-all hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-newspaper-black focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  'Ver Invitación'
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="border-t border-newspaper-gray-200 px-6 py-4 bg-newspaper-gray-50 rounded-b-lg">
            <p className="font-serif text-sm text-newspaper-gray-600 text-center">
              ¿Problemas con tu código? Contacta a los organizadores
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
