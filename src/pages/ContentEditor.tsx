/**
 * EDITOR DE CONTENIDO
 *
 * Página especial para revisar y editar todos los textos del periódico
 * sin necesidad de tocar código. Diseñado para uso no-técnico.
 */

import { useState } from 'react';
import { eventConfig } from '@/config/eventConfig';

export function ContentEditor() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📝 Editor de Contenido - Invitación Periódico
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Esta página te permite revisar todos los textos que aparecen en la invitación.
            Para editar, copia el texto que necesitas cambiar y envíaselo a tu programador.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Cómo usar:</strong> Revisa cada sección, haz clic en "Copiar" para copiar el texto,
              y envía los cambios que necesites hacer. Incluye el nombre de la sección para facilitar la edición.
            </p>
          </div>
        </div>

        {/* Sección: Información de los Novios */}
        <ContentSection title="👰🤵 Información de los Novios">
          <TextBlock
            label="Nombre de la Novia"
            content={eventConfig.bride.name}
            onCopy={copyToClipboard}
          />
          <TextBlock
            label="Nombre Completo de la Novia"
            content={eventConfig.bride.fullName}
            onCopy={copyToClipboard}
          />
          <TextBlock
            label="Nombre del Novio"
            content={eventConfig.groom.name}
            onCopy={copyToClipboard}
          />
          <TextBlock
            label="Nombre Completo del Novio"
            content={eventConfig.groom.fullName}
            onCopy={copyToClipboard}
          />
        </ContentSection>

        {/* Sección: Titulares del Periódico */}
        <ContentSection title="📰 Titulares y Encabezados">
          <TextBlock
            label="Edición del Periódico"
            content={eventConfig.newspaper.edition}
            onCopy={copyToClipboard}
          />
          <TextBlock
            label="Titular Principal"
            content={eventConfig.newspaper.headline}
            onCopy={copyToClipboard}
          />
          <TextBlock
            label="Subtítulo Principal"
            content={eventConfig.newspaper.subheadline}
            onCopy={copyToClipboard}
          />
          <TextBlock
            label="Bajada del Titular"
            content={eventConfig.newspaper.subtitle}
            onCopy={copyToClipboard}
          />
        </ContentSection>

        {/* Sección: Fecha y Hora */}
        <ContentSection title="📅 Fecha y Hora del Evento">
          <TextBlock
            label="Fecha Completa"
            content={eventConfig.date.full}
            onCopy={copyToClipboard}
          />
          <TextBlock
            label="Hora"
            content={eventConfig.date.time}
            onCopy={copyToClipboard}
          />
        </ContentSection>

        {/* Sección: Ubicaciones */}
        <ContentSection title="📍 Ubicaciones">
          <div className="space-y-4">
            <div className="bg-rose-50 p-4 rounded-lg">
              <h4 className="font-bold text-rose-900 mb-2">🏛️ Ceremonia</h4>
              <TextBlock
                label="Nombre del Lugar"
                content={eventConfig.ceremony.name}
                onCopy={copyToClipboard}
                compact
              />
              <TextBlock
                label="Dirección"
                content={eventConfig.ceremony.address}
                onCopy={copyToClipboard}
                compact
              />
              <TextBlock
                label="Ciudad"
                content={eventConfig.ceremony.city}
                onCopy={copyToClipboard}
                compact
              />
              <TextBlock
                label="Hora"
                content={eventConfig.ceremony.time}
                onCopy={copyToClipboard}
                compact
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">🎉 Recepción</h4>
              <TextBlock
                label="Nombre del Lugar"
                content={eventConfig.reception.name}
                onCopy={copyToClipboard}
                compact
              />
              <TextBlock
                label="Dirección"
                content={eventConfig.reception.address}
                onCopy={copyToClipboard}
                compact
              />
              <TextBlock
                label="Ciudad"
                content={eventConfig.reception.city}
                onCopy={copyToClipboard}
                compact
              />
              <TextBlock
                label="Hora"
                content={eventConfig.reception.time}
                onCopy={copyToClipboard}
                compact
              />
            </div>
          </div>
        </ContentSection>

        {/* Sección: Historia de Amor */}
        <ContentSection title="❤️ Historia de Amor (Timeline)">
          <p className="text-sm text-gray-600 mb-4">
            Esta es la línea de tiempo que aparece en la sección "Nuestra Historia de Amor"
          </p>
          {eventConfig.loveStory.map((event, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg mb-4 border-l-4 border-rose-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{event.icon}</span>
                <h4 className="font-bold text-lg text-gray-900">
                  {event.date} - {event.title}
                </h4>
                {event.featured && (
                  <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded">
                    DESTACADO
                  </span>
                )}
              </div>
              <TextBlock
                label="Texto del Evento"
                content={event.text}
                onCopy={copyToClipboard}
                compact
              />
              {event.quote && (
                <TextBlock
                  label="Cita Destacada"
                  content={event.quote}
                  onCopy={copyToClipboard}
                  compact
                />
              )}
            </div>
          ))}
        </ContentSection>

        {/* Sección: Artículos del Periódico */}
        <ContentSection title="📄 Artículos del Periódico">
          <p className="text-sm text-gray-600 mb-4">
            Estos son los artículos que aparecen en la portada tipo periódico
          </p>
          {eventConfig.articles.map((article, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg text-gray-900">
                  Artículo {index + 1}
                </h4>
                <span className="text-xs text-gray-500">{article.page}</span>
              </div>
              <TextBlock
                label="Título"
                content={article.title}
                onCopy={copyToClipboard}
                compact
              />
              <TextBlock
                label="Contenido"
                content={article.content}
                onCopy={copyToClipboard}
                compact
              />
            </div>
          ))}
        </ContentSection>

        {/* Sección: Cita Bíblica */}
        <ContentSection title="📖 Cita Bíblica">
          <div className="bg-purple-50 p-6 rounded-lg">
            <TextBlock
              label="Texto de la Cita"
              content={eventConfig.quote.text}
              onCopy={copyToClipboard}
            />
            <TextBlock
              label="Fuente"
              content={eventConfig.quote.source}
              onCopy={copyToClipboard}
            />
          </div>
        </ContentSection>

        {/* Sección: Código de Vestimenta */}
        <ContentSection title="👔 Código de Vestimenta">
          <TextBlock
            label="Título"
            content={eventConfig.dressCode.title}
            onCopy={copyToClipboard}
          />
          <TextBlock
            label="Subtítulo"
            content={eventConfig.dressCode.subtitle}
            onCopy={copyToClipboard}
          />

          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-pink-900 mb-2">{eventConfig.dressCode.women.title}</h4>
            {eventConfig.dressCode.women.items.map((item, index) => (
              <TextBlock
                key={index}
                label={`Punto ${index + 1}`}
                content={item}
                onCopy={copyToClipboard}
                compact
              />
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">{eventConfig.dressCode.men.title}</h4>
            {eventConfig.dressCode.men.items.map((item, index) => (
              <TextBlock
                key={index}
                label={`Punto ${index + 1}`}
                content={item}
                onCopy={copyToClipboard}
                compact
              />
            ))}
          </div>
        </ContentSection>

        {/* Notificación de copiado */}
        {copied && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
            ✓ Texto copiado al portapapeles
          </div>
        )}

        {/* Footer con instrucciones */}
        <div className="bg-gray-800 text-white rounded-lg p-8 mt-8">
          <h3 className="text-xl font-bold mb-4">📱 Cómo enviar cambios</h3>
          <ol className="space-y-2 text-sm">
            <li><strong>1.</strong> Haz clic en "Copiar" en el texto que quieres cambiar</li>
            <li><strong>2.</strong> Pega el texto en WhatsApp/Telegram</li>
            <li><strong>3.</strong> Escribe tu nuevo texto debajo</li>
            <li><strong>4.</strong> Envía el mensaje con: nombre de la sección + texto antiguo + texto nuevo</li>
          </ol>
          <p className="mt-4 text-xs text-gray-400">
            Ejemplo: "Historia de Amor - Evento 1 - Cambiar 'marzo' por 'abril'"
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para una sección de contenido
function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

// Componente auxiliar para un bloque de texto editable
function TextBlock({
  label,
  content,
  onCopy,
  compact = false
}: {
  label: string;
  content: string;
  onCopy: (text: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-3" : "mb-4"}>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <button
          onClick={() => onCopy(`${label}: ${content}`)}
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
        >
          Copiar
        </button>
      </div>
      <div className="bg-gray-50 p-3 rounded border border-gray-200">
        <p className={`text-gray-800 ${compact ? 'text-sm' : 'text-base'}`}>
          {content}
        </p>
      </div>
    </div>
  );
}
