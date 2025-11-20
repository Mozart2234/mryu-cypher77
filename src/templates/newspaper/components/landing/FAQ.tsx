/**
 * COMPONENTE FAQ - PREGUNTAS FRECUENTES
 *
 * Sección de preguntas frecuentes con diseño accordion estilo periódico
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { elementRef, isVisible } = useScrollAnimation();

  const faqs: FAQItem[] = [
    {
      question: '¿Cuál es el código de vestimenta?',
      answer: 'La ceremonia es formal. Sugerimos traje oscuro para caballeros y vestido largo o de coctel para damas. Por favor evita usar blanco, beige o colores muy claros que puedan confundirse con el vestido de la novia.'
    },
    {
      question: '¿Hay estacionamiento disponible?',
      answer: 'En la recepción contamos con estacionamiento privado para nuestros invitados. Pero en la iglesia no hay estacionamiento asignado, por lo que te recomendamos llegar con tiempo para encontrar lugar en las calles cercanas o usar transporte alternativo.'
    },
    {
      question: '¿A qué hora debo llegar?',
      answer: 'La ceremonia religiosa comienza a las 10:00 AM en punto. Te recomendamos llegar entre 15-20 minutos antes para tomar asiento cómodamente. La recepción iniciará inmediatamente después de la ceremonia.'
    },
    {
      question: '¿Cómo confirmo mi asistencia?',
      answer: 'Puedes confirmar tu asistencia usando el código de invitación que recibiste por WhatsApp o correo electrónico. Ingresa tu código en la sección "Ver Mi Invitación" y completa el formulario de confirmación.'
    },
    {
      question: '¿Hay lista de regalos?',
      answer: 'Tu presencia es nuestro mejor regalo. Sin embargo, si deseas obsequiarnos algo, agradecemos contribuciones en efectivo que nos ayudarán a comenzar nuestra nueva vida juntos. Habrá un buzón en la recepción.'
    },
    {
      question: '¿Qué pasa si no puedo asistir?',
      answer: 'Entendemos que pueden surgir imprevistos. Por favor, avísanos lo antes posible para poder ajustar nuestra lista de invitados. Puedes contactarnos directamente por WhatsApp.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={elementRef}
      id="faq"
      className={`newspaper-page py-12 px-4 md:px-8 bg-newspaper-gray-50 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      aria-labelledby="faq-title"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header estilo periódico */}
        <div className="text-center mb-8">
          <div className="newspaper-divider-thick mb-4" aria-hidden="true"></div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <HelpCircle className="w-8 h-8 text-newspaper-black" aria-hidden="true" />
            <h2 id="faq-title" className="newspaper-subheadline mb-0">
              Preguntas Frecuentes
            </h2>
          </div>

          <p className="newspaper-meta">
            TODO LO QUE NECESITAS SABER SOBRE NUESTRO GRAN DÍA
          </p>

          <div className="newspaper-divider-thick mt-4" aria-hidden="true"></div>
        </div>

        {/* Sección introductoria tipo editorial */}
        <div className="newspaper-box mb-8">
          <p className="font-serif text-sm md:text-base text-newspaper-black leading-relaxed text-center italic">
            "Hemos recopilado las consultas más comunes de nuestros invitados. Si tu pregunta no aparece aquí,
            no dudes en contactarnos directamente."
          </p>
        </div>

        {/* Accordion de preguntas */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="newspaper-box-simple border-2 border-newspaper-black overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Pregunta - Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 md:p-6 flex items-center justify-between gap-4 hover:bg-newspaper-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-black focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-start gap-3 flex-1">
                  {/* Número estilo periódico */}
                  <div className="flex-shrink-0 w-8 h-8 bg-newspaper-black text-white rounded-full flex items-center justify-center font-sans text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Pregunta */}
                  <h3 className="font-serif text-base md:text-lg font-bold text-newspaper-black leading-snug">
                    {faq.question}
                  </h3>
                </div>

                {/* Icono chevron */}
                <ChevronDown
                  className={`w-6 h-6 text-newspaper-black flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                    }`}
                  aria-hidden="true"
                />
              </button>

              {/* Respuesta - Collapsible */}
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                  <div className="border-t-2 border-newspaper-gray-300 pt-4 md:pt-6 pl-11">
                    <p className="font-serif text-sm md:text-base text-newspaper-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer con nota editorial */}
        <div className="mt-8 newspaper-box bg-newspaper-gray-100 border-t-4 border-newspaper-accent">
          <div className="flex items-start gap-3">
            <div className="text-2xl" aria-hidden="true">💌</div>
            <div>
              <h4 className="font-serif font-bold text-sm md:text-base text-newspaper-black mb-2">
                ¿Tienes otra pregunta?
              </h4>
              <p className="font-sans text-xs md:text-sm text-newspaper-gray-700 leading-relaxed">
                Si no encontraste la respuesta que buscabas, estaremos encantados de ayudarte.
                Contáctanos directamente por WhatsApp o correo electrónico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
