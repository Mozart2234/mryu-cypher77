-- Script para agregar sistema de confirmación individual de acompañantes
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columna para acompañantes con confirmación (JSON)
ALTER TABLE reservations
ADD COLUMN IF NOT EXISTS accompanists TEXT;

-- 2. Agregar columna para saber si el invitado principal asiste
ALTER TABLE reservations
ADD COLUMN IF NOT EXISTS main_guest_attending BOOLEAN DEFAULT true;

-- 3. Comentarios para documentación
COMMENT ON COLUMN reservations.accompanists IS 'JSON array de acompañantes con formato: [{"name": "Nombre", "willAttend": boolean}]';
COMMENT ON COLUMN reservations.main_guest_attending IS 'Indica si el invitado principal confirmó su asistencia';
COMMENT ON COLUMN reservations.accompanist_names IS 'DEPRECATED: Mantener por compatibilidad con registros antiguos';

-- 4. Migrar datos existentes (opcional, si ya tienes reservaciones)
-- Esto convierte accompanist_names array a accompanists JSON
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

-- 5. Verificar que todo funcionó
SELECT
  id,
  guest_name,
  number_of_guests,
  accompanist_names,
  accompanists,
  main_guest_attending,
  status
FROM reservations
LIMIT 5;
