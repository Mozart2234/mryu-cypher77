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
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      {/* Responsive: Mobile siempre centrado, Desktop alternado */}
      <div className={`
        flex flex-col md:flex-row items-start gap-4
        ${isEven ? 'md:flex-row-reverse' : ''}
        ${isFeatured ? 'md:justify-center' : ''}
      `}>
        {/* Espaciador para alternar lados */}
        {!isFeatured && <div className="hidden md:block md:w-1/2"></div>}

        {/* Tarjeta del evento */}
        <div className={`
          w-full ${isFeatured ? 'md:max-w-3xl' : 'md:w-1/2'}
          relative
        `}>
          {/* Badge con mes y año + foto circular */}
          <div className="flex items-center gap-3 mb-3">
            {/* Foto circular pequeña (si existe) */}
            {event.photoUrl && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-newspaper-black shadow-lg hover:scale-110 transition-transform duration-300 shrink-0 group">
                <img
                  src={event.photoUrl}
                  alt={event.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            )}

            {/* Badge con mes y año - estilo newspaper */}
            <div className={`
              inline-flex items-center gap-2 px-4 py-2 border-2
              font-bold text-sm uppercase tracking-wider
              ${badgeClass}
            `}>
              <span className="text-2xl">{event.icon}</span>
              <span>{event.month} {event.year}</span>
            </div>
          </div>

          {/* Contenido en caja estilo periódico */}
          <div className={`
            border-2 border-newspaper-black bg-white p-6
            ${isFeatured ? 'shadow-2xl' : 'shadow-lg'}
            hover:shadow-xl transition-shadow duration-300
          `}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <h3 className={`
                newspaper-title
                ${isFeatured ? 'text-3xl' : ''}
              `}>
                {event.title}
              </h3>
              <span className="newspaper-page-number shrink-0 ml-3">
                #{index + 1}
              </span>
            </div>

            {/* Divider */}
            <div className="newspaper-divider mb-4"></div>

            {/* Texto narrativo */}
            <p className={`
              newspaper-body
              ${isFeatured ? 'text-lg' : ''}
            `}>
              {event.text}
            </p>

            {/* PULL QUOTE - cita destacada (solo en algunos eventos) */}
            {event.quote && (
              <blockquote className="border-l-4 border-newspaper-black bg-newspaper-gray-50 p-4 my-4 italic text-base font-serif text-newspaper-black md:float-right md:ml-6 md:mb-4 md:max-w-xs">
                "{event.quote}"
              </blockquote>
            )}

            {/* Footer decorativo */}
            <div className="mt-4 pt-4 border-t-2 border-newspaper-gray-200">
              <p className="newspaper-page-number text-xs text-center uppercase tracking-wider">
                Capítulo {index + 1} • {event.date}
              </p>
            </div>

            {/* Etiqueta especial para el evento destacado */}
            {isFeatured && (
              <div className="mt-4 bg-newspaper-gray-900 text-white text-center py-2 px-4">
                <p className="font-headline text-sm uppercase tracking-widest">
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
            <span className="text-white text-xl">💒</span>
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
      className={`newspaper-page bg-newspaper-gray-50 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-16">
          <div className="newspaper-divider-thick mb-4"></div>
          <h2 className="newspaper-subheadline mb-3">
            Nuestra Historia de Amor
          </h2>
          <p className="newspaper-meta">
            DE UNA MIRADA EN 2016 AL ALTAR EN 2026
          </p>
          <div className="newspaper-divider-thick mt-4"></div>
          <p className="newspaper-body text-center mt-6 max-w-2xl mx-auto italic text-newspaper-gray-700">
            Cada gran historia de amor tiene su propio camino. Esta es la nuestra:
            un recorrido de 10 años desde un primer encuentro hasta el día más esperado.
          </p>
        </div>

        {/* Timeline vertical */}
        <div className="relative">
          {/* Línea vertical central */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-newspaper-gray-300 transform -translate-x-1/2"></div>

          {/* Eventos */}
          <div className="space-y-8 md:space-y-10">
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
              <p className="font-headline text-xs uppercase tracking-wider text-newspaper-gray-600">
                Cita del Día
              </p>
            </div>
            <blockquote className="text-center newspaper-title italic">
              "{eventConfig.quote.text}"
            </blockquote>
            <p className="text-center font-serif text-sm mt-6 text-newspaper-gray-600 uppercase tracking-wide">
              — {eventConfig.quote.source}
            </p>
          </div>
        </div>

        {/* Editorial de cierre */}
        <div className="mt-12 text-center max-w-4xl mx-auto">
          <div className="newspaper-divider-thin mb-4"></div>
          <div className="border-2 border-newspaper-black p-6 bg-white">
            <p className="font-headline text-xs uppercase tracking-wider text-newspaper-gray-600 mb-4">
              Editorial
            </p>
            <p className="newspaper-body newspaper-columns-2 text-justify italic text-newspaper-gray-700 leading-relaxed">
              Esta historia, que comenzó con una mirada tímida y se fortaleció con cada mensaje,
              cada cita y cada momento compartido, nos recuerda que el amor verdadero vale la espera.
              Hoy celebramos no solo una boda, sino el cumplimiento de una promesa de 10 años. El camino
              no siempre fue fácil, pero cada obstáculo superado fortaleció su vínculo. Cada risa compartida,
              cada lágrima secada, cada sueño construido juntos, todo forma parte de este hermoso tapiz
              que hoy presentan ante el altar.
            </p>
          </div>
          <div className="newspaper-divider-thin mt-4"></div>
        </div>

        {/* FOLIO - pie de página */}
        <div className="newspaper-folio">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs font-sans uppercase tracking-wider text-newspaper-gray-600">
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
