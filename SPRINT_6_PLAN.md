# 📰 SPRINT 6: Autenticidad Newspaper - Plan de Implementación

**Objetivo:** Mejorar la autenticidad del diseño tipo periódico de 7.0/10 a 9.5/10

**Duración estimada:** ~1.5 horas (90 minutos)

---

## 📊 Estado Actual vs Objetivo

| Aspecto | Actual | Objetivo | Gap |
|---------|--------|----------|-----|
| **Tipografía** | 7/10 | 10/10 | +3 |
| **Layout/Columnas** | 6/10 | 10/10 | +4 |
| **Elementos decorativos** | 7/10 | 10/10 | +3 |
| **Autenticidad editorial** | 6/10 | 10/10 | +4 |
| **Densidad visual** | 5/10 | 10/10 | +5 |
| **Color/Grayscale** | 9/10 | 10/10 | +1 |
| **Bordes y divisores** | 9/10 | 10/10 | +1 |
| **TOTAL** | **7.0/10** | **9.5/10** | **+2.5** |

---

## 🎯 NIVEL 1: Mejoras Rápidas y Alto Impacto (45 min)

### ✅ Task 1: Kicker + Deck en Hero (5 min) → +0.5 puntos

**¿Qué es?**
- **Kicker**: Texto pequeño SOBRE el titular principal
- **Deck**: Subtítulo descriptivo entre título y cuerpo

**Diseño:**
```
┌────────────────────────────────┐
│   EDICIÓN ESPECIAL MATRIMONIO  │ ← KICKER
│                                │
│   ALEXEI Y ESTEPHANIE          │ ← HEADLINE
│                                │
│   Tras 10 años de relación,    │ ← DECK
│   la pareja sella su amor...   │
└────────────────────────────────┘
```

**Archivo:** `src/templates/newspaper/components/landing/Hero.tsx`

**Implementación:**
```tsx
{/* ANTES del h1 */}
<p className="newspaper-kicker text-xs uppercase tracking-widest text-newspaper-gray-600 mb-2">
  Edición Especial Matrimonio
</p>

<h1 className="newspaper-headline mb-4">
  {groom.name} y {bride.name}
</h1>

{/* DESPUÉS del h1 */}
<p className="newspaper-deck text-lg md:text-xl font-serif italic text-newspaper-gray-700 max-w-2xl mx-auto">
  Tras 10 años de relación, la pareja sella su amor ante Dios y la familia
</p>
```

**CSS necesario:** (agregar a `index.css`)
```css
@utility newspaper-kicker {
  @apply text-xs font-sans font-bold uppercase tracking-widest text-newspaper-gray-600 border-t border-b border-newspaper-gray-400 py-1 inline-block px-3;
}

@utility newspaper-deck {
  @apply text-lg md:text-xl font-serif italic text-newspaper-gray-700 leading-relaxed;
}
```

---

### ✅ Task 2: Bylines en artículos (10 min) → +0.3 puntos

**¿Qué es?** Línea con autor del artículo (ej: "Por Redacción Especial")

**Diseño:**
```
┌────────────────────────────────┐
│  Confirmación oficial          │ ← Título
│  Por Redacción Especial        │ ← BYLINE
│                                │
│  Alexei y Estephanie unirán... │ ← Cuerpo
└────────────────────────────────┘
```

**Archivos a modificar:**
- `Hero.tsx` (artículos en grid)
- `Advertisement.tsx` (si tiene artículos)
- `LoveStory.tsx` (opcional en timeline)

**Implementación:**
```tsx
<div className="newspaper-article">
  <h4 className="newspaper-title mb-2">
    {article.title}
  </h4>

  {/* NUEVO: Byline */}
  <p className="newspaper-byline mb-3">
    Por Redacción Especial
  </p>

  <p className="newspaper-body">
    {article.content}
  </p>
</div>
```

**CSS necesario:**
```css
@utility newspaper-byline {
  @apply text-xs font-sans uppercase tracking-wider text-newspaper-gray-600 border-l-2 border-newspaper-black pl-2;
}
```

---

### ✅ Task 3: Column Rules (5 min) → +0.4 puntos

**¿Qué es?** Líneas verticales entre columnas de texto

**Diseño:**
```
┌─────────┬─────────┬─────────┐
│ Texto   │ Texto   │ Texto   │
│ columna │ columna │ columna │
│ 1       │ 2       │ 3       │
└─────────┴─────────┴─────────┘
         ↑         ↑
    Column rules
```

**Archivo:** `index.css`

**Implementación:**
```css
/* Agregar utilidad para columnas con separadores */
@utility newspaper-columns-2 {
  @apply columns-2 gap-6;
  column-rule: 1px solid theme('colors.newspaper-gray.300');
}

@utility newspaper-columns-3 {
  @apply columns-3 gap-6;
  column-rule: 1px solid theme('colors.newspaper-gray.300');
}
```

**Uso en componentes:**
```tsx
{/* Para artículos largos */}
<p className="newspaper-body newspaper-columns-2 md:newspaper-columns-3">
  {longArticleText}
</p>
```

---

### ✅ Task 4: Folio Numbers (10 min) → +0.3 puntos

**¿Qué es?** Números de página en footer de cada sección

**Diseño:**
```
┌────────────────────────────────┐
│  [Contenido de la sección]     │
│                                │
│                                │
└────────────────────────────────┘
        Página 3 • Sección Bodas    ← FOLIO
```

**Archivos a modificar:**
- Todas las secciones principales (Hero, EventDetails, LoveStory, etc.)

**Implementación:**
```tsx
{/* Al final de cada <section> */}
<div className="newspaper-folio">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs font-sans uppercase tracking-wider text-newspaper-gray-600">
    <span>Página {pageNumber}</span>
    <span>•</span>
    <span>Sección: {sectionName}</span>
    <span>•</span>
    <span>{eventConfig.date.full}</span>
  </div>
</div>
```

**CSS necesario:**
```css
@utility newspaper-folio {
  @apply border-t border-newspaper-gray-300 bg-newspaper-gray-50 mt-12;
}
```

**Sistema de numeración:**
- Hero: Página 1
- EventDetails: Página 2
- LoveStory: Página 3-4
- PhotoGallery: Página 5
- DressCode: Página 6
- FAQ: Página 7

---

## 🚀 NIVEL 2: Mejoras de Impacto Medio (45 min)

### ✅ Task 5: Pull Quotes en LoveStory (15 min) → +0.5 puntos

**¿Qué es?** Citas destacadas dentro del artículo (flotantes)

**Diseño:**
```
┌────────────────────────────────┐
│  Texto del artículo...         │
│  ┌──────────────────┐          │
│  │ "El amor verdade-│ ← PULL   │
│  │  ro vale la      │   QUOTE  │
│  │  espera"         │          │
│  └──────────────────┘          │
│  ...continúa el texto          │
└────────────────────────────────┘
```

**Archivo:** `LoveStory.tsx`

**Implementación:**
Agregar quotes destacadas a ciertos eventos del timeline:

```tsx
{/* Dentro de TimelineItem, después del texto */}
{event.quote && (
  <blockquote className="newspaper-pull-quote">
    "{event.quote}"
  </blockquote>
)}
```

**CSS necesario:**
```css
@utility newspaper-pull-quote {
  @apply border-l-4 border-newspaper-black bg-newspaper-gray-50 p-4 my-4 italic text-lg font-serif text-newspaper-black;
}

@media (min-width: 768px) {
  .newspaper-pull-quote {
    @apply float-right ml-6 mb-4 max-w-xs;
  }
}
```

**Agregar quotes a eventConfig.ts:**
```typescript
{
  date: "Agosto 2024",
  title: "La Gran Pregunta",
  text: "...",
  quote: "¿Quieres casarte conmigo?" // ← NUEVO
}
```

---

### ✅ Task 6: Multi-column text (20 min) → +0.6 puntos

**¿Qué es?** Artículos con texto en 2-3 columnas estrechas (como periódico real)

**Diseño:**
```
Real newspaper layout:
┌──────┬──────┬──────┐
│Lorem │ipsum │dolor │
│ipsum │dolor │sit   │
│dolor │sit   │amet  │
│sit   │amet  │...   │
└──────┴──────┴──────┘
```

**Archivos a modificar:**
- `Hero.tsx` (artículo principal)
- `Advertisement.tsx` (artículos)
- Sección de "Editorial de cierre" en `LoveStory.tsx`

**Implementación:**
```tsx
{/* Para artículos de más de 200 palabras */}
<p className="newspaper-body newspaper-columns-2 md:newspaper-columns-3 text-justify">
  {articles[1].content}
</p>
```

**Reglas de uso:**
- 1 columna: < 100 palabras
- 2 columnas: 100-300 palabras
- 3 columnas: > 300 palabras

---

### ✅ Task 7: Densificar layout (10 min) → +0.4 puntos

**¿Qué es?** Reducir espaciado para que parezca más periódico (denso pero legible)

**Problema actual:** Demasiado "aire" (padding/margin generoso)

**Cambios globales en `index.css`:**

```css
/* Ajustar clases base de newspaper */
@utility newspaper-page {
  /* Reducir padding de 3rem a 2rem */
  @apply py-8 px-4 md:py-10 md:px-6; /* antes: py-12 px-8 */
}

@utility newspaper-box {
  /* Reducir padding interno */
  @apply border-2 border-newspaper-black p-4 bg-white; /* antes: p-6 */
}

@utility newspaper-article {
  /* Reducir margin bottom */
  @apply mb-4; /* antes: mb-6 */
}

/* Reducir espaciado en grids */
.newspaper-grid {
  @apply gap-4 md:gap-5; /* antes: gap-6 */
}
```

**Archivos a revisar:**
- `Hero.tsx` - reducir `gap-6` a `gap-4`
- `EventDetails.tsx` - reducir `py-12` a `py-8`
- `LoveStory.tsx` - reducir `space-y-12` a `space-y-8`

---

## 📝 NIVEL 3: Opcional (Futuro)

Estas mejoras no se implementarán en este sprint, pero quedan documentadas:

### Task 8: Tipografía condensada
- Agregar Google Font: "Roboto Condensed" o "Oswald"
- Usar para subtítulos y kickers

### Task 9: Index box
- Tabla de contenidos con números de página
- Ubicación: después del header principal

### Task 10: Weather strip completo
- Pronóstico extendido de 5 días
- Iconos de clima

### Task 11: Classified ads section
- Sección de anuncios clasificados al final
- Formato compacto tipo periódico

---

## 📦 Estructura de Archivos a Modificar

```
src/
├── index.css                    ← CSS utilities nuevas
├── templates/newspaper/
│   └── components/landing/
│       ├── Hero.tsx             ← Kicker, Deck, Bylines
│       ├── EventDetails.tsx     ← Folio numbers
│       ├── LoveStory.tsx        ← Pull quotes, Multi-column
│       ├── PhotoGallery.tsx     ← Folio numbers
│       ├── DressCode.tsx        ← Folio numbers
│       └── Advertisement.tsx    ← Bylines, Multi-column
└── config/
    └── eventConfig.ts           ← Agregar quotes a timeline
```

---

## 🎨 Nuevas Utilidades CSS a Crear

```css
/* 1. Tipografía editorial */
.newspaper-kicker
.newspaper-deck
.newspaper-byline

/* 2. Layout columnas */
.newspaper-columns-2
.newspaper-columns-3

/* 3. Elementos destacados */
.newspaper-pull-quote
.newspaper-folio

/* 4. Ajustes de densidad */
.newspaper-page (modificar)
.newspaper-box (modificar)
.newspaper-article (modificar)
```

---

## ✅ Checklist de Implementación

### Pre-implementación
- [ ] Leer este plan completo
- [ ] Hacer backup del código actual
- [ ] Crear branch: `feature/newspaper-authenticity`

### Nivel 1 (Prioritario)
- [ ] Task 1: Kicker + Deck (5 min)
- [ ] Task 2: Bylines (10 min)
- [ ] Task 3: Column Rules (5 min)
- [ ] Task 4: Folio Numbers (10 min)

### Nivel 2 (Secundario)
- [ ] Task 5: Pull Quotes (15 min)
- [ ] Task 6: Multi-column text (20 min)
- [ ] Task 7: Densificar layout (10 min)

### Post-implementación
- [ ] Verificar build: `npm run build`
- [ ] Revisar responsive (mobile/tablet/desktop)
- [ ] Comparar con periódicos reales (New York Times, The Guardian)
- [ ] Hacer commit descriptivo
- [ ] NO hacer push a producción (esperar aprobación)

---

## 📊 Métricas de Éxito

| Métrica | Antes | Meta | Cómo medir |
|---------|-------|------|------------|
| Score autenticidad | 7.0/10 | 9.5/10 | Comparación visual con periódicos reales |
| Densidad de contenido | Bajo | Medio-Alto | Contenido visible en viewport inicial |
| Elementos editoriales | 6 | 12+ | Kicker, deck, byline, folio, pull quote, etc. |
| Jerarquía visual | Bueno | Excelente | Distinción clara entre niveles de título |

---

## 🔍 Referencias Visuales

**Periódicos para inspiración:**
- New York Times (formato clásico)
- The Guardian (tipografía moderna)
- The Times (UK) (layout tradicional)
- Wall Street Journal (densidad alta)

**Elementos clave a imitar:**
- ✅ Jerarquía tipográfica clara
- ✅ Columnas estrechas de texto
- ✅ Metadata editorial (bylines, folios)
- ✅ Elementos destacados (pull quotes, boxes)
- ✅ Densidad visual controlada

---

## 📅 Cronograma Sugerido

**Sesión 1: Nivel 1 (45 min)**
- 0:00-0:05 → Task 1: Kicker + Deck
- 0:05-0:15 → Task 2: Bylines
- 0:15-0:20 → Task 3: Column Rules
- 0:20-0:30 → Task 4: Folio Numbers
- 0:30-0:45 → Testing y ajustes

**Sesión 2: Nivel 2 (45 min)**
- 0:00-0:15 → Task 5: Pull Quotes
- 0:15-0:35 → Task 6: Multi-column text
- 0:35-0:45 → Task 7: Densificar layout

**Sesión 3: Review (30 min)**
- 0:00-0:15 → Testing completo
- 0:15-0:25 → Ajustes finales
- 0:25-0:30 → Commit y documentación

---

## 🚨 Notas Importantes

1. **NO modificar funcionalidad:** Solo cambios visuales
2. **Mantener responsive:** Todo debe funcionar en móvil
3. **Preservar accesibilidad:** Contraste WCAG AA
4. **Build exitoso:** Verificar antes de commit
5. **NO push a producción:** Solo commit local hasta aprobación

---

**Última actualización:** 2025-11-19
**Autor:** Claude Code (Sonnet 4.5)
**Status:** ✅ Plan completo - Listo para implementación
