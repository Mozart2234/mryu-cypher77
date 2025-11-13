# 📂 Estructura del Proyecto

## Vista General del Sistema

```
marriedyou/
├── 📄 Archivos de Configuración
│   ├── package.json              # Dependencias y scripts
│   ├── tsconfig.json             # Configuración TypeScript
│   ├── vite.config.ts            # Configuración Vite
│   ├── tailwind.config.js        # Configuración Tailwind CSS
│   ├── postcss.config.js         # Configuración PostCSS
│   ├── .eslintrc.cjs             # Configuración ESLint
│   ├── .gitignore                # Archivos ignorados por Git
│   ├── .env.example              # Ejemplo de variables de entorno
│   └── index.html                # HTML principal
│
├── 📚 Documentación
│   ├── README.md                 # Guía completa del proyecto
│   ├── QUICKSTART.md             # Guía de inicio rápido (5 min)
│   ├── PERSISTENCE_OPTIONS.md    # 3 opciones de base de datos
│   └── PROJECT_STRUCTURE.md      # Este archivo
│
└── src/                          # Código fuente
    ├── 🎨 Estilos
    │   ├── index.css             # Estilos globales + Tailwind
    │   └── vite-env.d.ts         # Tipos para Vite
    │
    ├── ⚙️ Configuración
    │   └── config/
    │       └── eventConfig.ts    # ⭐ CONFIGURACIÓN DEL EVENTO
    │
    ├── 🧩 Tipos
    │   └── types/
    │       └── reservation.ts    # Interfaces TypeScript
    │
    ├── 🔧 Servicios
    │   └── services/
    │       └── reservationService.ts  # Lógica de negocio
    │
    ├── 🔐 Contextos
    │   └── contexts/
    │       └── AuthContext.tsx   # Autenticación
    │
    ├── 📱 Componentes
    │   └── components/
    │       ├── admin/            # Componentes del admin
    │       │   ├── Login.tsx
    │       │   ├── ReservationForm.tsx
    │       │   ├── ReservationList.tsx
    │       │   ├── ReservationRow.tsx
    │       │   └── StatsCards.tsx
    │       ├── checkin/          # Componentes de check-in
    │       │   └── QRScanner.tsx
    │       ├── landing/          # Componentes de la landing
    │       │   ├── Hero.tsx
    │       │   ├── EventDetails.tsx
    │       │   ├── DressCode.tsx
    │       │   └── ThankYou.tsx
    │       └── ProtectedRoute.tsx
    │
    ├── 📄 Páginas
    │   └── pages/
    │       ├── Landing.tsx       # Página pública
    │       ├── AdminDashboard.tsx # Panel de admin
    │       └── CheckIn.tsx       # Página de check-in
    │
    ├── 🚦 Aplicación Principal
    │   ├── App.tsx               # Routing y estructura
    │   └── main.tsx              # Entry point
    │
    └── public/                   # Archivos estáticos
```

---

## 📦 Descripción de Componentes

### 🎨 Landing (Público)

#### `pages/Landing.tsx`
Página principal pública tipo "one-page" que muestra información del evento.

**Componentes hijos:**

#### `components/landing/Hero.tsx`
- Sección hero con nombres de los novios
- Fecha del evento
- Mensaje de bienvenida
- Ornamentos decorativos

#### `components/landing/EventDetails.tsx`
- Información de ceremonia (hora, lugar, mapa)
- Información de recepción (hora, lugar, mapa)
- Enlaces a Google Maps

#### `components/landing/DressCode.tsx`
- Código de vestimenta
- Detalles y recomendaciones
- Notas sobre colores

#### `components/landing/ThankYou.tsx`
- Mensaje de agradecimiento
- Firma de los novios
- Ornamentos finales

---

### 👨‍💼 Admin Panel (Protegido)

#### `pages/AdminDashboard.tsx`
Panel principal de administración con:
- Header con logout
- Estadísticas
- Formulario de creación
- Lista de reservaciones

**Componentes hijos:**

#### `components/admin/Login.tsx`
- Formulario de login
- Validación de credenciales
- Redirección al dashboard

#### `components/admin/StatsCards.tsx`
- Tarjetas de estadísticas:
  - Total reservados vs capacidad
  - Lugares disponibles
  - Total de reservaciones
  - Check-ins realizados
- Alertas de capacidad

#### `components/admin/ReservationForm.tsx`
- Formulario para crear reservaciones
- Campos:
  - Nombre del invitado *
  - Número de personas *
  - Mesa (opcional)
  - Grupo/Familia (opcional)
  - Notas (opcional)
- Validaciones en tiempo real
- Manejo de errores

#### `components/admin/ReservationList.tsx`
- Tabla de todas las reservaciones
- Búsqueda por nombre/código/grupo
- Filtro por estado
- Ordenamiento
- Contador de resultados

#### `components/admin/ReservationRow.tsx`
- Fila individual en la tabla
- Botones de acción:
  - Ver QR (modal)
  - Marcar ingreso
  - Eliminar
- Modal de QR con:
  - Código QR renderizado
  - Información de reservación
  - Botón de imprimir

---

### 📱 Check-in (Público para Staff)

#### `pages/CheckIn.tsx`
Página de check-in con dos modos:
1. **Escaneo de QR** con cámara
2. **Búsqueda manual** por código

**Funcionalidades:**
- Validación de código
- Muestra datos de reservación
- Confirmación de ingreso
- Prevención de duplicados
- Manejo de errores

**Componentes hijos:**

#### `components/checkin/QRScanner.tsx`
- Modal de escáner
- Acceso a cámara del dispositivo
- Librería: html5-qrcode
- Detección automática
- Extracción de código del URL

---

## 🔧 Servicios y Lógica

### `services/reservationService.ts`

**Propósito:** Encapsula toda la lógica de negocio de reservaciones.

**Métodos públicos:**
```typescript
- create(data)           // Crear nueva reservación
- getAll()              // Obtener todas
- getById(id)           // Buscar por ID
- getByCode(code)       // Buscar por código (para QR)
- update(id, data)      // Actualizar reservación
- checkIn(id)           // Marcar ingreso
- delete(id)            // Eliminar reservación
- search(query)         // Buscar por texto
- filterByStatus(status) // Filtrar por estado
- getStats()            // Obtener estadísticas
- clearAll()            // Limpiar todo (dev)
```

**Validaciones:**
- Nombre requerido
- Mínimo 1 persona
- Máximo 10 personas por reservación
- Verificación de capacidad
- Prevención de check-ins duplicados

**Implementación actual:** LocalStorage (solo desarrollo)
**Para producción:** Ver `PERSISTENCE_OPTIONS.md`

---

### `contexts/AuthContext.tsx`

**Propósito:** Maneja el estado de autenticación.

**API:**
```typescript
- isAuthenticated: boolean
- login(username, password): boolean
- logout(): void
```

**Implementación actual:** Simple con credenciales en config
**Para producción:** Implementar JWT, OAuth, etc.

---

### `config/eventConfig.ts`

⭐ **ARCHIVO MÁS IMPORTANTE PARA PERSONALIZAR**

**Contiene:**
- Nombres de los novios
- Fecha y hora del evento
- Ubicaciones (ceremonia y recepción)
- Dress code
- Mensajes personalizados
- Capacidad máxima del evento
- Credenciales de admin
- URL base para QR codes

**Para personalizar tu evento:** Solo edita este archivo.

---

### `types/reservation.ts`

**Define la estructura de datos:**

```typescript
interface Reservation {
  id: string;
  code: string;
  guestName: string;
  numberOfGuests: number;
  status: 'pendiente' | 'confirmada' | 'ingreso-registrado';
  table?: string;
  group?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  checkedInAt?: string;
}
```

---

## 🚦 Routing (App.tsx)

```
/ ────────────────────► Landing (público)
/admin/login ─────────► Login
/admin ───────────────► AdminDashboard (protegido)
/check-in ────────────► CheckIn (público)
/check-in?code=XXX ──► CheckIn con código (desde QR)
/* ───────────────────► Redirect a /
```

**Protección de rutas:** `ProtectedRoute.tsx` verifica autenticación.

---

## 🎨 Estilos y Diseño

### Sistema de Diseño

**Colores (Tailwind):**
- `primary`: #D4AF37 (Dorado)
- `secondary`: #F5E6D3 (Crema)
- `dark`: #2C2C2C (Oscuro)

**Tipografía:**
- **Serif:** Playfair Display (títulos)
- **Sans:** Montserrat (texto)

**Componentes reutilizables (en index.css):**
- `.btn-primary` - Botón principal
- `.btn-secondary` - Botón secundario
- `.btn-danger` - Botón de eliminar
- `.btn-success` - Botón de éxito
- `.card` - Tarjeta con sombra
- `.input` - Campo de texto
- `.label` - Etiqueta de campo
- `.badge` - Badge de estado
- `.table` - Tabla

---

## 📊 Flujo de Datos

```
Usuario interactúa
       ↓
Componente de React
       ↓
Llama a reservationService
       ↓
[Actualmente] LocalStorage
[Producción] Backend/Firebase/Sheets
       ↓
Actualiza estado del componente
       ↓
React re-renderiza UI
```

---

## 🔐 Seguridad

### Desarrollo
- Autenticación simple
- Credenciales en config
- Datos en LocalStorage

### Producción (TODO)
- [ ] JWT o sesiones
- [ ] HTTPS obligatorio
- [ ] Variables de entorno
- [ ] Backend con validación
- [ ] Rate limiting
- [ ] CORS configurado

---

## 🧪 Testing

**Comandos:**
```bash
npm run dev      # Desarrollo
npm run build    # Compilar
npm run preview  # Preview de build
npm run lint     # Linter
```

**Para testear flujo completo:**
1. Crear reservación en `/admin`
2. Ver QR generado
3. Ir a `/check-in`
4. Escanear o ingresar código
5. Confirmar ingreso
6. Verificar en `/admin` que el estado cambió

---

## 📦 Dependencias Clave

### Producción
- **react**: Librería UI
- **react-router-dom**: Routing
- **qrcode.react**: Generación de QR
- **html5-qrcode**: Escáner de QR
- **lucide-react**: Iconos

### Desarrollo
- **vite**: Build tool
- **typescript**: Type checking
- **tailwindcss**: Estilos
- **eslint**: Linter

---

## 🚀 Próximos Pasos

### Para usar en tu evento:

1. ✅ **Instalar:** `npm install`
2. ✅ **Personalizar:** Editar `src/config/eventConfig.ts`
3. ✅ **Probar:** `npm run dev`
4. ⚠️ **Persistencia:** Leer `PERSISTENCE_OPTIONS.md` e implementar
5. ⚠️ **Seguridad:** Cambiar credenciales y configurar backend
6. ✅ **Compilar:** `npm run build`
7. ✅ **Desplegar:** Vercel, Netlify, etc.
8. ⚠️ **Actualizar URL:** Cambiar `appUrl` en config

---

## 📚 Más Información

- **README.md** - Guía completa
- **QUICKSTART.md** - Inicio rápido
- **PERSISTENCE_OPTIONS.md** - Opciones de base de datos
- **Comentarios en código** - Cada archivo tiene documentación inline

---

**¡Todo listo para tu evento! 💒**
