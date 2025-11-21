/**
 * COMPONENTE NEWSPAPER HEADER
 *
 * Header tipo New York Times con fecha, clima y detalles
 */

import { eventConfig } from '@/config/eventConfig';

export function NewspaperHeader() {
  const { newspaper, date } = eventConfig;

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const todayFormatted = today.toLocaleDateString('es-ES', options);

  return (
    <header className="border-b-2 border-newspaper-black bg-white">
      {/* Barra superior con detalles */}
      <div className="border-b border-newspaper-gray-300 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <span className="newspaper-meta">{todayFormatted}</span>
            <span className="hidden md:inline newspaper-meta">|</span>
            <span className="hidden md:inline newspaper-meta">{newspaper.location}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="newspaper-meta">Edición Digital</span>
            <span className="hidden md:inline newspaper-meta">|</span>
            <span className="hidden md:inline newspaper-meta">{newspaper.editionYear}</span>
          </div>
        </div>
      </div>

      {/* Logo principal del periódico */}
      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-2">
            <div className="inline-block">
              <svg width="200" height="8" className="mb-2 mx-auto">
                <line x1="0" y1="4" x2="200" y2="4" stroke="#1a1a1a" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          <h1 className="font-headline text-4xl md:text-6xl font-black text-newspaper-black tracking-tight" style={{ fontFamily: "'Old English Text MT', 'Playfair Display', serif" }}>
            {newspaper.name}
          </h1>

          <div className="mt-2">
            <div className="inline-block">
              <svg width="200" height="8" className="mt-2 mx-auto">
                <line x1="0" y1="4" x2="200" y2="4" stroke="#1a1a1a" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          <p className="newspaper-meta mt-3">
            "{newspaper.tagline}"
          </p>
        </div>
      </div>

      {/* Sección y detalles */}
      <div className="border-t border-newspaper-black bg-newspaper-gray-100 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="newspaper-meta">{newspaper.section}</div>
          <div className="newspaper-meta">{date.dayOfWeek}, {date.day} DE {date.month} {date.year}</div>
        </div>
      </div>
    </header>
  );
}
