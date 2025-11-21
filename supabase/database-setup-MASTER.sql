-- =====================================================
-- 🏰 WEDDING RESERVATION SYSTEM - MASTER DATABASE SETUP
-- =====================================================
-- Este es el ÚNICO archivo SQL que necesitas ejecutar
-- Incluye TODAS las tablas, funciones, triggers y datos iniciales
--
-- Ejecutar en: Supabase SQL Editor
-- Versión: 3.0 (Consolidado)
-- Última actualización: 2025-01-21
-- =====================================================

-- =====================================================
-- PARTE 1: TABLA DE RESERVACIONES (CORE)
-- =====================================================

-- Crear tabla de reservaciones
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  guest_name TEXT NOT NULL,
  number_of_guests INTEGER NOT NULL CHECK (number_of_guests > 0),
  accompanist_names TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'confirmada', 'ingreso-registrado')),
  "table" TEXT,
  "group" TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  checked_in_at TIMESTAMPTZ
);

-- Índices para reservaciones
CREATE INDEX IF NOT EXISTS idx_reservations_code ON reservations(code);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_group ON reservations("group");
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);

-- Función para actualizar updated_at en reservations
CREATE OR REPLACE FUNCTION update_reservations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at en reservations
DROP TRIGGER IF EXISTS update_reservations_updated_at_trigger ON reservations;
CREATE TRIGGER update_reservations_updated_at_trigger
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_reservations_updated_at();

-- Habilitar Row Level Security en reservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para reservations
DROP POLICY IF EXISTS "reservations_select_all" ON reservations;
CREATE POLICY "reservations_select_all" ON reservations
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "reservations_admin_all" ON reservations;
CREATE POLICY "reservations_admin_all" ON reservations
  FOR ALL USING (true);

-- Comentarios en reservations
COMMENT ON TABLE reservations IS 'Tabla principal de reservaciones de invitados';
COMMENT ON COLUMN reservations.code IS 'Código único de la reservación (ej: WED-XXXX)';
COMMENT ON COLUMN reservations.guest_name IS 'Nombre del invitado principal';
COMMENT ON COLUMN reservations.number_of_guests IS 'Número total de personas en la reservación';
COMMENT ON COLUMN reservations.accompanist_names IS 'Array con nombres de acompañantes';
COMMENT ON COLUMN reservations.status IS 'Estado: pendiente, confirmada, ingreso-registrado';
COMMENT ON COLUMN reservations."table" IS 'Mesa asignada (opcional)';
COMMENT ON COLUMN reservations."group" IS 'Grupo o familia (opcional)';
COMMENT ON COLUMN reservations.checked_in_at IS 'Fecha y hora del check-in';

-- =====================================================
-- PARTE 2: TABLA DE MENSAJES DE INVITADOS
-- =====================================================

-- Crear tabla guest_messages
CREATE TABLE IF NOT EXISTS guest_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'wishes' CHECK (message_type IN ('wishes', 'advice', 'memory', 'other')),
  is_public BOOLEAN DEFAULT true,
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para guest_messages
CREATE INDEX IF NOT EXISTS idx_guest_messages_reservation_id ON guest_messages(reservation_id);
CREATE INDEX IF NOT EXISTS idx_guest_messages_created_at ON guest_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guest_messages_public ON guest_messages(is_public, is_blocked)
  WHERE is_public = true AND is_blocked = false;

-- Función para actualizar updated_at en guest_messages
CREATE OR REPLACE FUNCTION update_guest_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at en guest_messages
DROP TRIGGER IF EXISTS update_guest_messages_updated_at_trigger ON guest_messages;
CREATE TRIGGER update_guest_messages_updated_at_trigger
  BEFORE UPDATE ON guest_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_guest_messages_updated_at();

-- Habilitar Row Level Security en guest_messages
ALTER TABLE guest_messages ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para guest_messages
DROP POLICY IF EXISTS "guest_messages_select_public" ON guest_messages;
CREATE POLICY "guest_messages_select_public" ON guest_messages
  FOR SELECT
  USING (is_public = true AND is_blocked = false);

DROP POLICY IF EXISTS "guest_messages_insert_all" ON guest_messages;
CREATE POLICY "guest_messages_insert_all" ON guest_messages
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "guest_messages_update_admin" ON guest_messages;
CREATE POLICY "guest_messages_update_admin" ON guest_messages
  FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "guest_messages_delete_admin" ON guest_messages;
CREATE POLICY "guest_messages_delete_admin" ON guest_messages
  FOR DELETE
  USING (true);

-- Comentarios en guest_messages
COMMENT ON TABLE guest_messages IS 'Mensajes de invitados para la pareja de novios';
COMMENT ON COLUMN guest_messages.reservation_id IS 'Referencia a la reservación del invitado';
COMMENT ON COLUMN guest_messages.message_type IS 'Tipo: wishes (buenos deseos), advice (consejo), memory (recuerdo), other (otro)';
COMMENT ON COLUMN guest_messages.is_public IS 'Si el invitado permite que el mensaje sea público';
COMMENT ON COLUMN guest_messages.is_blocked IS 'Si el admin ha bloqueado el mensaje (moderación)';

-- =====================================================
-- PARTE 3: TABLA DE CONTENIDO EDITABLE
-- =====================================================

-- Crear tabla wedding_content
CREATE TABLE IF NOT EXISTS wedding_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Índices para wedding_content
CREATE INDEX IF NOT EXISTS idx_wedding_content_section ON wedding_content(section);
CREATE INDEX IF NOT EXISTS idx_wedding_content_key ON wedding_content(key);

-- Función para actualizar updated_at en wedding_content
CREATE OR REPLACE FUNCTION update_wedding_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at en wedding_content
DROP TRIGGER IF EXISTS wedding_content_updated_at ON wedding_content;
CREATE TRIGGER wedding_content_updated_at
  BEFORE UPDATE ON wedding_content
  FOR EACH ROW
  EXECUTE FUNCTION update_wedding_content_updated_at();

-- Habilitar Row Level Security en wedding_content
ALTER TABLE wedding_content ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para wedding_content
DROP POLICY IF EXISTS "wedding_content_select_all" ON wedding_content;
CREATE POLICY "wedding_content_select_all" ON wedding_content
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "wedding_content_admin_all" ON wedding_content;
CREATE POLICY "wedding_content_admin_all" ON wedding_content
  FOR ALL USING (true);

-- Comentarios en wedding_content
COMMENT ON TABLE wedding_content IS 'Almacena todo el contenido editable del sitio de boda';
COMMENT ON COLUMN wedding_content.section IS 'Secciones: couple, newspaper, event, locations, family, love_story, articles, quote, dress_code, messages, faq, weather_box, settings';
COMMENT ON COLUMN wedding_content.key IS 'Identificador único dentro de cada sección';
COMMENT ON COLUMN wedding_content.content IS 'Contenido en formato JSON flexible según la sección';

-- =====================================================
-- PARTE 4: DATOS INICIALES (OPCIONAL - Puedes comentar esto)
-- =====================================================
-- Si ya tienes datos, comenta todo desde aquí hasta el final
-- o ejecuta solo la parte que necesites

-- 1. INFORMACIÓN DE LOS NOVIOS
INSERT INTO wedding_content (section, key, content) VALUES
('couple', 'bride', '{"name": "Estephanie", "fullName": "Estephanie Yucra Quispe"}'),
('couple', 'groom', '{"name": "Alexei", "fullName": "Alexei Mamani Coaquira"}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- 2. INFORMACIÓN DEL PERIÓDICO
INSERT INTO wedding_content (section, key, content) VALUES
('newspaper', 'header', '{
  "edition": "Edición Especial Arequipa",
  "headline": "se casan en ENERO",
  "subheadline": "Una historia de amor que comenzó en 2016 culmina en el altar",
  "subtitle": "La pareja sellará su amor ante Dios el domingo 11 de enero"
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- 3. FECHA Y HORA
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

-- 4. UBICACIONES
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

-- 5. FAMILIA (Padres y Padrinos)
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

-- 6. CONFIGURACIÓN DEL SISTEMA
INSERT INTO wedding_content (section, key, content) VALUES
('settings', 'maxCapacity', '{"value": 150}'),
('settings', 'appUrl', '{"value": "http://localhost:5173"}'),
('settings', 'admin', '{
  "username": "admin",
  "password": "boda2026"
}')
ON CONFLICT (section, key) DO UPDATE SET content = EXCLUDED.content;

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

-- Ver resumen de tablas creadas
SELECT
  'reservations' as table_name,
  COUNT(*) as record_count
FROM reservations
UNION ALL
SELECT
  'guest_messages' as table_name,
  COUNT(*) as record_count
FROM guest_messages
UNION ALL
SELECT
  'wedding_content' as table_name,
  COUNT(*) as record_count
FROM wedding_content;

-- Ver contenido por sección
SELECT
  section,
  COUNT(*) as total
FROM wedding_content
GROUP BY section
ORDER BY section;

-- =====================================================
-- ✅ ¡INSTALACIÓN COMPLETADA!
-- =====================================================
--
-- Las siguientes tablas han sido creadas:
-- 1. reservations       - Sistema de reservaciones con QR
-- 2. guest_messages     - Mensajes de invitados
-- 3. wedding_content    - Contenido editable del sitio
--
-- Próximos pasos:
-- 1. Verifica que las 3 tablas existan en Table Editor
-- 2. Personaliza los datos iniciales según tu evento
-- 3. Configura las variables de entorno en tu app
-- 4. ¡Comienza a usar el sistema!
-- =====================================================
