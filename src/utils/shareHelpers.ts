/**
 * UTILIDADES PARA COMPARTIR INVITACIONES
 *
 * Funciones para abrir WhatsApp, Email y copiar al portapapeles
 */

/**
 * Abre WhatsApp Web/App con un mensaje pre-escrito
 * @param message - Mensaje a enviar
 */
export function openWhatsApp(message: string): void {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Abre el cliente de email con asunto y cuerpo pre-escritos
 * @param subject - Asunto del email
 * @param body - Cuerpo del email
 */
export function openEmail(subject: string, body: string): void {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const mailtoUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
  window.location.href = mailtoUrl;
}

/**
 * Copia texto al portapapeles
 * @param text - Texto a copiar
 * @returns Promise que se resuelve cuando se copia exitosamente
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

/**
 * Comparte en Facebook (abre dialogo de compartir)
 * @param url - URL a compartir
 * @param quote - Texto opcional para acompañar el link
 */
export function shareOnFacebook(url: string, quote?: string): void {
  const encodedUrl = encodeURIComponent(url);
  const encodedQuote = quote ? encodeURIComponent(quote) : '';
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedQuote}`;
  window.open(facebookUrl, '_blank', 'width=600,height=400');
}

/**
 * Comparte en Twitter/X
 * @param text - Texto del tweet
 * @param url - URL opcional para incluir
 */
export function shareOnTwitter(text: string, url?: string): void {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = url ? encodeURIComponent(url) : '';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}${url ? `&url=${encodedUrl}` : ''}`;
  window.open(twitterUrl, '_blank', 'width=600,height=400');
}
