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
    subheadline: "Una historia de amor que comenzó en 2016 culmina en el altar",
    subtitle: "La pareja sellará su amor ante Dios el domingo 11 de enero"
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
      year: "2016",
      title: "El Primer Encuentro",
      text: "Alexei vio por primera vez a Estephanie y quedó completamente flechado. Sin embargo, pasarían seis años antes de que se atreviera a dar el primer paso."
    },
    {
      year: "2022",
      title: "Un Simple 'Hola'",
      text: "Un mensaje por Facebook se convirtió en el inicio de largas conversaciones llenas de risas, fe y complicidad. La conexión fue instantánea y profunda."
    },
    {
      year: "2023",
      title: "De Amigos a Algo Más",
      text: "Empezaron a salir y compartir momentos especiales. Cada charla, cada risa y cada sueño compartido los acercaba más."
    },
    {
      year: "2023",
      title: "La Primera Cita",
      text: "Una cena sencilla y bonita donde todo fluyó de forma natural, como si se conocieran de toda la vida. Fue el inicio de algo hermoso."
    },
    {
      year: "2025",
      title: "¡Novios!",
      text: "Oficializaron su relación como novios, dando un paso importante hacia su futuro juntos con Dios en el centro."
    },
    {
      year: "2025-2026",
      title: "Viajeros del Amor",
      text: "Descubriendo juntos nuevos lugares, culturas y sabores. Cada viaje fortalece su vínculo y crea memorias inolvidables."
    },
    {
      year: "2026",
      title: "'Propósito'",
      text: "La palabra que define su amor. Creen firmemente que su encuentro no fue casualidad, sino parte de un hermoso plan divino."
    },
    {
      year: "2026",
      title: "El Día Más Esperado",
      text: "El 11 de enero celebran su amor eterno ante Dios. Lo que más valoran: orar juntos y mantener su fe como el centro de su relación."
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
      content: "Alexei y Estephanie unirán sus vidas en matrimonio el domingo 11 de enero de 2026. La ceremonia religiosa se celebrará en la Iglesia Adventista de Parra a las 10:00 AM, seguida de una recepción en el Club del Odontólogo. La pareja, que se conoció en 2016 y formalizó su noviazgo en 2025, ha compartido que mantener a Dios en el centro de su relación ha sido fundamental. Familiares y amigos cercanos han sido invitados a este momento especial que promete ser una celebración inolvidable.",
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
