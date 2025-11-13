/**
 * COMPONENTE DRESS CODE - CÓDIGO DE VESTIMENTA
 *
 * Recuadro informativo tipo periódico con el dress code
 */

import { eventConfig } from '@/config/eventConfig';

export function DressCode() {
  const { dressCode } = eventConfig;

  return (
    <section className="newspaper-page py-8 px-4 md:px-8 bg-newspaper-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Título como recuadro de periódico */}
        <div className="newspaper-box mb-8">
          <h2 className="newspaper-title text-center text-2xl md:text-3xl mb-2">
            {dressCode.title}
          </h2>
          <p className="text-center font-serif text-lg text-newspaper-accent">
            {dressCode.subtitle}
          </p>
        </div>

        <div className="newspaper-divider-double mb-8"></div>

        {/* Grid de dress code */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mujeres */}
          <div className="newspaper-box-simple">
            <h3 className="font-headline text-2xl font-bold text-center mb-4 text-newspaper-black border-b-2 border-newspaper-black pb-2">
              {dressCode.women.title}
            </h3>
            <ul className="space-y-3">
              {dressCode.women.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 text-newspaper-black font-bold">•</span>
                  <span className="font-sans text-sm md:text-base text-newspaper-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hombres */}
          <div className="newspaper-box-simple">
            <h3 className="font-headline text-2xl font-bold text-center mb-4 text-newspaper-black border-b-2 border-newspaper-black pb-2">
              {dressCode.men.title}
            </h3>
            <ul className="space-y-3">
              {dressCode.men.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 text-newspaper-black font-bold">•</span>
                  <span className="font-sans text-sm md:text-base text-newspaper-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
