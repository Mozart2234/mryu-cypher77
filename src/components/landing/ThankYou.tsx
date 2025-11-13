/**
 * COMPONENTE THANK YOU
 *
 * Mensaje de agradecimiento final
 */

import { eventConfig } from '@/config/eventConfig';
import { Heart } from 'lucide-react';

export function ThankYou() {
  const { messages, bride, groom } = eventConfig;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-primary mx-auto mb-4" fill="currentColor" />
          <h2 className="font-serif text-4xl md:text-5xl text-dark mb-4">
            {messages.thankYou.title}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {messages.thankYou.message}
          </p>

          <div className="bg-secondary rounded-xl p-8 mb-8">
            <p className="text-gray-600 italic">
              {messages.thankYou.note}
            </p>
          </div>

          {/* Firma */}
          <div className="mt-12">
            <p className="font-serif text-2xl text-dark">
              {bride.fullName} & {groom.fullName}
            </p>
          </div>
        </div>

        {/* Footer ornamento */}
        <div className="mt-16">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-20 bg-primary"></div>
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <div className="h-px w-20 bg-primary"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
