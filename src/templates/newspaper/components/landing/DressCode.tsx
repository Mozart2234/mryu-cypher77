/**
 * COMPONENTE DRESS CODE - CÓDIGO DE VESTIMENTA
 *
 * Recuadro informativo tipo periódico con el dress code
 */

import { eventConfig } from '@/config/eventConfig';
import { Shirt, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function DressCode() {
  const { dressCode } = eventConfig;
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      ref={elementRef}
      className={`newspaper-page py-12 px-4 md:px-8 bg-white transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Título de sección estilo titular de periódico */}
        <div className="text-center mb-12">
          <div className="newspaper-divider-thick mb-6"></div>
          <h2 className="newspaper-subheadline mb-3">
            {dressCode.title}
          </h2>
          <p className="newspaper-meta mb-2">
            {dressCode.subtitle}
          </p>
          <div className="newspaper-divider-thick mt-6"></div>
          <p className="newspaper-body text-center mt-6 max-w-2xl mx-auto italic text-newspaper-gray-700">
            Para mantener la elegancia y armonía del evento, te pedimos considerar estas recomendaciones
          </p>
        </div>

        {/* Grid de dress code estilo columnas de periódico */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Mujeres */}
          <div className="bg-white border-2 border-newspaper-black overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            {/* Header estilo periódico */}
            <div className="bg-newspaper-black text-white p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-newspaper-black" />
              </div>
              <h3 className="newspaper-subheadline mb-2 text-white">
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
                    <li key={index} className="border-l-2 border-newspaper-gray-400 pl-4 py-2">
                      <div className="flex items-start gap-3">
                        <span className="font-headline text-2xl font-bold text-newspaper-gray-400 shrink-0 leading-none">
                          {isAvoid ? '✗' : '✓'}
                        </span>
                        <span className={`newspaper-body ${isAvoid ? 'text-newspaper-gray-700 italic' : 'text-newspaper-black'
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
            <div className="border-t-2 border-newspaper-black p-4 bg-white text-center">
              <p className="font-headline text-sm uppercase tracking-widest text-newspaper-gray-600">
                Elegancia Femenina
              </p>
            </div>
          </div>

          {/* Hombres */}
          <div className="bg-white border-2 border-newspaper-black overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            {/* Header estilo periódico */}
            <div className="bg-newspaper-gray-900 text-white p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-8 h-8 text-newspaper-black" />
              </div>
              <h3 className="newspaper-subheadline mb-2 text-white">
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
                    <li key={index} className="border-l-2 border-newspaper-gray-400 pl-4 py-2">
                      <div className="flex items-start gap-3">
                        <span className="font-headline text-2xl font-bold text-newspaper-gray-400 shrink-0 leading-none">
                          {isAvoid ? '✗' : '✓'}
                        </span>
                        <span className={`newspaper-body ${isAvoid ? 'text-newspaper-gray-700 italic' : 'text-newspaper-black'
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
            <div className="border-t-2 border-newspaper-black p-4 bg-white text-center">
              <p className="font-headline text-sm uppercase tracking-widest text-newspaper-gray-600">
                Estilo Formal Caballeros
              </p>
            </div>
          </div>
        </div>

        {/* Temática de colores */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-newspaper-gray-50 border-2 border-newspaper-black p-8">
            <h3 className="newspaper-title text-center mb-6">Nuestra Temática de Color</h3>

            {/* Descripción de la temática */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-[#b3d9ff] border-2 border-newspaper-black rounded-full"></div>
                <p className="newspaper-body text-newspaper-black font-bold text-lg">
                  Celeste Bebé
                </p>
              </div>
              <p className="newspaper-body text-newspaper-gray-700 max-w-2xl mx-auto">
                Hemos elegido el <strong>celeste bebé</strong> como color principal de nuestra celebración.
                Siéntete libre de elegir cualquier color elegante para tu vestimenta,
                excepto los que se mencionan a continuación.
              </p>
            </div>

            {/* Colores a evitar */}
            <div>
              <h4 className="font-serif font-bold text-sm uppercase mb-6 text-center text-newspaper-gray-700">
                ✗ Por favor evitar estos colores
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
                {/* Blanco */}
                <div className="flex flex-col items-center group">
                  <div className="w-full aspect-square bg-white border-2 border-newspaper-gray-400 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl text-red-600 font-bold">✗</span>
                    </div>
                  </div>
                  <span className="text-xs mt-2 font-sans text-center text-newspaper-gray-600 font-semibold">Blanco</span>
                </div>
                {/* Marfil */}
                <div className="flex flex-col items-center group">
                  <div className="w-full aspect-square bg-[#fffff0] border-2 border-newspaper-gray-400 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl text-red-600 font-bold">✗</span>
                    </div>
                  </div>
                  <span className="text-xs mt-2 font-sans text-center text-newspaper-gray-600 font-semibold">Marfil</span>
                </div>
                {/* Beige */}
                <div className="flex flex-col items-center group">
                  <div className="w-full aspect-square bg-[#f5f5dc] border-2 border-newspaper-gray-400 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl text-red-600 font-bold">✗</span>
                    </div>
                  </div>
                  <span className="text-xs mt-2 font-sans text-center text-newspaper-gray-600 font-semibold">Beige</span>
                </div>
                {/* Crema */}
                <div className="flex flex-col items-center group">
                  <div className="w-full aspect-square bg-[#fffdd0] border-2 border-newspaper-gray-400 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl text-red-600 font-bold">✗</span>
                    </div>
                  </div>
                  <span className="text-xs mt-2 font-sans text-center text-newspaper-gray-600 font-semibold">Crema</span>
                </div>
              </div>
              <p className="text-sm text-center mt-6 text-newspaper-gray-700 italic">
                Estos colores están reservados para la novia
              </p>
            </div>
          </div>
        </div>

        {/* Nota especial estilo editorial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-newspaper-gray-50 border-2 border-newspaper-black p-8 md:p-12">
            <div className="text-center mb-6">
              <div className="inline-block bg-newspaper-black text-white px-6 py-2 mb-4">
                <p className="font-headline text-sm uppercase tracking-widest">
                  Nota Editorial
                </p>
              </div>
            </div>

            <div className="newspaper-divider-thin mb-6"></div>

            <p className="newspaper-body text-center mb-6 text-newspaper-black">
              Estas sugerencias nos ayudarán a mantener la <strong>elegancia y solemnidad</strong> que deseamos
              para nuestra celebración. Tu cooperación significa mucho para nosotros y hará que este día
              sea aún más especial.
            </p>

            <div className="newspaper-divider-thin mb-6"></div>

            <p className="newspaper-body text-center italic text-newspaper-gray-700">
              Con cariño,
            </p>
            <p className="newspaper-title text-center mt-2">
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
