/**
 * COMPONENTE WEATHER BOX
 *
 * Caja de pronóstico tipo periódico (decorativa)
 * Versión extendida con pronóstico de 5 días
 */

import { eventConfig } from '@/config/eventConfig';

interface ForecastDay {
  day: string;
  icon: string;
  condition: string;
  probability: string;
}

export function WeatherBox() {
  const forecast: ForecastDay[] = [
    {
      day: "Lun 6",
      icon: "☀️",
      condition: "Emoción",
      probability: "95%"
    },
    {
      day: "Mar 7",
      icon: "💖",
      condition: "Amor",
      probability: "98%"
    },
    {
      day: "Mié 8",
      icon: "✨",
      condition: "Alegría",
      probability: "99%"
    },
    {
      day: "Jue 9",
      icon: "🎉",
      condition: "Fiesta",
      probability: "100%"
    },
    {
      day: "Dom 11",
      icon: "💒",
      condition: "¡BODA!",
      probability: "100%"
    }
  ];

  return (
    <div className="newspaper-box max-w-sm">
      {/* Header */}
      <div className="text-center border-b-2 border-newspaper-black pb-2 mb-3">
        <h4 className="newspaper-condensed-label">
          Pronóstico Emocional
        </h4>
        <p className="newspaper-meta mt-1">Esta Semana</p>
      </div>

      {/* Pronóstico principal (día de la boda) */}
      <div className="text-center mb-4 p-3 bg-newspaper-gray-100 border border-newspaper-gray-300">
        <p className="text-xs font-sans uppercase tracking-wide text-newspaper-gray-600 mb-1">
          {eventConfig.date.full}
        </p>
        <div className="text-5xl my-2">💒</div>
        <div className="text-3xl font-headline font-bold text-newspaper-black mb-1">
          100%
        </div>
        <p className="font-serif text-sm text-newspaper-gray-700 font-bold">
          Probabilidad de amor eterno
        </p>
      </div>

      {/* Pronóstico de 5 días */}
      <div className="border-t border-newspaper-border pt-3">
        <p className="newspaper-condensed-label text-center mb-2">
          Pronóstico Semanal
        </p>
        <div className="grid grid-cols-5 gap-1">
          {forecast.map((day, index) => (
            <div
              key={index}
              className={`text-center p-1 border border-newspaper-gray-300 hover:bg-newspaper-gray-100 transition-colors ${
                day.day === "Dom 11" ? "bg-newspaper-black text-white" : ""
              }`}
            >
              <p className={`text-[9px] font-sans font-bold uppercase mb-1 ${
                day.day === "Dom 11" ? "text-white" : "text-newspaper-gray-600"
              }`}>
                {day.day}
              </p>
              <div className="text-xl mb-1">{day.icon}</div>
              <p className={`text-[8px] font-serif ${
                day.day === "Dom 11" ? "text-white font-bold" : "text-newspaper-gray-700"
              }`}>
                {day.condition}
              </p>
              <p className={`text-[9px] font-bold mt-1 ${
                day.day === "Dom 11" ? "text-white" : "text-newspaper-black"
              }`}>
                {day.probability}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-newspaper-border mt-3 pt-2 text-center">
        <p className="text-[10px] font-sans italic text-newspaper-gray-500">
          Pronóstico garantizado por el amor verdadero
        </p>
      </div>
    </div>
  );
}
