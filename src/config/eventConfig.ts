/**
 * CONFIGURACIÓN DEL EVENTO
 *
 * Este archivo contiene toda la información personalizable del evento.
 * Edita estos valores para cambiar los textos, fechas, lugares, etc.
 */

export const eventConfig = {
  // Información de los novios
  bride: {
    name: "Isabella",
    fullName: "Isabella Rodríguez"
  },
  groom: {
    name: "Sebastián",
    fullName: "Sebastián Martínez"
  },

  // Fecha y hora del evento
  date: {
    full: "Sábado, 15 de Junio de 2024",
    day: "15",
    month: "Junio",
    year: "2024",
    time: "18:00 hrs",
    // Formato ISO para cálculos
    iso: "2024-06-15T18:00:00"
  },

  // Ubicaciones
  ceremony: {
    name: "Iglesia Santa María",
    address: "Av. Principal 123, Colonia Centro",
    city: "Ciudad de México",
    time: "18:00 hrs",
    mapsUrl: "https://maps.google.com/?q=Iglesia+Santa+Maria+CDMX"
  },
  reception: {
    name: "Jardín Los Olivos",
    address: "Camino Real 456, Fraccionamiento Las Lomas",
    city: "Ciudad de México",
    time: "20:00 hrs",
    mapsUrl: "https://maps.google.com/?q=Jardin+Los+Olivos+CDMX"
  },

  // Dress code
  dressCode: {
    title: "Dress Code",
    description: "Formal / Etiqueta",
    details: "Pedimos a nuestros invitados vestir de manera formal. Los caballeros con traje oscuro y las damas con vestido largo o cocktail.",
    colorNote: "Por favor evitar el color blanco y tonos muy claros, reservados para la novia."
  },

  // Mensajes
  messages: {
    hero: {
      title: "Nos casamos",
      subtitle: "Con la bendición de Dios y nuestras familias, tenemos el honor de invitarte a celebrar nuestra boda"
    },
    thankYou: {
      title: "¡Gracias!",
      message: "Tu presencia es nuestro mejor regalo. Esperamos celebrar este día especial contigo y crear recuerdos inolvidables juntos.",
      note: "Por favor confirma tu asistencia con el staff del evento."
    },
    schedule: {
      title: "Itinerario"
    }
  },

  // Capacidad máxima del evento
  // IMPORTANTE: Cambia este valor según la capacidad de tu venue
  maxCapacity: 150,

  // Configuración del admin
  admin: {
    // Credenciales de acceso (CAMBIAR en producción por un sistema más seguro)
    credentials: {
      username: "admin",
      password: "boda2024"
    }
  },

  // Dominio base para los QR codes
  // IMPORTANTE: Cambiar esto por tu dominio real cuando despliegues
  appUrl: "http://localhost:5173"
};

export type EventConfig = typeof eventConfig;
