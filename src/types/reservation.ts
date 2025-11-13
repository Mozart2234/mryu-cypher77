/**
 * TIPOS Y DEFINICIONES
 *
 * Define la estructura de datos para las reservaciones
 */

export type ReservationStatus = 'pendiente' | 'confirmada' | 'ingreso-registrado';

export interface Reservation {
  id: string;
  code: string; // Código único para el QR
  guestName: string;
  numberOfGuests: number;
  accompanistNames?: string[]; // Array de nombres de acompañantes
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
  accompanistNames?: string[];
  table?: string;
  group?: string;
  notes?: string;
}

export interface UpdateReservationDTO {
  guestName?: string;
  numberOfGuests?: number;
  accompanistNames?: string[];
  status?: ReservationStatus;
  table?: string;
  group?: string;
  notes?: string;
}

export interface ReservationStats {
  totalReservations: number;
  totalGuests: number;
  availableSpots: number;
  pendingReservations: number;
  confirmedReservations: number;
  checkedInReservations: number;
}
