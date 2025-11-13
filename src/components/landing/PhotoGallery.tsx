/**
 * COMPONENTE PHOTO GALLERY
 *
 * Galería de fotos estilo periódico editorial
 */

export function PhotoGallery() {
  // Placeholder de fotos - pueden ser reemplazadas por fotos reales
  const photos = [
    {
      id: 1,
      caption: "Primera foto juntos - 2023",
      alt: "Alexei y Estephanie en su primera foto juntos",
      size: "large" as const
    },
    {
      id: 2,
      caption: "Viaje a Cusco - Amor viajero en acción",
      alt: "La pareja explorando Cusco",
      size: "medium" as const
    },
    {
      id: 3,
      caption: "El día que se hicieron novios - 2025",
      alt: "Momento especial de compromiso",
      size: "medium" as const
    },
    {
      id: 4,
      caption: "Compartiendo momentos de fe",
      alt: "En la iglesia juntos",
      size: "small" as const
    },
    {
      id: 5,
      caption: "Aventuras culinarias - Probando nuevos sabores",
      alt: "Disfrutando de una cena",
      size: "small" as const
    },
    {
      id: 6,
      caption: "El 'propósito' hecho realidad",
      alt: "Sonriendo juntos",
      size: "large" as const
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

        {/* Grid de fotos tipo periódico */}
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`newspaper-box-simple hover:shadow-xl transition-shadow ${
                photo.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                photo.size === 'medium' ? 'md:col-span-1' :
                'md:col-span-1'
              }`}
            >
              {/* Placeholder de imagen - se reemplazará con fotos reales */}
              <div className={`bg-newspaper-gray-200 ${
                photo.size === 'large' ? 'h-96' :
                photo.size === 'medium' ? 'h-64' :
                'h-48'
              } flex items-center justify-center relative overflow-hidden group`}>
                {/* Patrón de fondo tipo periódico */}
                <div className="absolute inset-0 bg-newsprint opacity-10"></div>

                {/* Placeholder text */}
                <div className="relative z-10 text-center p-4">
                  <svg
                    className="w-16 h-16 mx-auto mb-3 text-newspaper-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs text-newspaper-gray-500 uppercase tracking-wide">
                    Foto {photo.id}
                  </p>
                  <p className="text-xs text-newspaper-gray-400 mt-1">
                    [Imagen próximamente]
                  </p>
                </div>

                {/* Overlay con gradiente al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-newspaper-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Caption tipo periódico */}
              <div className="mt-3 pb-2 border-b border-newspaper-border">
                <p className="font-serif text-sm text-newspaper-black italic">
                  {photo.caption}
                </p>
                <p className="newspaper-page-number mt-1">Foto: Archivo personal</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nota al pie */}
        <div className="mt-8 text-center">
          <div className="newspaper-box max-w-2xl mx-auto">
            <p className="text-xs text-newspaper-gray-600 italic">
              Nota del Editor: Las fotografías mostradas capturan momentos significativos
              de la historia de Alexei y Estephanie. Cada imagen representa un capítulo
              de su hermoso viaje hacia el altar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
