# 📋 Instrucciones para Ejecutar el SQL en Supabase

## 🎯 Paso a Paso

### 1. Abrir Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto de la boda

### 2. Abrir el SQL Editor
1. En el menú lateral izquierdo, busca **"SQL Editor"**
2. Haz clic en **"SQL Editor"**
3. Click en **"New Query"** (Nueva Consulta)

### 3. Copiar el Script
1. Abre el archivo `database-schema-COMPLETO.sql`
2. Selecciona TODO el contenido (Ctrl+A / Cmd+A)
3. Copia (Ctrl+C / Cmd+C)

### 4. Pegar y Ejecutar
1. Pega el script en el editor SQL de Supabase (Ctrl+V / Cmd+V)
2. Haz clic en el botón **"RUN"** (Ejecutar) en la esquina inferior derecha
3. Espera a que termine (puede tomar 5-10 segundos)

### 5. Verificar que Funcionó
Deberías ver al final:

```
section       | total
--------------+-------
articles      | 4
couple        | 2
dress_code    | 1
event         | 1
family        | 2
faq           | 1
locations     | 2
love_story    | 12
messages      | 4
newspaper     | 1
quote         | 1
settings      | 3
weather_box   | 1
```

**TOTAL: 35 registros creados ✅**

### 6. Ver los Datos
1. En el menú lateral, ve a **"Table Editor"**
2. Selecciona la tabla **"wedding_content"**
3. Deberías ver todos los 35 registros

## ✅ ¿Qué Hace el Script?

El script hace TODO esto automáticamente:

### Estructura de Base de Datos:
- ✅ Crea la tabla `wedding_content`
- ✅ Crea índices para búsquedas rápidas
- ✅ Configura trigger para actualizar timestamps
- ✅ Habilita Row Level Security (RLS)
- ✅ Crea políticas de acceso

### Datos Iniciales (35 registros):
- ✅ 2 registros de novios (nombres)
- ✅ 1 registro de encabezado del periódico
- ✅ 1 registro de fecha del evento
- ✅ 2 registros de ubicaciones (ceremonia + recepción)
- ✅ 2 registros de familia (padres + padrinos)
- ✅ 12 registros de historia de amor (timeline completo)
- ✅ 4 registros de artículos del periódico
- ✅ 1 registro de cita bíblica
- ✅ 1 registro de código de vestimenta (con paleta de colores)
- ✅ 4 registros de mensajes generales
- ✅ 1 registro de FAQ (8 preguntas)
- ✅ 1 registro de Weather Box (pronóstico)
- ✅ 3 registros de configuración del sistema

## 🔧 Si Algo Sale Mal

### Error: "relation already exists"
**Solución:** La tabla ya existe. Puedes:
- Opción 1: Borrar la tabla antigua en Table Editor → wedding_content → Delete table
- Opción 2: Ejecutar solo la parte de INSERT del script (desde la línea "DATOS INICIALES")

### Error: "permission denied"
**Solución:** Tu usuario no tiene permisos.
- Verifica que eres el dueño del proyecto
- Prueba desde la cuenta de administrador

### Error: "syntax error"
**Solución:**
- Asegúrate de copiar TODO el script
- No modifiques nada manualmente
- Ejecuta el script completo de una sola vez

### Los datos no aparecen
**Solución:**
1. Refresca la página (F5)
2. Ve a Table Editor → wedding_content
3. Si la tabla está vacía, ejecuta solo las líneas de INSERT

## 🎨 Después de Ejecutar el Script

### ¿Qué sigue?

1. **Probar el Gestor de Contenido:**
   ```bash
   # En tu terminal:
   pnpm dev

   # Luego visita:
   http://localhost:5173/admin
   # Click en "Editar Contenido"
   ```

2. **Editar algo de prueba:**
   - Cambia un nombre
   - Modifica una fecha
   - Guarda y verifica en el sitio

3. **Mostrarle a tu novia:**
   - Dale acceso al admin
   - Muéstrale cómo editar
   - ¡Que lo pruebe ella misma!

## 📊 Estructura de los Datos

### Formato de cada registro:
```json
{
  "id": "uuid-generado",
  "section": "nombre_seccion",
  "key": "clave_unica",
  "content": {
    // JSON flexible con el contenido
  },
  "created_at": "2024-11-19T...",
  "updated_at": "2024-11-19T..."
}
```

### Secciones disponibles:
- `couple` - Información de novios
- `newspaper` - Encabezados del periódico
- `event` - Fecha y hora
- `locations` - Ceremonia y recepción
- `family` - Padres y padrinos
- `love_story` - Historia de amor (12 eventos)
- `articles` - Artículos del periódico
- `quote` - Cita bíblica
- `dress_code` - Código de vestimenta + paleta
- `messages` - Mensajes generales
- `faq` - Preguntas frecuentes
- `weather_box` - Pronóstico emocional
- `settings` - Configuración del sistema

## 🔐 Seguridad

### Políticas RLS Aplicadas:
- ✅ **Lectura pública:** Cualquiera puede leer (para el sitio)
- ✅ **Escritura abierta:** Por ahora todos pueden editar (para testing)

### Para Producción (Cambiar después):
```sql
-- Cambiar la política de escritura para requerir autenticación
DROP POLICY IF EXISTS "wedding_content_admin_all" ON wedding_content;
CREATE POLICY "wedding_content_admin_all" ON wedding_content
  FOR ALL
  USING (auth.uid() IS NOT NULL); -- Solo usuarios autenticados
```

## 💡 Tips

### Ver todos los registros:
```sql
SELECT * FROM wedding_content ORDER BY section, key;
```

### Ver solo una sección:
```sql
SELECT * FROM wedding_content WHERE section = 'love_story';
```

### Contar registros:
```sql
SELECT section, COUNT(*) FROM wedding_content GROUP BY section;
```

### Buscar un texto específico:
```sql
SELECT * FROM wedding_content
WHERE content::text ILIKE '%Estephanie%';
```

### Borrar todo y empezar de nuevo:
```sql
DELETE FROM wedding_content;
-- Luego ejecuta de nuevo los INSERT
```

## 🆘 Ayuda Adicional

Si tienes problemas:
1. Revisa los logs en Supabase (menú Logs)
2. Verifica tu conexión a internet
3. Prueba con otro navegador
4. Contacta al soporte de Supabase

---

**¡Listo para usar!** Una vez ejecutado el script, tu sistema de contenido dinámico estará completamente funcional. 🎉
