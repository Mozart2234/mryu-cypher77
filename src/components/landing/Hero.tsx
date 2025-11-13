/**
 * COMPONENTE HERO - PORTADA DE PERIÓDICO
 *
 * Diseño tipo primera plana de periódico con:
 * - Encabezado con edición y fecha
 * - Titular principal con nombres
 * - Subtítulos y artículos de entrada
 */

import { eventConfig } from '@/config/eventConfig';

export function Hero() {
  const { bride, groom, newspaper, date, articles } = eventConfig;

  return (
    <section className="newspaper-page py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
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
          <h1 className="newspaper-headline mb-4">
            {groom.name} y {bride.name}
          </h1>
          <h2 className="newspaper-subheadline">
            {newspaper.headline}
          </h2>
        </div>

        <div className="newspaper-divider-double"></div>

        {/* Grid de artículos */}
        <div className="grid md:grid-cols-3 gap-6 my-8">
          {/* Artículo principal (ocupa 2 columnas) */}
          <div className="md:col-span-2 newspaper-article">
            <h3 className="newspaper-title mb-3">
              {newspaper.subheadline}
            </h3>
            <p className="newspaper-meta mb-2">{newspaper.subtitle}. invitados.com</p>
            <p className="newspaper-body drop-cap">
              {articles[1].content}
            </p>
            <p className="newspaper-page-number mt-2">{articles[1].page}</p>
          </div>

          {/* Sidebar con artículo secundario */}
          <div className="newspaper-box">
            <h4 className="font-serif font-bold text-sm uppercase mb-2 text-newspaper-black">
              {articles[0].title}
            </h4>
            <p className="newspaper-body text-xs">
              {articles[0].content}
            </p>
            <p className="newspaper-page-number mt-2">{articles[0].page}</p>
          </div>
        </div>

        <div className="newspaper-divider"></div>

        {/* Artículos secundarios */}
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="newspaper-article">
            <h4 className="newspaper-title text-lg mb-2">
              {articles[2].title}
            </h4>
            <p className="newspaper-body">
              {articles[2].content}
            </p>
            <p className="newspaper-page-number mt-2">{articles[2].page}</p>
          </div>

          <div className="newspaper-article">
            <h4 className="newspaper-title text-lg mb-2">
              {articles[3].title}
            </h4>
            <p className="newspaper-body">
              {articles[3].content}
            </p>
            <p className="newspaper-page-number mt-2">{articles[3].page}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
