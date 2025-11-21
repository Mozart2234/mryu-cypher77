/**
 * SECCIÓN CTA
 *
 * Call-to-action destacado estilo periódico con estética editorial
 */

import { Ticket, ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  variant?: 'primary' | 'secondary';
  onOpenModal: () => void;
}

export function CTASection({ variant = 'primary', onOpenModal }: CTASectionProps) {
  const isPrimary = variant === 'primary';

  if (isPrimary) {
    return (
      <div className="w-full py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Estilo Anuncio Clasificado de Periódico */}
          <div className="bg-white border-8 border-double border-newspaper-black p-1">
            <div className="border-2 border-newspaper-black p-6 md:p-10 text-center relative">
              {/* Esquinas decorativas */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-newspaper-black"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-newspaper-black"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-newspaper-black"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-newspaper-black"></div>

              {/* Kicker */}
              <div className="inline-block bg-newspaper-black text-white px-4 py-1 mb-4">
                <span className="font-headline text-[10px] uppercase tracking-[0.3em]">
                  ★ Aviso Importante ★
                </span>
              </div>

              {/* Headline principal */}
              <h2 className="font-headline text-3xl md:text-4xl font-black text-newspaper-black mb-3 leading-tight">
                ¿YA TIENES TU CÓDIGO?
              </h2>

              {/* Línea decorativa */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-newspaper-black"></div>
                <Ticket className="w-5 h-5 text-newspaper-black" />
                <div className="w-12 h-0.5 bg-newspaper-black"></div>
              </div>

              {/* Descripción */}
              <p className="font-serif text-base md:text-lg text-newspaper-gray-700 mb-6 max-w-xl mx-auto leading-relaxed">
                Ingresa tu código de invitación para ver tu <strong>pase digital personalizado</strong> con código QR y todos los detalles del evento.
              </p>

              {/* Botón CTA Grande */}
              <button
                onClick={onOpenModal}
                className="group relative inline-flex items-center justify-center gap-3 bg-newspaper-black text-white px-10 py-5 font-headline text-sm md:text-base uppercase tracking-wider hover:bg-newspaper-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              >
                <span className="relative z-10">Ver Mi Invitación</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              {/* Nota al pie */}
              <p className="font-sans text-xs text-newspaper-gray-500 mt-5 italic">
                Tu código fue enviado por WhatsApp o correo electrónico
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variante secundaria - Estilo Banner de Periódico
  return (
    <div className="w-full py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-newspaper-gray-100 border-4 border-newspaper-black relative overflow-hidden">
          {/* Patrón de fondo estilo periódico */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                #000 2px,
                #000 3px
              )`
            }}></div>
          </div>

          <div className="relative z-10 p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Icono decorativo */}
              <div className="shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-newspaper-black flex items-center justify-center border-4 border-newspaper-gray-400">
                  <Ticket className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-newspaper-accent" />
                  <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-newspaper-gray-600">
                    Acceso Digital
                  </span>
                </div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-newspaper-black mb-2">
                  Accede a Tu Invitación
                </h2>
                <p className="font-serif text-sm md:text-base text-newspaper-gray-700">
                  Tu invitación digital te está esperando. Solo necesitas tu código único.
                </p>
              </div>

              {/* Botón */}
              <div className="shrink-0">
                <button
                  onClick={onOpenModal}
                  className="group flex items-center gap-3 bg-newspaper-black text-white px-8 py-4 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                >
                  <span>Ver Mi Invitación</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
