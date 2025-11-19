# Configuración de Autenticación Supabase

## Crear Usuario Administrador

### Opción 1: Desde el Dashboard de Supabase (Recomendado)

1. Ve a tu proyecto en https://supabase.com/dashboard
2. Click en "Authentication" en el sidebar
3. Click en "Users"
4. Click en "Add user" → "Create new user"
5. Ingresa:
   - **Email**: `admin@example.com` (o el que prefieras)
   - **Password**: Una contraseña segura
   - **Auto Confirm User**: ✅ Activar (para evitar confirmación por email)
6. Click en "Create user"

### Opción 2: Por SQL

```sql
-- Insertar usuario admin directamente (para desarrollo local)
-- IMPORTANTE: Cambiar email y password en producción

-- Generar UUID para el usuario
-- El password hasheado es para: "boda2026"
-- Usa https://supabase.com/docs/guides/auth/passwords para generar tu propio hash

-- Nota: Es más fácil crear el usuario desde el dashboard.
-- Si deseas hacerlo por SQL, consulta la documentación de Supabase Auth.
```

### Opción 3: Usar authService.signUp (Solo en desarrollo)

Puedes crear temporalmente un endpoint o componente para registrar el primer admin:

```typescript
// Ejemplo temporal - ELIMINAR después de crear admin
import { authService } from './services/authService';

// Ejecutar una vez en consola del navegador:
await authService.signUp('admin@example.com', 'tu-password-segura');
```

## Configuración de Email Authentication

### Desactivar confirmación de email (solo desarrollo)

1. Ve a Authentication → Settings
2. En "Email Auth" → "Enable email confirmations"
3. **Desactiva** la opción (solo para desarrollo)
4. **En producción**: Mantener activada y configurar email templates

### Configurar dominios permitidos

1. Authentication → URL Configuration
2. Agregar tu dominio de producción en "Site URL"
3. Agregar redirects permitidos en "Redirect URLs"

## Seguridad

### Para Producción:

1. ✅ Activar confirmación por email
2. ✅ Configurar RLS (Row Level Security) para tabla `reservations`
3. ✅ Crear política para que solo usuarios autenticados puedan modificar
4. ✅ Usar contraseñas fuertes
5. ✅ Habilitar 2FA para la cuenta admin
6. ✅ Configurar dominio personalizado

### Políticas RLS recomendadas:

```sql
-- Solo usuarios autenticados pueden hacer INSERT/UPDATE/DELETE
CREATE POLICY "Admin only modifications" ON reservations
  FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Todos pueden ver (para lista de invitados pública)
-- Ya está configurado en schema.sql
```

## Verificación

Después de crear el usuario, verifica que puedes:

1. Iniciar sesión en `/admin/login`
2. Acceder al dashboard en `/admin`
3. Cerrar sesión correctamente
4. La sesión persiste al recargar la página

## Troubleshooting

### Error: "Invalid login credentials"
- Verifica que el email y password sean correctos
- Verifica que el usuario esté confirmado (Auto Confirm User activado)
- Revisa los logs en Supabase Dashboard → Logs → Auth Logs

### Error: "No se pudo iniciar sesión"
- Verifica variables de entorno (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY)
- Verifica conexión a internet
- Revisa consola del navegador para más detalles

### Sesión no persiste
- Supabase Auth usa localStorage automáticamente
- Verifica que localStorage esté habilitado en el navegador
- Revisa que no haya errores en la consola relacionados con CORS
