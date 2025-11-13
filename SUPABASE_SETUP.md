# Configuración de Supabase

Este documento explica cómo configurar la base de datos de Supabase para el sistema de reservaciones de boda.

## Paso 1: Ejecutar el Schema SQL

1. Ve a tu proyecto de Supabase: https://qbcajeoppzgfmwurltoc.supabase.co
2. En el panel lateral izquierdo, haz clic en "SQL Editor"
3. Haz clic en "New query" (Nueva consulta)
4. Copia todo el contenido del archivo `supabase/schema.sql`
5. Pégalo en el editor SQL
6. Haz clic en "Run" (Ejecutar) para crear las tablas y configuraciones

## Paso 2: Verificar la Configuración

Después de ejecutar el schema, verifica que todo esté correcto:

### Ver la tabla creada:
1. Ve a "Table Editor" en el panel lateral
2. Deberías ver la tabla `reservations` con todas sus columnas

### Columnas de la tabla `reservations`:
- `id` (UUID) - ID único de la reservación
- `code` (VARCHAR) - Código único para el QR
- `guest_name` (VARCHAR) - Nombre del invitado principal
- `number_of_guests` (INTEGER) - Número total de personas
- `accompanist_names` (TEXT[]) - Array de nombres de acompañantes
- `status` (VARCHAR) - Estado: pendiente, confirmada, ingreso-registrado
- `table` (VARCHAR) - Número de mesa asignada
- `group` (VARCHAR) - Grupo o familia
- `notes` (TEXT) - Notas adicionales
- `created_at` (TIMESTAMPTZ) - Fecha de creación
- `updated_at` (TIMESTAMPTZ) - Fecha de última actualización
- `checked_in_at` (TIMESTAMPTZ) - Fecha y hora del check-in

## Paso 3: Configurar Row Level Security (RLS)

El schema SQL ya incluye las políticas de RLS necesarias:
- **SELECT**: Acceso público (para que los invitados vean sus pases)
- **INSERT**: Solo usuarios autenticados (admin)
- **UPDATE**: Acceso público (para que invitados confirmen y agreguen nombres)
- **DELETE**: Solo usuarios autenticados (admin)

## Credenciales Configuradas

Las credenciales ya están configuradas en el código:

```typescript
// src/lib/supabase.ts
const supabaseUrl = 'https://qbcajeoppzgfmwurltoc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## Funcionalidades Implementadas

### Backend (Supabase):
- ✅ Tabla de reservaciones completa
- ✅ Triggers automáticos para updated_at
- ✅ Row Level Security configurado
- ✅ Índices optimizados
- ✅ Función para generar códigos únicos

### Frontend:
- ✅ Servicio de reservaciones migrado a Supabase
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Búsqueda y filtros
- ✅ Estadísticas en tiempo real
- ✅ Exportación a CSV
- ✅ Sistema de acompañantes
- ✅ Check-in con QR

## Datos de Prueba (Opcional)

Si quieres agregar datos de prueba, puedes ejecutar este SQL en el SQL Editor:

```sql
INSERT INTO reservations (code, guest_name, number_of_guests, status, "table", "group")
VALUES
  ('WED-0001', 'Juan Pérez', 2, 'confirmada', 'Mesa 1', 'Familia Novia'),
  ('WED-0002', 'María González', 4, 'pendiente', 'Mesa 2', 'Amigos'),
  ('WED-0003', 'Carlos Rodríguez', 1, 'confirmada', 'Mesa 3', 'Familia Novio');
```

## Troubleshooting

### Error: "relation reservations does not exist"
- Asegúrate de haber ejecutado el schema SQL completo
- Verifica que estés en el proyecto correcto

### Error: "permission denied for table reservations"
- Verifica que RLS esté correctamente configurado
- Revisa las políticas en Table Editor > reservations > Policies

### Error de conexión:
- Verifica que el URL y la API key sean correctos
- Asegúrate de tener conexión a internet

## Exportación CSV

El sistema incluye exportación automática de la lista de invitados:
- **Desde el admin**: Botón "Exportar CSV" en el header
- **Formato**: CSV con BOM UTF-8 (compatible con Excel)
- **Contenido**: Todos los datos incluyendo acompañantes

## Sistema de Temas

Se ha implementado un sistema de 5 plantillas visuales diferentes:
1. **Newspaper** - Estilo periódico clásico (mejorado y minimalista)
2. **Fluid** - Estilo Squarespace minimalista (próximamente)
3. **Romantic** - Estilo jardín romántico (próximamente)
4. **Modern** - Estilo geométrico moderno (próximamente)
5. **Vintage** - Estilo polaroid vintage (próximamente)

Para cambiar el tema, usa el selector flotante en la esquina inferior derecha.

## Siguientes Pasos

1. Ejecutar el schema SQL en Supabase
2. Probar crear una reservación desde el admin
3. Verificar que los datos se guarden correctamente
4. Probar el flujo completo:
   - Crear reservación
   - Ver pase digital
   - Confirmar asistencia
   - Agregar nombres de acompañantes
   - Check-in con QR
   - Exportar CSV

## Soporte

Si encuentras algún problema, revisa:
- Logs en la consola del navegador (F12)
- Logs en Supabase (Database > Logs)
- Verifica que todas las políticas RLS estén activas
