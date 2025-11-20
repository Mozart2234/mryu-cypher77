# 💝 Guía para Editar la Invitación - Para Estephanie

¡Hola Estephanie! Esta guía te enseñará cómo revisar y editar todos los textos de tu invitación de boda de forma fácil y visual, sin necesidad de tocar código.

## 🌐 ¿Cómo Acceder?

### Opción 1: Desde el Panel de Admin (Recomendado)

1. **Inicia sesión:**
   - Abre: `http://localhost:5173/admin/login`
   - Ingresa usuario y contraseña que Alexei te dará
   - Haz clic en "Iniciar Sesión"

2. **Accede al editor:**
   - Verás un botón azul que dice **"📝 Editar Contenido"**
   - Haz clic ahí
   - ¡Ya estás en el editor!

### Opción 2: Acceso Directo

Si Alexei ya te dio acceso, ve directamente a:
- `http://localhost:5173/admin/content`

---

## 📋 ¿Qué Puedes Editar?

El editor te muestra **TODO** el contenido organizado en tarjetas bonitas:

### 👰🤵 **Información de los Novios**
- Tu nombre y apellidos
- Nombre y apellidos de Alexei

### 📰 **Titulares del Periódico**
- El titular grande de la portada
- Los subtítulos
- La bajada del titular principal

### 📅 **Fecha y Hora**
- Fecha completa de la boda
- Hora de inicio

### 📍 **Ubicaciones**
- **Iglesia:** Nombre, dirección, hora
- **Recepción:** Nombre, dirección, hora

### ❤️ **Historia de Amor**
- Todos los momentos importantes desde que se conocieron
- Cada evento tiene: fecha, título, y la historia
- Algunos tienen frases destacadas

### 📄 **Artículos del Periódico**
- Los 4 artículos que aparecen en la portada
- Cada uno tiene título y contenido

### 📖 **Cita Bíblica**
- El versículo de la Biblia
- La referencia (libro, capítulo, versículo)

### 👔 **Código de Vestimenta**
- Recomendaciones para las mujeres invitadas
- Recomendaciones para los hombres invitados

---

## ✏️ ¿Cómo Editar un Texto?

### Paso 1: Encuentra la sección
- Navega por las tarjetas de colores
- Cada tarjeta tiene un icono y título
- Ejemplo: 👰🤵 "Información de los Novios"

### Paso 2: Busca el elemento
- Dentro de cada tarjeta verás los elementos que puedes editar
- Ejemplo: "Bride" (Novia), "Groom" (Novio)

### Paso 3: Edita
- Haz clic en el botón azul **"Editar"**
- Se abrirá una ventana grande con el texto

### Paso 4: Modifica el contenido
Verás algo como esto:
```
{
  "name": "Estephanie",
  "fullName": "Estephanie Yucra Quispe"
}
```

**¿Cómo editarlo?**
- Solo cambia lo que está entre comillas DESPUÉS de los dos puntos (:)
- NO borres las comillas (")
- NO borres las llaves { }
- NO borres las comas (,)

**Ejemplo de cambio correcto:**
```
ANTES:
{
  "name": "Estephanie",
  "fullName": "Estephanie Yucra Quispe"
}

DESPUÉS:
{
  "name": "Stephy",
  "fullName": "Estephanie del Carmen Yucra Quispe"
}
```

### Paso 5: Guarda
- Revisa que todo se vea bien
- Haz clic en el botón azul **"✓ Guardar Cambios"**
- Verás un mensaje verde "✓ Cambios guardados exitosamente"
- ¡Listo! Se cerrará automáticamente

### Paso 6: Ver los cambios
- Haz clic en el botón **"👁️ Ver Sitio"** arriba a la derecha
- Se abrirá tu invitación en una nueva pestaña
- ¡Ya deberías ver tu cambio!

---

## 💡 Tips y Consejos

### ✅ Cosas que SÍ puedes hacer:
- Cambiar cualquier texto
- Usar tildes (á, é, í, ó, ú)
- Usar la letra ñ
- Usar signos de exclamación (¡!)
- Usar signos de interrogación (¿?)
- Hacer los textos más largos o más cortos

### ❌ Cosas que NO debes hacer:
- ❌ NO borrar las comillas (")
- ❌ NO borrar las llaves { } o corchetes [ ]
- ❌ NO borrar las comas (,)
- ❌ NO borrar los dos puntos (:)
- ❌ NO usar emojis (el sistema usa códigos especiales para eso)

### 🎯 Ejemplo completo de edición:

**Historia de Amor - Evento 1:**
```json
{
  "date": "Marzo 2016",
  "month": "MAR",
  "year": "2016",
  "title": "Amor a Primera Vista",
  "text": "En un día cualquiera de marzo, Alexei vio a Estephanie por primera vez.",
  "icon": "👀",
  "color": "rose",
  "order": 1
}
```

**¿Qué puedes cambiar?**
- `"date"`: La fecha que aparece
- `"title"`: El título del evento
- `"text"`: La historia completa (puedes escribir mucho aquí)
- `"month"`: El mes abreviado
- `"year"`: El año

**NO cambies:**
- `"icon"`: Este es el emoji (déjaselo a Alexei)
- `"color"`: El color de la tarjeta
- `"order"`: El orden en que aparece

---

## 🆘 Si Algo Sale Mal

### "Error: JSON inválido"
**¿Qué pasó?** Algo se borró por accidente.

**Solución:**
1. Revisa que todas las comillas estén cerradas
2. Revisa que todas las líneas (excepto la última) tengan coma al final
3. Si no encuentras el error, haz clic en "Cancelar"
4. Pídele ayuda a Alexei (él puede arreglarlo rápido)

### "Los cambios no se ven"
**Solución:**
1. Refresca la página de la invitación (F5 o Ctrl+R)
2. Si usas Chrome, presiona Ctrl+Shift+R (recarga forzada)
3. Cierra y abre la página de nuevo

### "No sé qué editar"
**Solución:**
1. Abre la invitación en otra pestaña: `http://localhost:5173/`
2. Lee todo con calma
3. Cuando encuentres algo que quieras cambiar, vuelve al editor
4. Busca ese texto en las secciones

---

## 📱 ¿Puedo Hacerlo desde el Celular?

¡Sí! Funciona perfectamente desde el celular:

1. Abre el navegador (Chrome, Safari, etc.)
2. Ve a la dirección que Alexei te dará
3. Inicia sesión
4. Todo funciona igual que en la computadora
5. La ventana de edición se adapta a tu pantalla

---

## 🎨 Colores de las Secciones

Para que las encuentres fácil:
- 🟦 **Azul oscuro:** Títulos de sección
- 🟦 **Azul claro:** Tarjetas editables
- 🟩 **Verde:** Mensaje de éxito (cuando guardas)
- 🟥 **Rojo:** Error (revisa el texto)

---

## 🎓 Videos de Ayuda (Si Alexei los graba)

1. **Cómo iniciar sesión**
2. **Cómo editar un texto simple**
3. **Cómo editar la historia de amor**
4. **Cómo revisar todos los cambios**

---

## 📞 ¿Necesitas Ayuda?

**No te preocupes si algo no sale, es completamente normal al principio.**

Contacta a Alexei y dile:
- ✅ Qué sección querías editar
- ✅ Qué texto querías cambiar
- ✅ Por qué texto lo quieres reemplazar
- ✅ Si viste algún mensaje de error

**Ejemplos de cómo pedir ayuda:**

> "Amor, quiero cambiar el título del evento de marzo 2016 de 'Amor a Primera Vista' a 'El Primer Encuentro'. ¿Me ayudas?"

> "Quiero que el artículo principal diga que nos conocimos en 2016 y comenzamos en 2022, ¿puedes cambiarlo?"

> "Me salió un error rojo cuando intenté guardar la cita bíblica. ¿Qué hago?"

---

## 🌟 ¡Importante!

- **Tómate tu tiempo:** No hay prisa, revisa con calma
- **Guarda seguido:** Cada vez que edites algo, guarda inmediatamente
- **Ver antes de publicar:** Revisa siempre en "Ver Sitio" cómo se ve
- **No tengas miedo:** Alexei puede deshacer cualquier cambio si algo no te gusta
- **Confía en ti:** ¡Tu opinión es la más importante! Es TU invitación 💕

---

## ✨ Checklist de Revisión

Antes de dar el visto bueno final, revisa:

- [ ] Nombres están correctos (sin errores de ortografía)
- [ ] Fechas y horas son correctas
- [ ] Direcciones están completas
- [ ] Historia de amor te gusta como quedó
- [ ] Artículos del periódico están bien redactados
- [ ] Cita bíblica es la que quieren
- [ ] Código de vestimenta es claro
- [ ] No hay tildes faltantes o sobrantes
- [ ] Todo se lee bien y natural

---

**¡Estamos aquí para ayudarte! Tu opinión es lo más valioso para que esta invitación sea perfecta. 💖**

---

_Última actualización: 19 de noviembre, 2024_
_Creado con amor por Alexei para Estephanie 💑_
