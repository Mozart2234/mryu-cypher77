/**
 * COMPONENTE COUNTDOWN
 *
 * Contador regresivo con animación flip tipo periódico
 */

import { useState, useEffect, useRef } from 'react';
import { eventConfig } from '@/config/eventConfig';

interface FlipCardProps {
  value: string;
  label: string;
}

function FlipCard({ value, label }: FlipCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      // Iniciar animación de flip
      setIsFlipping(true);

      // A mitad de la animación, cambiar el valor
      const changeTimer = setTimeout(() => {
        setDisplayValue(value);
      }, 150);

      // Finalizar animación
      const endTimer = setTimeout(() => {
        setIsFlipping(false);
        prevValueRef.current = value;
      }, 300);

      return () => {
        clearTimeout(changeTimer);
        clearTimeout(endTimer);
      };
    }
  }, [value]);

  return (
    <div className="text-center">
      <div className="relative bg-white text-newspaper-black overflow-hidden shadow-lg border-2 border-newspaper-black">
        {/* Contenedor del número con perspectiva 3D */}
        <div
          className="relative p-4 md:p-6"
          style={{ perspective: '300px' }}
        >
          {/* Número con animación flip */}
          <div
            className={`
              font-headline text-4xl md:text-6xl lg:text-7xl font-black leading-none
              transition-all duration-300 ease-in-out
              ${isFlipping ? 'flip-animation' : ''}
            `}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {displayValue}
          </div>

          {/* Línea divisoria horizontal tipo periódico */}
          <div className="absolute left-2 right-2 top-1/2 h-px bg-newspaper-gray-300 pointer-events-none"></div>

          {/* Sombra durante el flip */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/0
              pointer-events-none transition-opacity duration-150
              ${isFlipping ? 'opacity-100' : 'opacity-0'}
            `}
          />
        </div>

        {/* Label inferior */}
        <div className="border-t-2 border-newspaper-black py-2 bg-newspaper-gray-100">
          <span className="font-sans text-xs md:text-sm uppercase tracking-wider font-bold text-newspaper-black">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

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
    <section className="newspaper-page py-8 md:py-12 px-4 md:px-8 bg-newspaper-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Título tipo headline urgente */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block border-2 border-white px-4 md:px-6 py-1.5 md:py-2 mb-3 md:mb-4">
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

        {/* Contador con flip animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
          <FlipCard
            value={String(timeLeft.days).padStart(2, '0')}
            label="Días"
          />
          <FlipCard
            value={String(timeLeft.hours).padStart(2, '0')}
            label="Horas"
          />
          <FlipCard
            value={String(timeLeft.minutes).padStart(2, '0')}
            label="Minutos"
          />
          <FlipCard
            value={String(timeLeft.seconds).padStart(2, '0')}
            label="Segundos"
          />
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

      {/* CSS para la animación flip */}
      <style>{`
        .flip-animation {
          animation: flipNumber 0.3s ease-in-out;
        }

        @keyframes flipNumber {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(-90deg);
            opacity: 0.5;
          }
          100% {
            transform: rotateX(0deg);
          }
        }
      `}</style>
    </section>
  );
}
