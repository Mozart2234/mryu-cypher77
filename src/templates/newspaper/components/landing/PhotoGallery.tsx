/**
 * COMPONENTE PHOTO GALLERY
 *
 * Galería de fotos estilo periódico editorial con fotos reales
 */

export function PhotoGallery() {
  // Tus fotos reales de la boda
  const photos = [
    {
      id: 1,
      caption: "Primera foto juntos - 2023",
      alt: "Alexei y Estephanie en su primera foto juntos",
      size: "large" as const,
      url: "/photos/_Z638761.jpg"
    },
    {
      id: 2,
      caption: "Viaje a Cusco - Amor viajero en acción",
      alt: "La pareja explorando Cusco",
      size: "medium" as const,
      url: "/photos/_Z638873.jpg"
    },
    {
      id: 3,
      caption: "El día que se hicieron novios - 2025",
      alt: "Momento especial de compromiso",
      size: "medium" as const,
      url: "/photos/_Z638874.jpg"
    },
    {
      id: 4,
      caption: "Compartiendo momentos de fe",
      alt: "En la iglesia juntos",
      size: "small" as const,
      url: "/photos/_Z638896.jpg"
    },
    {
      id: 5,
      caption: "Aventuras culinarias - Probando nuevos sabores",
      alt: "Disfrutando de una cena",
      size: "small" as const,
      url: "/photos/_Z638955.jpg"
    },
    {
      id: 6,
      caption: "El 'propósito' hecho realidad",
      alt: "Sonriendo juntos",
      size: "large" as const,
      url: "/photos/_Z639000.jpg"
    }
  ];

  return (
    <section className="newspaper-page py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-8">
          <div className="newspaper-divider-thick mb-4"></div>
          <h2 className="newspaper-subheadline mb-2">
            Galería Fotográfica
          </h2>
          <p className="newspaper-meta">MOMENTOS INOLVIDABLES DE UNA HISTORIA DE AMOR</p>
          <div className="newspaper-divider-thick mt-4"></div>
        </div>

        {/* Grid de fotos tipo periódico - Layout reorganizado */}
        <div className="grid md:grid-cols-4 gap-4">
          {/* Foto grande destacada 1 */}
          <div className="md:col-span-2 md:row-span-2 newspaper-box-simple hover:shadow-xl transition-shadow">
            <div className="bg-newspaper-gray-200 h-96 relative overflow-hidden group border-4 border-newspaper-black">
              <img
                src={photos[0].url}
                alt={photos[0].alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-3 pb-2 border-b-2 border-newspaper-black">
              <p className="font-serif text-base text-newspaper-black font-bold">
                {photos[0].caption}
              </p>
              <p className="newspaper-page-number mt-1">Foto: Archivo personal</p>
            </div>
          </div>

          {/* Foto mediana 1 */}
          <div className="md:col-span-2 newspaper-box-simple hover:shadow-xl transition-shadow">
            <div className="bg-newspaper-gray-200 h-44 relative overflow-hidden border-2 border-newspaper-gray-400">
              <img
                src={photos[1].url}
                alt={photos[1].alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-2 pb-2 border-b border-newspaper-border">
              <p className="font-serif text-sm text-newspaper-black italic">
                {photos[1].caption}
              </p>
              <p className="newspaper-page-number mt-1 text-xs">Archivo personal</p>
            </div>
          </div>

          {/* Foto pequeña 1 */}
          <div className="md:col-span-1 newspaper-box-simple hover:shadow-xl transition-shadow">
            <div className="bg-newspaper-gray-200 h-44 relative overflow-hidden border-2 border-newspaper-gray-400">
              <img
                src={photos[3].url}
                alt={photos[3].alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-2 pb-1 border-b border-newspaper-border">
              <p className="font-serif text-xs text-newspaper-black italic">
                {photos[3].caption}
              </p>
            </div>
          </div>

          {/* Foto pequeña 2 */}
          <div className="md:col-span-1 newspaper-box-simple hover:shadow-xl transition-shadow">
            <div className="bg-newspaper-gray-200 h-44 relative overflow-hidden border-2 border-newspaper-gray-400">
              <img
                src={photos[4].url}
                alt={photos[4].alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-2 pb-1 border-b border-newspaper-border">
              <p className="font-serif text-xs text-newspaper-black italic">
                {photos[4].caption}
              </p>
            </div>
          </div>

          {/* Foto mediana 2 */}
          <div className="md:col-span-2 newspaper-box-simple hover:shadow-xl transition-shadow">
            <div className="bg-newspaper-gray-200 h-44 relative overflow-hidden border-2 border-newspaper-gray-400">
              <img
                src={photos[2].url}
                alt={photos[2].alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-2 pb-2 border-b border-newspaper-border">
              <p className="font-serif text-sm text-newspaper-black italic">
                {photos[2].caption}
              </p>
              <p className="newspaper-page-number mt-1 text-xs">Archivo personal</p>
            </div>
          </div>

          {/* Foto grande destacada 2 */}
          <div className="md:col-span-2 newspaper-box-simple hover:shadow-xl transition-shadow">
            <div className="bg-newspaper-gray-200 h-44 relative overflow-hidden border-4 border-newspaper-black">
              <img
                src={photos[5].url}
                alt={photos[5].alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-3 pb-2 border-b-2 border-newspaper-black">
              <p className="font-serif text-base text-newspaper-black font-bold">
                {photos[5].caption}
              </p>
              <p className="newspaper-page-number mt-1">Foto: Archivo personal</p>
            </div>
          </div>
        </div>

        {/* Nota al pie */}
        <div className="mt-8 text-center">
          <div className="newspaper-box max-w-2xl mx-auto">
            <p className="text-xs text-newspaper-gray-600 italic">
              Nota del Editor: Las fotografías mostradas capturan momentos significativos
              de la historia de Alexei y Estephanie. Cada imagen representa un capítulo
              de su hermoso viaje hacia el altar.
            </p>
            <p className="text-xs text-newspaper-gray-500 mt-2">
              Fotos ilustrativas - Reemplaza con tus fotos reales editando este archivo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
