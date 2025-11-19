/**
 * COMPONENTE DRESS CODE - CÓDIGO DE VESTIMENTA
 *
 * Recuadro informativo tipo periódico con el dress code
 */

import { eventConfig } from '@/config/eventConfig';
import { Shirt, Sparkles } from 'lucide-react';

export function DressCode() {
  const { dressCode } = eventConfig;

  return (
    <section className="newspaper-page py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Título de sección estilo titular de periódico */}
        <div className="text-center mb-12">
          <div className="newspaper-divider-thick mb-6"></div>
          <h2 className="newspaper-headline text-4xl md:text-5xl mb-3">
            {dressCode.title}
          </h2>
          <p className="newspaper-meta text-lg mb-2">
            {dressCode.subtitle}
          </p>
          <div className="newspaper-divider-thick mt-6"></div>
          <p className="newspaper-body text-center mt-6 max-w-2xl mx-auto italic text-newspaper-gray-700">
            Para mantener la elegancia y armonía del evento, te pedimos considerar estas recomendaciones
          </p>
        </div>

        {/* Grid de dress code estilo columnas de periódico */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Mujeres */}
          <div className="bg-white border-4 border-newspaper-black overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {/* Header estilo periódico */}
            <div className="bg-newspaper-black text-white p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-newspaper-black" />
              </div>
              <h3 className="font-headline text-4xl font-bold mb-2">
                {dressCode.women.title}
              </h3>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>

            {/* Contenido */}
            <div className="p-8 bg-newspaper-gray-50">
              <ul className="space-y-5">
                {dressCode.women.items.map((item: any, index: number) => {
                  const isAvoid = item.toLowerCase().includes('evitar');
                  return (
                    <li key={index} className="border-l-4 border-newspaper-gray-400 pl-4 py-2">
                      <div className="flex items-start gap-3">
                        <span className="font-headline text-2xl font-bold text-newspaper-gray-400 shrink-0 leading-none">
                          {isAvoid ? '✗' : '✓'}
                        </span>
                        <span className={`newspaper-body text-base leading-relaxed ${
                          isAvoid ? 'text-newspaper-gray-700 italic' : 'text-newspaper-black'
                        }`}>
                          {item}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer con icono */}
            <div className="border-t-4 border-newspaper-black p-4 bg-white text-center">
              <p className="font-headline text-sm uppercase tracking-widest text-newspaper-gray-600">
                Elegancia Femenina
              </p>
            </div>
          </div>

          {/* Hombres */}
          <div className="bg-white border-4 border-newspaper-black overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {/* Header estilo periódico */}
            <div className="bg-newspaper-gray-900 text-white p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-8 h-8 text-newspaper-black" />
              </div>
              <h3 className="font-headline text-4xl font-bold mb-2">
                {dressCode.men.title}
              </h3>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>

            {/* Contenido */}
            <div className="p-8 bg-newspaper-gray-50">
              <ul className="space-y-5">
                {dressCode.men.items.map((item: any, index: number) => {
                  const isAvoid = item.toLowerCase().includes('evitar');
                  return (
                    <li key={index} className="border-l-4 border-newspaper-gray-400 pl-4 py-2">
                      <div className="flex items-start gap-3">
                        <span className="font-headline text-2xl font-bold text-newspaper-gray-400 shrink-0 leading-none">
                          {isAvoid ? '✗' : '✓'}
                        </span>
                        <span className={`newspaper-body text-base leading-relaxed ${
                          isAvoid ? 'text-newspaper-gray-700 italic' : 'text-newspaper-black'
                        }`}>
                          {item}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer con icono */}
            <div className="border-t-4 border-newspaper-black p-4 bg-white text-center">
              <p className="font-headline text-sm uppercase tracking-widest text-newspaper-gray-600">
                Estilo Formal Caballeros
              </p>
            </div>
          </div>
        </div>

        {/* Nota especial estilo editorial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-newspaper-gray-50 border-4 border-newspaper-black p-8 md:p-12">
            <div className="text-center mb-6">
              <div className="inline-block bg-newspaper-black text-white px-6 py-2 mb-4">
                <p className="font-headline text-sm uppercase tracking-widest">
                  Nota Editorial
                </p>
              </div>
            </div>

            <div className="newspaper-divider-thin mb-6"></div>

            <p className="font-serif text-lg text-newspaper-black leading-relaxed text-center mb-6">
              Estas sugerencias nos ayudarán a mantener la <strong>elegancia y solemnidad</strong> que deseamos
              para nuestra celebración. Tu cooperación significa mucho para nosotros y hará que este día
              sea aún más especial.
            </p>

            <div className="newspaper-divider-thin mb-6"></div>

            <p className="font-serif text-base text-center italic text-newspaper-gray-700">
              Con cariño,
            </p>
            <p className="font-headline text-xl text-center font-bold text-newspaper-black mt-2">
              Alexei y Estephanie
            </p>

            {/* Elemento decorativo */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-2 h-2 bg-newspaper-black rotate-45"></div>
              <div className="w-2 h-2 bg-newspaper-black rotate-45"></div>
              <div className="w-2 h-2 bg-newspaper-black rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
