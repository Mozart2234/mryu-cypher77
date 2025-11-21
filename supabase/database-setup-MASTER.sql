-- =====================================================
-- 🏰 WEDDING RESERVATION SYSTEM - MASTER DATABASE SETUP
-- =====================================================
-- Este es el ÚNICO archivo SQL que necesitas ejecutar
-- Incluye las 2 tablas principales del sistema
--
-- Ejecutar en: Supabase SQL Editor
-- Versión: 4.1 (Con columnas de confirmación individual)
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
  accompanists TEXT,
  main_guest_attending BOOLEAN DEFAULT true,
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
COMMENT ON COLUMN reservations.accompanist_names IS 'Array con nombres de acompañantes (legacy, mantener por compatibilidad)';
COMMENT ON COLUMN reservations.accompanists IS 'JSON array de acompañantes con formato: [{"name": "Nombre", "willAttend": boolean}]';
COMMENT ON COLUMN reservations.main_guest_attending IS 'Indica si el invitado principal confirmó su asistencia';
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
-- MIGRACIÓN DE DATOS (SI YA TIENES RESERVACIONES)
-- =====================================================
-- Si ya tienes reservaciones con accompanist_names, esto las migra al nuevo formato

-- Convertir accompanist_names array a accompanists JSON
UPDATE reservations
SET
  accompanists = (
    SELECT json_agg(json_build_object('name', name, 'willAttend', true))::text
    FROM unnest(accompanist_names) AS name
  ),
  main_guest_attending = true
WHERE accompanist_names IS NOT NULL
  AND array_length(accompanist_names, 1) > 0
  AND accompanists IS NULL;

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
FROM guest_messages;

-- Ver estructura de reservations
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'reservations'
ORDER BY ordinal_position;

-- =====================================================
-- ✅ ¡INSTALACIÓN COMPLETADA!
-- =====================================================
--
-- Las siguientes tablas han sido creadas:
-- 1. reservations       - Sistema de reservaciones con QR
--    - Incluye sistema de confirmación individual
--    - accompanists: JSON con confirmación por acompañante
--    - main_guest_attending: si el invitado principal asiste
--
-- 2. guest_messages     - Mensajes de invitados
--    - Sistema de moderación
--    - Mensajes públicos/privados
--
-- Próximos pasos:
-- 1. Verifica que las 2 tablas existan en Table Editor
-- 2. Configura las variables de entorno en tu app
-- 3. ¡Comienza a usar el sistema!
-- =====================================================
