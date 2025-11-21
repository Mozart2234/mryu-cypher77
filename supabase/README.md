# 📁 Carpeta Supabase - Database Setup

Esta carpeta contiene todos los archivos necesarios para configurar tu base de datos en Supabase.

---

## 🎯 Archivo Principal

### ✅ database-setup-MASTER.sql

**Este es el ÚNICO archivo SQL que necesitas ejecutar.**

Contiene:
- ✅ Tabla `reservations` - Sistema de reservaciones con QR
- ✅ Tabla `guest_messages` - Mensajes de invitados
- ✅ Todos los triggers y funciones
- ✅ Políticas de Row Level Security (RLS)

**Líneas:** ~175
**Tiempo de ejecución:** 3-5 segundos

---

## 📖 Guías Disponibles

### GUIA-REINICIO-COMPLETO.md

Guía paso a paso para:
- ✅ Instalación desde cero (primera vez)
- ✅ Reiniciar TODO (borrar y empezar de nuevo)
- ✅ Reinicio selectivo (solo algunas tablas)
- ✅ Verificación de instalación
- ✅ Troubleshooting común

### auth-setup.md

Guía para configurar autenticación:
- Crear usuarios admin en Supabase
- Configurar credenciales
- Setup de autenticación

---

## 🚀 Quick Start

### Primera Instalación

```bash
# 1. Ve a Supabase SQL Editor
#    https://supabase.com/dashboard/project/YOUR_PROJECT/sql

# 2. Abre database-setup-MASTER.sql desde esta carpeta

# 3. Copia TODO el contenido

# 4. Pégalo en SQL Editor y ejecuta (botón Run)

# ¡Listo! ✅
```

### Verificar Instalación

En Supabase SQL Editor, ejecuta:

```sql
-- Ver tablas creadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('reservations', 'guest_messages');

-- Debe devolver 2 tablas
```

---

## 📊 Estructura de la Base de Datos

### Tabla: reservations
Sistema principal de reservaciones
- Código QR único por reservación
- Gestión de invitados y acompañantes
- Estados: pendiente, confirmada, ingreso-registrado
- Check-in con timestamp

### Tabla: guest_messages
Mensajes de invitados para la pareja
- Tipos: buenos deseos, consejos, recuerdos
- Sistema de moderación (admin puede bloquear)
- Mensajes públicos/privados
- Muro público filtrado


---

## ⚠️ Reiniciar Base de Datos

Si necesitas empezar de cero, consulta:
👉 **GUIA-REINICIO-COMPLETO.md**

**ADVERTENCIA:** Esto borrará TODOS los datos permanentemente.

---

## 🔐 Seguridad (Row Level Security)

Todas las tablas tienen RLS habilitado con políticas configuradas.

**Estado actual:** Modo desarrollo (permite todo)
**Para producción:** Ajustar políticas según tu lógica de autenticación

Ver políticas actuales en:
- Supabase Dashboard → Table Editor → Selecciona tabla → Ícono de escudo

---

## 📝 Archivos en esta Carpeta

```
supabase/
├── database-setup-MASTER.sql      ⭐ Archivo principal (2 tablas)
├── GUIA-REINICIO-COMPLETO.md     📖 Guía de instalación/reinicio
├── auth-setup.md                  🔐 Guía de autenticación
└── README.md                      📄 Este archivo
```

**Nota:** Solo usamos 2 tablas:
- `reservations` - Datos en el código (eventConfig.ts)
- `guest_messages` - Datos dinámicos en BD

---

## 🆘 Troubleshooting

### Error: "relation already exists"
**Solución:** Las tablas ya existen. Lee GUIA-REINICIO-COMPLETO.md para borrarlas primero.

### Error: "permission denied"
**Solución:** Asegúrate de estar en Supabase SQL Editor (no en el código JS).

### No veo las tablas
**Solución:** Refresca la página de Supabase. Ve a Table Editor en el menú lateral.

---

## 📞 Más Ayuda

- **README principal:** `/README.md`
- **Guía técnica:** `/CLAUDE.md`
- **Reporte de limpieza:** `/CLEANUP_REPORT.md`

---

**Última actualización:** 2025-01-21
**Versión:** 3.0 (Consolidada)
