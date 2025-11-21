/**
 * COMPONENTE FAQ - PREGUNTAS FRECUENTES
 *
 * Sección de preguntas frecuentes con diseño accordion estilo periódico
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { eventConfig } from '@/config/eventConfig';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { elementRef, isVisible } = useScrollAnimation();
  const { faq } = eventConfig;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={elementRef}
      id="faq"
      className={`newspaper-page py-6 px-4 md:py-8 md:px-8 bg-newspaper-gray-50 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      aria-labelledby="faq-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header estilo periódico - más compacto */}
        <div className="text-center mb-4">
          <div className="newspaper-divider-thick mb-3" aria-hidden="true"></div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="w-6 h-6 text-newspaper-black" aria-hidden="true" />
            <h2 id="faq-title" className="font-headline text-2xl md:text-3xl font-bold text-newspaper-black mb-0">
              {faq.title}
            </h2>
          </div>

          <p className="text-sm uppercase tracking-wide text-newspaper-gray-600">
            {faq.subtitle}
          </p>

          <div className="newspaper-divider-thick mt-3" aria-hidden="true"></div>
        </div>

        {/* Accordion de preguntas - 2 columnas en desktop */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {faq.questions.map((question, index) => (
            <div
              key={index}
              className="newspaper-box-simple border border-newspaper-gray-400 overflow-hidden hover:border-newspaper-black hover:shadow-md transition-all duration-300"
            >
              {/* Pregunta - Button más compacto */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-3 md:p-4 flex items-center justify-between gap-3 hover:bg-newspaper-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-black focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-start gap-2 flex-1">
                  {/* Número */}
                  <div className="flex-shrink-0 w-7 h-7 bg-newspaper-black text-white rounded-sm flex items-center justify-center font-sans text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Pregunta */}
                  <h3 className="font-serif text-base md:text-lg font-bold text-newspaper-black leading-tight">
                    {question.question}
                  </h3>
                </div>

                {/* Icono chevron más pequeño */}
                <ChevronDown
                  className={`w-5 h-5 text-newspaper-black flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                    }`}
                  aria-hidden="true"
                />
              </button>

              {/* Respuesta - Collapsible más compacta */}
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-80' : 'max-h-0'
                  }`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="px-3 md:px-4 pb-3 md:pb-4 pt-0">
                  <div className="border-t border-newspaper-gray-300 pt-3 pl-9">
                    <p className="font-serif text-sm md:text-base text-newspaper-gray-700 leading-relaxed">
                      {question.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer con nota editorial - más compacto */}
        <div className="mt-4 newspaper-box bg-newspaper-gray-100 border-t-2 border-newspaper-accent p-3">
          <div className="flex items-start gap-3">
            <div className="text-2xl" aria-hidden="true">💌</div>
            <div>
              <h4 className="font-serif font-bold text-sm md:text-base text-newspaper-black mb-1">
                {faq.contactNote.title}
              </h4>
              <p className="font-sans text-sm text-newspaper-gray-700 leading-snug">
                {faq.contactNote.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
