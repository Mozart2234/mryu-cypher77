# 🚀 Sistema de Contenido Dinámico

## Descripción

Este sistema permite editar **todos los textos de la invitación** directamente desde el navegador, sin necesidad de modificar código ni recompilar la aplicación. Los cambios se aplican **en tiempo real**.

## 📦 ¿Qué incluye?

### 1. Base de Datos (Supabase)
- Tabla `wedding_content` que almacena todo el contenido editable
- Organizado por secciones (couple, newspaper, locations, etc.)
- Contenido flexible en formato JSON

### 2. Servicio de Contenido
- `src/services/contentService.ts`: API para gestionar el contenido
- Funciones CRUD completas
- Compatible con la estructura existente de `eventConfig`

### 3. Gestor de Contenido (Admin)
- Ruta: `/admin/content`
- Interfaz visual para editar todos los textos
- Edición en formato JSON con validación
- Organizado por secciones con iconos

### 4. Hook Personalizado
- `useWeddingContent()`: Hook para usar contenido dinámico
- Fallback automático al config estático si no hay conexión
- Refresco manual del contenido

## 🛠️ Instalación

### Paso 1: Crear la tabla en Supabase

1. Abre tu proyecto en [Supabase](https://supabase.com)
2. Ve a **SQL Editor**
3. Copia y pega el contenido de `database-schema.sql`
4. Ejecuta el script
5. Verifica que la tabla `wedding_content` se creó correctamente

### Paso 2: Verificar conexión

El sistema ya está configurado. Solo asegúrate de tener tus credenciales de Supabase en `.env`:

```env
VITE_SUPABASE_URL=tu_url_aqui
VITE_SUPABASE_ANON_KEY=tu_key_aqui
```

## 📝 Cómo Usar

### Para el Admin (tú)

1. **Acceder al gestor:**
   - Ve a `http://localhost:5173/admin`
   - Haz clic en el botón azul **"Editar Contenido"**
   - O accede directamente a `http://localhost:5173/admin/content`

2. **Editar contenido:**
   - Verás todas las secciones organizadas por categorías
   - Cada sección muestra cuántos elementos tiene
   - Haz clic en **"Editar"** en el elemento que quieras cambiar

3. **Modificar el texto:**
   - Se abre un modal con el contenido en formato JSON
   - Edita los valores (mantén el formato JSON)
   - Haz clic en **"Guardar Cambios"**
   - Los cambios se aplican **inmediatamente**

4. **Ver cambios:**
   - Abre `http://localhost:5173/` en otra pestaña
   - Refresca la página para ver los cambios

### Para tu Novia

1. **Acceso más simple (sin ver JSON):**
   - Dale acceso a `/admin` (credenciales de admin)
   - Muéstrale cómo usar el botón "Editar Contenido"
   - Puede revisar todos los textos organizados

2. **O usa el editor legacy:**
   - `http://localhost:5173/editor` (no requiere login)
   - Solo lectura, pero puede copiar textos para enviarte cambios

## 🎨 Secciones Editables

### 👰🤵 Información de los Novios
- Nombres cortos y completos de novia y novio

### 📰 Titulares del Periódico
- Edición del periódico
- Titular principal
- Subtítulos y bajadas

### 📅 Fecha y Hora
- Fecha completa del evento
- Hora
- Formato ISO para el contador regresivo

### 📍 Ubicaciones
- **Ceremonia:** Nombre, dirección, ciudad, hora, enlace a Maps
- **Recepción:** Nombre, dirección, ciudad, hora, enlace a Maps

### 👨‍👩‍👧‍👦 Familia
- Padres de la novia
- Padres del novio
- Padrinos (array de objetos)

### ❤️ Historia de Amor
- Timeline completa con todos los eventos
- Cada evento tiene: fecha, título, texto, icono, color
- Algunos eventos tienen "quote" (cita destacada)
- Campo "order" para ordenar eventos

### 📄 Artículos del Periódico
- 4 artículos para la portada
- Título, contenido, número de página
- Campo "order" para ordenar

### 📖 Cita Bíblica
- Texto de la cita
- Fuente (libro, capítulo, versículo)

### 👔 Código de Vestimenta
- Título y subtítulo
- Recomendaciones para mujeres (array)
- Recomendaciones para hombres (array)

## 🔧 Formato JSON

Cada elemento se guarda en formato JSON. Ejemplo:

```json
{
  "name": "Estephanie",
  "fullName": "Estephanie Yucra Quispe"
}
```

### Tips para editar JSON:

✅ **Correcto:**
```json
{
  "title": "Mi título",
  "text": "Mi texto con \"comillas\""
}
```

❌ **Incorrecto:**
```json
{
  title: "Mi título",  // Falta comillas en la clave
  'text': 'Mi texto'   // No usar comillas simples
}
```

### Caracteres especiales:

- Comillas: usa `\"`
- Salto de línea: usa `\n`
- Tilde: normal (á, é, í, ó, ú)
- Ñ: normal (ñ, Ñ)

## 🔄 Migración Progresiva

### Actualmente (Fase 1):
- Contenido en `eventConfig.ts` (archivo estático)
- Nuevo sistema listo en Supabase
- Ambos funcionan en paralelo

### Próximo paso (Fase 2):
- Usar el hook `useWeddingContent()` en los componentes
- Fallback automático al config estático

### Ejemplo de migración de un componente:

**Antes:**
```tsx
import { eventConfig } from '@/config/eventConfig';

function Hero() {
  return <h1>{eventConfig.bride.name}</h1>;
}
```

**Después:**
```tsx
import { useWeddingContent } from '@/hooks/useWeddingContent';

function Hero() {
  const { config, loading } = useWeddingContent();

  if (loading) return <div>Cargando...</div>;

  return <h1>{config.bride.name}</h1>;
}
```

## 🚨 Solución de Problemas

### Error: "JSON inválido"
- Verifica que todas las claves tengan comillas dobles
- Verifica que no falten comas entre elementos
- Usa un validador JSON online si tienes dudas

### Los cambios no se reflejan
- Refresca la página con Ctrl+F5 (forzar recarga)
- Verifica que se guardaron en Supabase (revisa la tabla)
- Revisa la consola del navegador por errores

### No aparece contenido
- Verifica que ejecutaste el script SQL inicial
- Verifica las credenciales de Supabase en `.env`
- Revisa que la tabla tenga datos

### Error de permisos
- Verifica las políticas RLS en Supabase
- Por ahora están abiertas para testing
- En producción, configurar auth correctamente

## 🎯 Ventajas del Sistema

✅ **Edición en tiempo real:** Sin recompilar código
✅ **Organizado por secciones:** Fácil de navegar
✅ **Validación automática:** Detecta errores de JSON
✅ **Fallback seguro:** Si falla la BD, usa config estático
✅ **Multi-usuario:** Varios admins pueden editar
✅ **Historial:** Timestamp de última modificación
✅ **Escalable:** Agregar nuevas secciones es simple

## 📚 Archivos Importantes

```
src/
├── services/
│   └── contentService.ts          # API del contenido
├── hooks/
│   └── useWeddingContent.ts       # Hook personalizado
├── pages/
│   ├── ContentManager.tsx         # Gestor visual (admin)
│   └── ContentEditor.tsx          # Editor legacy (lectura)
└── config/
    └── eventConfig.ts             # Config estático (fallback)

database-schema.sql                 # Script de creación de tabla
```

## 🔐 Seguridad

### En Desarrollo:
- Las políticas RLS permiten todo (testing)
- El gestor requiere login de admin

### En Producción:
1. Configurar políticas RLS correctas en Supabase
2. Solo admins autenticados pueden editar
3. Lectura pública para el sitio
4. Considerar rate limiting

## 🎓 Recursos

- [Documentación Supabase](https://supabase.com/docs)
- [JSON Validator Online](https://jsonlint.com/)
- [Guía de JSON](https://www.json.org/json-es.html)

---

**¿Dudas?** Consulta con tu programador o revisa los comentarios en el código.
