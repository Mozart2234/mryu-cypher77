/**
 * COMPONENTE EVENT DETAILS - DETALLES DEL EVENTO
 *
 * Sección tipo artículo de periódico vintage con:
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
        {/* Header de sección estilo periódico vintage */}
        <div className="text-center mb-8 md:mb-10">
          {/* Línea decorativa superior */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-20 md:w-32 bg-newspaper-black"></div>
            <span className="font-serif text-2xl">❧</span>
            <div className="h-px w-20 md:w-32 bg-newspaper-black"></div>
          </div>

          <p className="font-serif text-base md:text-lg uppercase tracking-[0.2em] text-newspaper-gray-600 mb-3">
            Sección Especial
          </p>
          <h2 className="font-headline text-2xl md:text-4xl font-black text-newspaper-black mb-3 leading-none tracking-tight">
            DETALLES DEL EVENTO
          </h2>
          <p className="font-serif text-lg md:text-xl text-newspaper-gray-700 italic">
            Todo lo que necesitas saber para acompañarnos
          </p>

          {/* Línea decorativa inferior */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-0.5 w-12 bg-newspaper-black"></div>
            <span className="text-newspaper-black text-base">✦</span>
            <div className="h-0.5 w-12 bg-newspaper-black"></div>
          </div>
        </div>

        {/* Línea gruesa estilo periódico */}
        <div className="border-t-4 border-b border-newspaper-black mb-8"></div>

        {/* Bloque de padres y padrinos - Estilo compacto */}
        <div className="bg-white border-2 border-newspaper-black mb-6">
          {/* Barra superior */}
          <div className="bg-newspaper-black py-1.5 text-center">
            <span className="font-headline text-xs md:text-sm uppercase tracking-wider text-white">
              ❖ Participación Especial ❖
            </span>
          </div>

          <div className="p-4 md:p-6">
            <h3 className="font-headline text-base md:text-lg font-bold text-center mb-4 text-newspaper-black uppercase tracking-wide">
              {messages.eventDetails.parentsTitle}
            </h3>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4">
              {/* Padres del novio */}
              <div className="text-center border-r-0 md:border-r border-newspaper-gray-300 pr-0 md:pr-4">
                <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-500 mb-2 border-b border-dotted border-newspaper-gray-300 pb-1">
                  Padres del Novio
                </p>
                <p className="font-serif text-base text-newspaper-black">{parents.groom.father}</p>
                <p className="font-serif text-base text-newspaper-black">{parents.groom.mother}</p>
              </div>

              {/* Padres de la novia */}
              <div className="text-center">
                <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-500 mb-2 border-b border-dotted border-newspaper-gray-300 pb-1">
                  Padres de la Novia
                </p>
                <p className="font-serif text-base text-newspaper-black">{parents.bride.father}</p>
                <p className="font-serif text-base text-newspaper-black">{parents.bride.mother}</p>
              </div>
            </div>

            {/* Separador */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-px w-12 bg-newspaper-gray-300"></div>
              <span className="font-serif text-base text-newspaper-gray-400">❦</span>
              <div className="h-px w-12 bg-newspaper-gray-300"></div>
            </div>

            <h4 className="font-headline text-base md:text-lg font-bold text-center mb-3 text-newspaper-black uppercase tracking-wide">
              {messages.eventDetails.godparentsTitle}
            </h4>

            <div className="grid md:grid-cols-2 gap-3">
              {godparents.map((godparent, index) => (
                <div key={index} className="text-center py-2 px-3 border border-newspaper-gray-200 bg-newspaper-gray-50">
                  <p className="font-serif text-sm text-newspaper-black">{godparent.name}</p>
                  <p className="font-serif text-sm text-newspaper-gray-700">{godparent.spouse}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invitación con fecha - Estilo vintage destacado */}
        <div className="text-center mb-8 md:mb-10">
          {/* Mensaje de invitación estilo vintage */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="font-serif text-xl text-newspaper-gray-400">〝</span>
            </div>
            <p className="font-serif text-xl md:text-2xl text-newspaper-black leading-relaxed px-4 max-w-3xl mx-auto">
              {messages.invitation}
            </p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="font-serif text-xl text-newspaper-gray-400">〞</span>
            </div>
          </div>

          {/* Fecha grande - estilo cartel antiguo */}
          <div className="inline-block border-8 border-double border-newspaper-black p-1 bg-white">
            <div className="border border-newspaper-black p-5 md:p-8">
              <div className="flex items-center justify-center gap-5 md:gap-8">
                <div className="text-center pr-5 md:pr-8 border-r-2 border-newspaper-black">
                  <div className="text-5xl md:text-7xl font-headline font-black text-newspaper-black leading-none">
                    {date.day}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-headline font-bold text-newspaper-black uppercase leading-tight">
                    {date.dayOfWeek}
                  </div>
                  <div className="text-base md:text-lg font-serif text-newspaper-gray-700 my-2 border-y border-newspaper-gray-300 py-2">
                    {date.time}
                  </div>
                  <div className="text-xl md:text-2xl font-headline font-bold text-newspaper-black uppercase leading-tight">
                    {date.month}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t-2 border-newspaper-black mb-8"></div>

        {/* Detalles de ceremonia y recepción - Estilo columnas de periódico */}
        <div className="grid md:grid-cols-2 gap-0 md:gap-0">
          {/* Ceremonia */}
          <div className="border-2 border-newspaper-black md:border-r-0 bg-white flex flex-col">
            {/* Header estilo periódico */}
            <div className="border-b-2 border-newspaper-black px-4 py-3 bg-newspaper-gray-100">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">⛪</span>
                <h3 className="font-headline text-base md:text-lg uppercase tracking-wider font-bold text-newspaper-black">
                  {messages.eventDetails.ceremonyTitle}
                </h3>
              </div>
            </div>

            <div className="p-5 md:p-6 flex flex-col flex-1">
              <h4 className="font-headline text-xl md:text-2xl font-bold text-newspaper-black mb-3 text-center">
                {ceremony.name}
              </h4>

              <p className="font-serif text-base md:text-lg text-newspaper-gray-700 text-center mb-4">
                {ceremony.address}
              </p>

              <div className="text-center mb-5 py-3 border-y border-dotted border-newspaper-gray-300">
                <span className="font-sans text-sm md:text-base font-bold text-newspaper-black uppercase tracking-wider">
                  {messages.eventDetails.timeLabel}: {ceremony.time}
                </span>
              </div>

              <a
                href={ceremony.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center border-2 border-newspaper-black px-5 py-3 font-sans text-sm uppercase tracking-wider font-bold hover:bg-newspaper-black hover:text-white transition-colors mt-auto"
              >
                ☞ {messages.eventDetails.locationButton}
              </a>
            </div>
          </div>

          {/* Recepción */}
          <div className="border-2 border-newspaper-black border-t-0 md:border-t-2 bg-white flex flex-col">
            {/* Header estilo periódico */}
            <div className="border-b-2 border-newspaper-black px-4 py-3 bg-newspaper-gray-100">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🎉</span>
                <h3 className="font-headline text-base md:text-lg uppercase tracking-wider font-bold text-newspaper-black">
                  {messages.eventDetails.receptionTitle}
                </h3>
              </div>
            </div>

            <div className="p-5 md:p-6 flex flex-col flex-1">
              <p className="font-serif text-sm md:text-base text-newspaper-gray-600 italic text-center mb-3">
                {messages.eventDetails.receptionIntro}
              </p>

              <h4 className="font-headline text-xl md:text-2xl font-bold text-newspaper-black mb-3 text-center">
                {reception.name}
              </h4>

              <p className="font-serif text-base md:text-lg text-newspaper-gray-700 text-center mb-5">
                {reception.address}
              </p>

              <a
                href={reception.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center border-2 border-newspaper-black px-5 py-3 font-sans text-sm uppercase tracking-wider font-bold hover:bg-newspaper-black hover:text-white transition-colors mt-auto"
              >
                ☞ {messages.eventDetails.locationButton}
              </a>
            </div>
          </div>
        </div>

        {/* FOLIO - pie de página estilo vintage */}
        <div className="mt-8 pt-4 border-t-2 border-newspaper-black">
          <div className="flex justify-between items-center text-xs md:text-sm font-serif text-newspaper-gray-600">
            <span className="uppercase tracking-wider">Pág. 2</span>
            <span className="italic">— Sección: Información del Evento —</span>
            <span className="hidden md:inline">{date.full}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
