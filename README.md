# 💒 Sistema de Reservaciones con QR para Bodas

Sistema completo de gestión de reservaciones para eventos con códigos QR, desarrollado en React + TypeScript + Tailwind CSS.

## 📋 Características

### 🎨 Landing Pública
- Diseño elegante tipo invitación de boda
- Sección hero con nombres de los novios y fecha
- Detalles del evento (ceremonia y recepción)
- Información de dress code
- Mensaje de agradecimiento
- Totalmente responsive

### 👨‍💼 Panel de Administración
- Autenticación simple con login
- Dashboard con estadísticas en tiempo real
- Gestión de cupos y capacidad
- Creación manual de reservaciones
- Listado con búsqueda y filtros
- Generación de códigos QR individuales
- Check-in por lista (botón directo)

### 📱 Sistema de Check-in
- Escaneo de QR con cámara del dispositivo
- Búsqueda manual por código
- Acceso directo por URL con código QR
- Validación y confirmación de ingreso
- Prevención de duplicados

## 🏗️ Estructura del Proyecto

```
marriedyou/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── Login.tsx              # Formulario de login
│   │   │   ├── ReservationForm.tsx    # Crear reservaciones
│   │   │   ├── ReservationList.tsx    # Tabla de reservaciones
│   │   │   ├── ReservationRow.tsx     # Fila individual con QR
│   │   │   └── StatsCards.tsx         # Tarjetas de estadísticas
│   │   ├── checkin/
│   │   │   └── QRScanner.tsx          # Escáner de QR con cámara
│   │   ├── landing/
│   │   │   ├── Hero.tsx               # Sección principal
│   │   │   ├── EventDetails.tsx       # Detalles del evento
│   │   │   ├── DressCode.tsx          # Código de vestimenta
│   │   │   └── ThankYou.tsx           # Mensaje final
│   │   └── ProtectedRoute.tsx         # HOC para rutas protegidas
│   ├── contexts/
│   │   └── AuthContext.tsx            # Context de autenticación
│   ├── pages/
│   │   ├── Landing.tsx                # Página landing pública
│   │   ├── AdminDashboard.tsx         # Panel de administración
│   │   └── CheckIn.tsx                # Página de check-in
│   ├── services/
│   │   └── reservationService.ts      # Lógica de negocio
│   ├── types/
│   │   └── reservation.ts             # TypeScript types
│   ├── config/
│   │   └── eventConfig.ts             # ⚙️ CONFIGURACIÓN DEL EVENTO
│   ├── App.tsx                        # Componente principal + routing
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Estilos globales
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── PERSISTENCE_OPTIONS.md             # Guía de opciones de persistencia
```

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar el Evento

Edita el archivo `src/config/eventConfig.ts` para personalizar la información del evento:

```typescript
export const eventConfig = {
  // Nombres de los novios
  bride: {
    name: "Isabella",
    fullName: "Isabella Rodríguez"
  },
  groom: {
    name: "Sebastián",
    fullName: "Sebastián Martínez"
  },

  // Fecha del evento
  date: {
    full: "Sábado, 15 de Junio de 2024",
    day: "15",
    month: "Junio",
    year: "2024",
    time: "18:00 hrs",
    iso: "2024-06-15T18:00:00"
  },

  // Ubicación de la ceremonia
  ceremony: {
    name: "Iglesia Santa María",
    address: "Av. Principal 123, Colonia Centro",
    city: "Ciudad de México",
    time: "18:00 hrs",
    mapsUrl: "https://maps.google.com/?q=..."
  },

  // Ubicación de la recepción
  reception: {
    name: "Jardín Los Olivos",
    address: "Camino Real 456, Fraccionamiento Las Lomas",
    city: "Ciudad de México",
    time: "20:00 hrs",
    mapsUrl: "https://maps.google.com/?q=..."
  },

  // Dress code
  dressCode: {
    title: "Dress Code",
    description: "Formal / Etiqueta",
    details: "...",
    colorNote: "Por favor evitar el color blanco..."
  },

  // Mensajes personalizados
  messages: {
    hero: {
      title: "Nos casamos",
      subtitle: "Con la bendición de Dios..."
    },
    thankYou: {
      title: "¡Gracias!",
      message: "Tu presencia es nuestro mejor regalo...",
      note: "Por favor confirma tu asistencia..."
    }
  },

  // ⚠️ IMPORTANTE: Capacidad máxima del evento
  maxCapacity: 150,

  // Credenciales de admin (cambiar en producción)
  admin: {
    credentials: {
      username: "admin",
      password: "boda2024"
    }
  },

  // URL base para QR codes (cambiar al desplegar)
  appUrl: "http://localhost:5173"
};
```

### 3. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 🔑 Credenciales de Acceso

### Panel de Administración

**URL:** `/admin`

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `boda2024`

⚠️ **IMPORTANTE:** Cambia las credenciales en `src/config/eventConfig.ts` antes de desplegar a producción.

## 📱 Rutas de la Aplicación

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Landing pública | Público |
| `/admin/login` | Login del admin | Público |
| `/admin` | Panel de administración | Requiere autenticación |
| `/check-in` | Página de check-in | Público (para staff) |
| `/check-in?code=ABC123` | Check-in directo | Público (desde QR) |

## 🎯 Flujo de Uso

### Para el Staff (Administración)

1. **Acceder al panel:**
   - Ir a `/admin/login`
   - Ingresar credenciales
   - Click en "Iniciar Sesión"

2. **Crear reservaciones:**
   - Completar el formulario "Nueva Reservación"
   - Ingresar: nombre, número de personas, mesa (opcional), grupo (opcional)
   - Click en "Crear Reservación"
   - El sistema genera automáticamente un código único y QR

3. **Ver código QR:**
   - En la tabla de reservaciones, click en el ícono de QR (azul)
   - Se despliega el QR con información de la reservación
   - Opción de imprimir el QR

4. **Confirmar ingresos:**
   - **Opción A - Por lista:** Click en el botón verde (check) en la tabla
   - **Opción B - Por QR:** Ir a `/check-in` y escanear el código

5. **Buscar y filtrar:**
   - Usar la barra de búsqueda para buscar por nombre, código o grupo
   - Usar el filtro por estado (Pendiente, Confirmada, Ingresado)

### Para los Invitados (Check-in)

1. **El invitado llega al evento**
2. **Staff escanea el QR de la invitación:**
   - Abrir `/check-in`
   - Click en "Escanear Código QR"
   - Permitir acceso a la cámara
   - Apuntar a la invitación
3. **Sistema valida y muestra datos:**
   - Nombre del invitado
   - Número de personas
   - Mesa asignada
4. **Staff confirma ingreso:**
   - Click en "Confirmar Ingreso"
   - Sistema marca como ingresado
   - No se puede volver a usar el mismo código

## 🎨 Personalización de Estilos

### Colores

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#D4AF37',    // Color dorado principal
      secondary: '#F5E6D3',  // Color crema secundario
      dark: '#2C2C2C',       // Color oscuro para textos
    },
  },
}
```

### Tipografías

Las fuentes se cargan desde Google Fonts en `index.html`:
- **Serif:** Playfair Display (para títulos)
- **Sans:** Montserrat (para texto)

Para cambiarlas:
1. Edita el `<link>` en `index.html`
2. Actualiza `tailwind.config.js`:

```javascript
fontFamily: {
  serif: ['TuFuenteSerif', 'Georgia', 'serif'],
  sans: ['TuFuenteSans', 'sans-serif'],
}
```

## 💾 Persistencia de Datos

### Implementación Actual: LocalStorage

La implementación actual guarda los datos en el navegador (LocalStorage). **Esto es solo para desarrollo.**

**Limitaciones:**
- Los datos se pierden si se borra el caché
- No se comparten entre dispositivos
- No funciona en producción con múltiples usuarios

### Migrar a Producción

Para usar en producción, necesitas implementar una estrategia de persistencia real. Tenemos **3 opciones documentadas:**

1. **Backend Propio (API REST)** - Control total, ideal para producción
2. **Firebase/Supabase (BaaS)** - Rápido de implementar, ideal para MVP
3. **Google Sheets** - Muy simple, ideal para prototipos

📖 **Guía completa:** Lee `PERSISTENCE_OPTIONS.md` para instrucciones detalladas de cada opción.

### Cómo Cambiar la Estrategia

El archivo `src/services/reservationService.ts` contiene toda la lógica de persistencia. Para cambiar:

1. Lee `PERSISTENCE_OPTIONS.md`
2. Elige una opción (Backend, Firebase, Sheets)
3. Reemplaza el contenido de `reservationService.ts` con el código de ejemplo
4. Configura las credenciales/URLs necesarias
5. Reinicia la aplicación

El resto de la app no necesita cambios porque la interfaz del servicio es la misma.

## 🔒 Seguridad

### Para Desarrollo

- ✅ Autenticación simple con usuario/contraseña
- ✅ Rutas protegidas con React Router
- ✅ Validación de datos en el cliente

### Para Producción

⚠️ **ANTES DE DESPLEGAR:**

1. **Cambiar credenciales de admin** en `eventConfig.ts`
2. **Implementar backend seguro** con:
   - JWT o sesiones
   - HTTPS obligatorio
   - Rate limiting
   - Validación en servidor
3. **Variables de entorno** para secretos
4. **Reglas de seguridad** en Firebase/Supabase
5. **CORS configurado** correctamente

## 📦 Stack Tecnológico

- **React 18** - Librería UI
- **TypeScript** - Type safety
- **Vite** - Build tool y dev server
- **React Router DOM** - Routing
- **Tailwind CSS** - Estilos utility-first
- **qrcode.react** - Generación de códigos QR
- **html5-qrcode** - Escáner de QR con cámara
- **Lucide React** - Iconos

## 🧪 Desarrollo

### Comandos Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Preview del build de producción
npm run lint     # Ejecutar linter
```

### Validaciones Configurables

En `src/services/reservationService.ts` puedes ajustar:

```typescript
// Máximo de personas por reservación
const MAX_GUESTS_PER_RESERVATION = 10;

// Validar campos requeridos
if (!data.guestName || data.guestName.trim().length === 0) {
  throw new Error('El nombre del invitado es requerido');
}
```

### Gestión de Capacidad

La capacidad máxima se configura en `eventConfig.ts`:

```typescript
maxCapacity: 150  // Cambiar según tu venue
```

El sistema:
- ✅ Calcula automáticamente personas reservadas
- ✅ Muestra lugares disponibles
- ✅ Previene sobrecupo
- ✅ Alerta cuando está cerca del límite

## 🚀 Deployment

### Opción 1: Vercel (Recomendado)

```bash
npm install -g vercel
vercel login
vercel
```

### Opción 2: Netlify

```bash
npm run build
# Arrastra la carpeta dist/ a Netlify
```

### Opción 3: GitHub Pages

Instala:
```bash
npm install -D gh-pages
```

Agrega a `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://tu-usuario.github.io/tu-repo"
}
```

Configura `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/tu-repo/',
  // ...resto
})
```

Despliega:
```bash
npm run deploy
```

### Configuración Post-Deploy

⚠️ **IMPORTANTE:** Después de desplegar, actualiza `eventConfig.ts`:

```typescript
// Cambiar de:
appUrl: "http://localhost:5173"

// A tu dominio real:
appUrl: "https://tu-dominio.com"
```

Esto es necesario para que los QR codes apunten a la URL correcta.

## 📸 Screenshots

### Landing Page
- Hero con nombres y fecha
- Detalles de ceremonia y recepción
- Sección de dress code
- Mensaje de agradecimiento

### Panel de Administración
- Dashboard con estadísticas
- Formulario de creación
- Tabla con búsqueda y filtros
- Vista de QR por reservación

### Check-in
- Escáner de QR
- Búsqueda manual
- Detalles de reservación
- Confirmación de ingreso

## 🐛 Troubleshooting

### La cámara no funciona para escanear QR

**Problema:** El navegador no puede acceder a la cámara.

**Solución:**
1. Verifica que estás usando HTTPS (requerido para cámara)
2. Revisa permisos del navegador
3. En desarrollo, localhost funciona sin HTTPS

### Los QR no funcionan después de desplegar

**Problema:** Los QR apuntan a localhost.

**Solución:**
1. Actualiza `appUrl` en `eventConfig.ts` con tu dominio real
2. Recompila: `npm run build`
3. Redespliega

### Los datos se pierden al cerrar el navegador

**Problema:** LocalStorage solo guarda datos localmente.

**Solución:**
Lee `PERSISTENCE_OPTIONS.md` e implementa una estrategia de persistencia real (Backend, Firebase, etc.)

### Error de tipos de TypeScript

**Problema:** TypeScript marca errores de tipos.

**Solución:**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules
npm install
```

## 📝 Notas Importantes

### Capacidad y Validaciones

- **Capacidad máxima:** Configurable en `eventConfig.ts`
- **Máximo por reservación:** 10 personas (configurable en `reservationService.ts`)
- **Validación de cupo:** Automática al crear/editar reservaciones
- **Códigos únicos:** Generados automáticamente de 8 caracteres

### Estados de Reservación

1. **Pendiente** - Reservación creada, esperando confirmación
2. **Confirmada** - Reservación confirmada (puedes cambiar manualmente)
3. **Ingreso Registrado** - Invitado ya ingresó al evento

### Campos Opcionales

- Mesa
- Grupo/Familia
- Notas especiales

### Backup de Datos

⚠️ **IMPORTANTE:** Con LocalStorage no hay backup automático.

**Opciones:**
1. Implementar persistencia en servidor (ver `PERSISTENCE_OPTIONS.md`)
2. Exportar datos manualmente desde DevTools
3. Usar Firebase con backups automáticos

## 🤝 Soporte

¿Necesitas ayuda? Revisa:

1. **README.md** (este archivo) - Instrucciones generales
2. **PERSISTENCE_OPTIONS.md** - Opciones de base de datos
3. **Comentarios en el código** - Cada archivo tiene documentación

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal o comercial.

---

**¡Felicidades por tu boda! 💒💕**
