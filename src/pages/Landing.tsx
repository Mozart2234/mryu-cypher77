/**
 * PÁGINA LANDING - ESTILO PERIÓDICO
 *
 * Landing pública tipo periódico con toda la información del evento
 */

import { NewspaperHeader } from '@/components/landing/NewspaperHeader';
import { Hero } from '@/components/landing/Hero';
import { Countdown } from '@/components/landing/Countdown';
import { EventDetails } from '@/components/landing/EventDetails';
import { Advertisement } from '@/components/landing/Advertisement';
import { LoveStory } from '@/components/landing/LoveStory';
import { PhotoGallery } from '@/components/landing/PhotoGallery';
import { DressCode } from '@/components/landing/DressCode';
import { ThankYou } from '@/components/landing/ThankYou';

// Componente separador de secciones tipo periódico
function PageSeparator() {
  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="border-t-4 border-b-4 border-newspaper-black py-2 flex items-center justify-center gap-4">
          <div className="w-20 border-t-2 border-newspaper-gray-400"></div>
          <span className="font-headline text-xs uppercase tracking-widest text-newspaper-gray-600">
            ◆
          </span>
          <div className="w-20 border-t-2 border-newspaper-gray-400"></div>
        </div>
      </div>
    </div>
  );
}

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header tipo New York Times */}
      <NewspaperHeader />

      {/* Contador regresivo - destacado en la parte superior */}
      <Countdown />

      <PageSeparator />

      {/* Portada principal */}
      <Hero />

      <PageSeparator />

      {/* Detalles del evento */}
      <EventDetails />

      <PageSeparator />

      {/* Anuncios decorativos */}
      <Advertisement />

      <PageSeparator />

      {/* Historia de la pareja */}
      <LoveStory />

      <PageSeparator />

      {/* Galería de fotos */}
      <PhotoGallery />

      <PageSeparator />

      {/* Código de vestimenta */}
      <DressCode />

      <PageSeparator />

      {/* Cierre y firma */}
      <ThankYou />
    </div>
  );
}
