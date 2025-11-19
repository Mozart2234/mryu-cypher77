-- FIX: Políticas RLS para permitir operaciones desde el frontend
-- Ejecuta este SQL en Supabase SQL Editor

-- 1. Eliminar políticas existentes restrictivas
DROP POLICY IF EXISTS "Admin only modifications" ON reservations;
DROP POLICY IF EXISTS "Public read access" ON reservations;

-- 2. Crear nuevas políticas más permisivas

-- Permitir a TODOS insertar reservaciones (invitados se auto-registran)
CREATE POLICY "Allow public insert reservations"
ON reservations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Permitir a TODOS leer reservaciones (para lista pública y ver su pase)
CREATE POLICY "Allow public read reservations"
ON reservations
FOR SELECT
TO anon, authenticated
USING (true);

-- Permitir a TODOS actualizar su propia reservación (confirmar asistencia, agregar nombres)
CREATE POLICY "Allow public update reservations"
ON reservations
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Solo usuarios AUTENTICADOS pueden eliminar (solo admin)
CREATE POLICY "Allow authenticated delete reservations"
ON reservations
FOR DELETE
TO authenticated
USING (true);

-- NOTA: Estas políticas son permisivas para facilitar uso público.
-- Para mayor seguridad en producción, puedes restringir:
-- - INSERT solo a usuarios autenticados
-- - UPDATE solo a reservaciones del mismo código
-- - DELETE solo a admin con rol específico

-- Verificar que RLS esté habilitado
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Mostrar políticas activas
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'reservations';
