/**
 * COMPONENTE COUNTDOWN
 *
 * Contador regresivo con animación flip tipo periódico
 * Incluye celebración espectacular cuando llega a cero
 */

import { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
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
          <span className="font-sans text-sm md:text-base uppercase tracking-wider font-bold text-newspaper-black">
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
  const [isEventPassed, setIsEventPassed] = useState(true);

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

  // Si el evento ya pasó, mostrar celebración ESPECTACULAR estilo NEWSPAPER VINTAGE
  if (isEventPassed) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 md:px-8 overflow-hidden newspaper-celebration-bg">

        {/* ===== CAPA 1: PARTÍCULAS DE TINTA/PAPEL VINTAGE ===== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={`ink-${i}`}
              className="absolute newspaper-ink-float"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
                animationDelay: `${(i * 0.5) % 8}s`,
                opacity: 0.03 + (i % 5) * 0.01,
              }}
            >
              <span className="text-newspaper-black font-headline" style={{ fontSize: `${60 + (i % 40)}px` }}>
                {['❦', '❧', '✦', '✧', '❈'][i % 5]}
              </span>
            </div>
          ))}
        </div>

        {/* ===== CAPA 2: LÍNEAS DE PRENSA ANIMADAS ===== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute h-px bg-newspaper-black/10 newspaper-print-line"
              style={{
                top: `${12 + i * 12}%`,
                left: 0,
                right: 0,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* ===== CAPA 3: CORAZONES DORADOS FLOTANDO ===== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute newspaper-heart-rise"
              style={{
                left: `${(i * 6.6) % 100}%`,
                bottom: '-30px',
                animationDelay: `${(i * 0.6) % 10}s`,
                animationDuration: `${8 + (i % 4)}s`,
              }}
            >
              <Heart
                className="text-amber-600/40 fill-amber-600/20"
                style={{ width: `${14 + (i % 12)}px`, height: `${14 + (i % 12)}px` }}
              />
            </div>
          ))}
        </div>

        {/* ===== RESPLANDOR SEPIA SUTIL ===== */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[150px] newspaper-glow-pulse" />
        </div>

        {/* ===== CONTENIDO PRINCIPAL - ESTILO PERIÓDICO ===== */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-8">

          {/* Marco exterior vintage */}
          <div className="relative bg-newspaper-cream border-4 border-newspaper-black p-1 newspaper-paper-texture newspaper-entrance">
            <div className="border-2 border-newspaper-black p-6 md:p-10">

              {/* Header del periódico - EXTRA! EXTRA! */}
              <div className="mb-6 newspaper-header-reveal">
                {/* Línea superior decorativa */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-1 flex-1 bg-newspaper-black" />
                  <span className="font-headline text-xs tracking-[0.3em] uppercase">Edición Especial de Boda</span>
                  <div className="h-1 flex-1 bg-newspaper-black" />
                </div>

                {/* EXTRA! EXTRA! Banner */}
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-newspaper-black transform -skew-x-2" />
                  <div className="relative bg-newspaper-black px-8 md:px-16 py-3 newspaper-flash">
                    <span className="font-headline text-2xl md:text-4xl font-black tracking-wider text-white">
                      ¡EXTRA! ¡EXTRA!
                    </span>
                  </div>
                </div>

                {/* Fecha del periódico */}
                <p className="font-serif text-sm text-newspaper-gray-600 tracking-wide">
                  {eventConfig.date.full} — {eventConfig.newspaper.location}
                </p>
              </div>

              {/* Ornamento superior */}
              <div className="flex items-center justify-center gap-3 mb-6 newspaper-ornament-reveal">
                <span className="text-2xl text-amber-700 newspaper-sparkle">❦</span>
                <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-amber-700 to-transparent" />
                <Heart className="w-6 h-6 text-amber-700 fill-amber-700 newspaper-heart-beat" />
                <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-amber-700 to-transparent" />
                <span className="text-2xl text-amber-700 newspaper-sparkle-delayed">❧</span>
              </div>

              {/* HEADLINE PRINCIPAL */}
              <div className="mb-8 newspaper-headline-reveal">
                <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] text-newspaper-black mb-4 tracking-tight newspaper-headline-glow">
                  ¡HOY NOS CASAMOS!
                </h2>

                {/* Subtítulo tipo deck */}
                <p className="font-serif text-lg md:text-2xl text-newspaper-gray-700 italic max-w-2xl mx-auto">
                  La noticia más esperada del año finalmente se hace realidad
                </p>
              </div>

              {/* Separador con anillos */}
              <div className="flex items-center justify-center gap-4 mb-8 newspaper-rings-reveal">
                <div className="h-px flex-1 max-w-[100px] bg-newspaper-black/30" />
                <div className="relative w-20 h-12 md:w-28 md:h-16">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 border-3 md:border-4 border-amber-600 rounded-full newspaper-ring-shine" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 border-3 md:border-4 border-amber-600 rounded-full newspaper-ring-shine-delayed" />
                  <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-amber-500 newspaper-sparkle-rotate" />
                </div>
                <div className="h-px flex-1 max-w-[100px] bg-newspaper-black/30" />
              </div>

              {/* NOMBRES - Protagonistas de la historia */}
              <div className="mb-8 newspaper-names-reveal">
                <p className="font-serif text-sm uppercase tracking-[0.2em] text-newspaper-gray-600 mb-3">
                  Los protagonistas de esta historia
                </p>

                <div className="space-y-4">
                  <p className="font-headline text-2xl md:text-4xl lg:text-5xl font-black text-newspaper-black leading-tight newspaper-name-glow">
                    {eventConfig.groom.fullName}
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <div className="h-[2px] w-12 md:w-20 bg-amber-600 newspaper-line-grow" />
                    <span className="font-serif text-3xl md:text-5xl text-amber-700 italic newspaper-ampersand-pulse">&</span>
                    <div className="h-[2px] w-12 md:w-20 bg-amber-600 newspaper-line-grow-delayed" />
                  </div>

                  <p className="font-headline text-2xl md:text-4xl lg:text-5xl font-black text-newspaper-black leading-tight newspaper-name-glow">
                    {eventConfig.bride.fullName}
                  </p>
                </div>
              </div>

              {/* Corazón central con efecto vintage */}
              <div className="flex justify-center mb-8 newspaper-heart-reveal">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 md:w-36 md:h-36 bg-amber-200/50 rounded-full blur-xl newspaper-heart-aura" />
                  </div>
                  <Heart className="relative w-20 h-20 md:w-28 md:h-28 text-amber-700 fill-amber-700/90 newspaper-heart-main drop-shadow-lg" />
                </div>
              </div>

              {/* Cita / Pull Quote vintage */}
              <div className="relative max-w-2xl mx-auto mb-8 newspaper-quote-reveal">
                <div className="absolute -left-2 -top-2 text-5xl md:text-7xl text-amber-600/20 font-serif leading-none">"</div>
                <div className="absolute -right-2 -bottom-6 text-5xl md:text-7xl text-amber-600/20 font-serif leading-none rotate-180">"</div>
                <blockquote className="font-serif text-lg md:text-xl lg:text-2xl text-newspaper-gray-800 italic leading-relaxed px-6 py-4">
                  Después de años de amor, risas y aventuras juntos, hoy sellamos nuestro compromiso ante Dios y ante ustedes, nuestra querida familia y amigos.
                </blockquote>
              </div>

              {/* Info boxes estilo clasificados */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 newspaper-info-reveal">
                <div className="border-2 border-newspaper-black p-4 bg-newspaper-gray-50 hover:bg-amber-50 transition-colors duration-300 group">
                  <p className="font-headline text-xs uppercase tracking-widest text-newspaper-gray-600 mb-1">Ceremonia</p>
                  <p className="font-headline text-lg md:text-xl font-bold text-newspaper-black group-hover:text-amber-800 transition-colors">
                    {eventConfig.ceremony.time}
                  </p>
                  <p className="font-serif text-sm text-newspaper-gray-700">{eventConfig.ceremony.name}</p>
                </div>
                <div className="border-2 border-newspaper-black p-4 bg-newspaper-gray-50 hover:bg-amber-50 transition-colors duration-300 group">
                  <p className="font-headline text-xs uppercase tracking-widest text-newspaper-gray-600 mb-1">Recepción</p>
                  <p className="font-headline text-lg md:text-xl font-bold text-newspaper-black group-hover:text-amber-800 transition-colors">
                    {eventConfig.reception.time}
                  </p>
                  <p className="font-serif text-sm text-newspaper-gray-700">{eventConfig.reception.name}</p>
                </div>
              </div>

              {/* Firma / Byline */}
              <div className="newspaper-signature-reveal">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px w-12 md:w-20 bg-newspaper-gray-400" />
                  <span className="text-amber-700 text-xl">❦</span>
                  <div className="h-px w-12 md:w-20 bg-newspaper-gray-400" />
                </div>
                <p className="font-serif text-base md:text-lg italic text-newspaper-gray-700">Con amor infinito,</p>
                <p className="font-headline text-lg md:text-xl font-bold text-newspaper-black mt-1">
                  {eventConfig.groom.name} & {eventConfig.bride.name}
                </p>
              </div>

              {/* Folio inferior */}
              <div className="mt-8 pt-4 border-t border-newspaper-gray-300 flex justify-between items-center text-xs text-newspaper-gray-500">
                <span className="font-serif italic">El Cronista del Amor</span>
                <span className="font-sans tracking-wider">EDICIÓN ESPECIAL</span>
                <span className="font-serif italic">Página 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ESTILOS DE ANIMACIÓN NEWSPAPER VINTAGE ===== */}
        <style>{`
          /* Fondo estilo papel de periódico */
          .newspaper-celebration-bg {
            background: linear-gradient(
              to bottom,
              #f5f0e6 0%,
              #faf6ed 20%,
              #f8f4eb 50%,
              #f5f0e6 80%,
              #efe9dc 100%
            );
          }

          /* Textura de papel */
          .newspaper-paper-texture {
            background-image:
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.01) 1px,
                rgba(0,0,0,0.01) 2px
              );
          }

          /* Entrada principal */
          @keyframes newspaper-entrance {
            0% { opacity: 0; transform: scale(0.95) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .newspaper-entrance { animation: newspaper-entrance 0.8s ease-out forwards; }

          /* Header reveal */
          @keyframes header-reveal {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .newspaper-header-reveal { animation: header-reveal 0.6s ease-out forwards 0.3s; opacity: 0; }

          /* Flash del banner EXTRA */
          @keyframes newspaper-flash {
            0%, 100% { box-shadow: 0 0 0 rgba(212, 175, 55, 0); }
            50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.5); }
          }
          .newspaper-flash { animation: newspaper-flash 2s ease-in-out infinite; }

          /* Ornamentos */
          .newspaper-ornament-reveal { animation: header-reveal 0.6s ease-out forwards 0.5s; opacity: 0; }

          /* Sparkle de ornamentos */
          @keyframes sparkle {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          .newspaper-sparkle { animation: sparkle 2s ease-in-out infinite; }
          .newspaper-sparkle-delayed { animation: sparkle 2s ease-in-out infinite 0.5s; }

          /* Rotación de sparkle */
          @keyframes sparkle-rotate {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .newspaper-sparkle-rotate { animation: sparkle-rotate 4s linear infinite; }

          /* Latido del corazón ornamental */
          @keyframes heart-beat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.15); }
            50% { transform: scale(1); }
          }
          .newspaper-heart-beat { animation: heart-beat 1.5s ease-in-out infinite; }

          /* Headline reveal */
          @keyframes headline-reveal {
            0% { opacity: 0; transform: translateY(30px); letter-spacing: 0.2em; }
            100% { opacity: 1; transform: translateY(0); letter-spacing: -0.02em; }
          }
          .newspaper-headline-reveal { animation: headline-reveal 0.8s ease-out forwards 0.7s; opacity: 0; }

          /* Glow del headline */
          @keyframes headline-glow {
            0%, 100% { text-shadow: 0 0 0 transparent; }
            50% { text-shadow: 0 0 20px rgba(180, 130, 70, 0.3); }
          }
          .newspaper-headline-glow { animation: headline-glow 3s ease-in-out infinite; }

          /* Anillos reveal */
          .newspaper-rings-reveal { animation: header-reveal 0.6s ease-out forwards 0.9s; opacity: 0; }

          /* Brillo de anillos */
          @keyframes ring-shine {
            0%, 100% { box-shadow: 0 0 10px rgba(180, 130, 70, 0.3), inset 0 0 10px rgba(255, 215, 0, 0.1); }
            50% { box-shadow: 0 0 25px rgba(180, 130, 70, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.3); }
          }
          .newspaper-ring-shine { animation: ring-shine 2s ease-in-out infinite; }
          .newspaper-ring-shine-delayed { animation: ring-shine 2s ease-in-out infinite 0.3s; }

          /* Nombres reveal */
          @keyframes names-reveal {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .newspaper-names-reveal { animation: names-reveal 0.8s ease-out forwards 1s; opacity: 0; }

          /* Glow de nombres */
          @keyframes name-glow {
            0%, 100% { text-shadow: none; }
            50% { text-shadow: 0 2px 15px rgba(180, 130, 70, 0.2); }
          }
          .newspaper-name-glow { animation: name-glow 3s ease-in-out infinite; }

          /* Líneas creciendo */
          @keyframes line-grow {
            0% { width: 0; opacity: 0; }
            100% { width: 5rem; opacity: 1; }
          }
          .newspaper-line-grow { animation: line-grow 0.6s ease-out forwards 1.2s; width: 0; }
          .newspaper-line-grow-delayed { animation: line-grow 0.6s ease-out forwards 1.4s; width: 0; }

          /* Ampersand pulsando */
          @keyframes ampersand-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
          .newspaper-ampersand-pulse { animation: ampersand-pulse 2s ease-in-out infinite; }

          /* Corazón reveal */
          .newspaper-heart-reveal { animation: names-reveal 0.8s ease-out forwards 1.3s; opacity: 0; }

          /* Corazón principal */
          @keyframes heart-main {
            0%, 100% { transform: scale(1); }
            5% { transform: scale(1.1); }
            10% { transform: scale(1); }
            15% { transform: scale(1.08); }
            20% { transform: scale(1); }
          }
          .newspaper-heart-main { animation: heart-main 2s ease-in-out infinite; }

          /* Aura del corazón */
          @keyframes heart-aura {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.15); }
          }
          .newspaper-heart-aura { animation: heart-aura 2s ease-in-out infinite; }

          /* Quote reveal */
          .newspaper-quote-reveal { animation: names-reveal 0.8s ease-out forwards 1.5s; opacity: 0; }

          /* Info reveal */
          .newspaper-info-reveal { animation: names-reveal 0.8s ease-out forwards 1.7s; opacity: 0; }

          /* Signature reveal */
          .newspaper-signature-reveal { animation: names-reveal 0.8s ease-out forwards 1.9s; opacity: 0; }

          /* Partículas de tinta flotando */
          @keyframes ink-float {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.03; }
            50% { transform: translateY(-30px) rotate(10deg); opacity: 0.06; }
          }
          .newspaper-ink-float { animation: ink-float 10s ease-in-out infinite; }

          /* Líneas de impresión */
          @keyframes print-line {
            0% { opacity: 0; transform: scaleX(0); }
            50% { opacity: 0.1; transform: scaleX(1); }
            100% { opacity: 0; transform: scaleX(0); }
          }
          .newspaper-print-line { animation: print-line 8s ease-in-out infinite; transform-origin: left; }

          /* Corazones subiendo */
          @keyframes heart-rise {
            0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { transform: translateY(-100vh) scale(0.8) rotate(20deg); opacity: 0; }
          }
          .newspaper-heart-rise { animation: heart-rise 10s ease-out infinite; }

          /* Glow pulse del fondo */
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
          }
          .newspaper-glow-pulse { animation: glow-pulse 4s ease-in-out infinite; }

          /* Responsive ajustes */
          @media (max-width: 768px) {
            .newspaper-line-grow, .newspaper-line-grow-delayed {
              animation: none;
              width: 3rem;
              opacity: 1;
            }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="newspaper-page py-8 md:py-12 px-4 md:px-8 bg-newspaper-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Título tipo headline urgente */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block border-2 border-white px-4 md:px-6 py-1.5 md:py-2 mb-3 md:mb-4">
            <span className="text-sm md:text-base uppercase tracking-widest">ÚLTIMA HORA</span>
          </div>
          <h2 className="font-headline text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            ¡LA CUENTA REGRESIVA HA COMENZADO!
          </h2>
          <p className="font-serif text-base md:text-xl text-gray-300">
            Faltan exactamente...
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
          <p className="font-serif text-base md:text-xl text-gray-300 italic">
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
