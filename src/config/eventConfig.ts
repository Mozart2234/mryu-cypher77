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
    fullName: "Estephanie de los Angeles Yucra Quispe"
  },
  groom: {
    name: "Alexei",
    fullName: "Alexei Teofilo Mamani Coaquira"
  },

  // Información del periódico
  newspaper: {
    name: "El Diario del Amor",
    tagline: "Todas las noticias que el amor permite imprimir",
    location: "Arequipa, Perú",
    editionYear: "Año 2026",
    section: "SECCIÓN ESPECIAL: BODAS",
    edition: "Edición Especial Arequipa",
    headline: "se casan en ENERO",
    subheadline: "Una historia de amor que comenzó en 2022 culmina en el altar",
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
      date: "Mayo 2016",
      month: "MAY",
      year: "2016",
      title: "El Destino Ya Había Empezado a Escribir",
      text: "En un día cualquiera de mayo, Alexei vio a Estephanie por primera vez. Su corazón supo de inmediato que había algo especial en ella, pero la timidez lo detuvo. Ella aún no lo sabía, ni lo conocia, pero la historia ya había comenzado.",
      icon: "👀",
      color: "rose"
    },
    {
      date: "Febrero 2022",
      month: "FEB",
      year: "2022",
      title: "El Mensaje Que Lo Cambió Todo",
      text: "Después de 6 años, Alexei la vio nuevamente en la playa y su corazón quiso hablar, aunque sus labios callaron. Dos semanas después, un sencillo “holi” por Facebook hizo lo que las palabras no habían podido: empezar su historia de amor..",
      icon: "💬",
      color: "blue"
    },
    {
      date: "Marzo 2022",
      month: "MAR",
      year: "2022",
      title: "La Primera Cita",
      text: "No fue una cita romántica, sino una salida para conocerse como amigos. Una cena en un lugar acogedor, con risas nerviosas que pronto se transformaron en conversaciones sinceras. El tiempo pasó sin que se dieran cuenta, y aunque ninguno habló de amor, ambos sintieron que algo especial estaba comenzando.",
      icon: "🍽️",
      color: "amber"
    },
    {
      date: "Diciembre 2022",
      month: "DIC",
      year: "2022",
      title: "Navidad que cambió todo",
      text: "Aún no eran pareja, pero compartieron un intercambio de regalos. Ese año, Estephanie fue el “ángel” de Alexei, y esos pequeños detalles comenzaron a cambiarlo todo. No hubo declaraciones ni planes formales, solo sonrisas y la certeza silenciosa de que aquel diciembre estaba marcando un antes y un después en su historia.",
      icon: "🎄",
      color: "green"
    },
    {
      date: "Febrero 2023",
      month: "FEB",
      year: "2023",
      title: "El inicio formal",
      text: "En el 2023, Alexei, con respeto y emoción, pidió permiso al padre de Estephanie para poder salir con ella y también para poder frecuentarse y entrar a casa. Fue el inicio formal de una etapa donde comenzaron a conocerse con propósito y construir una historia que recién empezaba a escribirse.",
      icon: "💝",
      color: "pink"
    },
    {
      date: "Abril 2023",
      month: "ABR",
      year: "2023",
      title: "La Aventura a Waynapicchu",
      text: "En 2023 viajaron en familia a Cusco. Alexei, como siempre, pidió permiso al padre de Estephanie para acompañarlos. Fueron ella, sus padres, Alexei y su hermano. El gran desafío era subir a Waynapicchu, y juntos lograron llegar a la meta, guardando un recuerdo inolvidable.",
      icon: "🏔️",
      color: "indigo"
    },
    {
      date: "2024",
      month: "",
      year: "2024",
      title: "Un año de aprendizaje",
      text: "En 2024 llegaron las diferencias: costumbres distintas, maneras de pensar y tradiciones que chocaban. Pero lejos de alejarlos, cada desafío los unió más. Fue su primera prueba como dos personas que estaban conociéndose con intención, aprendiendo que el amor verdadero no es perfecto, es comprometido.",
      icon: "💪",
      color: "purple"
    },
    {
      date: "Febrero 2025",
      month: "FEB",
      year: "2025",
      title: "¡La gran pregunta",
      text: "En una noche de silencio, alrededor de las 8:30 p.m., Alexei se arrodilló y con el corazón latiendo fuerte pronunció la pregunta que cambiaría todo: “¿Quieres casarte conmigo?”. Las lágrimas y la emoción fueron la respuesta más hermosa.",
      icon: "💑",
      color: "red",
      quote:"¿Quieres casarte conmigo?"

    },
    {
      date: "Agosto 2025",
      month: "AGO",
      year: "2025",
      title: "Oficialmente Novios",
      text: "En agosto, Alexei llegó junto a su papá para pedir formalmente la mano de Estephanie y dar inicio a una relación con propósito. Ese mismo mes, el pastor los presentó en la iglesia como novios, con Dios como guía y la familia como testigo de este nuevo comienzo.",
      icon: "💍",
      color: "yellow"

    },
    {
      date: "Setiembre 2025",
      month: "SET",
      year: "2025",
      title: "Preparando el Futuro",
      text: "Eligieron juntos cada detalle de su boda. No solo planeaban un evento, construían el inicio de su vida en común. Cada decisión reflejaba quiénes son: unidos, dedicados, llenos de fe.",
      icon: "📋",
      color: "teal"
    },
    {
      date: "Noviembre 2025",
      month: "NOV",
      year: "2025",
      title: "Casi Ahí...",
      text: "En noviembre, todo estaba quedando listo. Los últimos detalles se afinaban y la emoción crecían. Pronto serían esposos, y al mirar atrás comprendieron que todo había valido la pena.",
      icon: "⏰",
      color: "orange",
      quote: "Todo valió la pena"
    },
    {
      date: "11 de Enero 2026",
      month: "ENE",
      year: "2026",
      title: "El Día Más Feliz",
      text: "Muy pronto llegará el día en que se digan “Sí, acepto” ante Dios, la familia y los amigos. Será el inicio de un para siempre. De una mirada en 2016 a un altar en 2026: una historia escrita con amor, fe y propósito.",
      icon: "💒",
      color: "rose",
      featured: true,
      quote: "Hoy comienza para siempre"
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
      content: "Alexei y Estephanie unirán sus vidas en matrimonio el domingo 11 de enero de 2026. La ceremonia religiosa se celebrará en la Iglesia Adventista de Parra a las 10:00 AM, seguida de una recepción en el Club del Odontólogo. La pareja, ha compartido que mantener a Dios en el centro de su relación ha sido fundamental. Familiares y amigos cercanos han sido invitados a este momento especial que promete ser una celebración inolvidable.",
      page: "Pág. 01"
    },
    {
      title: "Claves para una boda perfecta",
      content: 'Especialistas en el arte del amor aseguran que la unión de Alexei y Estephanie será recordada por su ternura y alegría. Cada detalle ha sido preparado con dedicación para que este día sea literalmente, "de ensueño".',
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
    introText: "Para mantener la elegancia y armonía del evento, te pedimos considerar estas recomendaciones",
    women: {
      title: "MUJERES",
      items: [
        "Vestido largo elegante (preferentemente hasta el tobillo)",
        "Tacones y bolso pequeño o clutch",
        "Evitar colores blanco, marfil, beige y tonos nude"
      ],
      footer: "Elegancia Femenina"
    },
    men: {
      title: "HOMBRES",
      items: [
        "Traje oscuro (negro, azul marino o gris)",
        "Corbata",
        "Zapato formal cerrado"
      ],
      footer: "Estilo Formal Caballeros"
    },
    colorPalette: {
      title: "Paleta de Colores Sugerida",
      recommended: {
        title: "✓ Colores Recomendados",
        colors: [
          { name: "Azul marino", hex: "#1a2332" },
          { name: "Gris oscuro", hex: "#4a5568" },
          { name: "Negro", hex: "#1a1a1a" },
          { name: "Borgoña", hex: "#722f37" },
          { name: "Verde bosque", hex: "#2d4a2b" },
          { name: "Morado", hex: "#4a148c" },
          { name: "Terracota", hex: "#8b4513" },
          { name: "Dorado", hex: "#b8860b" }
        ]
      },
      avoid: {
        title: "✗ Colores a Evitar",
        note: "Reservados para la novia",
        colors: [
          { name: "Blanco", hex: "#ffffff" },
          { name: "Marfil", hex: "#fffff0" },
          { name: "Beige", hex: "#f5f5dc" },
          { name: "Crema", hex: "#fffdd0" }
        ]
      }
    },
    specialNote: {
      title: "Nota Editorial",
      text: "Estas sugerencias nos ayudarán a mantener la elegancia y solemnidad que deseamos para nuestra celebración. Tu cooperación significa mucho para nosotros y hará que este día sea aún más especial.",
      closing: "Con cariño,"
    }
  },

  // Mensajes y textos generales
  messages: {
    hero: {
      title: "La Edición Especial Del Amor",
      subtitle: "TODO SOBRE EL GRAN DÍA DE ALEXEI Y ESTEPHANIE"
    },
    invitation: "Te invitamos a nuestro matrimonio que se llevará a cabo el día",
    eventDetails: {
      parentsTitle: "Con la bendición de Dios y en compañía de nuestros Padres:",
      godparentsTitle: "y de nuestros queridos padrinos:",
      ceremonyTitle: "Ceremonia Religiosa",
      receptionTitle: "Recepción",
      receptionIntro: "Al concluir la ceremonia religiosa pasaremos al",
      locationButton: "Ver ubicación",
      timeLabel: "HORA"
    },
    thankYou: {
      closing: "Con amor,"
    }
  },

  // FAQ - Preguntas Frecuentes
  faq: {
    title: "Preguntas Frecuentes",
    subtitle: "TODO LO QUE NECESITAS SABER SOBRE NUESTRO GRAN DÍA",
    intro: "Hemos recopilado las consultas más comunes de nuestros invitados. Si tu pregunta no aparece aquí, no dudes en contactarnos directamente.",
    questions: [
      {
        question: "¿Cuál es el código de vestimenta?",
        answer: "La ceremonia es formal. Sugerimos traje oscuro para caballeros y vestido largo o de coctel para damas. Por favor evita usar blanco, beige o colores muy claros que puedan confundirse con el vestido de la novia."
      },
      {
        question: "¿Hay estacionamiento disponible?",
        answer: "En la recepción en el Club del Odontólogo contamos con un amplio estacionamiento gratuito para nuestros invitados. Te recomendamos llegar con tiempo para asegurar tu espacio. Pero en la iglesia no hay estacionamiento, por lo que sugerimos coordinar con anticipación."
      },
      {
        question: "¿A qué hora debo llegar?",
        answer: "La ceremonia religiosa comienza a las 10:30 AM en punto. Te recomendamos llegar entre 15-20 minutos antes para tomar asiento cómodamente. La recepción iniciará inmediatamente después de la ceremonia."
      },
      {
        question: "¿Cómo confirmo mi asistencia?",
        answer: "Puedes confirmar tu asistencia usando el código de invitación que recibiste por WhatsApp o correo electrónico. Ingresa tu código en la sección \"Ver Mi Invitación\" y completa el formulario de confirmación."
      },
      {
        question: "¿Hay lista de regalos?",
        answer: "Tu presencia es nuestro mejor regalo. Sin embargo, si deseas obsequiarnos algo, agradecemos contribuciones en efectivo que nos ayudarán a comenzar nuestra nueva vida juntos. Habrá un buzón en la recepción."
      },
      {
        question: "¿Qué pasa si no puedo asistir?",
        answer: "Entendemos que pueden surgir imprevistos. Por favor, avísanos lo antes posible para poder ajustar nuestra lista de invitados. Puedes contactarnos directamente por WhatsApp."
      }
    ],
    contactNote: {
      title: "¿Tienes otra pregunta?",
      message: "Si no encontraste la respuesta que buscabas, estaremos encantados de ayudarte. Contáctanos directamente por WhatsApp o correo electrónico."
    }
  },

  // Weather Box - Pronóstico Emocional (decorativo)
  weatherBox: {
    title: "Pronóstico Emocional",
    subtitle: "Esta Semana",
    mainForecast: {
      condition: "Probabilidad de amor eterno",
      probability: "100%"
    },
    weeklyTitle: "Pronóstico Semanal",
    forecast: [
      {
        day: "Lun 6",
        icon: "☀️",
        condition: "Emoción",
        probability: "95%"
      },
      {
        day: "Mar 7",
        icon: "💖",
        condition: "Amor",
        probability: "98%"
      },
      {
        day: "Mié 8",
        icon: "✨",
        condition: "Alegría",
        probability: "99%"
      },
      {
        day: "Jue 9",
        icon: "🎉",
        condition: "Fiesta",
        probability: "100%"
      },
      {
        day: "Dom 11",
        icon: "💒",
        condition: "¡BODA!",
        probability: "100%"
      }
    ],
    footer: "Pronóstico garantizado por el amor verdadero"
  },

  // Advertisements - Anuncios decorativos tipo periódico
  advertisements: [
    {
      title: "RECOMENDACIÓN",
      subtitle: "Los especialistas recomiendan",
      content: "Asistir a bodas aumenta la felicidad en un 95%. Estudios demuestran que presenciar el amor verdadero tiene efectos positivos duraderos.",
      footer: "Dr. Amor - Pág. 42"
    },
    {
      title: "ESTADÍSTICA",
      subtitle: null,
      statistic: {
        value: "100%",
        label: "de los invitados están emocionados"
      },
      quote: '"Será la boda del año"',
      footer: "Encuesta 2026"
    },
    {
      title: "SABÍAS QUE",
      subtitle: "¿Dato Curioso?",
      content: "Alexei esperó 6 años antes de escribirle a Estephanie. Las mejores historias requieren paciencia y el momento perfecto.",
      footer: "Curiosidades - Pág. 15"
    }
  ],

  // Photo Gallery - Galería fotográfica
  photoGallery: {
    title: "Galería Fotográfica",
    subtitle: "MOMENTOS INOLVIDABLES DE UNA HISTORIA DE AMOR",
    editorNote: "Las fotografías mostradas capturan momentos significativos de la relación de Alexei y Estephanie, desde su primer encuentro hasta el día que decidieron unir sus vidas para siempre.",
    photos: [
      {
        id: 1,
        caption: "Primera foto juntos - 2023",
        alt: "Alexei y Estephanie en su primera foto juntos",
        size: "large" as const,
        url: "/photos/_Z638761.jpg"
      },
      {
        id: 2,
        caption: "Viaje a Cusco - Amor viajero en acción",
        alt: "La pareja explorando Cusco",
        size: "medium" as const,
        url: "/photos/_Z638873.jpg"
      },
      {
        id: 3,
        caption: "El día que se hicieron novios - 2025",
        alt: "Momento especial de compromiso",
        size: "medium" as const,
        url: "/photos/_Z638874.jpg"
      },
      {
        id: 4,
        caption: "Compartiendo momentos de fe",
        alt: "En la iglesia juntos",
        size: "small" as const,
        url: "/photos/_Z638896.jpg"
      },
      {
        id: 5,
        caption: "Aventuras culinarias - Probando nuevos sabores",
        alt: "Disfrutando de una cena",
        size: "small" as const,
        url: "/photos/_Z638955.jpg"
      },
      {
        id: 6,
        caption: "El 'propósito' hecho realidad",
        alt: "Sonriendo juntos",
        size: "large" as const,
        url: "/photos/_Z639000.jpg"
      }
    ]
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

  // Dominio base para los QR codes (automáticamente usa localhost en desarrollo)
  appUrl: import.meta.env.MODE === 'development'
    ? "http://localhost:5173"
    : "https://aleytefi.site"
};

export type EventConfig = typeof eventConfig;
