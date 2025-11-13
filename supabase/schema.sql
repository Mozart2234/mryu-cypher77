-- ========================================
-- SCHEMA PARA SISTEMA DE RESERVACIONES
-- Wedding Reservation System
-- ========================================

-- Crear tabla de reservaciones
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  number_of_guests INTEGER NOT NULL CHECK (number_of_guests > 0),
  accompanist_names TEXT[], -- Array de nombres de acompañantes
  status VARCHAR(50) NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'confirmada', 'ingreso-registrado')),
  "table" VARCHAR(50), -- Número de mesa asignada
  "group" VARCHAR(100), -- Grupo o familia
  notes TEXT, -- Notas adicionales
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  checked_in_at TIMESTAMPTZ -- Timestamp del check-in
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_reservations_code ON reservations(code);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);

-- Función para actualizar el updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en cada UPDATE
DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- RLS (Row Level Security) Policies
-- ========================================

-- Habilitar RLS en la tabla
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Policy: Permitir SELECT a todos (para que los invitados vean sus pases)
CREATE POLICY "Permitir lectura pública de reservaciones"
ON reservations FOR SELECT
USING (true);

-- Policy: Permitir INSERT solo a usuarios autenticados (admin)
CREATE POLICY "Permitir inserción solo a admin"
ON reservations FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Policy: Permitir UPDATE a todos (para que invitados puedan confirmar y agregar nombres)
CREATE POLICY "Permitir actualización pública de reservaciones"
ON reservations FOR UPDATE
USING (true)
WITH CHECK (true);

-- Policy: Permitir DELETE solo a usuarios autenticados (admin)
CREATE POLICY "Permitir eliminación solo a admin"
ON reservations FOR DELETE
USING (auth.role() = 'authenticated');

-- ========================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ========================================

-- Comentar o descomentar según necesites datos de prueba

-- INSERT INTO reservations (code, guest_name, number_of_guests, status, "table", "group")
-- VALUES
--   ('WED-001', 'Juan Pérez', 2, 'confirmada', 'Mesa 1', 'Familia Novia'),
--   ('WED-002', 'María González', 4, 'pendiente', 'Mesa 2', 'Amigos'),
--   ('WED-003', 'Carlos Rodríguez', 1, 'confirmada', 'Mesa 3', 'Familia Novio');

-- ========================================
-- FUNCIONES AUXILIARES
-- ========================================

-- Función para generar códigos únicos de invitación
CREATE OR REPLACE FUNCTION generate_unique_reservation_code()
RETURNS VARCHAR(20) AS $$
DECLARE
  new_code VARCHAR(20);
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generar código formato WED-XXXX
    new_code := 'WED-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');

    -- Verificar si el código ya existe
    SELECT EXISTS(SELECT 1 FROM reservations WHERE code = new_code) INTO code_exists;

    -- Si no existe, retornar el código
    IF NOT code_exists THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- COMENTARIOS EN COLUMNAS
-- ========================================

COMMENT ON TABLE reservations IS 'Tabla principal de reservaciones para el sistema de bodas';
COMMENT ON COLUMN reservations.code IS 'Código único de la reservación para QR';
COMMENT ON COLUMN reservations.guest_name IS 'Nombre del invitado principal';
COMMENT ON COLUMN reservations.number_of_guests IS 'Número total de personas incluyendo acompañantes';
COMMENT ON COLUMN reservations.accompanist_names IS 'Array con nombres de los acompañantes';
COMMENT ON COLUMN reservations.status IS 'Estado: pendiente, confirmada, ingreso-registrado';
COMMENT ON COLUMN reservations."table" IS 'Número de mesa asignada (opcional)';
COMMENT ON COLUMN reservations."group" IS 'Grupo o familia a la que pertenece (opcional)';
COMMENT ON COLUMN reservations.checked_in_at IS 'Fecha y hora del check-in en el evento';
