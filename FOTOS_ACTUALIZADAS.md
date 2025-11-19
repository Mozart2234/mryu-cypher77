# ✅ Tus Fotos Reales Ya Están Integradas

## 📸 Fotos Detectadas

He encontrado **8 fotos** en `public/photos/`:

```
_Z638761.jpg  (10 MB) - Foto 1
_Z638873.jpg  (8.0 MB) - Foto 2
_Z638874.jpg  (6.8 MB) - Foto 3
_Z638896.jpg  (4.8 MB) - Foto 4
_Z638955.jpg  (2.7 MB) - Foto 5
_Z639000.jpg  (3.3 MB) - Foto 6
_Z639061.jpg  (3.4 MB) - Foto 7
_Z639108.jpg  (5.4 MB) - Foto 8
```

## ✅ Archivos Actualizados

He reemplazado todas las URLs de Unsplash con tus fotos locales:

### 1. Galería Principal (Newspaper)
**Archivo:** `src/templates/newspaper/components/landing/PhotoGallery.tsx`

```typescript
const photos = [
  { url: "/photos/_Z638761.jpg" },  // Foto grande 1
  { url: "/photos/_Z638873.jpg" },  // Foto mediana 1
  { url: "/photos/_Z638874.jpg" },  // Foto mediana 2
  { url: "/photos/_Z638896.jpg" },  // Foto pequeña 1
  { url: "/photos/_Z638955.jpg" },  // Foto pequeña 2
  { url: "/photos/_Z639000.jpg" },  // Foto grande 2
];
```

### 2. Foto de Portada Hero (Newspaper)
**Archivo:** `src/templates/newspaper/components/landing/Hero.tsx`

```typescript
<img src="/photos/_Z639061.jpg" />  // Foto principal de portada
```

### 3. Background Hero (Fluid)
**Archivo:** `src/templates/fluid/components/landing/Hero.tsx`

```typescript
<img src="/photos/_Z639108.jpg" />  // Fondo Fluid
```

### 4. Background Hero (Romantic)
**Archivo:** `src/templates/romantic/components/landing/Hero.tsx`

```typescript
<img src="/photos/_Z638874.jpg" />  // Fondo Romantic
```

---

## ⚠️ IMPORTANTE: Optimizar Fotos

Tus fotos son muy pesadas (hasta 10MB). Esto hará que el sitio cargue lento.

### Opción 1: Script Automático (Recomendado)

```bash
# 1. Instalar ImageMagick (si no lo tienes)
brew install imagemagick

# 2. Ejecutar script de optimización
./optimize-photos.sh

# Esto creará versiones optimizadas en public/photos/optimized/
# Reducirá el tamaño ~80% sin perder calidad visible
```

### Opción 2: Manual Online

1. Ve a https://squoosh.app
2. Arrastra cada foto
3. Configura:
   - **Resize:** 2000px (ancho máximo)
   - **Quality:** 85%
   - **Format:** MozJPEG
4. Download
5. Reemplaza en `public/photos/`

### Opción 3: Usar las Optimizadas Automáticamente

Después de ejecutar el script, actualiza las rutas:

```bash
# Buscar y reemplazar en todos los archivos
find src/templates -name "*.tsx" -type f -exec sed -i '' 's|/photos/_Z|/photos/optimized/_Z|g' {} \;
```

---

## 🎯 Personalizar Captions (Opcional)

Puedes cambiar los textos de las fotos editando:

**Archivo:** `src/templates/newspaper/components/landing/PhotoGallery.tsx`

```typescript
const photos = [
  {
    id: 1,
    caption: "Tu caption personalizado aquí", // ⬅️ Cambiar
    alt: "Descripción de la foto",           // ⬅️ Cambiar
    url: "/photos/_Z638761.jpg"
  },
  // ... más fotos
];
```

**Sugerencias de captions:**
- "Nuestra primera cita en [lugar]"
- "Celebrando [ocasión] en [año]"
- "Viaje a [destino] - [descripción]"
- "El día que nos comprometimos"
- etc.

---

## 🧪 Probar que Funciona

```bash
# Iniciar servidor
npm run dev

# Abrir http://localhost:5173

# Deberías ver:
# ✅ Tus fotos en la galería
# ✅ Tu foto en portada Hero
# ✅ Fondos con tus fotos (temas Fluid y Romantic)
```

---

## 📊 Comparación de Tamaños

### Antes (Unsplash):
- URLs externas
- Optimizadas automáticamente
- Carga rápida ⚡

### Ahora (Tus fotos sin optimizar):
- Locales en public/photos/
- **Muy pesadas** (10MB+) 🐌
- **Carga lenta**

### Después de optimizar:
- Locales en public/photos/optimized/
- Reducidas ~80%
- Carga rápida ⚡

**Ejemplo:**
```
Antes:  _Z638761.jpg = 10 MB
Después: _Z638761.jpg = ~1-2 MB (mismo aspecto visual)
```

---

## 🚀 Deployment

Las fotos en `public/` se deployarán automáticamente con Vercel/Netlify.

**IMPORTANTE:** Optimiza antes de deployar para mejor rendimiento.

```bash
# 1. Optimizar fotos
./optimize-photos.sh

# 2. Actualizar rutas a /optimized/
find src/templates -name "*.tsx" -exec sed -i '' 's|/photos/_Z|/photos/optimized/_Z|g' {} \;

# 3. Commit y push
git add .
git commit -m "feat: Add optimized wedding photos"
git push

# Vercel/Netlify auto-deploya
```

---

## 📸 Distribución Actual de Fotos

| Foto | Uso | Ubicación |
|------|-----|-----------|
| `_Z638761.jpg` | Galería - Grande 1 | Newspaper PhotoGallery |
| `_Z638873.jpg` | Galería - Mediana 1 | Newspaper PhotoGallery |
| `_Z638874.jpg` | Galería - Mediana 2 + Background | Newspaper + Romantic Hero |
| `_Z638896.jpg` | Galería - Pequeña 1 | Newspaper PhotoGallery |
| `_Z638955.jpg` | Galería - Pequeña 2 | Newspaper PhotoGallery |
| `_Z639000.jpg` | Galería - Grande 2 | Newspaper PhotoGallery |
| `_Z639061.jpg` | Portada Principal | Newspaper Hero |
| `_Z639108.jpg` | Background | Fluid Hero |

---

## 🔄 Agregar Más Fotos

Si quieres agregar más fotos:

1. **Agregar a la galería:**
   ```typescript
   // En PhotoGallery.tsx
   const photos = [
     // ... fotos existentes
     {
       id: 7,
       caption: "Nueva foto",
       url: "/photos/nueva-foto.jpg"
     }
   ];
   ```

2. **Cambiar foto de portada:**
   ```typescript
   // En Hero.tsx
   <img src="/photos/otra-foto.jpg" />
   ```

---

## ✅ Checklist

- [x] 8 fotos integradas
- [x] Galería actualizada (6 fotos)
- [x] Portada actualizada
- [x] Backgrounds actualizados (Fluid + Romantic)
- [ ] **Optimizar fotos** (`./optimize-photos.sh`)
- [ ] Probar localmente (`npm run dev`)
- [ ] Personalizar captions (opcional)
- [ ] Deploy a producción

---

¡Tus fotos reales ya están en el sitio! 🎉

**Próximo paso crítico:** Optimizar fotos para mejor rendimiento.
