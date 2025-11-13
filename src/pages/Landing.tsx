/**
 * PÁGINA LANDING - ESTILO PERIÓDICO
 *
 * Landing pública tipo periódico con toda la información del evento
 */

import { Hero } from '@/components/landing/Hero';
import { EventDetails } from '@/components/landing/EventDetails';
import { LoveStory } from '@/components/landing/LoveStory';
import { DressCode } from '@/components/landing/DressCode';
import { ThankYou } from '@/components/landing/ThankYou';

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <EventDetails />
      <LoveStory />
      <DressCode />
      <ThankYou />
    </div>
  );
}
