-- =====================================================
-- FIX: Políticas RLS para guest_messages
-- =====================================================
-- Ejecutar AHORA en Supabase SQL Editor
-- Esto arregla:
--   1. Admin no podía ver mensajes privados
--   2. Admin no podía bloquear/desbloquear mensajes
-- =====================================================

-- Eliminar políticas antiguas
DROP POLICY IF EXISTS "guest_messages_select_public" ON guest_messages;
DROP POLICY IF EXISTS "guest_messages_select_all" ON guest_messages;
DROP POLICY IF EXISTS "guest_messages_insert_all" ON guest_messages;
DROP POLICY IF EXISTS "guest_messages_update_admin" ON guest_messages;
DROP POLICY IF EXISTS "guest_messages_delete_admin" ON guest_messages;

-- Nueva política SELECT: permite ver TODOS los mensajes
CREATE POLICY "guest_messages_select_all" ON guest_messages
  FOR SELECT
  USING (true);

-- Política INSERT: permite crear mensajes (públicos o privados)
CREATE POLICY "guest_messages_insert_all" ON guest_messages
  FOR INSERT
  WITH CHECK (true);

-- Política UPDATE: permite actualizar (bloquear/desbloquear)
CREATE POLICY "guest_messages_update_admin" ON guest_messages
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Política DELETE: permite eliminar mensajes
CREATE POLICY "guest_messages_delete_admin" ON guest_messages
  FOR DELETE
  USING (true);

-- Verificar que las políticas se crearon correctamente
SELECT
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'guest_messages';
