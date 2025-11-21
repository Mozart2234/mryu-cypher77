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
}

/**
 * Genera mensaje para WhatsApp (formato corto y amigable)
 */
export function generateWhatsAppMessage(data: MessageData): string {
  return `💒 INVITACION BODA 2026 💒

¡Hola ${data.guestName}!

🎟️ Tu codigo: ${data.code}
🔗 Ver invitacion completa: ${data.invitationUrl}

Estamos felices de invitarte a nuestra boda:

📅 ${eventConfig.date.full}

⛪ CEREMONIA: ${eventConfig.ceremony.time}
${eventConfig.ceremony.name}
${eventConfig.ceremony.address}, ${eventConfig.ceremony.city}
📍 ${eventConfig.ceremony.mapsUrl}

🎉 RECEPCION: ${eventConfig.reception.time}
${eventConfig.reception.name}
${eventConfig.reception.address}, ${eventConfig.reception.city}
📍 ${eventConfig.reception.mapsUrl}


${eventConfig.groom.name} & ${eventConfig.bride.name}

Por favor confirma tu asistencia en el enlace.`;
}

/**
 * Genera mensaje para Email (formato formal)
 */
export function generateEmailMessage(data: MessageData): {
  subject: string;
  body: string;
} {
  const subject = `Tu Invitación - Boda ${eventConfig.groom.name} & ${eventConfig.bride.name}`;

  const body = `Querido/a ${data.guestName},

Nos complace invitarte a nuestra boda:

📅 Fecha: ${eventConfig.date.full}
⛪ Ceremonia: ${eventConfig.ceremony.time} - ${eventConfig.ceremony.name}
🎉 Recepción: ${eventConfig.reception.time} - ${eventConfig.reception.name}

Tu código de invitación: ${data.code}
Accede a tu invitación digital: ${data.invitationUrl}

Por favor confirma tu asistencia escaneando el código QR o ingresando al enlace.

Con cariño,
${eventConfig.groom.name} y ${eventConfig.bride.name}`;

  return { subject, body };
}

/**
 * Genera mensaje para compartir asistencia en redes sociales
 */
export function generateSocialShareMessage(): string {
  return `¡Asistiré a la boda de ${eventConfig.groom.name} & ${eventConfig.bride.name}! 💒 ${eventConfig.date.full}`;
}
