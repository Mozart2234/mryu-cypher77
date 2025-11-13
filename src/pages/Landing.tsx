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

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header tipo New York Times */}
      <NewspaperHeader />

      {/* Portada principal */}
      <Hero />

      {/* Contador regresivo */}
      <Countdown />

      {/* Detalles del evento */}
      <EventDetails />

      {/* Anuncios decorativos */}
      <Advertisement />

      {/* Historia de la pareja */}
      <LoveStory />

      {/* Galería de fotos */}
      <PhotoGallery />

      {/* Código de vestimenta */}
      <DressCode />

      {/* Cierre y firma */}
      <ThankYou />
    </div>
  );
}
