-- SCHEMA PARA CONTENIDO EDITABLE
-- Ejecutar este script en Supabase SQL Editor

-- Tabla para almacenar todo el contenido editable del sitio
CREATE TABLE IF NOT EXISTS wedding_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL, -- Sección: 'newspaper', 'locations', 'love_story', 'articles', etc.
  key text NOT NULL, -- Clave única dentro de la sección
  content jsonb NOT NULL, -- Contenido flexible en JSON
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(section, key)
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_wedding_content_section ON wedding_content(section);
CREATE INDEX IF NOT EXISTS idx_wedding_content_key ON wedding_content(key);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_wedding_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS wedding_content_updated_at ON wedding_content;
CREATE TRIGGER wedding_content_updated_at
  BEFORE UPDATE ON wedding_content
  FOR EACH ROW
  EXECUTE FUNCTION update_wedding_content_updated_at();

-- Habilitar Row Level Security (RLS)
ALTER TABLE wedding_content ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer el contenido (para el sitio público)
CREATE POLICY "wedding_content_select_all" ON wedding_content
  FOR SELECT
  USING (true);

-- Política: Solo admins pueden insertar/actualizar/eliminar
-- NOTA: Ajusta esta política según tu sistema de autenticación
CREATE POLICY "wedding_content_admin_all" ON wedding_content
  FOR ALL
  USING (true); -- Por ahora permitir todo, ajustar en producción con auth

-- ============================================
-- DATOS INICIALES - Migración desde eventConfig
-- ============================================

-- 1. Información de los novios
INSERT INTO wedding_content (section, key, content) VALUES
('couple', 'bride', '{"name": "Estephanie", "fullName": "Estephanie Yucra Quispe"}'),
('couple', 'groom', '{"name": "Alexei", "fullName": "Alexei Mamani Coaquira"}')
ON CONFLICT (section, key) DO NOTHING;

-- 2. Información del periódico
INSERT INTO wedding_content (section, key, content) VALUES
('newspaper', 'header', '{
  "edition": "Edición Especial Arequipa",
  "headline": "se casan en ENERO",
  "subheadline": "Una historia de amor que comenzó en 2016 culmina en el altar",
  "subtitle": "La pareja sellará su amor ante Dios el domingo 11 de enero"
}')
ON CONFLICT (section, key) DO NOTHING;

-- 3. Fecha del evento
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
ON CONFLICT (section, key) DO NOTHING;

-- 4. Ubicación de la ceremonia
INSERT INTO wedding_content (section, key, content) VALUES
('locations', 'ceremony', '{
  "name": "Iglesia Adventista de Parra",
  "address": "Av. Parra 100",
  "city": "Arequipa",
  "time": "10:00 AM",
  "mapsUrl": "https://maps.google.com/?q=Iglesia+Adventista+de+Parra+Arequipa"
}')
ON CONFLICT (section, key) DO NOTHING;

-- 5. Ubicación de la recepción
INSERT INTO wedding_content (section, key, content) VALUES
('locations', 'reception', '{
  "name": "Club del Odontólogo",
  "address": "Av. Arancota 101",
  "city": "Arequipa",
  "time": "12:00 PM",
  "mapsUrl": "https://maps.google.com/?q=Club+del+Odontologo+Arequipa"
}')
ON CONFLICT (section, key) DO NOTHING;

-- 6. Padres
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
}')
ON CONFLICT (section, key) DO NOTHING;

-- 7. Historia de amor - Evento 1
INSERT INTO wedding_content (section, key, content) VALUES
('love_story', 'event_1', '{
  "date": "Marzo 2016",
  "month": "MAR",
  "year": "2016",
  "title": "Amor a Primera Vista",
  "text": "En un día cualquiera de marzo, Alexei vio a Estephanie por primera vez. Su corazón supo de inmediato que había algo especial en ella, pero la timidez lo detuvo. Ese momento quedaría grabado para siempre.",
  "icon": "👀",
  "color": "rose",
  "order": 1
}')
ON CONFLICT (section, key) DO NOTHING;

-- 8. Historia de amor - Evento 2
INSERT INTO wedding_content (section, key, content) VALUES
('love_story', 'event_2', '{
  "date": "Junio 2022",
  "month": "JUN",
  "year": "2022",
  "title": "El Mensaje Que Lo Cambió Todo",
  "text": "Después de 6 años, Alexei se encontró con Estephanie en un campamento. Un mensaje en Facebook abrió la puerta a conversaciones interminables.",
  "icon": "💬",
  "color": "blue",
  "order": 2
}')
ON CONFLICT (section, key) DO NOTHING;

-- 9. Artículos del periódico
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
}')
ON CONFLICT (section, key) DO NOTHING;

-- 10. Cita bíblica
INSERT INTO wedding_content (section, key, content) VALUES
('quote', 'main', '{
  "text": "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso",
  "source": "1 Corintios 13:4"
}')
ON CONFLICT (section, key) DO NOTHING;

-- 11. Código de vestimenta
INSERT INTO wedding_content (section, key, content) VALUES
('dress_code', 'guidelines', '{
  "title": "CÓDIGO DE VESTIMENTA",
  "subtitle": "Te sugerimos seguir estas recomendaciones",
  "women": {
    "title": "MUJERES",
    "items": [
      "Vestido largo elegante (preferentemente hasta el tobillo)",
      "Tacones y bolso pequeño o clutch",
      "Evitar colores blanco, marfil, beige y tonos nude"
    ]
  },
  "men": {
    "title": "HOMBRES",
    "items": [
      "Traje oscuro (negro, azul marino o gris)",
      "Corbata",
      "Zapato formal cerrado"
    ]
  }
}')
ON CONFLICT (section, key) DO NOTHING;

-- ============================================
-- COMENTARIOS Y NOTAS
-- ============================================

COMMENT ON TABLE wedding_content IS 'Almacena todo el contenido editable del sitio de boda';
COMMENT ON COLUMN wedding_content.section IS 'Categoría del contenido: couple, newspaper, event, locations, love_story, articles, quote, dress_code';
COMMENT ON COLUMN wedding_content.key IS 'Identificador único dentro de cada sección';
COMMENT ON COLUMN wedding_content.content IS 'Contenido en formato JSON flexible según la sección';
