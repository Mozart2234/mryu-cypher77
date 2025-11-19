/**
 * COMPONENTE THANK YOU - MENSAJE FINAL
 *
 * Sección de cierre tipo pie de periódico
 */

import { eventConfig } from '@/config/eventConfig';

export function ThankYou() {
  const { bride, groom } = eventConfig;

  return (
    <section className="newspaper-page py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Divisor decorativo */}
        <div className="newspaper-divider-double mb-8"></div>

        {/* Firma de los novios */}
        <div className="text-center">
          <p className="newspaper-subheadline mb-4">
            {groom.fullName}
          </p>
          <p className="newspaper-title text-newspaper-gray-500 mb-2">
            &
          </p>
          <p className="newspaper-subheadline mb-8">
            {bride.fullName}
          </p>
        </div>

        <div className="newspaper-divider-thick"></div>

        {/* Nota final */}
        <div className="mt-8 text-center">
          <p className="newspaper-meta">
            {eventConfig.date.full}
          </p>
          <p className="newspaper-meta">
            {eventConfig.ceremony.city}
          </p>
        </div>

        {/* Línea final decorativa */}
        <div className="mt-12 border-t-4 border-newspaper-black"></div>
      </div>
    </section>
  );
}
