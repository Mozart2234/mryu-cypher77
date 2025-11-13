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
          <div className="inline-block newspaper-box mb-6 px-8 py-4">
            <h2 className="newspaper-subheadline mb-2">
              {dressCode.title}
            </h2>
            <p className="font-serif text-lg text-newspaper-accent">
              {dressCode.subtitle}
            </p>
          </div>
          <div className="newspaper-divider-thick"></div>
        </div>

        {/* Grid de dress code con diseño mejorado */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mujeres */}
          <div className="bg-white border-4 border-newspaper-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Header con icono */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b-4 border-newspaper-black p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-pink-800" />
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
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isProhibition ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        {isProhibition ? (
                          <X className="w-4 h-4 text-red-700" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-700" />
                        )}
                      </div>
                      <span className={`font-sans text-base leading-relaxed ${
                        isProhibition ? 'text-red-800 font-bold' : 'text-newspaper-gray-800'
                      }`}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer decorativo */}
            <div className="border-t-2 border-newspaper-gray-200 p-4 bg-newspaper-gray-50">
              <p className="newspaper-page-number text-center">Estilo femenino elegante</p>
            </div>
          </div>

          {/* Hombres */}
          <div className="bg-white border-4 border-newspaper-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Header con icono */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-4 border-newspaper-black p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-800" />
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
                  const isProhibition = item.toLowerCase().includes('no tenis');
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isProhibition ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        {isProhibition ? (
                          <X className="w-4 h-4 text-red-700" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-700" />
                        )}
                      </div>
                      <span className={`font-sans text-base leading-relaxed ${
                        isProhibition ? 'text-red-800 font-bold' : 'text-newspaper-gray-800'
                      }`}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer decorativo */}
            <div className="border-t-2 border-newspaper-gray-200 p-4 bg-newspaper-gray-50">
              <p className="newspaper-page-number text-center">Estilo masculino formal</p>
            </div>
          </div>
        </div>

        {/* Nota importante */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-yellow-50 border-4 border-yellow-300 p-6 rounded-lg">
            <p className="text-center font-serif text-newspaper-gray-800 leading-relaxed">
              <span className="font-bold text-newspaper-black">Nota importante:</span> Agradecemos tu cooperación
              al seguir el código de vestimenta. Esto nos ayuda a mantener la elegancia y formalidad del evento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
