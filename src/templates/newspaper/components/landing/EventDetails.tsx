/**
 * COMPONENTE EVENT DETAILS - DETALLES DEL EVENTO
 *
 * Sección tipo artículo de periódico con:
 * - Información de ceremonia y recepción
 * - Padres y padrinos
 * - Invitación formal
 */

import { eventConfig } from '@/config/eventConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function EventDetails() {
  const { ceremony, reception, date, parents, godparents, messages } = eventConfig;
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      ref={elementRef}
      id="event-details"
      className={`newspaper-page bg-newspaper-gray-100 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header de sección */}
        <div className="newspaper-section-header mb-6 md:mb-8">
          {messages.hero.title}
        </div>

        <div className="newspaper-divider-thick"></div>

        {/* Bloque de padres y padrinos */}
        <div className="newspaper-box mb-6 md:mb-8">
          <h3 className="font-serif text-lg md:text-xl font-bold text-center mb-4 md:mb-6 text-newspaper-black leading-snug">
            {messages.eventDetails.parentsTitle}
          </h3>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Padres del novio */}
            <div className="text-center">
              <p className="font-serif font-semibold text-sm md:text-base text-newspaper-black">{parents.groom.father}</p>
              <p className="font-serif font-semibold text-sm md:text-base text-newspaper-black">{parents.groom.mother}</p>
            </div>

            {/* Padres de la novia */}
            <div className="text-center">
              <p className="font-serif font-semibold text-sm md:text-base text-newspaper-black">{parents.bride.father}</p>
              <p className="font-serif font-semibold text-sm md:text-base text-newspaper-black">{parents.bride.mother}</p>
            </div>
          </div>

          <div className="newspaper-divider my-4 md:my-6"></div>

          <h4 className="font-serif text-base md:text-lg font-bold text-center mb-3 md:mb-4 text-newspaper-black">
            {messages.eventDetails.godparentsTitle}
          </h4>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {godparents.map((godparent, index) => (
              <div key={index} className="text-center">
                <p className="font-serif text-sm md:text-base text-newspaper-black">{godparent.name}</p>
                <p className="font-serif text-sm md:text-base text-newspaper-black">{godparent.spouse}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Invitación */}
        <div className="text-center mb-6 md:mb-8">
          <p className="font-serif text-base md:text-lg mb-4 md:mb-6 text-newspaper-black leading-relaxed px-2">
            {messages.invitation}
          </p>

          {/* Fecha grande */}
          <div className="flex items-center justify-center gap-4 md:gap-6 my-6 md:my-8">
            <div className="text-center">
              <div className="text-5xl md:text-8xl font-headline font-black text-newspaper-black leading-none">
                {date.day}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-headline font-bold text-newspaper-black uppercase leading-tight">
                {date.dayOfWeek}
              </div>
              <div className="text-base md:text-2xl font-serif text-newspaper-black mt-1">
                A LAS {date.time}
              </div>
              <div className="text-2xl md:text-4xl font-headline font-bold text-newspaper-black uppercase leading-tight mt-1">
                {date.month}
              </div>
            </div>
          </div>
        </div>

        <div className="newspaper-divider-thick"></div>

        {/* Detalles de ceremonia y recepción */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
          {/* Ceremonia */}
          <div className="newspaper-box-simple">
            <h3 className="newspaper-title text-base md:text-xl mb-3 md:mb-4 text-center border-b-2 border-newspaper-black pb-2">
              {messages.eventDetails.ceremonyTitle}
            </h3>
            <div className="space-y-2">
              <p className="font-serif font-bold text-sm md:text-base text-newspaper-black">{ceremony.name}</p>
              <p className="newspaper-body text-sm md:text-base">{ceremony.address}</p>
              <p className="newspaper-meta text-xs md:text-sm mt-3 md:mt-4">{messages.eventDetails.timeLabel}: {ceremony.time}</p>
              <a
                href={ceremony.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 md:mt-4 border-2 border-newspaper-black px-3 md:px-4 py-1.5 md:py-2 font-sans text-xs md:text-sm uppercase tracking-wide hover:bg-newspaper-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-black focus:ring-offset-2"
              >
                {messages.eventDetails.locationButton}
              </a>
            </div>
          </div>

          {/* Recepción */}
          <div className="newspaper-box-simple">
            <h3 className="newspaper-title text-base md:text-xl mb-3 md:mb-4 text-center border-b-2 border-newspaper-black pb-2">
              {messages.eventDetails.receptionTitle}
            </h3>
            <div className="space-y-2">
              <p className="font-serif text-xs md:text-sm mb-2 md:mb-3 text-newspaper-gray-600">
                {messages.eventDetails.receptionIntro}
              </p>
              <p className="font-serif font-bold text-sm md:text-base text-newspaper-black">{reception.name}</p>
              <p className="newspaper-body text-sm md:text-base">{reception.address}</p>
              <a
                href={reception.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 md:mt-4 border-2 border-newspaper-black px-3 md:px-4 py-1.5 md:py-2 font-sans text-xs md:text-sm uppercase tracking-wide hover:bg-newspaper-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-black focus:ring-offset-2"
              >
                {messages.eventDetails.locationButton}
              </a>
            </div>
          </div>
        </div>

        {/* FOLIO - pie de página */}
        <div className="newspaper-folio">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs font-sans uppercase tracking-wider text-newspaper-gray-600">
            <span>Página 2</span>
            <span>•</span>
            <span>Sección: Información del Evento</span>
            <span>•</span>
            <span className="hidden md:inline">{date.full}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
