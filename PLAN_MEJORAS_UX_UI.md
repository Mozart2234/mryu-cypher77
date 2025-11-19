# Plan de Mejoras UX/UI - Landing Page Wedding Reservation

**Fecha:** 2025-11-19
**Objetivo:** Mejorar la experiencia de usuario y diseño visual de la landing page tipo periódico

---

## ✅ SPRINT 1: MEJORAS CRÍTICAS (COMPLETADO)

### 1. ✅ Sistema de CTAs y Conversión
**Problema:** No había forma clara de que los invitados accedan a su invitación digital

**Solución implementada:**
- ✅ Botón CTA flotante sticky (bottom-right, dismissible)
- ✅ Modal de búsqueda de invitación con validación de código
- ✅ 2 secciones CTA estratégicas:
  - Primary después del Hero (fondo negro)
  - Secondary antes del cierre (fondo gris)

**Archivos creados:**
- `src/templates/newspaper/components/landing/FloatingCTA.tsx`
- `src/templates/newspaper/components/landing/InvitationSearchModal.tsx`
- `src/templates/newspaper/components/landing/CTASection.tsx`

**Archivos modificados:**
- `src/templates/newspaper/Landing.tsx`

---

### 2. ✅ Navegación Sticky
**Problema:** Página larga sin navegación, difícil volver a secciones anteriores

**Solución implementada:**
- ✅ Barra de navegación que aparece después de 100px de scroll
- ✅ Detección automática de sección activa
- ✅ Smooth scroll a secciones con offset para el sticky header
- ✅ Menú móvil responsive con hamburger
- ✅ Botón "back to top" que aparece después de 400px
- ✅ Links a secciones: Inicio, Detalles, Historia, Fotos, Dress Code

**Archivos creados:**
- `src/templates/newspaper/components/landing/StickyNav.tsx`

**Archivos modificados:**
- `src/templates/newspaper/Landing.tsx` (agregado section IDs)
- `src/index.css` (agregado `scroll-behavior: smooth`)

---

### 3. ✅ Sistema de Espaciado Unificado
**Problema:** Inconsistencia en espaciados (6 valores diferentes de max-width, padding variado)

**Solución implementada:**
- ✅ PageSeparator reducido de `py-8` a `py-4` (ahorra 224px de scroll total)
- ✅ Todas las secciones principales con `py-12` consistente
- ✅ Max-width estandarizado a `max-w-7xl` en todos los componentes
- ✅ Gaps de grids unificados a `gap-6`

**Archivos modificados:**
- `src/templates/newspaper/Landing.tsx` (PageSeparator)
- `src/templates/newspaper/components/landing/Hero.tsx`
- `src/templates/newspaper/components/landing/EventDetails.tsx`
- `src/templates/newspaper/components/landing/Advertisement.tsx`
- `src/templates/newspaper/components/landing/LoveStory.tsx`
- `src/templates/newspaper/components/landing/PhotoGallery.tsx`
- `src/templates/newspaper/components/landing/DressCode.tsx`
- `src/templates/newspaper/components/landing/ThankYou.tsx`

---

### 4. ✅ Jerarquía de Bordes Estandarizada
**Problema:** Uso inconsistente de border-4 en muchos elementos, falta jerarquía visual

**Solución implementada:**
- ✅ **4px (`border-4`)**: Solo Countdown y CTASection (elementos MÁS destacados)
- ✅ **2px (`border-2`)**: Boxes importantes, fotos destacadas, botones principales, timeline cards
- ✅ **1px (`border`)**: Dividers sutiles, fotos medianas/pequeñas, borders secundarios

**Archivos modificados:**
- `src/templates/newspaper/components/landing/LoveStory.tsx`
  - Timeline cards: `border-4` → `border-2`
  - Puntos timeline: `border-4` → `border-2`
  - Cita bíblica box: `border-4` → `border-2`
- `src/templates/newspaper/components/landing/DressCode.tsx`
  - Cajas dress code: `border-4` → `border-2`
  - Footers: `border-t-4` → `border-t-2`
  - Listas con viñetas: `border-l-4` → `border-l-2`
  - Nota editorial: `border-4` → `border-2`
- `src/templates/newspaper/components/landing/PhotoGallery.tsx`
  - Fotos destacadas grandes: `border-4` → `border-2`
  - Fotos medianas: `border-2` → `border` (1px)
  - Fotos pequeñas: `border-2` → `border` (1px)

---

## ✅ SPRINT 2: MEJORAS VISUALES (COMPLETADO)

### 5. ✅ Color de Acento (COMPLETADO)
**Problema:** Color de acento (#8b4513) definido pero nunca usado

**Solución implementada:**
- ✅ Navegación sticky: sección activa usa `bg-newspaper-accent`
- ✅ FloatingCTA: hover cambia a color acento
- ✅ Timeline LoveStory: punto del evento destacado usa color acento con animación pulse
- ✅ Agregada animación `pulse-ring` para elemento destacado

**Archivos modificados:**
- `src/templates/newspaper/components/landing/StickyNav.tsx`
- `src/templates/newspaper/components/landing/LoveStory.tsx`
- `src/templates/newspaper/components/landing/FloatingCTA.tsx`
- `src/index.css` (agregada animación pulseRing)

---

### 6. ✅ Tipografía Estricta (COMPLETADO)
**Problema:** Mezcla de clases Tailwind con utility classes personalizadas

**Solución implementada:**
- ✅ Reemplazado clases ad-hoc con utility classes:
  - `text-4xl md:text-5xl` → `newspaper-subheadline`
  - `font-headline text-xl font-bold` → `newspaper-title`
  - `font-sans text-base md:text-lg` → `newspaper-body`
  - `font-sans text-sm` → `newspaper-meta`
- ✅ Eliminadas clases redundantes como `text-base leading-relaxed` (ya incluido en newspaper-body)
- ✅ Mantenida consistencia visual usando utility classes predefinidas

**Archivos modificados:**
- `src/templates/newspaper/components/landing/DressCode.tsx`
- `src/templates/newspaper/components/landing/LoveStory.tsx`
- `src/templates/newspaper/components/landing/ThankYou.tsx`
- `src/templates/newspaper/components/landing/CTASection.tsx`

---

### 7. ✅ Accesibilidad WCAG AA (COMPLETADO)
**Problema:** Falta de atributos de accesibilidad en varios elementos

**Solución implementada:**
- ✅ Agregados `aria-label` a todos los botones con solo iconos
- ✅ Agregados `aria-hidden="true"` a iconos decorativos
- ✅ Implementado `role="dialog"` y `aria-modal="true"` en modal
- ✅ Agregados `aria-labelledby` y `aria-describedby` para relaciones
- ✅ Implementado focus trap en modal con manejo de ESC
- ✅ Agregados focus states visibles con `focus:ring` en todos los elementos interactivos
- ✅ Implementado `aria-invalid` y `role="alert"` para mensajes de error
- ✅ Agregado `aria-current="page"` para navegación activa
- ✅ Agregado `aria-expanded` y `aria-controls` para menú móvil
- ✅ Convertidos divs a elementos semánticos `<figure>` y `<figcaption>` en galería
- ✅ Asegurada navegación completa por teclado (Tab, Shift+Tab, ESC)

**Archivos modificados:**
- `src/templates/newspaper/components/landing/FloatingCTA.tsx`
- `src/templates/newspaper/components/landing/InvitationSearchModal.tsx`
- `src/templates/newspaper/components/landing/StickyNav.tsx`
- `src/templates/newspaper/components/landing/PhotoGallery.tsx`

---

### 8. ✅ Hover States Consistentes (COMPLETADO)
**Problema:** Algunos elementos tienen hover, otros no; efectos inconsistentes

**Solución implementada:**
- ✅ Estandarizados hover states:
  - Botones: `hover:scale-105` + `hover:shadow-lg` / `hover:shadow-xl`
  - Cards/boxes: `hover:shadow-xl` + `transition-all duration-300`
  - Fotos galería: `grayscale` → `group-hover:grayscale-0` + `group-hover:scale-105`
  - Artículos Hero: `hover:bg-newspaper-gray-100` + `hover:shadow-md`
  - Boxes Advertisement: `hover:shadow-xl`
  - Cards DressCode: `hover:shadow-2xl` + `hover:scale-[1.02]`
- ✅ Transitions uniformes: `transition-all duration-300`

**Archivos modificados:**
- `src/templates/newspaper/components/landing/PhotoGallery.tsx`
- `src/templates/newspaper/components/landing/Hero.tsx`
- `src/templates/newspaper/components/landing/Advertisement.tsx`
- `src/templates/newspaper/components/landing/DressCode.tsx`

---

## ✅ SPRINT 3: OPTIMIZACIÓN TÉCNICA (COMPLETADO - 3/3)

### 9. ✅ Optimización Mobile (COMPLETADO)
**Problema:** Espaciados y tamaños de fuente no optimizados para móvil

**Solución implementada:**
- ✅ Reducido padding en móvil: `py-8 md:py-12` en lugar de `py-12` uniforme
- ✅ Ajustados tamaños de fuente con responsive classes:
  - Títulos: `text-2xl md:text-5xl`
  - Subtítulos: `text-lg md:text-xl`
  - Body: `text-sm md:text-base`
  - Meta: `text-xs md:text-sm`
- ✅ Optimizado grid del countdown:
  - Padding reducido: `p-4 md:p-8`
  - Números más pequeños: `text-4xl md:text-7xl`
  - Gap reducido: `gap-3 md:gap-8`
- ✅ Optimizados espaciados internos:
  - Margins: `mb-3 md:mb-4`, `mb-4 md:mb-6`, `mb-6 md:mb-8`
  - Gaps: `gap-3 md:gap-4`, `gap-4 md:gap-6`
- ✅ Agregado `leading-tight` y `leading-snug` para mejor legibilidad
- ✅ Fechas grandes optimizadas: `text-5xl md:text-8xl`

**Archivos modificados:**
- `src/templates/newspaper/components/landing/Countdown.tsx`
- `src/templates/newspaper/components/landing/EventDetails.tsx`

---

### 10. ✅ Performance (COMPLETADO)
**Problema:** Bundle size grande (892 KB), muchas fuentes cargadas, sin code splitting

**Solución implementada:**
- ✅ **Optimización de fuentes** (index.html):
  - Reducido de 11 familias a 3 (Playfair Display, Libre Baskerville, Inter)
  - Reducido pesos de 300-900 a solo 400, 600, 700
  - Agregado `&display=swap` para mejor FCP
- ✅ **Code splitting con manual chunks** (vite.config.ts):
  - vendor-react: React core (45.59 KB gzipped)
  - vendor-qr: Librerías QR (351.61 KB gzipped) - carga diferida
  - vendor-supabase: Backend (176.07 KB gzipped) - carga diferida
- ✅ **Lazy loading de rutas** (App.tsx):
  - AdminDashboard, Login, CheckIn, GuestList cargados bajo demanda
  - Landing e InvitationPass permanecen en bundle principal (críticos)
  - Suspense boundary con spinner de carga
- ✅ **Lazy loading de imágenes**: Ya implementado con `loading="lazy"` en PhotoGallery

**Resultados (antes → después):**
- **Bundle principal**: 892 KB → **271 KB** (-70% reducción)
- **Gzipped principal**: 258 KB → **79 KB** (-69% reducción)
- **Chunks adicionales**: Se cargan solo cuando se necesitan
- **Sin warnings** de tamaño de chunks

**Archivos modificados:**
- `index.html` (optimización de fuentes)
- `vite.config.ts` (configuración de manual chunks)
- `src/App.tsx` (lazy loading de rutas con Suspense)

---

### 11. ✅ SEO y Meta Tags (COMPLETADO)
**Problema:** Faltan meta tags importantes para compartir en redes sociales

**Solución implementada:**
- ✅ Agregados Open Graph tags completos (type, url, title, description, image, locale)
- ✅ Agregados Twitter Card tags (card, url, title, description, image)
- ✅ Meta description optimizada para SEO
- ✅ Meta keywords relevantes
- ✅ Meta author
- ✅ Canonical URL
- ✅ Structured data (JSON-LD) completo para evento:
  - Event type con startDate y endDate
  - EventStatus y EventAttendanceMode
  - Location con address postal completa
  - Organizer y performers
- ✅ Título optimizado con formato SEO-friendly

**Archivos modificados:**
- `index.html` (agregados 37 líneas de meta tags y structured data)

---

## 📋 SPRINT 4: FUNCIONALIDADES ADICIONALES (EN PROGRESO - 3/4)

### 12. ✅ FAQ Section (COMPLETADO)
**Problema:** Invitados pueden tener dudas comunes sin respuesta

**Solución implementada:**
- ✅ Creado componente FAQ con diseño accordion estilo periódico
- ✅ 8 preguntas frecuentes cubriendo temas clave:
  - Código de vestimenta
  - Estacionamiento
  - Horarios y puntualidad
  - Política de niños
  - Confirmación de asistencia
  - Lista de regalos
  - Transporte
  - Cancelaciones
- ✅ Accordion interactivo con animaciones suaves
- ✅ Números estilo periódico para cada pregunta
- ✅ Primer pregunta abierta por defecto
- ✅ Nota editorial al final con contacto
- ✅ Agregado al menú de navegación sticky
- ✅ Accesibilidad completa (aria-expanded, aria-controls, keyboard navigation)

**Archivos creados:**
- `src/templates/newspaper/components/landing/FAQ.tsx`

**Archivos modificados:**
- `src/templates/newspaper/Landing.tsx` (import + sección FAQ)
- `src/templates/newspaper/components/landing/StickyNav.tsx` (agregado link FAQ)

---

### 13. ✅ Lightbox para Galería (COMPLETADO)
**Problema:** Fotos no se pueden ver en tamaño completo

**Solución implementada:**
- ✅ Creado componente Lightbox con diseño full-screen estilo modal
- ✅ Navegación entre fotos con botones prev/next
- ✅ Contador de fotos (ej: "1 / 6")
- ✅ Botón cerrar (top-right)
- ✅ Navegación por teclado:
  - ESC para cerrar
  - Arrow Left/Right para navegar
- ✅ Gestos táctiles en móvil:
  - Swipe left/right para navegar
  - Threshold de 50px para activar swipe
- ✅ Click en backdrop para cerrar
- ✅ Prevención de scroll del body cuando está abierto
- ✅ Todas las 6 fotos de la galería ahora son clickeables
- ✅ Accesibilidad completa:
  - role="dialog", aria-modal="true"
  - aria-labelledby para caption
  - Focus management
  - Keyboard navigation
- ✅ Botones de navegación deshabilitados en primera/última foto
- ✅ Hint visual en móvil: "Desliza para navegar"
- ✅ Animación fade-in al abrir

**Archivos creados:**
- `src/templates/newspaper/components/landing/Lightbox.tsx`

**Archivos modificados:**
- `src/templates/newspaper/components/landing/PhotoGallery.tsx` (integración de Lightbox con state management y click handlers)

---

### 14. ✅ Animaciones Sutiles (COMPLETADO)
**Problema:** Página estática, falta dinamismo

**Solución implementada:**
- ✅ Creado hook personalizado `useScrollAnimation` con Intersection Observer
- ✅ Animaciones fade-in al hacer scroll aplicadas a todas las secciones principales:
  - EventDetails
  - LoveStory
  - PhotoGallery
  - DressCode
  - FAQ
- ✅ Transiciones muy sutiles: **700ms** duration con **ease-out**
- ✅ Desplazamiento mínimo: **4px** translateY (muy sutil, no invasivo)
- ✅ Trigger once: animación se ejecuta una sola vez al entrar al viewport
- ✅ Threshold y rootMargin configurables
- ✅ Animaciones ya existentes preservadas:
  - Countdown pulse (ya existía)
  - Timeline animations (ya existían)
  - Hover effects (ya existían)
- ✅ **Parallax removido**: Se eliminó el efecto parallax que causaba bugs en galería

**Archivos creados:**
- `src/hooks/useScrollAnimation.ts`

**Archivos modificados:**
- `src/templates/newspaper/components/landing/EventDetails.tsx` (fade-in sutil)
- `src/templates/newspaper/components/landing/LoveStory.tsx` (fade-in sutil)
- `src/templates/newspaper/components/landing/PhotoGallery.tsx` (fade-in sutil)
- `src/templates/newspaper/components/landing/DressCode.tsx` (fade-in sutil)
- `src/templates/newspaper/components/landing/FAQ.tsx` (fade-in sutil)

---

### 15. ⏳ Social Sharing
**Problema:** No hay forma de compartir la invitación en redes

**Solución propuesta:**
- Botones de compartir en redes sociales
- Share API nativa en móvil
- Copy link to clipboard

**Archivos a crear:**
- `src/templates/newspaper/components/landing/SocialShare.tsx`

---

## 📋 SPRINT 5: POLISH Y DETALLES (PENDIENTE)

### 16. ⏳ Timeline Mejorado
**Problema:** Timeline de historia funcional pero podría ser más visual

**Solución propuesta:**
- Agregar fotos pequeñas a cada evento del timeline
- Mejorar responsive del timeline en móvil
- Animación al hacer scroll

**Archivos a modificar:**
- `src/templates/newspaper/components/landing/LoveStory.tsx`

---

### 17. ⏳ Dress Code Visual
**Problema:** Dress code solo texto, podría ser más visual

**Solución propuesta:**
- Agregar ilustraciones o fotos de referencia
- Paleta de colores sugeridos visualizada
- Ejemplos visuales de vestimenta apropiada

**Archivos a modificar:**
- `src/templates/newspaper/components/landing/DressCode.tsx`

---

### 18. ⏳ Estados de Error
**Problema:** No hay manejo visual de errores (código inválido, red caída)

**Solución propuesta:**
- Mensajes de error amigables
- Toast notifications
- Retry buttons
- Skeleton loaders

**Archivos a modificar:**
- `src/templates/newspaper/components/landing/InvitationSearchModal.tsx`

---

### 19. ⏳ Limpieza de CSS
**Problema:** Algunas utility classes no usadas, código CSS duplicado

**Solución propuesta:**
- Auditar clases CSS no usadas
- Consolidar estilos duplicados
- Documentar utility classes personalizadas

**Archivos a modificar:**
- `src/index.css`

---

### 20. ⏳ Ornamentos Decorativos
**Problema:** Diseño funcional pero podría tener más detalles visuales tipo periódico vintage

**Solución propuesta:**
- Agregar más ornamentos decorativos entre secciones
- Viñetas vintage
- Banners decorativos
- Stamps/sellos decorativos

**Archivos a modificar:**
- Varios componentes
- Posible nuevo componente `Ornament.tsx`

---

## 📊 RESUMEN DE PROGRESO

| Sprint | Estado | Tareas Completadas | Tareas Totales |
|--------|--------|-------------------|----------------|
| Sprint 1 | ✅ COMPLETADO | 4/4 | 100% |
| Sprint 2 | ✅ COMPLETADO | 4/4 | 100% |
| Sprint 3 | ✅ COMPLETADO | 3/3 | 100% |
| Sprint 4 | ⏳ EN PROGRESO | 3/4 | 75% |
| Sprint 5 | ⏳ PENDIENTE | 0/5 | 0% |
| **TOTAL** | **70% COMPLETO** | **14/20** | **70%** |

---

## 🎯 PRÓXIMOS PASOS RECOMENDADOS

**Siguiente Sprint:** Sprint 4 - Funcionalidades Adicionales

**Razón:** Con las mejoras críticas, visuales y técnicas completadas, el sitio tiene una base sólida. Ahora es momento de agregar funcionalidades que mejoren la experiencia de usuario: preguntas frecuentes, lightbox para fotos, animaciones sutiles y compartir en redes.

**Orden sugerido dentro de Sprint 4:**
1. ✅ FAQ Section (alta utilidad, responde dudas comunes de invitados)
2. ✅ Lightbox para Galería (mejora experiencia visual)
3. ✅ Animaciones Sutiles (dinamismo y modernidad)
4. ⏳ Social Sharing (viralización y compartir invitación) - SIGUIENTE

---

## 📝 NOTAS

- Todos los builds han pasado exitosamente
- El proyecto usa `pnpm` como package manager
- Dev server en: `http://localhost:5173`
- Build command: `pnpm build`
- Las mejoras se están aplicando solo al tema "newspaper"
- Mantener compatibilidad con otros temas si es necesario
