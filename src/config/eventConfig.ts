/**
 * CONFIGURACIÓN DEL EVENTO
 *
 * Este archivo contiene toda la información personalizable del evento.
 * Edita estos valores para cambiar los textos, fechas, lugares, etc.
 */

export const eventConfig = {
  // Información de los novios
  bride: {
    name: "Estephanie",
    fullName: "Estephanie Yucra Quispe"
  },
  groom: {
    name: "Alexei",
    fullName: "Alexei Mamani Coaquira"
  },

  // Información del periódico
  newspaper: {
    edition: "Edición Especial Arequipa",
    headline: "se casan en ENERO",
    subheadline: "Los novios protagonizan una de las historias de amor más esperadas del año",
    subtitle: "El enlace se celebrará el 11 de enero"
  },

  // Fecha y hora del evento
  date: {
    full: "Domingo, 11 de Enero de 2026",
    day: "11",
    month: "ENERO",
    year: "2026",
    dayOfWeek: "DOMINGO",
    time: "10:00 AM",
    iso: "2026-01-11T10:00:00"
  },

  // Ubicaciones
  ceremony: {
    name: "Iglesia Adventista de Parra",
    address: "Av. Parra 100",
    city: "Arequipa",
    time: "10:00 AM",
    mapsUrl: "https://maps.google.com/?q=Iglesia+Adventista+de+Parra+Arequipa"
  },
  reception: {
    name: "Club del Odontólogo",
    address: "Av. Arancota 101",
    city: "Arequipa",
    time: "12:00 PM",
    mapsUrl: "https://maps.google.com/?q=Club+del+Odontologo+Arequipa"
  },

  // Padres
  parents: {
    bride: {
      father: "José Darío Yucra Quispe",
      mother: "Vilma Quispe Mamani"
    },
    groom: {
      father: "Teófilo Mamani Quispe",
      mother: "Reyna Claudia Coaquira Pari"
    }
  },

  // Padrinos
  godparents: [
    {
      name: "Rafael Norberto Mamani Puente",
      spouse: "Milagros Ivane Ramírez Carlos"
    },
    {
      name: "Diego Antonio Barrantes Torres",
      spouse: "María Elizabeth Coaquira Quispe"
    }
  ],

  // Historia de la pareja (para la sección tipo artículo)
  loveStory: [
    {
      title: "Sabías que:",
      text: "Alexei vio por primera vez a Estephanie en el año 2016 y quedó completamente flechado…, pero pasaron seis años antes que se atreviera a escribirle"
    },
    {
      title: "Primer Mensaje:",
      text: "Un simple 'hola' por Facebook en el 2022 se convirtió en largas conversaciones llenas de risas, fe y complicidad."
    },
    {
      title: "De amigos a algo más:",
      text: "Durante el 2023 empezaron a salir, compartiendo risas, charlas y sueños."
    },
    {
      title: "Primera Cita:",
      text: "Una cena sencilla y bonita… donde todo fluyó de forma natural, como si se conocieran de toda la vida."
    },
    {
      title: "El gran paso:",
      text: "En el 2025 se convirtieron en novios, y ahora, en 2026 celebran su amor eterno ante Dios."
    },
    {
      title: "Amor Viajero:",
      text: "Ambos comparten una gran pasión por viajar y descubrir juntos nuevos lugares, culturas y sabores."
    },
    {
      title: "Palabra que los define:",
      text: "'Propósito', porque creen que su amor no fue casualidad, sino un hermoso plan divino."
    },
    {
      title: "Lo que más valoran:",
      text: "Orar juntos, apoyarse siempre y mantener a Dios como el centro de su relación."
    }
  ],

  // Artículos tipo periódico
  articles: [
    {
      title: "Asistir a la boda de Alexei y Estephanie mitiga el estrés",
      content: "Según un estudio reciente, presenciar un evento de amor verdadero produce bienestar inmediato. La alegría, los abrazos y las sonrisas aumentan la felicidad y reducen la hormona del estrés.",
      page: "Pág.11"
    },
    {
      title: "Confirmación oficial",
      content: "Según un comunicado, la pareja ha confirmado su enlace para el Domingo 11 de enero del 2026 sellando su promesa de amor ante Dios. Ambos viven con entusiasmo la cuenta regresiva hacia su gran día, soñando con una boda llena de amor, fe y felicidad.",
      page: "Pág. 01"
    },
    {
      title: "Claves para una boda perfecta",
      content: "Especialistas en el arte del amor aseguran que la unión de Alexei y Estephanie será recordada por su ternura y alegría. Cada detalle ha sido preparado con dedicación para que este día sea literalmente, 'de ensueño'.",
      page: "Pág. 20"
    },
    {
      title: "Encuestas",
      content: "9 de cada 10 invitados confirman su emoción por asistir al evento del año. Muchos coinciden en que será una celebración que quedará grabada en la memoria por su encanto y autenticidad.",
      page: "Pág. 26"
    }
  ],

  // Cita del día
  quote: {
    text: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso",
    source: "1 Corintios 13:4"
  },

  // Dress code
  dressCode: {
    title: "CÓDIGO DE VESTIMENTA",
    subtitle: "Estilo elegante y formal",
    women: {
      title: "MUJERES",
      items: [
        "Vestido largo",
        "Bolso chico",
        "NO blanco, marfil o beige"
      ]
    },
    men: {
      title: "HOMBRES",
      items: [
        "Traje Obscuro",
        "Corbata",
        "Zapato cerrado (no tenis)"
      ]
    }
  },

  // Mensajes
  messages: {
    hero: {
      title: "La Edición Especial Del Amor",
      subtitle: "TODO SOBRE EL GRAN DÍA DE ALEXEI Y ESTEPHANIE"
    },
    invitation: "Te invitamos a nuestro matrimonio que se llevará a cabo el día"
  },

  // Capacidad máxima del evento
  maxCapacity: 150,

  // Configuración del admin
  admin: {
    credentials: {
      username: "admin",
      password: "boda2026"
    }
  },

  // Dominio base para los QR codes
  appUrl: "http://localhost:5173"
};

export type EventConfig = typeof eventConfig;
