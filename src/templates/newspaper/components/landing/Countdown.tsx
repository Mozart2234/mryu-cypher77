/**
 * COMPONENTE COUNTDOWN
 *
 * Contador regresivo creativo tipo periódico
 */

import { useState, useEffect } from 'react';
import { eventConfig } from '@/config/eventConfig';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date(eventConfig.date.iso);
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setIsEventPassed(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEventPassed(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="newspaper-page py-8 md:py-12 px-4 md:px-8 bg-newspaper-black text-white animate-slide-down">
      <div className="max-w-7xl mx-auto">
        {/* Título tipo headline urgente */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block border-2 border-white px-4 md:px-6 py-1.5 md:py-2 mb-3 md:mb-4 rotate-in">
            <span className="text-xs uppercase tracking-widest">
              {isEventPassed ? "EDICIÓN ESPECIAL" : "ÚLTIMA HORA"}
            </span>
          </div>
          <h2 className="font-headline text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            {isEventPassed ? "¡HOY ES EL GRAN DÍA!" : "¡LA CUENTA REGRESIVA HA COMENZADO!"}
          </h2>
          <p className="font-serif text-base md:text-xl text-gray-300">
            {isEventPassed ? "La celebración está en curso..." : "Faltan exactamente..."}
          </p>
        </div>

        {/* Contador estilo periódico */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 max-w-5xl mx-auto">
          {/* Días */}
          <div className="text-center">
            <div className="bg-white text-newspaper-black p-4 md:p-8 border-4 border-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="font-headline text-4xl md:text-7xl font-black leading-none mb-1 md:mb-2 countdown-pulse">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="border-t-2 border-newspaper-black pt-1.5 md:pt-2 mt-1.5 md:mt-2">
                <span className="font-sans text-xs md:text-base uppercase tracking-wider font-bold">
                  Días
                </span>
              </div>
            </div>
          </div>

          {/* Horas */}
          <div className="text-center">
            <div className="bg-white text-newspaper-black p-4 md:p-8 border-4 border-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="font-headline text-4xl md:text-7xl font-black leading-none mb-1 md:mb-2 countdown-pulse">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="border-t-2 border-newspaper-black pt-1.5 md:pt-2 mt-1.5 md:mt-2">
                <span className="font-sans text-xs md:text-base uppercase tracking-wider font-bold">
                  Horas
                </span>
              </div>
            </div>
          </div>

          {/* Minutos */}
          <div className="text-center">
            <div className="bg-white text-newspaper-black p-4 md:p-8 border-4 border-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="font-headline text-4xl md:text-7xl font-black leading-none mb-1 md:mb-2 countdown-pulse">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="border-t-2 border-newspaper-black pt-1.5 md:pt-2 mt-1.5 md:mt-2">
                <span className="font-sans text-xs md:text-base uppercase tracking-wider font-bold">
                  Min
                </span>
              </div>
            </div>
          </div>

          {/* Segundos */}
          <div className="text-center">
            <div className="bg-white text-newspaper-black p-4 md:p-8 border-4 border-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="font-headline text-4xl md:text-7xl font-black leading-none mb-1 md:mb-2 countdown-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="border-t-2 border-newspaper-black pt-1.5 md:pt-2 mt-1.5 md:mt-2">
                <span className="font-sans text-xs md:text-base uppercase tracking-wider font-bold">
                  Seg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtexto */}
        <div className="text-center mt-6 md:mt-8">
          <p className="font-serif text-sm md:text-lg text-gray-300 italic">
            ...hasta el evento más esperado del año
          </p>
          <div className="mt-3 md:mt-4 flex items-center justify-center space-x-2">
            <div className="h-px w-8 md:w-12 bg-white"></div>
            <span className="text-xl md:text-2xl">&hearts;</span>
            <div className="h-px w-8 md:w-12 bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
