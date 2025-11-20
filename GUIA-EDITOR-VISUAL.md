# 📝 Guía del Editor Visual - Para Estephanie

## 🎯 ¿Qué es esto?

Esta es tu guía personal para editar **todo el contenido de la invitación** sin necesidad de saber programación. Ahora puedes cambiar textos, fechas, nombres y mucho más desde una interfaz visual con formularios simples.

---

## 🚀 Cómo Entrar al Editor

### Paso 1: Abrir el Admin
1. Abre el navegador
2. Ve a: `http://localhost:5173/admin` (o la URL de producción)
3. Inicia sesión con tus credenciales

### Paso 2: Ir al Editor de Contenido
1. Click en el botón **"Editar Contenido"** (📝)
2. Verás todas las secciones organizadas por categorías

---

## 📦 Secciones Disponibles

Verás tarjetas de colores con estas secciones:

### 👰🤵 Información de los Novios
- Nombres cortos y completos de la pareja
- Ejemplo: "Estephanie" → "Estephanie Yucra Quispe"

### 📰 Titulares del Periódico
- Título principal
- Subtítulos
- Edición especial

### 📅 Fecha y Hora
- Fecha completa del evento
- Día, mes, año
- Hora de inicio

### 📍 Ubicaciones
- Iglesia (ceremonia)
- Salón (recepción)
- Direcciones y links de Google Maps

### 👨‍👩‍👧‍👦 Familia
- Nombres de padres
- Nombres de padrinos

### ❤️ Historia de Amor
- 12 eventos de su historia
- Fechas, títulos, textos
- Emojis y colores

### 📄 Artículos del Periódico
- Títulos de artículos
- Contenido de cada artículo
- Números de página

### 📖 Cita Bíblica
- Texto de la cita
- Fuente (ej: 1 Corintios 13:4)

### 👔 Código de Vestimenta
- Recomendaciones para hombres
- Recomendaciones para mujeres
- Paleta de colores

### ❓ Preguntas Frecuentes
- 8 preguntas con respuestas
- Información de contacto

### ⛅ Pronóstico Emocional (Anuncios)
- Pronóstico semanal divertido
- Iconos y mensajes

### 💬 Mensajes Generales
- Mensajes de invitación
- Textos de bienvenida
- Mensajes de agradecimiento

---

## ✏️ Cómo Editar Contenido

### Modo Visual (Recomendado) 📝

Este es el modo más fácil, sin código:

1. **Click en "Editar"** en cualquier elemento
2. Verás un formulario con campos normales
3. **Cambia los textos** directamente en los campos
4. **Click en "Guardar Cambios"**
5. ¡Listo! Los cambios se guardan automáticamente

#### Ejemplo: Cambiar el titular del periódico

```
1. Busca la tarjeta "📰 Titulares del Periódico"
2. Click en "Editar" en "Header"
3. Verás campos como:
   - Edición: [Edición Especial Arequipa]
   - Titular Principal: [se casan en ENERO]
   - Subtítulo: [Una historia de amor...]
4. Cambia lo que necesites
5. Click en "✓ Guardar Cambios"
```

### Modo JSON (Avanzado) &lt;/&gt;

Solo para casos especiales o contenido complejo:

1. Click en el botón **"&lt;/&gt; JSON"** en la parte superior del modal
2. Verás el código en formato JSON
3. **¡Cuidado!** Debes mantener las comillas y comas correctas
4. Solo usa este modo si el visual no funciona

---

## 💡 Consejos y Tips

### ✅ Buenas Prácticas

- **Siempre usa el modo Visual** a menos que sea necesario JSON
- **Lee bien los campos** antes de cambiar
- **Guarda frecuentemente** para no perder cambios
- **Refresca el sitio** después de guardar para ver los cambios

### ⚠️ Cuidados

- **No borres campos vacíos**: Si un campo está vacío, déjalo vacío
- **Mantén los formatos**: Si dice "10:00 AM", usa ese formato
- **Los emojis funcionan**: Puedes usar ❤️ 💒 👰 etc.
- **Las URLs deben ser completas**: `https://maps.google.com/...`

### 🔄 Si algo sale mal

1. **No guardes** si ves un error
2. Click en **"Cancelar"**
3. Vuelve a abrir el elemento
4. Intenta de nuevo

---

## 📱 Ejemplos Comunes

### Cambiar nombres de los novios

```
Sección: 👰🤵 Información de los Novios
1. Click en "Bride" → Editar
2. Cambiar:
   - Nombre: Estephanie
   - Nombre Completo: Estephanie Yucra Quispe
3. Guardar
```

### Cambiar fecha del evento

```
Sección: 📅 Fecha y Hora
1. Click en "Date" → Editar
2. Cambiar:
   - Fecha Completa: Domingo, 11 de Enero de 2026
   - Día: 11
   - Mes: ENERO
   - Año: 2026
   - Hora: 10:00 AM
3. Guardar
```

### Editar un evento de la historia

```
Sección: ❤️ Historia de Amor
1. Click en cualquier evento (ej: "Event 1") → Editar
2. Cambiar:
   - Fecha: Marzo 2016
   - Título: Amor a Primera Vista
   - Texto: [Tu historia aquí]
   - Icono: 👀 (puedes cambiar el emoji)
   - Color: rose (o blue, yellow, red, etc.)
3. Guardar
```

### Cambiar dirección de la iglesia

```
Sección: 📍 Ubicaciones
1. Click en "Ceremony" → Editar
2. Cambiar:
   - Nombre del Lugar: Iglesia Adventista de Parra
   - Dirección: Av. Parra 100
   - Ciudad: Arequipa
   - Hora: 10:00 AM
   - URL de Google Maps: [link completo]
3. Guardar
```

---

## 🎨 Qué Puedes Cambiar

### ✓ Puedes cambiar:
- ✅ Todos los textos y títulos
- ✅ Fechas y horas
- ✅ Nombres y direcciones
- ✅ Emojis (copia y pega desde emojipedia.org)
- ✅ Colores (rose, blue, yellow, red, green, etc.)
- ✅ Números de página
- ✅ Links de Google Maps

### ✗ NO cambies:
- ❌ Nombres de campos (keys) en modo JSON
- ❌ Estructura del JSON (llaves, corchetes)
- ❌ Tipos de datos (si es número, mantén número)

---

## 🚨 Solución de Problemas

### "No veo los cambios en el sitio"
**Solución:**
1. Guarda los cambios
2. Refresca la página del sitio (F5)
3. Si no funciona, limpia el caché del navegador

### "Error al guardar"
**Solución:**
1. Revisa que no hayas dejado campos requeridos vacíos
2. Verifica que los links tengan formato correcto
3. Intenta de nuevo

### "El formulario no tiene todos los campos"
**Solución:**
1. Algunos contenidos complejos solo están en modo JSON
2. Cambia al modo **"&lt;/&gt; JSON"** en la parte superior
3. Edita con cuidado (mantén las comillas y comas)

### "Me deslogueo al actualizar"
**Solución:**
- ¡Esto ya está arreglado! La sesión se mantiene automáticamente
- Si aún te desloguea, cierra el navegador y vuelve a entrar

---

## 🎓 Video Tutorial (Próximamente)

Alexei te mostrará en persona cómo usar cada sección. Mientras tanto, esta guía tiene todo lo que necesitas.

---

## 📞 ¿Necesitas Ayuda?

Si tienes dudas o algo no funciona:
1. Toma un screenshot del error
2. Envíaselo a Alexei por WhatsApp
3. Él te ayudará inmediatamente

---

## 💖 ¡Disfruta Editando!

Este sistema fue creado especialmente para que puedas personalizar cada detalle de la invitación sin complicaciones. Todo está diseñado para ser intuitivo y fácil de usar.

**Recuerda:** No hay forma de "romper" nada. Si algo sale mal, siempre puedes volver atrás o pedir ayuda.

---

_Con amor, diseñado por Alexei para Estephanie_ 💕
