/**
 * COMPONENTE DRESS CODE
 *
 * Muestra la información del código de vestimenta
 */

import { eventConfig } from '@/config/eventConfig';
import { Shirt } from 'lucide-react';

export function DressCode() {
  const { dressCode } = eventConfig;

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Shirt className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-serif text-4xl md:text-5xl text-dark mb-4">
            {dressCode.title}
          </h2>
        </div>

        <div className="card max-w-2xl mx-auto">
          <div className="mb-4">
            <p className="text-2xl font-semibold text-primary mb-4">
              {dressCode.description}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {dressCode.details}
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 italic">
              {dressCode.colorNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
