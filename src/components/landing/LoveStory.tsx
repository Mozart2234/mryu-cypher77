/**
 * COMPONENTE LOVE STORY - HISTORIA DE LA PAREJA
 *
 * Timeline tipo artículo de periódico con la historia de amor
 */

import { eventConfig } from '@/config/eventConfig';

export function LoveStory() {
  const { loveStory } = eventConfig;

  return (
    <section className="newspaper-page py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-8">
          <h2 className="newspaper-subheadline mb-4">
            Nuestra Historia
          </h2>
          <div className="newspaper-divider-thick"></div>
        </div>

        {/* Grid de historia en columnas tipo periódico */}
        <div className="newspaper-columns-2">
          {loveStory.map((item, index) => (
            <div key={index} className="newspaper-article break-inside-avoid">
              <h3 className="font-serif font-bold text-base md:text-lg mb-2 text-newspaper-black">
                {item.title}
              </h3>
              <p className="newspaper-body">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Cita bíblica */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="newspaper-box">
            <p className="text-center font-sans text-xs uppercase tracking-wider mb-3 text-newspaper-gray-500">
              Cita del día
            </p>
            <blockquote className="newspaper-quote border-l-0 text-center">
              "{eventConfig.quote.text}"
            </blockquote>
            <p className="text-center font-serif text-sm mt-3 text-newspaper-gray-600">
              — {eventConfig.quote.source}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
