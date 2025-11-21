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
      id="dress-code"
      className={`newspaper-page py-6 px-4 md:py-8 md:px-8 bg-white transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Título de sección - MÁS COMPACTO */}
        <div className="text-center mb-6">
          <div className="newspaper-divider-thick mb-3"></div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-newspaper-black mb-2">
            {dressCode.title}
          </h2>
          <p className="text-xs uppercase tracking-wide text-newspaper-gray-600">
            {dressCode.subtitle}
          </p>
          <div className="newspaper-divider-thick mt-3"></div>
          <p className="text-sm text-center mt-4 max-w-2xl mx-auto italic text-newspaper-gray-700 leading-relaxed">
            Para mantener la elegancia y armonía del evento, te pedimos considerar estas recomendaciones
          </p>
        </div>

        {/* Grid de dress code - MÁS COMPACTO */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Mujeres - MÁS COMPACTO */}
          <div className="bg-white border-2 border-newspaper-black overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Header más compacto */}
            <div className="bg-newspaper-black text-white p-4 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6 text-newspaper-black" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                {dressCode.women.title}
              </h3>
              <div className="w-16 h-0.5 bg-white mx-auto mt-2"></div>
            </div>

            {/* Contenido más compacto */}
            <div className="p-4 bg-newspaper-gray-50">
              <ul className="space-y-2.5">
                {dressCode.women.items.map((item: any, index: number) => {
                  const isAvoid = item.toLowerCase().includes('evitar');
                  return (
                    <li key={index} className="border-l-2 border-newspaper-gray-400 pl-3 py-1">
                      <div className="flex items-start gap-2">
                        <span className="text-lg font-bold text-newspaper-gray-400 shrink-0 leading-none">
                          {isAvoid ? '✗' : '✓'}
                        </span>
                        <span className={`text-sm ${isAvoid ? 'text-newspaper-gray-700 italic' : 'text-newspaper-black'
                          }`}>
                          {item}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer más compacto */}
            <div className="border-t-2 border-newspaper-black p-2 bg-white text-center">
              <p className="text-xs uppercase tracking-widest text-newspaper-gray-600 font-bold">
                Elegancia Femenina
              </p>
            </div>
          </div>

          {/* Hombres - MÁS COMPACTO */}
          <div className="bg-white border-2 border-newspaper-black overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Header más compacto */}
            <div className="bg-newspaper-gray-900 text-white p-4 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Shirt className="w-6 h-6 text-newspaper-black" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                {dressCode.men.title}
              </h3>
              <div className="w-16 h-0.5 bg-white mx-auto mt-2"></div>
            </div>

            {/* Contenido más compacto */}
            <div className="p-4 bg-newspaper-gray-50">
              <ul className="space-y-2.5">
                {dressCode.men.items.map((item: any, index: number) => {
                  const isAvoid = item.toLowerCase().includes('evitar');
                  return (
                    <li key={index} className="border-l-2 border-newspaper-gray-400 pl-3 py-1">
                      <div className="flex items-start gap-2">
                        <span className="text-lg font-bold text-newspaper-gray-400 shrink-0 leading-none">
                          {isAvoid ? '✗' : '✓'}
                        </span>
                        <span className={`text-sm ${isAvoid ? 'text-newspaper-gray-700 italic' : 'text-newspaper-black'
                          }`}>
                          {item}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer más compacto */}
            <div className="border-t-2 border-newspaper-black p-2 bg-white text-center">
              <p className="text-xs uppercase tracking-widest text-newspaper-gray-600 font-bold">
                Estilo Formal Caballeros
              </p>
            </div>
          </div>
        </div>

        {/* Temática de colores - MÁS COMPACTA */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="bg-newspaper-gray-50 border-2 border-newspaper-black p-4 md:p-6">
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
