/**
 * CLASSIFIED ADS - ANUNCIOS CLASIFICADOS
 *
 * Sección de anuncios clasificados estilo periódico tradicional
 * Diseño compacto y denso típico de la última página
 */

interface ClassifiedAd {
  category: string;
  text: string;
}

export function ClassifiedAds() {
  const ads: ClassifiedAd[] = [
    {
      category: "AGRADECIMIENTOS",
      text: "A nuestras familias por su amor incondicional y apoyo en cada paso de este camino. Sin ustedes, nada de esto sería posible."
    },
    {
      category: "ESPECIAL",
      text: "Gracias a todos nuestros invitados por acompañarnos en el día más importante de nuestras vidas. Su presencia hace esta celebración aún más memorable."
    },
    {
      category: "MENSAJE",
      text: "Una mirada en 2016, un reencuentro en 2022, y hoy escribimos el primer capítulo de nuestra vida como esposos. ¡Que viva el amor!"
    },
    {
      category: "PRÓXIMAMENTE",
      text: "Luna de miel en destino sorpresa. Detalles en la próxima edición de 'Matrimonio Feliz Gazette'. Edición Febrero 2026."
    },
    {
      category: "INFORMACIÓN",
      text: "¿Tienes alguna pregunta? Consulta la sección FAQ en la página 7 o contacta a los novios directamente."
    }
  ];

  return (
    <section className="newspaper-page bg-newspaper-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="newspaper-section-header mb-6">
          Anuncios Clasificados
        </div>

        {/* Grid de anuncios */}
        <div className="grid md:grid-cols-3 gap-4">
          {ads.map((ad, index) => (
            <div
              key={index}
              className="border-2 border-newspaper-black p-3 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              {/* Categoría con tipografía condensada */}
              <div className="border-b-2 border-newspaper-black pb-1 mb-2">
                <h4 className="newspaper-condensed-label text-center">
                  {ad.category}
                </h4>
              </div>

              {/* Texto del anuncio */}
              <p className="font-sans text-xs leading-tight text-justify text-newspaper-gray-800">
                {ad.text}
              </p>

              {/* Número de anuncio */}
              <div className="mt-2 text-right">
                <span className="text-[8px] font-mono text-newspaper-gray-500">
                  AD-{String(index + 1).padStart(3, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer con información adicional */}
        <div className="mt-8 border-t-2 border-newspaper-black pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sobre los clasificados */}
            <div className="border-2 border-newspaper-black p-4 bg-white">
              <h4 className="font-headline text-sm mb-2 text-center uppercase tracking-wider">
                Sobre Esta Sección
              </h4>
              <p className="font-sans text-xs text-newspaper-gray-700 leading-relaxed">
                Los anuncios clasificados son una tradición centenaria en los periódicos.
                Esta sección especial está dedicada a mensajes de agradecimiento, dedicatorias
                y comunicaciones importantes de los novios.
              </p>
            </div>

            {/* Datos curiosos */}
            <div className="border-2 border-newspaper-black p-4 bg-white">
              <h4 className="font-headline text-sm mb-2 text-center uppercase tracking-wider">
                Dato Curioso
              </h4>
              <p className="font-sans text-xs text-newspaper-gray-700 leading-relaxed">
                Los clasificados comenzaron en el siglo XVII en Inglaterra. Hoy, esta tradición
                continúa en ediciones especiales como esta, preservando el encanto del periodismo clásico.
              </p>
            </div>
          </div>
        </div>

        {/* FOLIO - pie de página */}
        <div className="newspaper-folio">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs font-sans uppercase tracking-wider text-newspaper-gray-600">
            <span>Página 8</span>
            <span>•</span>
            <span>Sección: Clasificados</span>
            <span>•</span>
            <span className="hidden md:inline">Edición Especial Matrimonio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
