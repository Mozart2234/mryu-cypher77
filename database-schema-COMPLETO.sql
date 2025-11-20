-- ============================================
-- SCHEMA COMPLETO PARA CONTENIDO EDITABLE
-- Ejecutar este script en Supabase SQL Editor
-- ============================================

-- 1. CREAR TABLA
CREATE TABLE IF NOT EXISTS wedding_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  key text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(section, key)
);

-- 2. ÍNDICES
CREATE INDEX IF NOT EXISTS idx_wedding_content_section ON wedding_content(section);
CREATE INDEX IF NOT EXISTS idx_wedding_content_key ON wedding_content(key);

-- 3. FUNCIÓN PARA UPDATED_AT
CREATE OR REPLACE FUNCTION update_wedding_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. TRIGGER
DROP TRIGGER IF EXISTS wedding_content_updated_at ON wedding_content;
CREATE TRIGGER wedding_content_updated_at
  BEFORE UPDATE ON wedding_content
  FOR EACH ROW
  EXECUTE FUNCTION update_wedding_content_updated_at();

-- 5. ROW LEVEL SECURITY
ALTER TABLE wedding_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "wedding_content_select_all" ON wedding_content;
CREATE POLICY "wedding_content_select_all" ON wedding_content
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "wedding_content_admin_all" ON wedding_content;
CREATE POLICY "wedding_content_admin_all" ON wedding_content
  FOR ALL USING (true);

-- ============================================
-- DATOS COMPLETOS - MIGRACIÓN DESDE eventConfig.ts
-- ============================================

-- LIMPIAR DATOS EXISTENTES (OPCIONAL - COMENTAR SI NO QUIERES BORRAR)
-- DELETE FROM wedding_content;

-- ============================================
-- 1. INFORMACIÓN DE LOS NOVIOS
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('couple', 'bride', '{"name": "Estephanie", "fullName": "Estephanie Yucra Quispe"}'),
('couple', 'groom', '{"name": "Alexei", "fullName": "Alexei Mamani Coaquira"}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 2. INFORMACIÓN DEL PERIÓDICO
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('newspaper', 'header', '{
  "edition": "Edición Especial Arequipa",
  "headline": "se casan en ENERO",
  "subheadline": "Una historia de amor que comenzó en 2016 culmina en el altar",
  "subtitle": "La pareja sellará su amor ante Dios el domingo 11 de enero"
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 3. FECHA Y HORA
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('event', 'date', '{
  "full": "Domingo, 11 de Enero de 2026",
  "day": "11",
  "month": "ENERO",
  "year": "2026",
  "dayOfWeek": "DOMINGO",
  "time": "10:00 AM",
  "iso": "2026-01-11T10:00:00"
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 4. UBICACIONES
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('locations', 'ceremony', '{
  "name": "Iglesia Adventista de Parra",
  "address": "Av. Parra 100",
  "city": "Arequipa",
  "time": "10:00 AM",
  "mapsUrl": "https://maps.google.com/?q=Iglesia+Adventista+de+Parra+Arequipa"
}'),
('locations', 'reception', '{
  "name": "Club del Odontólogo",
  "address": "Av. Arancota 101",
  "city": "Arequipa",
  "time": "12:00 PM",
  "mapsUrl": "https://maps.google.com/?q=Club+del+Odontologo+Arequipa"
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 5. FAMILIA (Padres y Padrinos)
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('family', 'parents', '{
  "bride": {
    "father": "José Darío Yucra Quispe",
    "mother": "Vilma Quispe Mamani"
  },
  "groom": {
    "father": "Teófilo Mamani Quispe",
    "mother": "Reyna Claudia Coaquira Pari †"
  }
}'),
('family', 'godparents', '[
  {
    "name": "Rafael Norberto Mamani Puente",
    "spouse": "Milagros Ivane Ramírez Carlos"
  },
  {
    "name": "Diego Antonio Barrantes Torres",
    "spouse": "María Elizabeth Coaquira Quispe"
  }
]')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 6. HISTORIA DE AMOR (11 eventos)
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('love_story', 'event_01', '{
  "date": "Marzo 2016",
  "month": "MAR",
  "year": "2016",
  "title": "Amor a Primera Vista",
  "text": "En un día cualquiera de marzo, Alexei vio a Estephanie por primera vez. Su corazón supo de inmediato que había algo especial en ella, pero la timidez lo detuvo. Ese momento quedaría grabado para siempre.",
  "icon": "👀",
  "color": "rose",
  "order": 1
}'),
('love_story', 'event_02', '{
  "date": "Junio 2022",
  "month": "JUN",
  "year": "2022",
  "title": "El Mensaje Que Lo Cambió Todo",
  "text": "Después de 6 años, Alexei se encontró con Estephanie en un campamento. Un mensaje en Facebook abrió la puerta a conversaciones interminables.",
  "icon": "💬",
  "color": "blue",
  "order": 2
}'),
('love_story', 'event_03', '{
  "date": "Septiembre 2022",
  "month": "SEP",
  "year": "2022",
  "title": "La Primera Cita",
  "text": "Una cena en un lugar acogedor. Risas nerviosas que se convirtieron en conversaciones profundas. El tiempo voló. Ambos supieron que esto era diferente, especial, real. El inicio de algo hermoso.",
  "icon": "🍽️",
  "color": "amber",
  "order": 3
}'),
('love_story', 'event_04', '{
  "date": "Diciembre 2022",
  "month": "DIC",
  "year": "2022",
  "title": "Navidad Juntos",
  "text": "Su primera Navidad como pareja. Compartieron tradiciones, conocieron a las familias, y sintieron que pertenecían uno con el otro. El amor crecía con cada momento compartido.",
  "icon": "🎄",
  "color": "green",
  "order": 4
}'),
('love_story', 'event_05', '{
  "date": "Marzo 2023",
  "month": "MAR",
  "year": "2023",
  "title": "Un Año de Conocerse",
  "text": "Celebraron su primer aniversario desde ese mensaje inicial. Ya no eran dos personas conociéndose, sino dos almas que se habían encontrado. Cada día juntos era un regalo.",
  "icon": "💝",
  "color": "pink",
  "order": 5
}'),
('love_story', 'event_06', '{
  "date": "Julio 2023",
  "month": "JUL",
  "year": "2023",
  "title": "Primera Aventura: Cusco",
  "text": "Exploraron Machu Picchu de la mano. Entre ruinas antiguas y montañas majestuosas, descubrieron que los mejores viajes no son a lugares, sino junto a la persona correcta.",
  "icon": "🏔️",
  "color": "indigo",
  "order": 6
}'),
('love_story', 'event_07', '{
  "date": "Febrero 2024",
  "month": "FEB",
  "year": "2024",
  "title": "Un Amor Más Profundo",
  "text": "Superaron su primera prueba como pareja. Las dificultades no los separaron, los unieron más. Aprendieron que el amor verdadero no es perfecto, es comprometido.",
  "icon": "💪",
  "color": "purple",
  "order": 7
}'),
('love_story', 'event_08', '{
  "date": "Mayo 2024",
  "month": "MAY",
  "year": "2024",
  "title": "¡Oficialmente Novios!",
  "text": "Después de compartir tantos momentos especiales, formalizaron su relación. Con Dios en el centro y la familia como testigo, se comprometieron a caminar juntos hacia el futuro.",
  "icon": "💑",
  "color": "red",
  "order": 8
}'),
('love_story', 'event_09', '{
  "date": "Agosto 2024",
  "month": "AGO",
  "year": "2024",
  "title": "La Gran Pregunta",
  "text": "Bajo un cielo estrellado, con el corazón latiendo fuerte, Alexei se arrodilló. ''Estephanie, ¿quieres casarte conmigo?'' Las lágrimas de alegría fueron la respuesta más hermosa.",
  "icon": "💍",
  "color": "yellow",
  "quote": "¿Quieres casarte conmigo?",
  "order": 9
}'),
('love_story', 'event_10', '{
  "date": "Noviembre 2024",
  "month": "NOV",
  "year": "2024",
  "title": "Preparando el Futuro",
  "text": "Eligieron juntos cada detalle de su boda. No solo planeaban un evento, construían el inicio de su vida en común. Cada decisión reflejaba quiénes son: unidos, dedicados, llenos de fe.",
  "icon": "📋",
  "color": "teal",
  "order": 10
}'),
('love_story', 'event_11', '{
  "date": "Enero 2025",
  "month": "ENE",
  "year": "2025",
  "title": "Casi Ahí...",
  "text": "Los últimos preparativos. La emoción es palpable. Pronto serán esposos. Miran atrás y ven un camino de 9 años que los preparó para este momento. Todo valió la pena.",
  "icon": "⏰",
  "color": "orange",
  "quote": "Todo valió la pena",
  "order": 11
}'),
('love_story', 'event_12', '{
  "date": "11 de Enero 2026",
  "month": "ENE",
  "year": "2026",
  "title": "El Día Más Feliz",
  "text": "Hoy se casan. Hoy dicen ''Sí, acepto'' ante Dios, familia y amigos. Hoy comienza para siempre. De una mirada en 2016 a este altar en 2026. Una historia de amor, fe y propósito.",
  "icon": "💒",
  "color": "rose",
  "featured": true,
  "quote": "Hoy comienza para siempre",
  "order": 12
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 7. ARTÍCULOS DEL PERIÓDICO (4 artículos)
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('articles', 'article_1', '{
  "title": "Asistir a la boda de Alexei y Estephanie mitiga el estrés",
  "content": "Según un estudio reciente, presenciar un evento de amor verdadero produce bienestar inmediato. La alegría, los abrazos y las sonrisas aumentan la felicidad y reducen la hormona del estrés.",
  "page": "Pág.11",
  "order": 1
}'),
('articles', 'article_2', '{
  "title": "Confirmación oficial",
  "content": "Alexei y Estephanie unirán sus vidas en matrimonio el domingo 11 de enero de 2026. La ceremonia religiosa se celebrará en la Iglesia Adventista de Parra a las 10:00 AM, seguida de una recepción en el Club del Odontólogo. La pareja, que se vio por primera vez en 2016 y comenzó su relación en 2022, ha compartido que mantener a Dios en el centro de su relación ha sido fundamental. Familiares y amigos cercanos han sido invitados a este momento especial que promete ser una celebración inolvidable.",
  "page": "Pág. 01",
  "order": 2
}'),
('articles', 'article_3', '{
  "title": "Claves para una boda perfecta",
  "content": "Especialistas en el arte del amor aseguran que la unión de Alexei y Estephanie será recordada por su ternura y alegría. Cada detalle ha sido preparado con dedicación para que este día sea literalmente, ''de ensueño''.",
  "page": "Pág. 20",
  "order": 3
}'),
('articles', 'article_4', '{
  "title": "Encuestas",
  "content": "9 de cada 10 invitados confirman su emoción por asistir al evento del año. Muchos coinciden en que será una celebración que quedará grabada en la memoria por su encanto y autenticidad.",
  "page": "Pág. 26",
  "order": 4
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 8. CITA BÍBLICA
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('quote', 'main', '{
  "text": "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso",
  "source": "1 Corintios 13:4"
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 9. CÓDIGO DE VESTIMENTA COMPLETO
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('dress_code', 'guidelines', '{
  "title": "CÓDIGO DE VESTIMENTA",
  "subtitle": "Te sugerimos seguir estas recomendaciones",
  "introText": "Para mantener la elegancia y armonía del evento, te pedimos considerar estas recomendaciones",
  "women": {
    "title": "MUJERES",
    "items": [
      "Vestido largo elegante (preferentemente hasta el tobillo)",
      "Tacones y bolso pequeño o clutch",
      "Evitar colores blanco, marfil, beige y tonos nude"
    ],
    "footer": "Elegancia Femenina"
  },
  "men": {
    "title": "HOMBRES",
    "items": [
      "Traje oscuro (negro, azul marino o gris)",
      "Corbata",
      "Zapato formal cerrado"
    ],
    "footer": "Estilo Formal Caballeros"
  },
  "colorPalette": {
    "title": "Paleta de Colores Sugerida",
    "recommended": {
      "title": "✓ Colores Recomendados",
      "colors": [
        {"name": "Azul marino", "hex": "#1a2332"},
        {"name": "Gris oscuro", "hex": "#4a5568"},
        {"name": "Negro", "hex": "#1a1a1a"},
        {"name": "Borgoña", "hex": "#722f37"},
        {"name": "Verde bosque", "hex": "#2d4a2b"},
        {"name": "Morado", "hex": "#4a148c"},
        {"name": "Terracota", "hex": "#8b4513"},
        {"name": "Dorado", "hex": "#b8860b"}
      ]
    },
    "avoid": {
      "title": "✗ Colores a Evitar",
      "note": "Reservados para la novia",
      "colors": [
        {"name": "Blanco", "hex": "#ffffff"},
        {"name": "Marfil", "hex": "#fffff0"},
        {"name": "Beige", "hex": "#f5f5dc"},
        {"name": "Crema", "hex": "#fffdd0"}
      ]
    }
  },
  "specialNote": {
    "title": "Nota Editorial",
    "text": "Estas sugerencias nos ayudarán a mantener la elegancia y solemnidad que deseamos para nuestra celebración. Tu cooperación significa mucho para nosotros y hará que este día sea aún más especial.",
    "closing": "Con cariño,"
  }
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 10. MENSAJES GENERALES
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('messages', 'hero', '{
  "title": "La Edición Especial Del Amor",
  "subtitle": "TODO SOBRE EL GRAN DÍA DE ALEXEI Y ESTEPHANIE"
}'),
('messages', 'invitation', '{"text": "Te invitamos a nuestro matrimonio que se llevará a cabo el día"}'),
('messages', 'eventDetails', '{
  "parentsTitle": "Con la bendición de Dios y en compañía de nuestros Padres:",
  "godparentsTitle": "y de nuestros queridos padrinos:",
  "ceremonyTitle": "Ceremonia Religiosa",
  "receptionTitle": "Recepción",
  "receptionIntro": "Al concluir la ceremonia religiosa pasaremos al",
  "locationButton": "Ver ubicación",
  "timeLabel": "HORA"
}'),
('messages', 'thankYou', '{"closing": "Con amor,"}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 11. FAQ - PREGUNTAS FRECUENTES (8 preguntas)
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('faq', 'config', '{
  "title": "Preguntas Frecuentes",
  "subtitle": "TODO LO QUE NECESITAS SABER SOBRE NUESTRO GRAN DÍA",
  "intro": "Hemos recopilado las consultas más comunes de nuestros invitados. Si tu pregunta no aparece aquí, no dudes en contactarnos directamente.",
  "questions": [
    {
      "question": "¿Cuál es el código de vestimenta?",
      "answer": "La ceremonia es formal. Sugerimos traje oscuro para caballeros y vestido largo o de coctel para damas. Por favor evita usar blanco, beige o colores muy claros que puedan confundirse con el vestido de la novia."
    },
    {
      "question": "¿Hay estacionamiento disponible?",
      "answer": "Sí, tanto la iglesia como el salón de recepción cuentan con estacionamiento gratuito para los invitados. Habrá personal de apoyo para guiar a los asistentes."
    },
    {
      "question": "¿A qué hora debo llegar?",
      "answer": "La ceremonia religiosa comienza a las 10:00 AM en punto. Te recomendamos llegar entre 15-20 minutos antes para tomar asiento cómodamente. La recepción iniciará inmediatamente después de la ceremonia."
    },
    {
      "question": "¿Puedo llevar a mis hijos?",
      "answer": "Amamos a los niños, pero hemos decidido que nuestra boda sea un evento solo para adultos para que todos puedan relajarse y disfrutar. Agradecemos tu comprensión."
    },
    {
      "question": "¿Cómo confirmo mi asistencia?",
      "answer": "Puedes confirmar tu asistencia usando el código de invitación que recibiste por WhatsApp o correo electrónico. Ingresa tu código en la sección \"Ver Mi Invitación\" y completa el formulario de confirmación."
    },
    {
      "question": "¿Hay lista de regalos?",
      "answer": "Tu presencia es nuestro mejor regalo. Sin embargo, si deseas obsequiarnos algo, agradecemos contribuciones en efectivo que nos ayudarán a comenzar nuestra nueva vida juntos. Habrá un buzón en la recepción."
    },
    {
      "question": "¿Habrá servicio de transporte?",
      "answer": "La iglesia y el salón de recepción están muy cerca (5 minutos en auto). No contamos con servicio de transporte, pero puedes usar servicios como Uber o taxi si lo necesitas."
    },
    {
      "question": "¿Qué pasa si no puedo asistir?",
      "answer": "Entendemos que pueden surgir imprevistos. Por favor, avísanos lo antes posible para poder ajustar nuestra lista de invitados. Puedes contactarnos directamente por WhatsApp."
    }
  ],
  "contactNote": {
    "title": "¿Tienes otra pregunta?",
    "message": "Si no encontraste la respuesta que buscabas, estaremos encantados de ayudarte. Contáctanos directamente por WhatsApp o correo electrónico."
  }
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 12. WEATHER BOX - PRONÓSTICO EMOCIONAL
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('weather_box', 'forecast', '{
  "title": "Pronóstico Emocional",
  "subtitle": "Esta Semana",
  "mainForecast": {
    "condition": "Probabilidad de amor eterno",
    "probability": "100%"
  },
  "weeklyTitle": "Pronóstico Semanal",
  "forecast": [
    {"day": "Lun 6", "icon": "☀️", "condition": "Emoción", "probability": "95%"},
    {"day": "Mar 7", "icon": "💖", "condition": "Amor", "probability": "98%"},
    {"day": "Mié 8", "icon": "✨", "condition": "Alegría", "probability": "99%"},
    {"day": "Jue 9", "icon": "🎉", "condition": "Fiesta", "probability": "100%"},
    {"day": "Dom 11", "icon": "💒", "condition": "¡BODA!", "probability": "100%"}
  ],
  "footer": "Pronóstico garantizado por el amor verdadero"
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- 13. CONFIGURACIÓN DEL SISTEMA
-- ============================================
INSERT INTO wedding_content (section, key, content) VALUES
('settings', 'maxCapacity', '{"value": 150}'),
('settings', 'appUrl', '{"value": "http://localhost:5173"}'),
('settings', 'admin', '{
  "username": "admin",
  "password": "boda2026"
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- VERIFICACIÓN FINAL
-- ============================================

-- Ver cuántos registros se insertaron por sección
SELECT section, COUNT(*) as total
FROM wedding_content
GROUP BY section
ORDER BY section;

-- Deberías ver algo como:
-- articles: 4
-- couple: 2
-- dress_code: 1
-- event: 1
-- family: 2
-- faq: 1
-- locations: 2
-- love_story: 12
-- messages: 4
-- newspaper: 1
-- quote: 1
-- settings: 3
-- weather_box: 1
-- TOTAL: 35 registros

-- ============================================
-- COMENTARIOS
-- ============================================

COMMENT ON TABLE wedding_content IS 'Almacena todo el contenido editable del sitio de boda';
COMMENT ON COLUMN wedding_content.section IS 'Secciones: couple, newspaper, event, locations, family, love_story, articles, quote, dress_code, messages, faq, weather_box, settings';
COMMENT ON COLUMN wedding_content.key IS 'Identificador único dentro de cada sección';
COMMENT ON COLUMN wedding_content.content IS 'Contenido en formato JSON flexible según la sección';

-- ============================================
-- ¡LISTO! 🎉
-- ============================================
-- El script ha completado exitosamente.
-- Ahora puedes usar el gestor de contenido en /admin/content
