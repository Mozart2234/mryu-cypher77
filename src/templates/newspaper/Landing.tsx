/**
 * PÁGINA LANDING - ESTILO PERIÓDICO
 *
 * Landing pública tipo periódico con toda la información del evento
 */

import { useState } from 'react';
import { NewspaperHeader } from './components/landing/NewspaperHeader';
import { Hero } from './components/landing/Hero';
import { Countdown } from './components/landing/Countdown';
import { EventDetails } from './components/landing/EventDetails';
import { Advertisement } from './components/landing/Advertisement';
import { LoveStory } from './components/landing/LoveStory';
import { PhotoGallery } from './components/landing/PhotoGallery';
import { DressCode } from './components/landing/DressCode';
import { FAQ } from './components/landing/FAQ';
import { ClassifiedAds } from './components/landing/ClassifiedAds';
import { ThankYou } from './components/landing/ThankYou';
import { FloatingCTA } from './components/landing/FloatingCTA';
import { InvitationSearchModal } from './components/landing/InvitationSearchModal';
import { CTASection } from './components/landing/CTASection';
import { StickyNav } from './components/landing/StickyNav';
import { Ornament } from '@/components/Ornament';

// Componente separador de secciones tipo periódico
function PageSeparator() {
  return (
    <div className="w-full py-4 px-4">
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navegación Sticky */}
      <StickyNav />

      {/* Header tipo New York Times */}
      <NewspaperHeader />

      {/* Contador regresivo - destacado en la parte superior */}
      <Countdown />

      <Ornament type="banner" size="lg" />

      {/* Portada principal */}
      <section id="hero">
        <Hero />
      </section>

      {/* CTA Principal - después del Hero */}
      <CTASection variant="primary" onOpenModal={handleOpenModal} />

      <Ornament type="flourish" size="lg" />

      {/* Detalles del evento */}
      <section id="event-details">
        <EventDetails />
      </section>

      <PageSeparator />

      {/* Anuncios decorativos */}
      <Advertisement />

      <Ornament type="divider" size="md" />

      {/* Historia de la pareja */}
      <section id="love-story">
        <LoveStory />
      </section>

      <Ornament type="flourish" size="md" />

      {/* Galería de fotos */}
      {/* <section id="photo-gallery">
        <PhotoGallery />
      </section> */}

      <Ornament type="banner" size="md" />

      {/* Código de vestimenta */}
      <section id="dress-code">
        <DressCode />
      </section>

      <PageSeparator />

      {/* Preguntas Frecuentes */}
      <FAQ />

      <Ornament type="divider" size="md" />

      {/* Anuncios Clasificados */}
      <section id="classified-ads">
        <ClassifiedAds />
      </section>

      {/* CTA Secundario - antes del cierre */}
      <CTASection variant="secondary" onOpenModal={handleOpenModal} />

      <Ornament type="divider" size="lg" />

      {/* Cierre y firma */}
      <ThankYou />

      {/* Botón CTA Flotante */}
      <FloatingCTA onOpenModal={handleOpenModal} />

      {/* Modal de búsqueda de invitación */}
      <InvitationSearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
