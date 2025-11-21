/**
 * COMPONENTE ADVERTISEMENT
 *
 * Anuncio tipo periódico vintage (decorativo y divertido)
 */

import { eventConfig } from '@/config/eventConfig';

export function Advertisement() {
  const { advertisements } = eventConfig;

  return (
    <section className="newspaper-page py-12 px-4 md:px-8 bg-newspaper-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {advertisements.map((ad, index) => (
            <div key={index} className="newspaper-box text-center hover:shadow-xl transition-all duration-300">
              {/* Título del anuncio */}
              <div className="border-b-2 border-newspaper-black pb-3 mb-3">
                <h3 className="font-headline text-2xl font-bold">{ad.title}</h3>
              </div>

              {/* Subtítulo (si existe) */}
              {ad.subtitle && (
                <p className="font-serif text-sm mb-3">
                  {ad.subtitle}
                </p>
              )}

              {/* Contenido - Estadística o Texto */}
              {'statistic' in ad && ad.statistic ? (
                <div className="my-4">
                  <div className="text-6xl font-headline font-black text-newspaper-black">
                    {ad.statistic.value}
                  </div>
                  <p className="font-sans text-xs mt-2">
                    {ad.statistic.label}
                  </p>
                </div>
              ) : (
                <p className="font-sans text-xs leading-relaxed mb-3">
                  {'content' in ad ? ad.content : ''}
                </p>
              )}

              {/* Quote (si existe) */}
              {'quote' in ad && ad.quote && (
                <p className="font-serif text-xs italic">
                  {ad.quote}
                </p>
              )}

              {/* Footer */}
              <div className={`border-t border-newspaper-border pt-2 ${'quote' in ad ? 'mt-3' : ''}`}>
                <p className="newspaper-page-number">{ad.footer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
