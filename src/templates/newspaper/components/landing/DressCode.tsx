/**
 * COMPONENTE DRESS CODE - SECCIÓN DE MODA
 *
 * Diseño estilo sección de moda de periódico con
 * layout editorial creativo
 */

import { eventConfig } from '@/config/eventConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Check, X, Sparkle, Scissors } from 'lucide-react';

export function DressCode() {
  const { dressCode } = eventConfig;
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      ref={elementRef}
      id="dress-code"
      className={`newspaper-page py-8 px-4 md:py-12 md:px-8 bg-newspaper-gray-100 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header estilo sección de moda */}
        <div className="text-center mb-8">
          <div className="inline-block border-t-4 border-b-4 border-newspaper-black px-8 py-3 mb-4">
            <p className="font-headline text-sm uppercase tracking-[0.25em] text-newspaper-gray-700">
              Sección Estilo & Moda
            </p>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-black text-newspaper-black uppercase tracking-tight mb-3">
            {dressCode.title}
          </h2>
          <p className="font-serif text-lg italic text-newspaper-gray-700">
            {dressCode.subtitle}
          </p>
        </div>

        {/* Layout tipo revista de moda */}
        <div className="grid md:grid-cols-2 gap-0 mb-8 border-2 border-newspaper-black bg-white">
          {/* DAMAS - Lado izquierdo */}
          <div className="relative border-b-2 md:border-b-0 md:border-r-2 border-newspaper-black">
            {/* Etiqueta superior */}
            <div className="absolute -top-4 left-4 bg-newspaper-black text-white px-4 py-1.5 z-10">
              <span className="font-headline text-sm uppercase tracking-widest">Para Ella</span>
            </div>

            <div className="p-6 md:p-8 pt-8">
              {/* Ilustración estilo editorial */}
              <div className="text-center mb-6">
                <div className="inline-block relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 border-4 border-newspaper-black bg-newspaper-gray-100 flex items-center justify-center">
                    <span className="font-headline text-4xl md:text-5xl font-black">D</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-newspaper-black text-white px-3 py-1">
                    <span className="font-headline text-xs uppercase tracking-widest">Formal</span>
                  </div>
                </div>
              </div>

              {/* Título estilo magazine */}
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-center mb-2 uppercase tracking-wide">
                Damas
              </h3>
              <p className="text-center text-sm uppercase tracking-widest text-newspaper-gray-600 mb-6">
                Guía de vestimenta elegante
              </p>

              {/* Lista con estilo editorial */}
              <div className="space-y-4">
                {dressCode.women.items.map((item: string, index: number) => {
                  const isAvoid = item.toLowerCase().includes('evitar');
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 ${isAvoid
                          ? 'bg-newspaper-gray-200 border-l-4 border-newspaper-gray-500'
                          : 'bg-newspaper-gray-50 border-l-4 border-newspaper-black'
                        }`}
                    >
                      <span className={`font-headline text-xl ${isAvoid ? 'text-newspaper-gray-500' : 'text-newspaper-black'}`}>
                        {isAvoid ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                      </span>
                      <span className={`font-serif text-base leading-relaxed ${isAvoid ? 'text-newspaper-gray-600 italic' : 'text-newspaper-gray-800'
                        }`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Tip de estilo */}
              <div className="mt-6 p-4 bg-newspaper-black text-white">
                <p className="font-headline text-sm uppercase tracking-wider mb-1">Tip de Estilo</p>
                <p className="font-serif text-base italic">
                  "La elegancia es la única belleza que nunca se desvanece"
                </p>
              </div>
            </div>
          </div>

          {/* CABALLEROS - Lado derecho */}
          <div className="relative">
            {/* Etiqueta superior */}
            <div className="absolute -top-4 right-4 bg-newspaper-gray-800 text-white px-4 py-1.5 z-10">
              <span className="font-headline text-sm uppercase tracking-widest">Para Él</span>
            </div>

            <div className="p-6 md:p-8 pt-8">
              {/* Ilustración estilo editorial */}
              <div className="text-center mb-6">
                <div className="inline-block relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 border-4 border-newspaper-gray-800 bg-newspaper-gray-100 flex items-center justify-center">
                    <span className="font-headline text-4xl md:text-5xl font-black">C</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-newspaper-gray-800 text-white px-3 py-1">
                    <span className="font-headline text-xs uppercase tracking-widest">Formal</span>
                  </div>
                </div>
              </div>

              {/* Título estilo magazine */}
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-center mb-2 uppercase tracking-wide">
                Caballeros
              </h3>
              <p className="text-center text-sm uppercase tracking-widest text-newspaper-gray-600 mb-6">
                Código de vestimenta formal
              </p>

              {/* Lista con estilo editorial */}
              <div className="space-y-4">
                {dressCode.men.items.map((item: string, index: number) => {
                  const isAvoid = item.toLowerCase().includes('evitar');
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 ${isAvoid
                          ? 'bg-newspaper-gray-200 border-l-4 border-newspaper-gray-500'
                          : 'bg-newspaper-gray-50 border-l-4 border-newspaper-gray-800'
                        }`}
                    >
                      <span className={`font-headline text-xl ${isAvoid ? 'text-newspaper-gray-500' : 'text-newspaper-gray-800'}`}>
                        {isAvoid ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                      </span>
                      <span className={`font-serif text-base leading-relaxed ${isAvoid ? 'text-newspaper-gray-600 italic' : 'text-newspaper-gray-800'
                        }`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Tip de estilo */}
              <div className="mt-6 p-4 bg-newspaper-gray-800 text-white">
                <p className="font-headline text-sm uppercase tracking-wider mb-1">Tip de Estilo</p>
                <p className="font-serif text-base italic">
                  "Un caballero se distingue por los detalles"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PALETA DE COLORES - Estilo catálogo de moda */}
        <div className="bg-white border-2 border-newspaper-black mb-8">
          {/* Header de sección */}
          <div className="bg-newspaper-black text-white p-4 text-center">
            <h3 className="font-headline text-xl md:text-2xl uppercase tracking-widest">
              Paleta de Colores de la Celebración
            </h3>
          </div>

          <div className="p-6 md:p-8">
            {/* Color principal */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#b3d9ff] border-4 border-newspaper-black shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]"></div>
                <div className="absolute -bottom-3 -right-3 bg-newspaper-black text-white px-3 py-1.5">
                  <span className="font-headline text-sm uppercase tracking-wider">Principal</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-headline text-3xl md:text-4xl font-black uppercase mb-2">Celeste Bebé</h4>
                <p className="font-serif text-newspaper-gray-700 max-w-sm">
                  El color que simboliza la <strong>tranquilidad y ternura</strong> de nuestro amor.
                  Siéntete libre de usar cualquier color elegante.
                </p>
              </div>
            </div>

            {/* Separador decorativo */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 border-t-2 border-newspaper-gray-300"></div>
              <span className="font-headline text-base uppercase tracking-widest text-newspaper-gray-500">Colores Prohibidos</span>
              <div className="flex-1 border-t-2 border-newspaper-gray-300"></div>
            </div>

            {/* Colores prohibidos - estilo muestras de tela */}
            <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
              {[
                { name: 'Blanco', color: '#ffffff', reason: 'Reservado para la novia' },
                { name: 'Marfil', color: '#fffff0', reason: 'Muy similar al vestido' },
                { name: 'Beige', color: '#f5f5dc', reason: 'Tonos claros prohibidos' },
                { name: 'Crema', color: '#fffdd0', reason: 'Color nupcial' },
              ].map((item) => (
                <div key={item.name} className="group relative">
                  <div
                    className="aspect-square border-2 border-newspaper-gray-400 relative overflow-hidden transition-transform hover:scale-105"
                    style={{ backgroundColor: item.color }}
                  >
                    {/* X grande */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-newspaper-gray-600 rotate-45 absolute"></div>
                      <div className="w-full h-0.5 bg-newspaper-gray-600 -rotate-45 absolute"></div>
                    </div>
                    {/* Badge NO */}
                    <div className="absolute top-1 right-1 bg-newspaper-gray-800 text-white text-[10px] px-2 py-0.5 font-bold">
                      NO
                    </div>
                  </div>
                  <p className="text-center mt-2 font-headline text-sm uppercase tracking-wide text-newspaper-gray-700">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Nota al pie */}
            <p className="text-center mt-6 text-base text-newspaper-gray-600 italic border-t border-newspaper-gray-200 pt-4 flex items-center justify-center gap-2">
              <Sparkle className="w-4 h-4" /> Estos tonos están reservados exclusivamente para la novia <Sparkle className="w-4 h-4" />
            </p>
          </div>
        </div>

        {/* NOTA EDITORIAL - Footer elegante */}
        <div className="border-2 border-newspaper-black bg-white">
          <div className="grid md:grid-cols-3">
            {/* Columna izquierda - decorativa */}
            <div className="hidden md:flex items-center justify-center bg-newspaper-gray-100 border-r-2 border-newspaper-black p-6">
              <div className="text-center">
                <Scissors className="w-16 h-16 mx-auto text-newspaper-gray-700" />
                <p className="font-headline text-sm uppercase tracking-widest mt-2 text-newspaper-gray-600">
                  Sección Moda
                </p>
              </div>
            </div>

            {/* Columna central - mensaje */}
            <div className="md:col-span-2 p-6 md:p-8">
              <div className="mb-4">
                <span className="inline-block bg-newspaper-black text-white px-4 py-1.5 font-headline text-sm uppercase tracking-widest">
                  Nota de los Novios
                </span>
              </div>

              <blockquote className="font-serif text-lg md:text-xl italic text-newspaper-gray-800 leading-relaxed mb-4 border-l-4 border-newspaper-black pl-4">
                "Tu presencia es lo más importante. Estas sugerencias son para que todos disfrutemos
                de una celebración armoniosa y elegante."
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-newspaper-gray-200">
                <div className="flex-1">
                  <p className="font-headline text-base uppercase tracking-wider text-newspaper-gray-600">Con amor,</p>
                  <p className="font-headline text-2xl font-bold">Alexei & Estephanie</p>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-newspaper-black rotate-45"></div>
                  <div className="w-2 h-2 bg-newspaper-gray-400 rotate-45"></div>
                  <div className="w-2 h-2 bg-newspaper-black rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOLIO */}
        <div className="newspaper-folio mt-8">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-sm font-sans uppercase tracking-wider text-newspaper-gray-700">
            <span>Página 5</span>
            <span>•</span>
            <span>Sección: Estilo & Moda</span>
            <span>•</span>
            <span className="hidden md:inline">{eventConfig.date.full}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
