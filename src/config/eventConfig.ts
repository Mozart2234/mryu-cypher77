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
      mother: "Reyna Claudia Coaquira Pari †"
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

  // Historia de la pareja - Timeline detallado por meses
  loveStory: [
    {
      date: "Marzo 2016",
      month: "MAR",
      year: "2016",
      title: "Amor a Primera Vista",
      text: "En un día cualquiera de marzo, Alexei vio a Estephanie por primera vez. Su corazón supo de inmediato que había algo especial en ella, pero la timidez lo detuvo. Ese momento quedaría grabado para siempre.",
      icon: "👀",
      color: "rose"
    },
    {
      date: "Junio 2022",
      month: "JUN",
      year: "2022",
      title: "El Mensaje Que Lo Cambió Todo",
      text: "Después de 6 años, Alexei se encontro con Estephanie en un campamento. Un mensaje en Facebook abrió la puerta a conversaciones interminables.",
      icon: "💬",
      color: "blue"
    },
    {
      date: "Septiembre 2022",
      month: "SEP",
      year: "2022",
      title: "La Primera Cita",
      text: "Una cena en un lugar acogedor. Risas nerviosas que se convirtieron en conversaciones profundas. El tiempo voló. Ambos supieron que esto era diferente, especial, real. El inicio de algo hermoso.",
      icon: "🍽️",
      color: "amber"
    },
    {
      date: "Diciembre 2022",
      month: "DIC",
      year: "2022",
      title: "Navidad Juntos",
      text: "Su primera Navidad como pareja. Compartieron tradiciones, conocieron a las familias, y sintieron que pertenecían uno con el otro. El amor crecía con cada momento compartido.",
      icon: "🎄",
      color: "green"
    },
    {
      date: "Marzo 2023",
      month: "MAR",
      year: "2023",
      title: "Un Año de Conocerse",
      text: "Celebraron su primer aniversario desde ese mensaje inicial. Ya no eran dos personas conociéndose, sino dos almas que se habían encontrado. Cada día juntos era un regalo.",
      icon: "💝",
      color: "pink"
    },
    {
      date: "Julio 2023",
      month: "JUL",
      year: "2023",
      title: "Primera Aventura: Cusco",
      text: "Exploraron Machu Picchu de la mano. Entre ruinas antiguas y montañas majestuosas, descubrieron que los mejores viajes no son a lugares, sino junto a la persona correcta.",
      icon: "🏔️",
      color: "indigo"
    },
    {
      date: "Febrero 2024",
      month: "FEB",
      year: "2024",
      title: "Un Amor Más Profundo",
      text: "Superaron su primera prueba como pareja. Las dificultades no los separaron, los unieron más. Aprendieron que el amor verdadero no es perfecto, es comprometido.",
      icon: "💪",
      color: "purple"
    },
    {
      date: "Mayo 2024",
      month: "MAY",
      year: "2024",
      title: "¡Oficialmente Novios!",
      text: "Después de compartir tantos momentos especiales, formalizaron su relación. Con Dios en el centro y la familia como testigo, se comprometieron a caminar juntos hacia el futuro.",
      icon: "💑",
      color: "red"
    },
    {
      date: "Agosto 2024",
      month: "AGO",
      year: "2024",
      title: "La Gran Pregunta",
      text: "Bajo un cielo estrellado, con el corazón latiendo fuerte, Alexei se arrodilló. 'Estephanie, ¿quieres casarte conmigo?' Las lágrimas de alegría fueron la respuesta más hermosa.",
      icon: "💍",
      color: "yellow"
    },
    {
      date: "Noviembre 2024",
      month: "NOV",
      year: "2024",
      title: "Preparando el Futuro",
      text: "Eligieron juntos cada detalle de su boda. No solo planeaban un evento, construían el inicio de su vida en común. Cada decisión reflejaba quiénes son: unidos, dedicados, llenos de fe.",
      icon: "📋",
      color: "teal"
    },
    {
      date: "Enero 2025",
      month: "ENE",
      year: "2025",
      title: "Casi Ahí...",
      text: "Los últimos preparativos. La emoción es palpable. Pronto serán esposos. Miran atrás y ven un camino de 9 años que los preparó para este momento. Todo valió la pena.",
      icon: "⏰",
      color: "orange"
    },
    {
      date: "11 de Enero 2026",
      month: "ENE",
      year: "2026",
      title: "El Día Más Feliz",
      text: "Hoy se casan. Hoy dicen 'Sí, acepto' ante Dios, familia y amigos. Hoy comienza para siempre. De una mirada en 2016 a este altar en 2026. Una historia de amor, fe y propósito.",
      icon: "💒",
      color: "rose",
      featured: true
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
    subtitle: "Te sugerimos seguir estas recomendaciones",
    women: {
      title: "MUJERES",
      items: [
        "Vestido largo elegante (preferentemente hasta el tobillo)",
        "Tacones y bolso pequeño o clutch",
        "Evitar colores blanco, marfil, beige y tonos nude"
      ]
    },
    men: {
      title: "HOMBRES",
      items: [
        "Traje oscuro (negro, azul marino o gris)",
        "Corbata",
        "Zapato formal cerrado"
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
