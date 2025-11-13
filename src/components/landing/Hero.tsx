/**
 * COMPONENTE HERO
 *
 * Sección principal de la landing con los nombres de los novios
 * y la fecha del evento
 */

import { eventConfig } from '@/config/eventConfig';
import { Heart } from 'lucide-react';

export function Hero() {
  const { bride, groom, date, messages } = eventConfig;

  return (
    <section className="min-h-screen flex items-center justify-center hero-gradient px-4 py-20">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        {/* Ornamento superior */}
        <div className="mb-8">
          <Heart className="w-12 h-12 text-primary mx-auto" strokeWidth={1.5} />
        </div>

        {/* Título */}
        <h2 className="text-2xl md:text-3xl font-sans text-gray-600 mb-6 tracking-wide">
          {messages.hero.title}
        </h2>

        {/* Nombres de los novios */}
        <div className="mb-8">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-dark mb-4">
            {bride.name}
            <span className="text-primary mx-4">&</span>
            {groom.name}
          </h1>
        </div>

        {/* Fecha */}
        <div className="mb-8">
          <div className="inline-block border-t-2 border-b-2 border-primary py-4 px-8">
            <p className="font-sans text-lg md:text-xl text-gray-700 tracking-widest">
              {date.full}
            </p>
          </div>
        </div>

        {/* Mensaje */}
        <p className="font-sans text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {messages.hero.subtitle}
        </p>

        {/* Ornamento inferior */}
        <div className="mt-12">
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
