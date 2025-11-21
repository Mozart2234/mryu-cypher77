/**
 * COMPONENTE LOVE STORY - HISTORIA DE LA PAREJA
 *
 * Timeline vertical estilo periódico con diseño mes por mes
 */

import { eventConfig } from '@/config/eventConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Timeline Item con scroll animation individual
 */
interface TimelineItemProps {
  event: any;
  index: number;
  isEven: boolean;
  isFeatured: boolean;
  badgeClass: string;
}

function TimelineItem({ event, index, isEven, isFeatured, badgeClass }: TimelineItemProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px'
  });

  // Stagger delay based on index (cada card aparece 150ms después de la anterior)
  const staggerDelay = index * 150;

  return (
    <div
      ref={elementRef}
      className={`relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      } ${isFeatured ? 'md:col-span-2' : ''}`}
      style={{
        transitionDelay: isVisible ? `${staggerDelay}ms` : '0ms'
      }}
    >
      {/* Responsive: Mobile siempre centrado, Desktop alternado */}
      <div className={`
        flex flex-col md:flex-row items-start gap-2 md:gap-3
        ${isEven ? 'md:flex-row-reverse' : ''}
        ${isFeatured ? 'md:justify-center' : ''}
      `}>
        {/* Espaciador para alternar lados */}
        {!isFeatured && <div className="hidden md:block md:w-1/2"></div>}

        {/* Tarjeta del evento - MÁS COMPACTA */}
        <div className={`
          w-full ${isFeatured ? 'md:max-w-2xl' : 'md:w-1/2'}
          relative
        `}>
          {/* Badge con mes y año - sin foto circular */}
          <div className="flex items-center gap-2 mb-2">
            {/* Badge con mes y año - más pequeño */}
            <div className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 border-2
              font-bold text-xs uppercase tracking-wider
              ${badgeClass}
            `}>
              <span className="text-lg">{event.icon}</span>
              <span>{event.month} {event.year}</span>
            </div>
          </div>

          {/* Contenido en caja estilo periódico - MÁS COMPACTA */}
          <div className={`
            border-2 border-newspaper-black bg-white p-4
            ${isFeatured ? 'shadow-xl' : 'shadow-md'}
            hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
            transition-all duration-300 ease-out
          `}>
            {/* Header más compacto */}
            <div className="flex items-start justify-between mb-2">
              <h3 className={`
                font-serif font-bold text-newspaper-black leading-tight
                ${isFeatured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}
              `}>
                {event.title}
              </h3>
              <span className="text-xs text-newspaper-gray-700 shrink-0 ml-2">
                #{index + 1}
              </span>
            </div>

            {/* Divider más fino */}
            <div className="border-t border-newspaper-gray-300 mb-2"></div>

            {/* Texto narrativo más compacto */}
            <p className={`
              font-serif leading-snug text-newspaper-gray-800
              ${isFeatured ? 'text-base' : 'text-sm'}
            `}>
              {event.text}
            </p>

            {/* PULL QUOTE - más pequeña */}
            {event.quote && (
              <blockquote className="border-l-2 border-newspaper-black bg-newspaper-gray-50 p-2 my-2 italic text-xs md:text-sm font-serif text-newspaper-black">
                "{event.quote}"
              </blockquote>
            )}

            {/* Footer decorativo más compacto */}
            <div className="mt-2 pt-2 border-t border-newspaper-gray-200">
              <p className="text-xs text-center uppercase tracking-wide text-newspaper-gray-700">
                Capítulo {index + 1} • {event.date}
              </p>
            </div>

            {/* Etiqueta especial para el evento destacado */}
            {isFeatured && (
              <div className="mt-2 bg-newspaper-black text-white text-center py-1.5 px-3">
                <p className="font-headline text-xs uppercase tracking-widest">
                  ★ El Día Más Esperado ★
                </p>
              </div>
            )}
          </div>

          {/* Punto en la línea de tiempo (solo desktop) */}
          <div className={`
            hidden md:block absolute top-8
            ${isEven ? 'right-0 translate-x-[calc(50%+0.5rem)]' : 'left-0 -translate-x-[calc(50%+0.5rem)]'}
            ${isFeatured ? 'hidden' : ''}
          `}>
            <div className={`
              w-6 h-6 rounded-full border-2 border-newspaper-black
              ${badgeClass.split(' ')[0]}
            `}></div>
          </div>
        </div>
      </div>

      {/* Punto especial en línea para evento destacado */}
      {isFeatured && (
        <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 justify-center">
          <div className="w-8 h-8 rounded-full bg-newspaper-accent border-2 border-white shadow-lg flex items-center justify-center pulse-ring">
            <span className="text-white text-xl">&#9962;</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function LoveStory() {
  const { loveStory } = eventConfig;
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      ref={elementRef}
      id="love-story"
      className={`newspaper-page py-6 px-4 md:py-8 md:px-8 bg-newspaper-gray-50 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Título de sección - MÁS COMPACTO */}
        <div className="text-center mb-6 md:mb-8">
          <div className="newspaper-divider-thick mb-3"></div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-newspaper-black mb-2">
            Nuestra Historia de Amor
          </h2>
          <p className="text-xs uppercase tracking-wide text-newspaper-gray-700">
            DE UNA MIRADA EN 2016 AL ALTAR EN 2026
          </p>
          <div className="newspaper-divider-thick mt-3"></div>
          <p className="text-sm text-center mt-4 max-w-2xl mx-auto italic text-newspaper-gray-800 leading-relaxed">
            Cada gran historia de amor tiene su propio camino. Esta es la nuestra:
            de una mirada en 2016, un reencuentro mágico en 2022, hasta el altar en 2026.
          </p>
        </div>

        {/* Timeline vertical - MÁS COMPACTA */}
        <div className="relative">
          {/* Línea vertical central - más delgada */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-newspaper-gray-300 transform -translate-x-1/2"></div>

          {/* Eventos - menos espaciado */}
          <div className="space-y-4 md:space-y-6">
            {loveStory.map((event: any, index: number) => {
              const isEven = index % 2 === 0;
              const isFeatured = event.featured;

              // Escala de grises con MEJOR CONTRASTE (más oscuros)
              const grayShades = [
                'bg-newspaper-gray-900 text-white border-newspaper-gray-900',
                'bg-newspaper-gray-800 text-white border-newspaper-gray-900',
                'bg-newspaper-gray-700 text-white border-newspaper-gray-800',
                'bg-newspaper-gray-800 text-white border-newspaper-gray-900',
                'bg-newspaper-gray-600 text-white border-newspaper-gray-700',
                'bg-newspaper-gray-700 text-white border-newspaper-gray-800',
                'bg-newspaper-gray-600 text-white border-newspaper-gray-700',
                'bg-newspaper-gray-500 text-white border-newspaper-gray-600',
              ];
              const badgeClass = isFeatured
                ? 'bg-newspaper-black text-white border-newspaper-black'
                : grayShades[index % grayShades.length];

              return (
                <TimelineItem
                  key={index}
                  event={event}
                  index={index}
                  isEven={isEven}
                  isFeatured={isFeatured}
                  badgeClass={badgeClass}
                />
              );
            })}
          </div>
        </div>

        {/* Cita bíblica */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="border-2 border-newspaper-black bg-white p-8 shadow-lg">
            <div className="text-center border-b-2 border-newspaper-gray-400 pb-4 mb-6">
              <p className="font-headline text-xs uppercase tracking-wider text-newspaper-gray-700">
                Cita del Día
              </p>
            </div>
            <blockquote className="text-center newspaper-title italic">
              "{eventConfig.quote.text}"
            </blockquote>
            <p className="text-center font-serif text-sm mt-6 text-newspaper-gray-700 uppercase tracking-wide">
              — {eventConfig.quote.source}
            </p>
          </div>
        </div>

        {/* Editorial de cierre */}
        <div className="mt-12 text-center max-w-4xl mx-auto">
          <div className="newspaper-divider-thin mb-4"></div>
          <div className="border-2 border-newspaper-black p-6 bg-white">
            <p className="font-headline text-xs uppercase tracking-wider text-newspaper-gray-700 mb-4">
              Editorial
            </p>
            <div className="newspaper-body text-justify italic text-newspaper-gray-800 leading-relaxed md:columns-2 md:gap-6">
              <p>
                Esta historia, que comenzó con una mirada tímida en 2016 y se fortaleció con un reencuentro
                mágico en 2022, nos recuerda que el amor verdadero vale la espera. Hoy celebramos no solo
                una boda, sino el cumplimiento de un destino escrito hace 10 años. El camino no siempre fue
                fácil, pero cada mensaje, cada cita y cada momento compartido fortaleció su vínculo. Cada
                risa compartida, cada lágrima secada, cada sueño construido juntos, todo forma parte de este
                hermoso tapiz que hoy presentan ante el altar.
              </p>
            </div>
          </div>
          <div className="newspaper-divider-thin mt-4"></div>
        </div>

        {/* FOLIO - pie de página */}
        <div className="newspaper-folio">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs font-sans uppercase tracking-wider text-newspaper-gray-700">
            <span>Página 3-4</span>
            <span>•</span>
            <span>Sección: Historia de Amor</span>
            <span>•</span>
            <span className="hidden md:inline">{eventConfig.date.full}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
