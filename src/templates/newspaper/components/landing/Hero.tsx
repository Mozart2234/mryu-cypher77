/**
 * COMPONENTE HERO - PORTADA DE PERIÓDICO
 *
 * Diseño tipo primera plana de periódico con:
 * - Encabezado con edición y fecha
 * - Titular principal con nombres
 * - Foto destacada de portada
 * - Subtítulos y artículos de entrada
 */

import { eventConfig } from '@/config/eventConfig';
import { WeatherBox } from './WeatherBox';

export function Hero() {
  const { bride, groom, newspaper, date, articles } = eventConfig;

  return (
    <section className="newspaper-page relative">
      {/* Elemento de fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabecera del periódico */}
        <div className="text-center mb-6 pb-4 border-b-2 border-newspaper-black">
          <div className="newspaper-meta mb-2">
            {newspaper.edition}
          </div>
          <div className="newspaper-meta">
            {date.full}
          </div>
        </div>

        {/* Titular principal */}
        <div className="text-center mb-8">
          {/* KICKER - texto sobre el titular */}
          <p className="newspaper-kicker mb-4">
            Edición Especial Matrimonio
          </p>

          <h1 className="newspaper-headline mb-4 animate-fade-in">
            {groom.name} y {bride.name}
          </h1>

          {/* DECK - subtítulo descriptivo */}
          <p className="newspaper-deck max-w-2xl mx-auto mb-4">
            Tras una década de relación, la pareja sella su amor ante Dios y sus seres queridos
          </p>

          <h2 className="newspaper-subheadline">
            {newspaper.headline}
          </h2>
        </div>

        <div className="newspaper-divider-double"></div>

        {/* Layout tipo periódico con foto destacada */}
        <div className="grid md:grid-cols-12 gap-4 md:gap-5 my-6 md:my-8">
          {/* Foto destacada de portada - 5 columnas */}
          <div className="md:col-span-5">
            <div className="border-2 border-newspaper-black h-full group overflow-hidden">
              <div className="relative bg-newspaper-gray-200 aspect-3/4 md:aspect-4/5 overflow-hidden">
                {/* Foto de portada */}
                <img
                  src="/photos/_Z639120.jpg"
                  alt="Alexei y Estephanie"
                  loading="eager"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Overlay sutil con hover */}
                <div className="absolute inset-0 bg-linear-to-t from-newspaper-black/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

                {/* Badge decorativo */}
                <div className="absolute top-4 right-4 bg-newspaper-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Exclusiva
                </div>
              </div>
              <div className="p-4 bg-white border-t-2 border-newspaper-black">
                <p className="font-serif text-sm italic text-newspaper-black leading-relaxed">
                  Alexei y Estephanie: Una historia que comenzó en 2016 y culmina en 2026
                </p>
                <p className="newspaper-page-number mt-2">Foto exclusiva para esta edición especial</p>
              </div>
            </div>
          </div>

          {/* Artículo principal - 4 columnas */}
          <div className="md:col-span-4">
            <div className="newspaper-article h-full flex flex-col justify-between">
              <div>
                <h3 className="newspaper-title mb-3">
                  {newspaper.subheadline}
                </h3>
                {/* BYLINE - autor del artículo */}
                <p className="newspaper-byline">
                  Por Redacción Especial
                </p>
                <p className="newspaper-meta mb-3">{newspaper.subtitle}. invitados.com</p>
                <p className="newspaper-body drop-cap leading-relaxed">
                  {articles[1].content}
                </p>
              </div>
              <p className="newspaper-page-number mt-4">{articles[1].page}</p>
            </div>
          </div>

          {/* Sidebar - 3 columnas */}
          <div className="md:col-span-3 space-y-6">
            {/* Pronóstico del día */}
            <WeatherBox />

            {/* Artículo secundario */}
            <div className="newspaper-box hover:shadow-xl transition-all duration-300">
              <h4 className="font-serif font-bold text-sm uppercase mb-2 text-newspaper-black">
                {articles[0].title}
              </h4>
              <p className="newspaper-byline text-[10px]">
                Por Dr. Juan Pérez
              </p>
              <p className="newspaper-body text-xs leading-relaxed">
                {articles[0].content}
              </p>
              <p className="newspaper-page-number mt-2">{articles[0].page}</p>
            </div>
          </div>
        </div>

        <div className="newspaper-divider"></div>

        {/* Artículos secundarios */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5 my-5 md:my-6">
          <div className="newspaper-article hover:bg-newspaper-gray-100 hover:shadow-md transition-all duration-300 p-4 rounded-sm">
            <h4 className="newspaper-title text-lg mb-2">
              {articles[2].title}
            </h4>
            <p className="newspaper-byline">
              Por María Sánchez
            </p>
            <p className="newspaper-body newspaper-columns-2">
              {articles[2].content}
            </p>
            <p className="newspaper-page-number mt-2">{articles[2].page}</p>
          </div>

          <div className="newspaper-article hover:bg-newspaper-gray-100 hover:shadow-md transition-all duration-300 p-4 rounded-sm">
            <h4 className="newspaper-title text-lg mb-2">
              {articles[3].title}
            </h4>
            <p className="newspaper-byline">
              Por Carlos Rodríguez
            </p>
            <p className="newspaper-body">
              {articles[3].content}
            </p>
            <p className="newspaper-page-number mt-2">{articles[3].page}</p>
          </div>
        </div>

        {/* FOLIO - pie de página con número */}
        <div className="newspaper-folio">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs font-sans uppercase tracking-wider text-newspaper-gray-600">
            <span>Página 1</span>
            <span>•</span>
            <span>Sección: Bodas</span>
            <span>•</span>
            <span className="hidden md:inline">{date.full}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
