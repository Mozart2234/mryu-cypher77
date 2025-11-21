# 🔄 Guía: Reiniciar Base de Datos Desde Cero

Esta guía te muestra cómo **eliminar TODO** y comenzar de nuevo con una base de datos limpia.

---

## 📋 Índice

1. [Opción A: Reinicio Completo (Borra TODO)](#opción-a-reinicio-completo-borra-todo)
2. [Opción B: Reinicio Selectivo (Borra solo algunas tablas)](#opción-b-reinicio-selectivo-borra-solo-algunas-tablas)
3. [Instalación Limpia](#instalación-limpia)
4. [Verificación](#verificación)
5. [Troubleshooting](#troubleshooting)

---

## ⚠️ ADVERTENCIA IMPORTANTE

**ESTO BORRARÁ TODOS TUS DATOS PERMANENTEMENTE**

- ✅ Todas las reservaciones
- ✅ Todos los mensajes de invitados
- ✅ Todo el contenido personalizado
- ✅ TODO se perderá

**Antes de continuar:**
1. Exporta tus datos si los necesitas (CSV desde admin)
2. Confirma que quieres empezar de cero
3. Guarda esta guía por si acaso

---

## Opción A: Reinicio Completo (Borra TODO)

### Paso 1: Acceder a Supabase SQL Editor

1. Ve a [https://supabase.com](https://supabase.com)
2. Selecciona tu proyecto
3. En el menú lateral, haz clic en **SQL Editor**
4. Haz clic en **New query**

### Paso 2: Borrar TODAS las Tablas

Copia y pega este código en el SQL Editor:

```sql
-- =====================================================
-- ⚠️ REINICIO COMPLETO - BORRA TODO
-- =====================================================
-- Este script eliminará TODAS las tablas y empezará desde cero
-- ¡Asegúrate de haber hecho backup si lo necesitas!

-- 1. ELIMINAR POLÍTICAS RLS (Row Level Security)
DROP POLICY IF EXISTS "reservations_select_all" ON reservations;
DROP POLICY IF EXISTS "reservations_admin_all" ON reservations;
DROP POLICY IF EXISTS "guest_messages_select_public" ON guest_messages;
DROP POLICY IF EXISTS "guest_messages_insert_all" ON guest_messages;
DROP POLICY IF EXISTS "guest_messages_update_admin" ON guest_messages;
DROP POLICY IF EXISTS "guest_messages_delete_admin" ON guest_messages;

-- 2. ELIMINAR TRIGGERS
DROP TRIGGER IF EXISTS update_reservations_updated_at_trigger ON reservations;
DROP TRIGGER IF EXISTS update_guest_messages_updated_at_trigger ON guest_messages;

-- 3. ELIMINAR FUNCIONES
DROP FUNCTION IF EXISTS update_reservations_updated_at();
DROP FUNCTION IF EXISTS update_guest_messages_updated_at();

-- 4. ELIMINAR TABLAS (en orden por dependencias)
DROP TABLE IF EXISTS guest_messages CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;

-- =====================================================
-- ✅ TODAS LAS TABLAS HAN SIDO ELIMINADAS
-- =====================================================
```

**Ejecuta el script:** Haz clic en **Run** (botón verde en la esquina inferior derecha)

### Paso 3: Instalar Todo de Nuevo

Ahora vamos a recrear TODO desde cero usando el archivo maestro.

1. En el mismo SQL Editor, haz clic en **New query**
2. Abre el archivo `database-setup-MASTER.sql` de este proyecto
3. Copia **TODO el contenido** del archivo
4. Pégalo en el SQL Editor
5. Haz clic en **Run**

⏱️ **Tiempo estimado:** 5-10 segundos

### Paso 4: Verificar la Instalación

En el SQL Editor, ejecuta esto:

```sql
-- Verificar que las tablas existen
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('reservations', 'guest_messages', 'wedding_content');

-- Ver cuántos registros hay en cada tabla
SELECT 'reservations' as table_name, COUNT(*) FROM reservations
UNION ALL
SELECT 'guest_messages', COUNT(*) FROM guest_messages
UNION ALL
SELECT 'wedding_content', COUNT(*) FROM wedding_content;
```

**Resultado esperado:**
- 3 tablas encontradas ✅
- reservations: 0 registros (vacía)
- guest_messages: 0 registros (vacía)
- wedding_content: ~35 registros (datos iniciales)

---

## Opción B: Reinicio Selectivo (Borra solo algunas tablas)

¿Solo quieres borrar **algunas** tablas? Usa estos scripts individuales:

### Borrar solo Reservaciones

```sql
-- ⚠️ Borra todas las reservaciones (y sus mensajes por CASCADE)
TRUNCATE TABLE reservations CASCADE;

-- Verificar
SELECT COUNT(*) FROM reservations; -- Debe ser 0
SELECT COUNT(*) FROM guest_messages; -- Debe ser 0 también
```

### Borrar solo Mensajes

```sql
-- ⚠️ Borra solo los mensajes de invitados
TRUNCATE TABLE guest_messages;

-- Verificar
SELECT COUNT(*) FROM guest_messages; -- Debe ser 0
```

### Borrar solo Contenido

```sql
-- ⚠️ Borra todo el contenido editable
TRUNCATE TABLE wedding_content;

-- Verificar
SELECT COUNT(*) FROM wedding_content; -- Debe ser 0
```

### Re-cargar Datos Iniciales

Si borraste `wedding_content` y quieres restaurar los datos iniciales:

1. Abre `database-setup-MASTER.sql`
2. Copia SOLO la sección "PARTE 4: DATOS INICIALES"
3. Pégala en SQL Editor
4. Ejecuta

---

## Instalación Limpia

### ¿Primera vez? Sigue estos pasos

Si nunca has ejecutado ningún script SQL:

1. **Accede a Supabase SQL Editor** (ver Paso 1 de Opción A)

2. **Ejecuta el archivo maestro:**
   - Abre `database-setup-MASTER.sql`
   - Copia TODO el contenido
   - Pégalo en SQL Editor
   - Click en **Run**

3. **¡Listo!** 🎉

---

## Verificación

### Verificar en Table Editor

1. En Supabase, ve a **Table Editor** (menú lateral)
2. Deberías ver 3 tablas:
   - ✅ `reservations`
   - ✅ `guest_messages`
   - ✅ `wedding_content`

### Verificar Estructura de `reservations`

Click en la tabla `reservations`, deberías ver estas columnas:

- `id` (UUID)
- `code` (TEXT)
- `guest_name` (TEXT)
- `number_of_guests` (INT4)
- `accompanist_names` (TEXT[])
- `status` (TEXT)
- `table` (TEXT)
- `group` (TEXT)
- `notes` (TEXT)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)
- `checked_in_at` (TIMESTAMPTZ)

### Verificar Estructura de `guest_messages`

Click en la tabla `guest_messages`, deberías ver:

- `id` (UUID)
- `reservation_id` (UUID) - FK a reservations
- `guest_name` (TEXT)
- `message` (TEXT)
- `message_type` (TEXT)
- `is_public` (BOOL)
- `is_blocked` (BOOL)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### Verificar Estructura de `wedding_content`

Click en la tabla `wedding_content`, deberías ver:

- `id` (UUID)
- `section` (TEXT)
- `key` (TEXT)
- `content` (JSONB)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### Verificar Row Level Security (RLS)

En cada tabla, verifica que el **RLS está habilitado** (ícono de escudo en verde).

---

## Troubleshooting

### Error: "relation already exists"

**Causa:** Las tablas ya existen.

**Solución:** Ejecuta primero el script de Opción A (Reinicio Completo).

---

### Error: "permission denied"

**Causa:** No tienes permisos de administrador.

**Solución:** Asegúrate de estar usando el **SQL Editor de Supabase** (no el cliente de JavaScript).

---

### Error: "foreign key constraint"

**Causa:** Intentas borrar `reservations` pero `guest_messages` depende de ella.

**Solución:** Usa `CASCADE` o borra `guest_messages` primero:

```sql
DROP TABLE IF EXISTS guest_messages CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
```

---

### Las políticas RLS no funcionan

**Causa:** Las políticas están configuradas para permitir todo (`true`).

**Solución:** Para producción, deberías ajustar las políticas según tu lógica de autenticación. Por ahora, funcionan bien para desarrollo.

---

### No veo datos en `wedding_content`

**Causa:** Comentaste la sección de datos iniciales.

**Solución:** En `database-setup-MASTER.sql`, asegúrate de ejecutar también la "PARTE 4: DATOS INICIALES".

---

## 📁 Archivos SQL del Proyecto

Después de esta limpieza, solo necesitas:

### ✅ Usar este archivo:
- **`database-setup-MASTER.sql`** - El único archivo que necesitas ejecutar

### ❌ Puedes eliminar estos archivos:
- `database-schema.sql` (obsoleto)
- `database-schema-COMPLETO.sql` (obsoleto)
- `supabase_guest_messages_schema.sql` (obsoleto)

**Todo está consolidado en `database-setup-MASTER.sql`** 🎉

---

## 🚀 Después del Reinicio

### 1. Actualizar Variables de Entorno

Verifica que tu `.env` tenga:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### 2. Reiniciar la Aplicación

```bash
pnpm dev
```

### 3. Probar el Sistema

1. Ve a `/admin/login`
2. Credenciales por defecto:
   - Usuario: `admin`
   - Contraseña: `boda2026`
3. Crea una reservación de prueba
4. Verifica que se guarda en Supabase

### 4. Personalizar Datos

1. Ve a Supabase > Table Editor > `wedding_content`
2. Edita los registros según tu evento
3. O usa el editor de contenido en `/admin/content` (si está habilitado)

---

## 📊 Resumen de Comandos Rápidos

### Reinicio Total (Borra TODO y Reinstala)

```sql
-- 1. Borrar todo
DROP TABLE IF EXISTS guest_messages CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS wedding_content CASCADE;

-- 2. Ejecutar database-setup-MASTER.sql completo
```

### Limpiar Solo Datos (Mantener Estructura)

```sql
-- Borrar solo los datos, mantener las tablas
TRUNCATE TABLE guest_messages;
TRUNCATE TABLE reservations CASCADE;
TRUNCATE TABLE wedding_content;
```

### Verificar Estado Actual

```sql
-- Ver todas las tablas
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Contar registros
SELECT 'reservations' as tabla, COUNT(*) FROM reservations
UNION ALL
SELECT 'guest_messages', COUNT(*) FROM guest_messages
UNION ALL
SELECT 'wedding_content', COUNT(*) FROM wedding_content;
```

---

## 🎯 Checklist Final

Después de reiniciar, verifica:

- [ ] Las 3 tablas existen en Supabase
- [ ] RLS está habilitado en todas las tablas
- [ ] `wedding_content` tiene ~35 registros (datos iniciales)
- [ ] `reservations` y `guest_messages` están vacías
- [ ] Puedes crear una reservación desde `/admin`
- [ ] La reservación se guarda en Supabase
- [ ] Puedes ver la reservación en Table Editor

---

## 💡 Consejos Pro

### Backup Antes de Borrar

```sql
-- Exportar datos a JSON
SELECT json_agg(row_to_json(t))
FROM reservations t;

SELECT json_agg(row_to_json(t))
FROM guest_messages t;

SELECT json_agg(row_to_json(t))
FROM wedding_content t;
```

Copia el resultado y guárdalo en un archivo `.json` por si acaso.

### Script de Desarrollo

Si estás en desarrollo y reseteas mucho:

```sql
-- Script rápido para limpiar y repoblar
TRUNCATE TABLE reservations CASCADE;
TRUNCATE TABLE wedding_content CASCADE;

-- Luego ejecutar solo la PARTE 4 de database-setup-MASTER.sql
```

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. Verifica que estás en **SQL Editor** (no en el código)
2. Revisa los errores en rojo (te dirán qué falta)
3. Ejecuta los scripts en orden (primero borrar, luego crear)
4. Si nada funciona, borra TODAS las tablas y empieza de nuevo

---

## ✅ ¡Listo!

Tu base de datos está **limpia** y **lista** para usar.

Próximos pasos:
1. Personaliza `wedding_content` con tus datos
2. Crea tus primeras reservaciones
3. Prueba el sistema completo
4. ¡Deploy a producción!

---

**Última actualización:** 2025-01-21
**Versión del sistema:** 3.0
**Archivo SQL maestro:** `database-setup-MASTER.sql`
