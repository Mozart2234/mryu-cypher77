# 🚀 Guía de Inicio Rápido

Esta guía te permite tener la aplicación funcionando en **5 minutos**.

## ⚡ Instalación Express

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo desarrollo
npm run dev
```

¡Listo! Abre http://localhost:5173

## 📍 Rutas Principales

| URL | Qué verás |
|-----|-----------|
| http://localhost:5173/ | Landing pública del evento |
| http://localhost:5173/admin/login | Login del panel admin |
| http://localhost:5173/admin | Panel de administración |
| http://localhost:5173/check-in | Página de check-in |

## 🔑 Credenciales de Admin

- **Usuario:** `admin`
- **Contraseña:** `boda2024`

## ✏️ Personalizar tu Evento

Edita un solo archivo: `src/config/eventConfig.ts`

```typescript
export const eventConfig = {
  bride: {
    name: "TuNovia",
    fullName: "Nombre Completo de la Novia"
  },
  groom: {
    name: "TuNovio",
    fullName: "Nombre Completo del Novio"
  },
  date: {
    full: "Sábado, 20 de Julio de 2024",
    // ... resto de campos
  },
  maxCapacity: 150, // ⚠️ IMPORTANTE: Capacidad de tu venue
  // ... resto de la configuración
};
```

## 🎯 Flujo Básico de Uso

### 1️⃣ Crear Reservaciones

1. Ir a `/admin/login` e ingresar
2. Completar formulario "Nueva Reservación"
3. Sistema genera código QR automáticamente

### 2️⃣ Ver Código QR

1. En la tabla de reservaciones
2. Click en ícono azul de QR
3. Imprimir o guardar

### 3️⃣ Check-in en el Evento

**Opción A - Con QR:**
1. Ir a `/check-in`
2. Click "Escanear Código QR"
3. Apuntar cámara a la invitación
4. Confirmar ingreso

**Opción B - Desde la lista:**
1. En `/admin` buscar el invitado
2. Click botón verde (check)
3. ¡Listo!

## 📦 Para Producción

### 1. Cambiar la Persistencia

**Problema:** Actualmente usa LocalStorage (se pierde al cerrar navegador)

**Solución:** Lee `PERSISTENCE_OPTIONS.md` y elige una opción:
- Backend propio (más control)
- Firebase/Supabase (más rápido)
- Google Sheets (más simple)

### 2. Actualizar Configuración

En `src/config/eventConfig.ts`:

```typescript
// Cambiar:
appUrl: "http://localhost:5173"

// Por tu dominio real:
appUrl: "https://tu-boda.com"
```

### 3. Cambiar Credenciales

```typescript
admin: {
  credentials: {
    username: "tu_usuario",
    password: "contraseña_segura_aqui"
  }
}
```

### 4. Compilar y Desplegar

```bash
# Compilar
npm run build

# Desplegar en Vercel (recomendado)
npm install -g vercel
vercel

# O Netlify, GitHub Pages, etc.
```

## ⚠️ Problemas Comunes

### No funciona la cámara para QR

✅ En desarrollo, asegúrate de estar en `http://localhost` (funciona sin HTTPS)
✅ En producción, necesitas HTTPS obligatoriamente

### Los datos se pierden

✅ Es normal con LocalStorage
✅ Implementa una de las opciones de `PERSISTENCE_OPTIONS.md`

### Los QR no abren nada después de desplegar

✅ Actualiza `appUrl` en `eventConfig.ts` con tu dominio real
✅ Recompila y redespliega

## 📚 Documentación Completa

- **README.md** - Guía completa del proyecto
- **PERSISTENCE_OPTIONS.md** - Opciones de base de datos
- **Comentarios en código** - Cada archivo está documentado

## 🎨 Cambiar Colores

Edita `tailwind.config.js`:

```javascript
colors: {
  primary: '#D4AF37',   // Cambia este por tu color
  secondary: '#F5E6D3', // Cambia este por tu color
  dark: '#2C2C2C',      // Cambia este por tu color
}
```

## 🆘 Necesitas Ayuda?

1. Lee los comentarios en los archivos
2. Revisa `README.md` completo
3. Consulta `PERSISTENCE_OPTIONS.md` para base de datos

---

**¡Disfruta tu boda! 💒**
