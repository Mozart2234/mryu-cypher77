/**
 * COMPONENTE LOVE STORY - HISTORIA DE LA PAREJA
 *
 * Timeline visual con la historia de amor
 */

import { eventConfig } from '@/config/eventConfig';
import { Heart } from 'lucide-react';

export function LoveStory() {
  const { loveStory } = eventConfig;

  return (
    <section className="newspaper-page py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-12">
          <h2 className="newspaper-subheadline mb-4">
            Nuestra Historia
          </h2>
          <div className="newspaper-divider-thick"></div>
          <p className="newspaper-meta mt-4">Un viaje de amor de 2016 a 2026</p>
        </div>

        {/* Timeline vertical */}
        <div className="relative">
          {/* Línea central del timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-newspaper-gray-300 hidden md:block timeline-line"></div>

          {/* Items del timeline */}
          <div className="space-y-12 md:space-y-16">
            {loveStory.map((item, index) => (
              <div
                key={index}
                className={`relative timeline-item opacity-0 ${
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Punto del timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-6 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-newspaper-accent shadow-lg z-10 timeline-dot">
                  <Heart className="w-5 h-5 text-newspaper-accent" fill="currentColor" />
                </div>

                {/* Contenido */}
                <div className={`md:w-11/12 ${index % 2 === 0 ? 'md:ml-0' : 'md:ml-auto'}`}>
                  <div className="newspaper-box hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                    {/* Badge del año - esquina superior */}
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'md:right-0' : 'md:left-0'} right-0 bg-newspaper-accent text-white px-4 py-1 text-sm font-bold`}>
                      {item.year}
                    </div>

                    <div className="pt-8">
                      <div className="flex items-center gap-3 mb-3 md:hidden">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-newspaper-accent/10 border-2 border-newspaper-accent flex-shrink-0">
                          <Heart className="w-4 h-4 text-newspaper-accent" fill="currentColor" />
                        </div>
                        <h3 className="font-serif font-bold text-lg text-newspaper-black">
                          {item.title}
                        </h3>
                      </div>
                      <h3 className="hidden md:block font-serif font-bold text-xl md:text-2xl mb-4 text-newspaper-black">
                        {item.title}
                      </h3>
                      <p className="newspaper-body leading-relaxed text-base">
                        {item.text}
                      </p>
                    </div>

                    {/* Línea decorativa inferior */}
                    <div className="mt-4 pt-4 border-t border-newspaper-gray-300">
                      <p className="newspaper-page-number text-center">{item.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cita bíblica */}
        <div className="mt-16 max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="newspaper-box bg-newspaper-gray-50">
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
