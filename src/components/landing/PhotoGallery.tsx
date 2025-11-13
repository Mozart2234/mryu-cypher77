/**
 * COMPONENTE PHOTO GALLERY
 *
 * Galería de fotos estilo periódico editorial
 */

export function PhotoGallery() {
  // Fotos de ejemplo - reemplazar con fotos reales
  const photos = [
    {
      id: 1,
      caption: "Primera foto juntos - 2023",
      alt: "Alexei y Estephanie en su primera foto juntos",
      size: "large" as const,
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop&q=80"
    },
    {
      id: 2,
      caption: "Viaje a Cusco - Amor viajero en acción",
      alt: "La pareja explorando Cusco",
      size: "medium" as const,
      url: "https://images.unsplash.com/photo-1529634597-c28e73695df4?w=400&h=500&fit=crop&q=80"
    },
    {
      id: 3,
      caption: "El día que se hicieron novios - 2025",
      alt: "Momento especial de compromiso",
      size: "medium" as const,
      url: "https://images.unsplash.com/photo-1522673607196-b79f2e6dfaab?w=400&h=500&fit=crop&q=80"
    },
    {
      id: 4,
      caption: "Compartiendo momentos de fe",
      alt: "En la iglesia juntos",
      size: "small" as const,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&q=80"
    },
    {
      id: 5,
      caption: "Aventuras culinarias - Probando nuevos sabores",
      alt: "Disfrutando de una cena",
      size: "small" as const,
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&q=80"
    },
    {
      id: 6,
      caption: "El 'propósito' hecho realidad",
      alt: "Sonriendo juntos",
      size: "large" as const,
      url: "https://images.unsplash.com/photo-1525772639304-887684b1e40d?w=800&h=600&fit=crop&q=80"
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
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`newspaper-box-simple hover:shadow-xl transition-shadow stagger-animation ${
                photo.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                photo.size === 'medium' ? 'md:col-span-1' :
                'md:col-span-1'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Imagen de ejemplo - reemplazar con fotos reales */}
              <div className={`bg-newspaper-gray-200 ${
                photo.size === 'large' ? 'h-96' :
                photo.size === 'medium' ? 'h-64' :
                'h-48'
              } relative overflow-hidden group`}>
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />

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
