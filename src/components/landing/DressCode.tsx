/**
 * COMPONENTE DRESS CODE - CÓDIGO DE VESTIMENTA
 *
 * Recuadro informativo tipo periódico con el dress code
 */

import { eventConfig } from '@/config/eventConfig';
import { User, Users, CheckCircle, X } from 'lucide-react';

export function DressCode() {
  const { dressCode } = eventConfig;

  return (
    <section className="newspaper-page py-12 px-4 md:px-8 bg-newspaper-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-12">
          <div className="inline-block newspaper-box mb-6 px-8 py-4 border-4 border-newspaper-black">
            <h2 className="newspaper-subheadline mb-2">
              {dressCode.title}
            </h2>
            <p className="font-serif text-lg text-newspaper-black font-bold">
              {dressCode.subtitle}
            </p>
          </div>
          <div className="newspaper-divider-thick"></div>
        </div>

        {/* Grid de dress code estilo periódico */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mujeres */}
          <div className="bg-white border-4 border-newspaper-black overflow-hidden">
            {/* Header */}
            <div className="bg-newspaper-gray-100 border-b-4 border-newspaper-black p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-newspaper-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-newspaper-black" />
                </div>
                <h3 className="font-headline text-3xl font-bold text-newspaper-black">
                  {dressCode.women.title}
                </h3>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <ul className="space-y-4">
                {dressCode.women.items.map((item, index) => {
                  const isProhibition = item.includes('NO');
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-newspaper-gray-200 border border-newspaper-gray-400">
                        {isProhibition ? (
                          <X className="w-4 h-4 text-newspaper-black" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-newspaper-black" />
                        )}
                      </div>
                      <span className={`font-sans text-base leading-relaxed ${
                        isProhibition ? 'text-newspaper-black font-bold' : 'text-newspaper-gray-800'
                      }`}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer decorativo */}
            <div className="border-t-2 border-newspaper-gray-300 p-4 bg-newspaper-gray-50">
              <p className="newspaper-page-number text-center">Vestimenta de gala para damas</p>
            </div>
          </div>

          {/* Hombres */}
          <div className="bg-white border-4 border-newspaper-black overflow-hidden">
            {/* Header */}
            <div className="bg-newspaper-gray-100 border-b-4 border-newspaper-black p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-newspaper-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-newspaper-black" />
                </div>
                <h3 className="font-headline text-3xl font-bold text-newspaper-black">
                  {dressCode.men.title}
                </h3>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <ul className="space-y-4">
                {dressCode.men.items.map((item, index) => {
                  const isProhibition = item.includes('NO');
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-newspaper-gray-200 border border-newspaper-gray-400">
                        {isProhibition ? (
                          <X className="w-4 h-4 text-newspaper-black" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-newspaper-black" />
                        )}
                      </div>
                      <span className={`font-sans text-base leading-relaxed ${
                        isProhibition ? 'text-newspaper-black font-bold' : 'text-newspaper-gray-800'
                      }`}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer decorativo */}
            <div className="border-t-2 border-newspaper-gray-300 p-4 bg-newspaper-gray-50">
              <p className="newspaper-page-number text-center">Traje formal obligatorio para caballeros</p>
            </div>
          </div>
        </div>

        {/* Nota importante */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-newspaper-gray-100 border-4 border-newspaper-black p-6">
            <p className="text-center font-serif text-newspaper-black leading-relaxed">
              <span className="font-bold uppercase text-xl block mb-2">⚠ AVISO IMPORTANTE ⚠</span>
              <span className="font-semibold">El código de vestimenta es de cumplimiento obligatorio para todos los invitados.</span>
              <br />
              <span className="text-base mt-2 block">
                Se reserva el derecho de admisión. Agradecemos su comprensión y colaboración para mantener
                la elegancia y solemnidad de esta celebración religiosa.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
