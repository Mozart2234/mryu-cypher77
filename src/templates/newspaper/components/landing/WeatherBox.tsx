/**
 * COMPONENTE WEATHER BOX
 *
 * Caja de pronóstico tipo periódico (decorativa)
 */

import { eventConfig } from '@/config/eventConfig';

export function WeatherBox() {
  return (
    <div className="newspaper-box max-w-sm">
      <div className="text-center border-b border-newspaper-border pb-2 mb-3">
        <h4 className="font-sans text-xs uppercase tracking-wider font-bold">
          Pronóstico del Día
        </h4>
        <p className="newspaper-meta">{eventConfig.date.full}</p>
      </div>

      <div className="flex items-center justify-center mb-3">
        <svg className="w-16 h-16 text-newspaper-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>

      <div className="text-center">
        <div className="text-4xl font-headline font-bold text-newspaper-black mb-1">
          100%
        </div>
        <p className="font-serif text-sm text-newspaper-gray-700">
          Probabilidad de amor
        </p>
        <p className="font-sans text-xs text-newspaper-gray-500 mt-2">
          Día soleado y perfecto para celebrar
        </p>
      </div>

      <div className="border-t border-newspaper-border mt-3 pt-2">
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div>
            <p className="font-bold">Temp. Emocional</p>
            <p className="text-newspaper-black">Muy Alta</p>
          </div>
          <div>
            <p className="font-bold">Felicidad</p>
            <p className="text-newspaper-black">Máxima</p>
          </div>
        </div>
      </div>
    </div>
  );
}
