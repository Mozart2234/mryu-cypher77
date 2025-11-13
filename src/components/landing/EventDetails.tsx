/**
 * COMPONENTE EVENT DETAILS - DETALLES DEL EVENTO
 *
 * Sección tipo artículo de periódico con:
 * - Información de ceremonia y recepción
 * - Padres y padrinos
 * - Invitación formal
 */

import { eventConfig } from '@/config/eventConfig';

export function EventDetails() {
  const { ceremony, reception, date, parents, godparents, messages } = eventConfig;

  return (
    <section className="newspaper-page py-8 px-4 md:px-8 bg-newspaper-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header de sección */}
        <div className="newspaper-section-header mb-8">
          {messages.hero.title}
        </div>

        <div className="newspaper-divider-thick"></div>

        {/* Bloque de padres y padrinos */}
        <div className="newspaper-box mb-8">
          <h3 className="font-serif text-xl font-bold text-center mb-6 text-newspaper-black">
            Con la bendición de Dios y en compañía de nuestros Padres:
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Padres del novio */}
            <div className="text-center">
              <p className="font-serif font-semibold text-newspaper-black">{parents.groom.father}</p>
              <p className="font-serif font-semibold text-newspaper-black">{parents.groom.mother}</p>
            </div>

            {/* Padres de la novia */}
            <div className="text-center">
              <p className="font-serif font-semibold text-newspaper-black">{parents.bride.father}</p>
              <p className="font-serif font-semibold text-newspaper-black">{parents.bride.mother}</p>
            </div>
          </div>

          <div className="newspaper-divider my-6"></div>

          <h4 className="font-serif text-lg font-bold text-center mb-4 text-newspaper-black">
            y de nuestros queridos padrinos:
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            {godparents.map((godparent, index) => (
              <div key={index} className="text-center">
                <p className="font-serif text-newspaper-black">{godparent.name}</p>
                <p className="font-serif text-newspaper-black">{godparent.spouse}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Invitación */}
        <div className="text-center mb-8">
          <p className="font-serif text-lg mb-6 text-newspaper-black">
            {messages.invitation}
          </p>

          {/* Fecha grande */}
          <div className="flex items-center justify-center gap-6 my-8">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-headline font-black text-newspaper-black">
                {date.day}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-headline font-bold text-newspaper-black uppercase">
                {date.dayOfWeek}
              </div>
              <div className="text-xl md:text-2xl font-serif text-newspaper-black">
                A LAS {date.time}
              </div>
              <div className="text-3xl md:text-4xl font-headline font-bold text-newspaper-black uppercase">
                {date.month}
              </div>
            </div>
          </div>
        </div>

        <div className="newspaper-divider-thick"></div>

        {/* Detalles de ceremonia y recepción */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Ceremonia */}
          <div className="newspaper-box-simple">
            <h3 className="newspaper-title mb-4 text-center border-b-2 border-newspaper-black pb-2">
              Ceremonia Religiosa
            </h3>
            <div className="space-y-2">
              <p className="font-serif font-bold text-newspaper-black">{ceremony.name}</p>
              <p className="newspaper-body">{ceremony.address}</p>
              <p className="newspaper-meta mt-4">HORA: {ceremony.time}</p>
              <a
                href={ceremony.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 border-2 border-newspaper-black px-4 py-2 font-sans text-sm uppercase tracking-wide hover:bg-newspaper-black hover:text-white transition-colors"
              >
                Ver ubicación
              </a>
            </div>
          </div>

          {/* Recepción */}
          <div className="newspaper-box-simple">
            <h3 className="newspaper-title mb-4 text-center border-b-2 border-newspaper-black pb-2">
              Recepción
            </h3>
            <div className="space-y-2">
              <p className="font-serif text-sm mb-3 text-newspaper-gray-600">
                Al concluir la ceremonia religiosa pasaremos al
              </p>
              <p className="font-serif font-bold text-newspaper-black">{reception.name}</p>
              <p className="newspaper-body">{reception.address}</p>
              <a
                href={reception.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 border-2 border-newspaper-black px-4 py-2 font-sans text-sm uppercase tracking-wide hover:bg-newspaper-black hover:text-white transition-colors"
              >
                Ver ubicación
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
