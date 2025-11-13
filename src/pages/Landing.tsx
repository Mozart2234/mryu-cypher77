/**
 * PÁGINA LANDING
 *
 * Landing pública tipo one-page con toda la información del evento
 */

import { Hero } from '@/components/landing/Hero';
import { EventDetails } from '@/components/landing/EventDetails';
import { DressCode } from '@/components/landing/DressCode';
import { ThankYou } from '@/components/landing/ThankYou';

export function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <EventDetails />
      <DressCode />
      <ThankYou />
    </div>
  );
}
