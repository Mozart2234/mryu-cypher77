/**
 * COMPONENTE DETALLES DEL EVENTO
 *
 * Muestra la información de la ceremonia y recepción
 */

import { eventConfig } from '@/config/eventConfig';
import { Church, PartyPopper, MapPin, Clock } from 'lucide-react';

export function EventDetails() {
  const { ceremony, reception, messages } = eventConfig;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-dark mb-4 ornament inline-block">
            {messages.schedule.title}
          </h2>
        </div>

        {/* Grid de eventos */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Ceremonia */}
          <div className="card hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <Church className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-3xl text-dark mb-2">Ceremonia</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700">Hora</p>
                  <p className="text-gray-600">{ceremony.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700">{ceremony.name}</p>
                  <p className="text-gray-600">{ceremony.address}</p>
                  <p className="text-gray-600">{ceremony.city}</p>
                </div>
              </div>

              <a
                href={ceremony.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 mt-4"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>

          {/* Recepción */}
          <div className="card hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <PartyPopper className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-3xl text-dark mb-2">Recepción</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700">Hora</p>
                  <p className="text-gray-600">{reception.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700">{reception.name}</p>
                  <p className="text-gray-600">{reception.address}</p>
                  <p className="text-gray-600">{reception.city}</p>
                </div>
              </div>

              <a
                href={reception.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 mt-4"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
