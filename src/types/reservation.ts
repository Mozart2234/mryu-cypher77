/**
 * TIPOS Y DEFINICIONES
 *
 * Define la estructura de datos para las reservaciones
 */

export type ReservationStatus = 'pendiente' | 'confirmada' | 'ingreso-registrado';

export interface Accompanist {
  name: string;
  willAttend: boolean; // Si confirmó asistencia
}

export interface Reservation {
  id: string;
  code: string; // Código único para el QR
  guestName: string;
  numberOfGuests: number; // Total de pases otorgados
  accompanistNames?: string[]; // DEPRECATED: mantener por compatibilidad
  accompanists?: Accompanist[]; // Nuevo: acompañantes con confirmación individual
  mainGuestAttending: boolean; // Si el invitado principal asiste
  status: ReservationStatus;
  table?: string; // Opcional: número de mesa
  group?: string; // Opcional: familia, grupo, etc.
  notes?: string; // Opcional: notas adicionales
  createdAt: string;
  updatedAt: string;
  checkedInAt?: string; // Timestamp del check-in
}

export interface CreateReservationDTO {
  guestName: string;
  numberOfGuests: number;
  accompanistNames?: string[]; // DEPRECATED
  accompanists?: Accompanist[];
  mainGuestAttending?: boolean;
  table?: string;
  group?: string;
  notes?: string;
}

export interface UpdateReservationDTO {
  guestName?: string;
  numberOfGuests?: number;
  accompanistNames?: string[]; // DEPRECATED
  accompanists?: Accompanist[];
  mainGuestAttending?: boolean;
  status?: ReservationStatus;
  table?: string;
  group?: string;
  notes?: string;
}

export interface ReservationStats {
  totalReservations: number;
  totalGuests: number; // Total de pases otorgados
  confirmedAttendees: number; // Total de personas que confirmaron asistencia
  availableSpots: number;
  pendingReservations: number;
  confirmedReservations: number;
  checkedInReservations: number;
}
