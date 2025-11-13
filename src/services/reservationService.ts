/**
 * SERVICIO DE RESERVACIONES
 *
 * Este servicio maneja toda la lógica de persistencia de reservaciones.
 * Implementación actual: LocalStorage (para desarrollo)
 *
 * CÓMO CAMBIAR LA ESTRATEGIA DE PERSISTENCIA:
 * 1. Mantén la misma interfaz (métodos públicos)
 * 2. Cambia la implementación interna de cada método
 * 3. Ver archivo PERSISTENCE_OPTIONS.md para ejemplos de implementación
 *    con API REST, Firebase, Supabase o Google Sheets
 */

import { eventConfig } from '@/config/eventConfig';
import type {
  Reservation,
  CreateReservationDTO,
  UpdateReservationDTO,
  ReservationStats,
  ReservationStatus
} from '@/types/reservation';

const STORAGE_KEY = 'wedding_reservations';

/**
 * Genera un ID único para la reservación
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Genera un código único para el QR (más corto y legible)
 */
function generateCode(): string {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

/**
 * Obtiene todas las reservaciones del storage
 */
function getReservationsFromStorage(): Reservation[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Guarda las reservaciones en el storage
 */
function saveReservationsToStorage(reservations: Reservation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}

export const reservationService = {
  /**
   * Crea una nueva reservación
   */
  async create(data: CreateReservationDTO): Promise<Reservation> {
    // Validaciones
    if (!data.guestName || data.guestName.trim().length === 0) {
      throw new Error('El nombre del invitado es requerido');
    }

    if (!data.numberOfGuests || data.numberOfGuests < 1) {
      throw new Error('Debe especificar al menos 1 persona');
    }

    // VALIDACIÓN: Máximo de personas por reservación (ajustable)
    const MAX_GUESTS_PER_RESERVATION = 10;
    if (data.numberOfGuests > MAX_GUESTS_PER_RESERVATION) {
      throw new Error(`Máximo ${MAX_GUESTS_PER_RESERVATION} personas por reservación`);
    }

    // Verificar capacidad disponible
    const stats = await this.getStats();
    const newTotal = stats.totalGuests + data.numberOfGuests;
    if (newTotal > eventConfig.maxCapacity) {
      throw new Error(
        `No hay suficiente capacidad. Disponible: ${stats.availableSpots}, Solicitado: ${data.numberOfGuests}`
      );
    }

    const now = new Date().toISOString();
    const newReservation: Reservation = {
      id: generateId(),
      code: generateCode(),
      guestName: data.guestName.trim(),
      numberOfGuests: data.numberOfGuests,
      status: 'pendiente',
      table: data.table?.trim(),
      group: data.group?.trim(),
      notes: data.notes?.trim(),
      createdAt: now,
      updatedAt: now
    };

    const reservations = getReservationsFromStorage();
    reservations.push(newReservation);
    saveReservationsToStorage(reservations);

    return newReservation;
  },

  /**
   * Obtiene todas las reservaciones
   */
  async getAll(): Promise<Reservation[]> {
    return getReservationsFromStorage();
  },

  /**
   * Obtiene una reservación por ID
   */
  async getById(id: string): Promise<Reservation | null> {
    const reservations = getReservationsFromStorage();
    return reservations.find(r => r.id === id) || null;
  },

  /**
   * Obtiene una reservación por código (para check-in con QR)
   */
  async getByCode(code: string): Promise<Reservation | null> {
    const reservations = getReservationsFromStorage();
    return reservations.find(r => r.code.toUpperCase() === code.toUpperCase()) || null;
  },

  /**
   * Actualiza una reservación
   */
  async update(id: string, data: UpdateReservationDTO): Promise<Reservation> {
    const reservations = getReservationsFromStorage();
    const index = reservations.findIndex(r => r.id === id);

    if (index === -1) {
      throw new Error('Reservación no encontrada');
    }

    // Si está cambiando el número de invitados, verificar capacidad
    if (data.numberOfGuests && data.numberOfGuests !== reservations[index].numberOfGuests) {
      const stats = await this.getStats();
      const currentGuests = reservations[index].numberOfGuests;
      const difference = data.numberOfGuests - currentGuests;
      const newTotal = stats.totalGuests + difference;

      if (newTotal > eventConfig.maxCapacity) {
        throw new Error('La actualización excedería la capacidad máxima');
      }
    }

    const updated: Reservation = {
      ...reservations[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    reservations[index] = updated;
    saveReservationsToStorage(reservations);

    return updated;
  },

  /**
   * Marca una reservación como ingresada (check-in)
   */
  async checkIn(id: string): Promise<Reservation> {
    const reservations = getReservationsFromStorage();
    const index = reservations.findIndex(r => r.id === id);

    if (index === -1) {
      throw new Error('Reservación no encontrada');
    }

    if (reservations[index].status === 'ingreso-registrado') {
      throw new Error('Esta reservación ya fue utilizada');
    }

    const updated: Reservation = {
      ...reservations[index],
      status: 'ingreso-registrado',
      checkedInAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    reservations[index] = updated;
    saveReservationsToStorage(reservations);

    return updated;
  },

  /**
   * Elimina una reservación
   */
  async delete(id: string): Promise<void> {
    const reservations = getReservationsFromStorage();
    const filtered = reservations.filter(r => r.id !== id);

    if (filtered.length === reservations.length) {
      throw new Error('Reservación no encontrada');
    }

    saveReservationsToStorage(filtered);
  },

  /**
   * Busca reservaciones por nombre
   */
  async search(query: string): Promise<Reservation[]> {
    const reservations = getReservationsFromStorage();
    const lowerQuery = query.toLowerCase();

    return reservations.filter(r =>
      r.guestName.toLowerCase().includes(lowerQuery) ||
      r.code.toLowerCase().includes(lowerQuery) ||
      r.group?.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Filtra reservaciones por estado
   */
  async filterByStatus(status: ReservationStatus): Promise<Reservation[]> {
    const reservations = getReservationsFromStorage();
    return reservations.filter(r => r.status === status);
  },

  /**
   * Obtiene estadísticas de las reservaciones
   */
  async getStats(): Promise<ReservationStats> {
    const reservations = getReservationsFromStorage();
    const totalGuests = reservations.reduce((sum, r) => sum + r.numberOfGuests, 0);

    return {
      totalReservations: reservations.length,
      totalGuests,
      availableSpots: eventConfig.maxCapacity - totalGuests,
      pendingReservations: reservations.filter(r => r.status === 'pendiente').length,
      confirmedReservations: reservations.filter(r => r.status === 'confirmada').length,
      checkedInReservations: reservations.filter(r => r.status === 'ingreso-registrado').length
    };
  },

  /**
   * Limpia todas las reservaciones (útil para desarrollo/testing)
   */
  async clearAll(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }
};
