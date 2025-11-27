/**
 * PLANTILLAS DE MENSAJES PARA COMPARTIR INVITACIONES
 *
 * Genera mensajes pre-formateados para WhatsApp y Email
 */

import { eventConfig } from './eventConfig';

interface MessageData {
  guestName: string;
  code: string;
  invitationUrl: string;
  numberOfGuests?: number; // Total de pases (1 = solo el invitado, 2+ = con acompañantes)
  accompanistNames?: string[]; // Nombres de acompañantes si ya están registrados
}

/**
 * Genera mensaje para WhatsApp (con formato de negritas)
 */
export function generateWhatsAppMessage(data: MessageData): string {
  // Generar texto sobre número de invitados
  let guestsInfo = '';
  if (data.numberOfGuests && data.numberOfGuests > 1) {
    const additionalGuests = data.numberOfGuests - 1;
    const guestsWord = additionalGuests === 1 ? 'acompañante' : 'acompañantes';
    guestsInfo = `\n\n👥 *Tu invitación incluye ${data.numberOfGuests} pases* (tú + ${additionalGuests} ${guestsWord})`;

    // Si ya hay nombres de acompañantes registrados (filtrar vacíos)
    const validNames = data.accompanistNames?.filter(name => name && name.trim() !== '') || [];
    if (validNames.length > 0) {
      guestsInfo += `\nAcompañantes: ${validNames.join(', ')}`;
    }
  }

  return `Querid@ *${data.guestName}*,

Con muchísima alegría queremos contarte que... *¡nos casamos!* 💍

Por el gran cariño que te tenemos, queremos invitarte a acompañarnos en este momento tan especial de nuestras vidas.

La celebración será el *${eventConfig.date.full}*, en la hermosa Ciudad Blanca de Arequipa.

✨ *AQUI TE DEJO TU INVITACIÓN DIGITAL:*

Ver el sitio en: ${eventConfig.appUrl} 📲💻🖥️

*Confirma tu asistencia aqui* 👇🏼👇🏼

🎟️ *Tu código personal:* ${data.code}
🔗 *Accede aquí:* ${data.invitationUrl}${guestsInfo}

📍 *DETALLES DEL GRAN DÍA:*

⛪ *Ceremonia Religiosa* - ${eventConfig.ceremony.time}
${eventConfig.ceremony.name}
${eventConfig.ceremony.address}, ${eventConfig.ceremony.city}
📍 Ver ubicación: ${eventConfig.ceremony.mapsUrl}

🥂 *Recepción* - ${eventConfig.reception.time}
${eventConfig.reception.name}
${eventConfig.reception.address}, ${eventConfig.reception.city}
📍 Ver ubicación: ${eventConfig.reception.mapsUrl}

Esta es una celebración íntima y familiar, por lo que la invitación es personal. Por favor, revisa los detalles en tu invitación digital.

Gracias por todo tu cariño y apoyo siempre.

Con amor,
*${eventConfig.groom.name} y ${eventConfig.bride.name}*`;
}

/**
 * Genera mensaje en texto plano (sin formato)
 */
export function generatePlainTextMessage(data: MessageData): string {
  // Generar texto sobre número de invitados
  let guestsInfo = '';
  if (data.numberOfGuests && data.numberOfGuests > 1) {
    const additionalGuests = data.numberOfGuests - 1;
    const guestsWord = additionalGuests === 1 ? 'acompañante' : 'acompañantes';
    guestsInfo = `\n\n👥 Tu invitación incluye ${data.numberOfGuests} pases (tú + ${additionalGuests} ${guestsWord})`;

    // Si ya hay nombres de acompañantes registrados (filtrar vacíos)
    const validNames = data.accompanistNames?.filter(name => name && name.trim() !== '') || [];
    if (validNames.length > 0) {
      guestsInfo += `\nAcompañantes: ${validNames.join(', ')}`;
    }
  }

  return `Querid@ ${data.guestName},

Con muchísima alegría queremos contarte que... ¡nos casamos! 💍

Por el gran cariño que te tenemos, queremos invitarte a acompañarnos en este momento tan especial de nuestras vidas.

La celebración será el ${eventConfig.date.full}, en la hermosa Ciudad Blanca de Arequipa.

✨ AQUI TE DEJO TU INVITACIÓN DIGITAL:

Ver el sitio en: ${eventConfig.appUrl} 📲💻🖥️

Confirma tu asistencia aqui 👇🏼👇🏼

🎟️ Tu código personal: ${data.code}
🔗 Accede aquí: ${data.invitationUrl}${guestsInfo}

📍 DETALLES DEL GRAN DÍA:

⛪ Ceremonia Religiosa - ${eventConfig.ceremony.time}
${eventConfig.ceremony.name}
${eventConfig.ceremony.address}, ${eventConfig.ceremony.city}
📍 Ver ubicación: ${eventConfig.ceremony.mapsUrl}

🥂 Recepción - ${eventConfig.reception.time}
${eventConfig.reception.name}
${eventConfig.reception.address}, ${eventConfig.reception.city}
📍 Ver ubicación: ${eventConfig.reception.mapsUrl}

Esta es una celebración íntima y familiar, por lo que la invitación es personal. Por favor, revisa los detalles en tu invitación digital.

Gracias por todo tu cariño y apoyo siempre.

Con amor,
${eventConfig.groom.name} y ${eventConfig.bride.name}`;
}

/**
 * Genera mensaje para compartir asistencia en redes sociales
 */
export function generateSocialShareMessage(): string {
  return `¡Asistiré a la boda de ${eventConfig.groom.name} & ${eventConfig.bride.name}! 💒 ${eventConfig.date.full}`;
}

/**
 * Genera mensaje por defecto (WhatsApp con formato)
 * @deprecated Usa generateWhatsAppMessage o generatePlainTextMessage directamente
 */
export function generateCopyMessage(data: MessageData): string {
  return generateWhatsAppMessage(data);
}
