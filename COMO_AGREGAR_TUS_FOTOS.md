# 📸 Cómo Agregar Tus Propias Fotos

Actualmente el sistema usa fotos de ejemplo de Unsplash. Aquí te explico cómo reemplazarlas con tus fotos reales.

---

## 🎯 Opción 1: Subir a un CDN (Recomendado)

### A. Usar Cloudinary (Gratis)

1. **Crear cuenta gratis:**
   - Ve a https://cloudinary.com/users/register/free
   - Regístrate gratis (10GB de almacenamiento)

2. **Subir tus fotos:**
   - Click en "Media Library"
   - Arrastra y suelta tus fotos
   - Click en cada foto y copia la URL

3. **Reemplazar URLs en el código:**
   ```typescript
   // En src/templates/newspaper/components/landing/PhotoGallery.tsx
   const photos = [
     {
       id: 1,
       caption: "Primera foto juntos - 2023",
       url: "https://res.cloudinary.com/TU-CUENTA/image/upload/foto1.jpg" // ⬅️ Tu URL
     },
     // ... más fotos
   ];
   ```

### B. Usar Imgur (Gratis, más simple)

1. **Subir fotos:**
   - Ve a https://imgur.com/upload
   - Sube tus fotos (sin cuenta necesaria)
   - Copia el "Direct Link"

2. **Reemplazar URLs:**
   ```typescript
   url: "https://i.imgur.com/ABC123.jpg" // ⬅️ Tu link directo
   ```

---

## 📂 Opción 2: Usar la carpeta public/ (Más simple)

### Pasos:

1. **Crear carpeta de fotos:**
   ```bash
   mkdir -p public/photos
   ```

2. **Copiar tus fotos:**
   ```bash
   # Copia tus fotos a public/photos/
   # Ejemplo:
   cp ~/mis-fotos/boda1.jpg public/photos/
   cp ~/mis-fotos/boda2.jpg public/photos/
   # etc...
   ```

3. **Optimizar fotos (recomendado):**
   ```bash
   # Instalar herramienta de optimización
   npm install -g sharp-cli

   # Optimizar todas las fotos (reduce tamaño sin perder calidad)
   sharp -i public/photos/*.jpg -o public/photos/optimized/ --quality 80
   ```

4. **Actualizar las URLs:**
   ```typescript
   // En src/templates/newspaper/components/landing/PhotoGallery.tsx
   const photos = [
     {
       id: 1,
       caption: "Primera foto juntos - 2023",
       url: "/photos/boda1.jpg" // ⬅️ Ruta relativa
     },
     {
       id: 2,
       caption: "Viaje a Cusco",
       url: "/photos/boda2.jpg"
     },
     // ... más fotos
   ];
   ```

---

## 🖼️ Archivos a Editar

### 1. Galería de Fotos (Newspaper)
**Archivo:** `src/templates/newspaper/components/landing/PhotoGallery.tsx`

```typescript
const photos = [
  {
    id: 1,
    caption: "Tu caption personalizado",
    alt: "Descripción para accesibilidad",
    size: "large" as const,
    url: "TU_URL_AQUI" // ⬅️ Cambiar aquí
  },
  // ... 6 fotos en total
];
```

**Ubicaciones en la galería:**
- Foto 1: Grande destacada (arriba izquierda)
- Foto 2: Mediana (arriba derecha)
- Foto 3: Mediana (centro)
- Foto 4: Pequeña (medio izquierda)
- Foto 5: Pequeña (medio derecha)
- Foto 6: Grande destacada (abajo)

### 2. Foto de Portada Hero (Newspaper)
**Archivo:** `src/templates/newspaper/components/landing/Hero.tsx`

Busca la línea ~50:
```typescript
<img
  src="TU_URL_AQUI" // ⬅️ Cambiar aquí
  alt="Alexei y Estephanie"
  className="..."
/>
```

### 3. Background Hero Fluid
**Archivo:** `src/templates/fluid/components/landing/Hero.tsx`

Línea ~14:
```typescript
<img
  src="TU_URL_AQUI" // ⬅️ Imagen de fondo
  alt="Background"
  className="..."
/>
```

### 4. Background Hero Romantic
**Archivo:** `src/templates/romantic/components/landing/Hero.tsx`

Línea ~13:
```typescript
<img
  src="TU_URL_AQUI" // ⬅️ Imagen de fondo romántica
  alt="Romantic background"
  className="..."
/>
```

---

## 📏 Tamaños Recomendados

Para mejor rendimiento, usa estos tamaños:

| Uso | Tamaño Recomendado | Formato |
|-----|-------------------|---------|
| **Galería - Fotos grandes** | 800x600px | JPG |
| **Galería - Fotos medianas** | 400x500px | JPG |
| **Galería - Fotos pequeñas** | 400x300px | JPG |
| **Hero/Portada principal** | 800x1000px | JPG |
| **Backgrounds** | 1920x1080px | JPG |

**Calidad:** 80-85% (balance entre calidad y peso)

---

## 🛠️ Herramientas de Optimización

### Opción A: Online (Gratis)
- **TinyPNG**: https://tinypng.com (comprime sin perder calidad)
- **Squoosh**: https://squoosh.app (de Google, muy bueno)

### Opción B: CLI (Terminal)
```bash
# Instalar sharp-cli
npm install -g sharp-cli

# Redimensionar y optimizar
sharp -i foto.jpg -o foto-optimizada.jpg --resize 800 600 --quality 80
```

### Opción C: Batch (Múltiples fotos)
```bash
# Script para optimizar todas las fotos en una carpeta
for file in public/photos/*.jpg; do
  sharp -i "$file" -o "public/photos/optimized/$(basename "$file")" \
    --quality 80 --progressive
done
```

---

## 🎨 Tips de Fotos

### Para la Galería Newspaper:
- ✅ Fotos en **blanco y negro** o **colores suaves** (se aplica filtro grayscale)
- ✅ Fotos con **buena iluminación**
- ✅ **Variedad**: retratos, paisajes, momentos espontáneos
- ✅ **Orientaciones mixtas**: verticales y horizontales

### Para Hero/Portada:
- ✅ Foto **vertical** (mejor para portada)
- ✅ **Rostros centrados**
- ✅ **Buena resolución** (mínimo 800px de ancho)

### Para Backgrounds:
- ✅ Fotos **suaves y desenfocadas** (se usa como fondo)
- ✅ Colores **neutros o pasteles**
- ✅ **Alta resolución** (1920x1080 o más)

---

## ✅ Checklist

Después de agregar tus fotos:

- [ ] Fotos optimizadas (< 200KB cada una)
- [ ] URLs actualizadas en `PhotoGallery.tsx`
- [ ] URL de portada actualizada en `Hero.tsx` (Newspaper)
- [ ] Backgrounds actualizados (Fluid y Romantic)
- [ ] Probado localmente (`npm run dev`)
- [ ] Build exitoso (`npm run build`)
- [ ] Fotos visibles en todas las plantillas
- [ ] Hover effect funciona (color aparece al pasar mouse)

---

## 🚀 Deployment

**Importante:** Si usas la carpeta `public/`, tus fotos se deployarán automáticamente con Vercel/Netlify.

Si usas CDN (Cloudinary/Imgur), no hay configuración adicional - solo actualiza las URLs y haz push:

```bash
git add .
git commit -m "feat: Add real wedding photos"
git push
# Vercel/Netlify auto-deployará
```

---

## 🆘 Troubleshooting

### Fotos no se ven después de deployment
- Verifica que la carpeta `public/` esté en tu repositorio
- Si usas CDN, verifica que las URLs sean HTTPS
- Clear cache del navegador (Ctrl+Shift+R)

### Fotos muy pesadas (sitio lento)
- Comprime con TinyPNG o Squoosh
- Usa formato JPG en vez de PNG
- Reduce resolución a tamaños recomendados

### Error 404 en fotos
- Verifica que la ruta sea correcta: `/photos/nombre.jpg`
- No olvides el `/` inicial
- Case-sensitive: `Foto.jpg` ≠ `foto.jpg`

---

## 📝 Ejemplo Completo

```typescript
// src/templates/newspaper/components/landing/PhotoGallery.tsx
export function PhotoGallery() {
  const photos = [
    {
      id: 1,
      caption: "Nuestra primera cita en La Rosa Náutica - Lima",
      alt: "Alexei y Estephanie en La Rosa Náutica",
      size: "large" as const,
      url: "/photos/primera-cita.jpg" // ⬅️ Tu foto
    },
    {
      id: 2,
      caption: "Explorando Machu Picchu - Aventura de aniversario",
      alt: "En Machu Picchu",
      size: "medium" as const,
      url: "/photos/machu-picchu.jpg" // ⬅️ Tu foto
    },
    // ... continúa con tus 6 fotos
  ];

  // ... resto del componente
}
```

---

¡Listo! Ahora tu sitio tendrá tus fotos reales. 📸✨
