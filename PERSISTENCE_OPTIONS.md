# Opciones de Persistencia para Reservaciones

Este documento detalla **3 opciones diferentes** para persistir las reservaciones del sistema. La implementación actual usa **LocalStorage** (solo para desarrollo). A continuación se explica cómo migrar a cada opción.

---

## 📋 Índice

1. [Opción 1: Backend Propio con API REST](#opción-1-backend-propio-con-api-rest)
2. [Opción 2: Firebase / Supabase (BaaS)](#opción-2-firebase--supabase-baas)
3. [Opción 3: Google Sheets](#opción-3-google-sheets)
4. [Comparación de Opciones](#comparación-de-opciones)

---

## Opción 1: Backend Propio con API REST

### 🎯 Descripción

Crear tu propio servidor backend con endpoints REST para manejar las reservaciones. Puedes usar Node.js + Express, Python + FastAPI, etc.

### ✅ Pros

- **Control total**: Tienes control completo sobre la lógica y los datos
- **Seguridad**: Puedes implementar autenticación robusta (JWT, OAuth)
- **Escalabilidad**: Fácil de escalar y optimizar
- **Sin límites**: No dependes de servicios de terceros
- **Base de datos**: Puedes usar PostgreSQL, MySQL, MongoDB, etc.

### ❌ Contras

- **Mantenimiento**: Tienes que mantener y actualizar el servidor
- **Costo**: Necesitas hosting para el backend y base de datos
- **Complejidad**: Más trabajo inicial de configuración
- **DevOps**: Necesitas manejar deployment, backups, etc.

---

### 📡 Estructura de Endpoints

```
POST   /api/reservations          - Crear reservación
GET    /api/reservations          - Obtener todas
GET    /api/reservations/:id      - Obtener por ID
GET    /api/reservations/code/:code - Obtener por código
PATCH  /api/reservations/:id      - Actualizar reservación
DELETE /api/reservations/:id      - Eliminar reservación
POST   /api/reservations/:id/check-in - Marcar ingreso
GET    /api/reservations/stats    - Obtener estadísticas
```

---

### 💻 Ejemplo Backend (Node.js + Express + PostgreSQL)

#### 1. Instalar dependencias

```bash
npm install express pg cors dotenv
npm install -D @types/express @types/pg
```

#### 2. Schema de base de datos (PostgreSQL)

```sql
CREATE TABLE reservations (
  id VARCHAR(255) PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  number_of_guests INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  table_number VARCHAR(50),
  group_name VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  checked_in_at TIMESTAMP
);

CREATE INDEX idx_code ON reservations(code);
CREATE INDEX idx_status ON reservations(status);
```

#### 3. Ejemplo de servidor Express

```typescript
// server.ts
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(cors());
app.use(express.json());

// Crear reservación
app.post('/api/reservations', async (req, res) => {
  const { guestName, numberOfGuests, table, group, notes } = req.body;

  try {
    const id = generateId();
    const code = generateCode();

    const result = await pool.query(
      `INSERT INTO reservations
       (id, code, guest_name, number_of_guests, status, table_number, group_name, notes)
       VALUES ($1, $2, $3, $4, 'pendiente', $5, $6, $7)
       RETURNING *`,
      [id, code, guestName, numberOfGuests, table, group, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating reservation' });
  }
});

// Obtener todas
app.get('/api/reservations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservations' });
  }
});

// Obtener por código
app.get('/api/reservations/code/:code', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM reservations WHERE code = $1',
      [req.params.code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservation' });
  }
});

// Check-in
app.post('/api/reservations/:id/check-in', async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE reservations
       SET status = 'ingreso-registrado',
           checked_in_at = NOW(),
           updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error checking in' });
  }
});

// Estadísticas
app.get('/api/reservations/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) as total_reservations,
        SUM(number_of_guests) as total_guests,
        COUNT(CASE WHEN status = 'pendiente' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'confirmada' THEN 1 END) as confirmed,
        COUNT(CASE WHEN status = 'ingreso-registrado' THEN 1 END) as checked_in
      FROM reservations
    `);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

### 🔄 Modificar el servicio de React

Reemplaza el contenido de `src/services/reservationService.ts`:

```typescript
import type { Reservation, CreateReservationDTO, UpdateReservationDTO } from '@/types/reservation';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const reservationService = {
  async create(data: CreateReservationDTO): Promise<Reservation> {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error creating reservation');
    }

    return response.json();
  },

  async getAll(): Promise<Reservation[]> {
    const response = await fetch(`${API_BASE_URL}/reservations`);
    if (!response.ok) throw new Error('Error fetching reservations');
    return response.json();
  },

  async getByCode(code: string): Promise<Reservation | null> {
    const response = await fetch(`${API_BASE_URL}/reservations/code/${code}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Error fetching reservation');
    return response.json();
  },

  async checkIn(id: string): Promise<Reservation> {
    const response = await fetch(`${API_BASE_URL}/reservations/${id}/check-in`, {
      method: 'POST'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error checking in');
    }

    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Error deleting reservation');
  },

  async getStats(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/reservations/stats`);
    if (!response.ok) throw new Error('Error fetching stats');
    return response.json();
  }
};
```

---

## Opción 2: Firebase / Supabase (BaaS)

### 🎯 Descripción

Usar un Backend-as-a-Service que te proporciona base de datos, autenticación y hosting sin necesidad de crear tu propio backend.

### ✅ Pros

- **Rápido de implementar**: No necesitas crear backend
- **Tiempo real**: Actualizaciones en tiempo real sin esfuerzo
- **Autenticación integrada**: Sistema de auth completo
- **Escalable**: Maneja el escalamiento automáticamente
- **Free tier generoso**: Gratis para proyectos pequeños
- **SDKs oficiales**: Librerías bien documentadas

### ❌ Contras

- **Vendor lock-in**: Dependes del proveedor
- **Costos**: Puede ser caro con muchos usuarios
- **Limitaciones**: Menos control sobre la lógica del servidor
- **Curva de aprendizaje**: Tienes que aprender sus APIs

---

### 🔥 Ejemplo con Firebase

#### 1. Instalar Firebase

```bash
npm install firebase
```

#### 2. Configurar Firebase

Crea un archivo `src/services/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Reemplazar con tu configuración de Firebase
// La obtienes desde Firebase Console > Project Settings
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

#### 3. Estructura de Firestore

```
Collection: reservations
├── documento1 (ID autogenerado)
│   ├── id: string
│   ├── code: string
│   ├── guestName: string
│   ├── numberOfGuests: number
│   ├── status: string
│   ├── table: string (opcional)
│   ├── group: string (opcional)
│   ├── notes: string (opcional)
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   └── checkedInAt: timestamp (opcional)
```

#### 4. Reglas de seguridad de Firestore

En Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservations/{reservationId} {
      // Permitir lectura solo a usuarios autenticados
      allow read: if request.auth != null;

      // Permitir escritura solo a usuarios autenticados
      allow write: if request.auth != null;
    }
  }
}
```

#### 5. Servicio de React con Firebase

```typescript
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { Reservation, CreateReservationDTO } from '@/types/reservation';

const COLLECTION = 'reservations';

function generateCode(): string {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

export const reservationService = {
  async create(data: CreateReservationDTO): Promise<Reservation> {
    const now = Timestamp.now();
    const code = generateCode();

    const docData = {
      code,
      guestName: data.guestName,
      numberOfGuests: data.numberOfGuests,
      status: 'pendiente',
      table: data.table || null,
      group: data.group || null,
      notes: data.notes || null,
      createdAt: now,
      updatedAt: now
    };

    const docRef = await addDoc(collection(db, COLLECTION), docData);

    return {
      id: docRef.id,
      ...docData,
      createdAt: now.toDate().toISOString(),
      updatedAt: now.toDate().toISOString()
    } as Reservation;
  },

  async getAll(): Promise<Reservation[]> {
    const q = query(
      collection(db, COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString(),
      checkedInAt: doc.data().checkedInAt?.toDate().toISOString()
    })) as Reservation[];
  },

  async getByCode(code: string): Promise<Reservation | null> {
    const q = query(
      collection(db, COLLECTION),
      where('code', '==', code.toUpperCase())
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString(),
      checkedInAt: doc.data().checkedInAt?.toDate().toISOString()
    } as Reservation;
  },

  async checkIn(id: string): Promise<Reservation> {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Reservación no encontrada');
    }

    if (docSnap.data().status === 'ingreso-registrado') {
      throw new Error('Esta reservación ya fue utilizada');
    }

    const now = Timestamp.now();

    await updateDoc(docRef, {
      status: 'ingreso-registrado',
      checkedInAt: now,
      updatedAt: now
    });

    const updated = await getDoc(docRef);
    return {
      id: updated.id,
      ...updated.data(),
      createdAt: updated.data()!.createdAt.toDate().toISOString(),
      updatedAt: updated.data()!.updatedAt.toDate().toISOString(),
      checkedInAt: updated.data()!.checkedInAt?.toDate().toISOString()
    } as Reservation;
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION, id));
  },

  async getStats(): Promise<any> {
    const reservations = await this.getAll();
    const totalGuests = reservations.reduce((sum, r) => sum + r.numberOfGuests, 0);

    return {
      totalReservations: reservations.length,
      totalGuests,
      availableSpots: 150 - totalGuests, // MAX_CAPACITY
      pendingReservations: reservations.filter(r => r.status === 'pendiente').length,
      confirmedReservations: reservations.filter(r => r.status === 'confirmada').length,
      checkedInReservations: reservations.filter(r => r.status === 'ingreso-registrado').length
    };
  }
};
```

#### 6. Variables de entorno

Crea un archivo `.env`:

```bash
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

---

### ⚡ Ejemplo con Supabase (Alternativa a Firebase)

Supabase es similar a Firebase pero con PostgreSQL y es open source.

#### 1. Instalar Supabase

```bash
npm install @supabase/supabase-js
```

#### 2. Configurar Supabase

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### 3. Crear tabla en Supabase

En Supabase Dashboard > SQL Editor:

```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) UNIQUE NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  number_of_guests INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pendiente',
  table_number VARCHAR(50),
  group_name VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  checked_in_at TIMESTAMP
);

-- Índices
CREATE INDEX idx_code ON reservations(code);
CREATE INDEX idx_status ON reservations(status);
```

#### 4. Servicio con Supabase

```typescript
import { supabase } from './supabase';
import type { Reservation, CreateReservationDTO } from '@/types/reservation';

export const reservationService = {
  async create(data: CreateReservationDTO): Promise<Reservation> {
    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert({
        code: generateCode(),
        guest_name: data.guestName,
        number_of_guests: data.numberOfGuests,
        table_number: data.table,
        group_name: data.group,
        notes: data.notes
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return reservation as Reservation;
  },

  async getAll(): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Reservation[];
  },

  async getByCode(code: string): Promise<Reservation | null> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as Reservation | null;
  },

  async checkIn(id: string): Promise<Reservation> {
    const { data, error } = await supabase
      .from('reservations')
      .update({
        status: 'ingreso-registrado',
        checked_in_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Reservation;
  }
};
```

---

## Opción 3: Google Sheets

### 🎯 Descripción

Usar Google Sheets como base de datos. Requiere un servicio intermedio para autenticar y escribir en la hoja.

### ✅ Pros

- **Muy fácil**: No necesitas configurar base de datos
- **Familiar**: Todo el mundo sabe usar Excel/Sheets
- **Visualización**: Puedes ver y editar datos fácilmente
- **Gratis**: Completamente gratuito
- **Exportable**: Fácil exportar a CSV, Excel, etc.

### ❌ Contras

- **Performance**: Lento con muchas filas (>1000)
- **Limitaciones**: No es una base de datos real
- **Concurrencia**: Problemas con múltiples escrituras simultáneas
- **Seguridad**: Requiere configuración cuidadosa de permisos
- **No profesional**: No es escalable para producción seria

---

### 📊 Estructura de la Hoja

#### Columnas:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| ID | Code | Guest Name | # Guests | Status | Table | Group | Notes | Created At | Checked In At |

---

### 🔧 Implementación

#### Opción A: Usando Google Apps Script

1. **Crear una Google Sheet**
2. **Ir a Extensions > Apps Script**
3. **Copiar este código:**

```javascript
// Code.gs
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  switch(data.action) {
    case 'create':
      return createReservation(sheet, data);
    case 'getAll':
      return getAllReservations(sheet);
    case 'checkIn':
      return checkIn(sheet, data.id);
    default:
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Invalid action' })
      ).setMimeType(ContentService.MimeType.JSON);
  }
}

function createReservation(sheet, data) {
  const id = Utilities.getUuid();
  const code = generateCode();
  const now = new Date().toISOString();

  sheet.appendRow([
    id,
    code,
    data.guestName,
    data.numberOfGuests,
    'pendiente',
    data.table || '',
    data.group || '',
    data.notes || '',
    now,
    ''
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({
      id, code,
      guestName: data.guestName,
      numberOfGuests: data.numberOfGuests,
      status: 'pendiente',
      createdAt: now
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getAllReservations(sheet) {
  const rows = sheet.getDataRange().getValues();
  rows.shift(); // Remove header

  const reservations = rows.map(row => ({
    id: row[0],
    code: row[1],
    guestName: row[2],
    numberOfGuests: row[3],
    status: row[4],
    table: row[5],
    group: row[6],
    notes: row[7],
    createdAt: row[8],
    checkedInAt: row[9]
  }));

  return ContentService.createTextOutput(
    JSON.stringify(reservations)
  ).setMimeType(ContentService.MimeType.JSON);
}

function checkIn(sheet, id) {
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === id) {
      sheet.getRange(i + 1, 5).setValue('ingreso-registrado');
      sheet.getRange(i + 1, 10).setValue(new Date().toISOString());
      break;
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function generateCode() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}
```

4. **Deploy > New deployment > Web app**
5. **Copiar la URL del web app**

#### Servicio de React

```typescript
const SHEETS_API_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT';

export const reservationService = {
  async create(data: CreateReservationDTO): Promise<Reservation> {
    const response = await fetch(SHEETS_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        ...data
      })
    });

    return response.json();
  },

  async getAll(): Promise<Reservation[]> {
    const response = await fetch(SHEETS_API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'getAll' })
    });

    return response.json();
  },

  async checkIn(id: string): Promise<Reservation> {
    const response = await fetch(SHEETS_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'checkIn',
        id
      })
    });

    return response.json();
  }
};
```

---

#### Opción B: Usando la API de Google Sheets

Requiere configurar OAuth y la API de Google Sheets. Más complejo pero más potente.

---

## 📊 Comparación de Opciones

| Característica | Backend Propio | Firebase/Supabase | Google Sheets |
|---------------|----------------|-------------------|---------------|
| **Complejidad inicial** | Alta | Media | Baja |
| **Costo** | Medio-Alto | Bajo-Medio | Gratis |
| **Escalabilidad** | Excelente | Excelente | Pobre |
| **Performance** | Excelente | Muy bueno | Regular |
| **Control** | Total | Medio | Bajo |
| **Mantenimiento** | Alto | Bajo | Bajo |
| **Tiempo real** | Manual | Automático | No |
| **Facilidad de uso** | Media | Alta | Muy alta |
| **Mejor para** | Producción seria | MVP rápido | Prototipos |

---

## 🎯 Recomendación por Caso de Uso

### 🏆 Usa **Backend Propio** si:
- Necesitas control total sobre la lógica
- El proyecto es a largo plazo
- Tienes experiencia en backend
- Necesitas lógica de negocio compleja

### 🔥 Usa **Firebase/Supabase** si:
- Quieres lanzar rápido
- El proyecto es pequeño-mediano
- No quieres mantener infraestructura
- Necesitas tiempo real

### 📊 Usa **Google Sheets** si:
- Es solo un prototipo
- El evento es pequeño (<200 personas)
- Quieres algo muy simple
- No te importa el performance

---

## 🔄 Cómo Cambiar de Opción

Para cambiar la estrategia de persistencia:

1. **Mantén la interfaz del servicio** - Los métodos públicos deben ser iguales
2. **Cambia solo la implementación** - Reemplaza el contenido de los métodos
3. **Actualiza las variables de entorno** - Configura las nuevas credenciales
4. **Testea exhaustivamente** - Verifica que todo funciona

El resto de la aplicación no necesita cambios porque usa la misma interfaz del servicio.

---

## 📝 Notas Finales

- La implementación actual con **LocalStorage** es solo para desarrollo
- Para producción, elige una de estas 3 opciones según tus necesidades
- Asegúrate de hacer backups regulares de tus datos
- Implementa autenticación robusta en producción
- Considera HTTPS y seguridad en todas las opciones
