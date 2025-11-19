/**
 * SECCIÓN CTA
 *
 * Call-to-action destacado para insertar en puntos estratégicos
 * de la landing page
 */

import { Ticket, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  variant?: 'primary' | 'secondary';
  onOpenModal: () => void;
}

export function CTASection({ variant = 'primary', onOpenModal }: CTASectionProps) {
  const isPrimary = variant === 'primary';

  return (
    <div className={`w-full ${isPrimary ? 'py-16' : 'py-12'} px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`
            ${isPrimary ? 'bg-newspaper-black' : 'bg-newspaper-gray-100'}
            ${isPrimary ? 'text-white' : 'text-newspaper-black'}
            rounded-lg p-8 md:p-12
            border-4 border-newspaper-black
            shadow-xl
            text-center
          `}
        >
          <div className="flex justify-center mb-6">
            <div
              className={`
                ${isPrimary ? 'bg-white' : 'bg-newspaper-black'}
                ${isPrimary ? 'text-newspaper-black' : 'text-white'}
                w-16 h-16 rounded-full flex items-center justify-center
              `}
            >
              <Ticket className="w-8 h-8" />
            </div>
          </div>

          <h2 className="newspaper-subheadline mb-4">
            {isPrimary ? '¿Ya tienes tu código?' : 'Accede a Tu Invitación'}
          </h2>

          <p
            className={`
              newspaper-body mb-8 max-w-2xl mx-auto
              ${isPrimary ? 'text-newspaper-gray-200' : 'text-newspaper-gray-700'}
            `}
          >
            {isPrimary
              ? 'Ingresa tu código de invitación para ver tu pase digital personalizado con código QR y todos los detalles del evento.'
              : 'Tu invitación digital te está esperando. Solo necesitas tu código único para acceder.'}
          </p>

          <button
            onClick={onOpenModal}
            className={`
              inline-flex items-center gap-3 px-8 py-4 rounded-lg
              newspaper-body font-semibold
              transition-all duration-300 hover:scale-105 shadow-lg
              ${
                isPrimary
                  ? 'bg-white text-newspaper-black hover:bg-newspaper-gray-100'
                  : 'bg-newspaper-black text-white hover:bg-newspaper-gray-800'
              }
            `}
          >
            <span>Ver Mi Invitación</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p
            className={`
              newspaper-meta mt-6
              ${isPrimary ? 'text-newspaper-gray-400' : 'text-newspaper-gray-600'}
            `}
          >
            Tu código fue enviado por WhatsApp o correo electrónico
          </p>
        </div>
      </div>
    </div>
  );
}
