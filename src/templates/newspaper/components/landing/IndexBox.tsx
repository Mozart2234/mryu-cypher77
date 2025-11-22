/**
 * INDEX BOX - TABLA DE CONTENIDOS
 *
 * Componente tipo periódico que muestra un índice de las secciones
 * con números de página para fácil navegación
 */

interface IndexItem {
  title: string;
  page: string;
  description?: string;
  href: string;
}

export function IndexBox() {
  const indexItems: IndexItem[] = [
    {
      title: "Portada",
      page: "1",
      description: "El gran anuncio",
      href: "#hero"
    },
    {
      title: "Detalles del Evento",
      page: "2",
      description: "Ceremonia y recepción",
      href: "#event-details"
    },
    {
      title: "Historia de Amor",
      page: "3-4",
      description: "De 2016 al altar",
      href: "#love-story"
    },
    {
      title: "Código de Vestimenta",
      page: "5",
      description: "Dress code",
      href: "#dress-code"
    },
    {
      title: "Preguntas Frecuentes",
      page: "6",
      description: "FAQ",
      href: "#faq"
    },
    {
      title: "Mensajes de Invitados",
      page: "7",
      description: "Cartas al Editor",
      href: "#guest-messages"
    }
  ];

  return (
    <div className="newspaper-box mb-6 md:mb-8">
      {/* Header con estilo condensado */}
      <div className="border-b-2 border-newspaper-black pb-2 mb-3">
        <h3 className="newspaper-condensed-title text-center">
          Índice
        </h3>
        <p className="text-center text-sm font-serif italic text-newspaper-gray-600 mt-1">
          En Esta Edición
        </p>
      </div>

      {/* Lista de contenidos */}
      <div className="space-y-2">
        {indexItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-start justify-between border-b border-newspaper-gray-300 pb-2 last:border-b-0 hover:bg-newspaper-gray-100 transition-colors duration-200 px-2 py-1 cursor-pointer no-underline"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector(item.href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <div className="flex-1">
              <h4 className="font-serif font-bold text-base text-newspaper-black leading-tight">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-sm text-newspaper-gray-600 italic mt-0.5">
                  {item.description}
                </p>
              )}
            </div>
            <div className="ml-4 shrink-0">
              <span className="newspaper-condensed-label">
                Pág. {item.page}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer decorativo */}
      <div className="border-t-2 border-newspaper-black mt-3 pt-2">
        <p className="text-center text-sm font-serif uppercase tracking-wider text-newspaper-gray-500">
          Tabla de Contenidos
        </p>
      </div>
    </div>
  );
}
