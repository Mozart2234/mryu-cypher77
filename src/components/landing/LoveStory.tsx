/**
 * COMPONENTE LOVE STORY - HISTORIA DE LA PAREJA
 *
 * Timeline estilo periódico clásico con columnas
 */

import { eventConfig } from '@/config/eventConfig';

export function LoveStory() {
  const { loveStory } = eventConfig;

  return (
    <section className="newspaper-page py-12 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-12">
          <div className="newspaper-divider-thick mb-4"></div>
          <h2 className="newspaper-subheadline mb-2">
            Nuestra Historia de Amor
          </h2>
          <p className="newspaper-meta">DE 2016 A 2026: UN VIAJE DE FE Y AMOR</p>
          <div className="newspaper-divider-thick mt-4"></div>
        </div>

        {/* Columnas estilo periódico */}
        <div className="grid md:grid-cols-2 gap-6">
          {loveStory.map((item, index) => (
            <div
              key={index}
              className="border-4 border-newspaper-black bg-white overflow-hidden"
            >
              {/* Header con año */}
              <div className="bg-newspaper-gray-100 border-b-4 border-newspaper-black p-4">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-2xl font-bold text-newspaper-black">
                    {item.year}
                  </span>
                  <span className="newspaper-page-number">
                    Cap. {index + 1}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="font-headline text-xl font-bold text-newspaper-black mb-3 border-b-2 border-newspaper-gray-300 pb-2">
                  {item.title}
                </h3>
                <p className="newspaper-body leading-relaxed text-base">
                  {item.text}
                </p>
              </div>

              {/* Footer decorativo */}
              <div className="border-t-2 border-newspaper-gray-300 bg-newspaper-gray-50 px-6 py-3">
                <p className="newspaper-page-number text-center">
                  Archivo {item.year}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cita bíblica */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="border-4 border-newspaper-black bg-newspaper-gray-50 p-8">
            <div className="text-center border-b-2 border-newspaper-gray-400 pb-4 mb-4">
              <p className="font-headline text-xs uppercase tracking-wider text-newspaper-gray-600">
                Cita del Día
              </p>
            </div>
            <blockquote className="text-center font-serif text-lg italic text-newspaper-black leading-relaxed">
              "{eventConfig.quote.text}"
            </blockquote>
            <p className="text-center font-serif text-sm mt-4 text-newspaper-gray-600 uppercase tracking-wide">
              — {eventConfig.quote.source}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
