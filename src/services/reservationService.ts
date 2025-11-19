/**
 * SERVICIO DE RESERVACIONES - SUPABASE
 *
 * Gestiona todas las operaciones CRUD de reservaciones usando Supabase
 */

import { supabase } from '@/lib/supabase';
import { eventConfig } from '@/config/eventConfig';
import type {
  Reservation,
  CreateReservationDTO,
  UpdateReservationDTO,
  ReservationStats,
  ReservationStatus
} from '@/types/reservation';

/**
 * Genera un código único para el QR
 */
function generateCode(): string {
  const prefix = 'WED';
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${random}`;
}

/**
 * Convierte un registro de Supabase al formato de Reservation
 */
function mapFromDatabase(record: any): Reservation {
  return {
    id: record.id,
    code: record.code,
    guestName: record.guest_name,
    numberOfGuests: record.number_of_guests,
    accompanistNames: record.accompanist_names,
    accompanists: record.accompanists ? JSON.parse(record.accompanists) : undefined,
    mainGuestAttending: record.main_guest_attending ?? true,
    status: record.status,
    table: record.table,
    group: record.group,
    notes: record.notes,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    checkedInAt: record.checked_in_at
  };
}

/**
 * Convierte un DTO al formato de la base de datos
 */
function mapToDatabase(data: Partial<Reservation>): any {
  const dbData: any = {};

  if (data.code !== undefined) dbData.code = data.code;
  if (data.guestName !== undefined) dbData.guest_name = data.guestName;
  if (data.numberOfGuests !== undefined) dbData.number_of_guests = data.numberOfGuests;
  if (data.accompanistNames !== undefined) dbData.accompanist_names = data.accompanistNames;
  if (data.accompanists !== undefined) dbData.accompanists = JSON.stringify(data.accompanists);
  if (data.mainGuestAttending !== undefined) dbData.main_guest_attending = data.mainGuestAttending;
  if (data.status !== undefined) dbData.status = data.status;
  if (data.table !== undefined) dbData.table = data.table;
  if (data.group !== undefined) dbData.group = data.group;
  if (data.notes !== undefined) dbData.notes = data.notes;
  if (data.checkedInAt !== undefined) dbData.checked_in_at = data.checkedInAt;

  return dbData;
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

    // Generar código único
    let code = generateCode();
    let isUnique = false;
    let attempts = 0;

    // Intentar hasta encontrar un código único
    while (!isUnique && attempts < 10) {
      const { data: existing } = await supabase
        .from('reservations')
        .select('id')
        .eq('code', code)
        .single();

      if (!existing) {
        isUnique = true;
      } else {
        code = generateCode();
        attempts++;
      }
    }

    if (!isUnique) {
      throw new Error('No se pudo generar un código único. Intente de nuevo.');
    }

    // Crear la reservación
    const insertData = mapToDatabase({
      code,
      guestName: data.guestName.trim(),
      numberOfGuests: data.numberOfGuests,
      accompanistNames: data.accompanistNames,
      status: 'pendiente',
      table: data.table?.trim(),
      group: data.group?.trim(),
      notes: data.notes?.trim()
    });

    const { data: created, error } = await supabase
      .from('reservations')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating reservation:', error);
      throw new Error(`Error al crear la reservación: ${error.message}`);
    }

    return mapFromDatabase(created);
  },

  /**
   * Obtiene todas las reservaciones
   */
  async getAll(): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reservations:', error);
      throw new Error(`Error al obtener reservaciones: ${error.message}`);
    }

    return (data || []).map(mapFromDatabase);
  },

  /**
   * Obtiene una reservación por ID
   */
  async getById(id: string): Promise<Reservation | null> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Error fetching reservation:', error);
      throw new Error(`Error al obtener la reservación: ${error.message}`);
    }

    return mapFromDatabase(data);
  },

  /**
   * Obtiene una reservación por código (para check-in con QR)
   */
  async getByCode(code: string): Promise<Reservation | null> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Error fetching reservation by code:', error);
      throw new Error(`Error al obtener la reservación: ${error.message}`);
    }

    return mapFromDatabase(data);
  },

  /**
   * Busca reservación por código (alias de getByCode)
   */
  async findByCode(code: string): Promise<Reservation | null> {
    return this.getByCode(code);
  },

  /**
   * Actualiza una reservación
   */
  async update(id: string, data: UpdateReservationDTO): Promise<Reservation> {
    // Primero obtener la reservación actual
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('Reservación no encontrada');
    }

    // Si está cambiando el número de invitados, verificar capacidad
    if (data.numberOfGuests && data.numberOfGuests !== existing.numberOfGuests) {
      const stats = await this.getStats();
      const difference = data.numberOfGuests - existing.numberOfGuests;
      const newTotal = stats.totalGuests + difference;

      if (newTotal > eventConfig.maxCapacity) {
        throw new Error('La actualización excedería la capacidad máxima');
      }
    }

    const updateData = mapToDatabase(data);

    const { data: updated, error } = await supabase
      .from('reservations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating reservation:', error);
      throw new Error(`Error al actualizar la reservación: ${error.message}`);
    }

    return mapFromDatabase(updated);
  },

  /**
   * Marca una reservación como ingresada (check-in)
   */
  async checkIn(id: string): Promise<Reservation> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('Reservación no encontrada');
    }

    if (existing.status === 'ingreso-registrado') {
      throw new Error('Esta reservación ya fue utilizada');
    }

    const { data: updated, error } = await supabase
      .from('reservations')
      .update({
        status: 'ingreso-registrado',
        checked_in_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error checking in reservation:', error);
      throw new Error(`Error al registrar el ingreso: ${error.message}`);
    }

    return mapFromDatabase(updated);
  },

  /**
   * Elimina una reservación
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting reservation:', error);
      throw new Error(`Error al eliminar la reservación: ${error.message}`);
    }
  },

  /**
   * Busca reservaciones por nombre
   */
  async search(query: string): Promise<Reservation[]> {
    const lowerQuery = query.toLowerCase();

    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .or(`guest_name.ilike.%${lowerQuery}%,code.ilike.%${lowerQuery}%,group.ilike.%${lowerQuery}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching reservations:', error);
      throw new Error(`Error al buscar reservaciones: ${error.message}`);
    }

    return (data || []).map(mapFromDatabase);
  },

  /**
   * Filtra reservaciones por estado
   */
  async filterByStatus(status: ReservationStatus): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error filtering reservations:', error);
      throw new Error(`Error al filtrar reservaciones: ${error.message}`);
    }

    return (data || []).map(mapFromDatabase);
  },

  /**
   * Obtiene estadísticas de las reservaciones
   */
  async getStats(): Promise<ReservationStats> {
    const { data, error} = await supabase
      .from('reservations')
      .select('number_of_guests, status, main_guest_attending, accompanists');

    if (error) {
      console.error('Error getting stats:', error);
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }

    const reservations = data || [];
    const totalGuests = reservations.reduce((sum, r) => sum + r.number_of_guests, 0);

    // Calcular asistentes confirmados
    let confirmedAttendees = 0;
    for (const r of reservations) {
      // Si tiene sistema nuevo de acompañantes
      if (r.accompanists) {
        try {
          const accompanists = JSON.parse(r.accompanists);
          // Contar invitado principal si asiste
          if (r.main_guest_attending !== false) {
            confirmedAttendees += 1;
          }
          // Contar acompañantes que confirmaron
          confirmedAttendees += accompanists.filter((a: any) => a.willAttend).length;
        } catch (e) {
          // Si falla el parse, asumir que asisten todos
          confirmedAttendees += r.number_of_guests;
        }
      } else {
        // Sistema antiguo: si está confirmada, asumen todos
        if (r.status === 'confirmada' || r.status === 'ingreso-registrado') {
          confirmedAttendees += r.number_of_guests;
        }
      }
    }

    return {
      totalReservations: reservations.length,
      totalGuests,
      confirmedAttendees,
      availableSpots: eventConfig.maxCapacity - totalGuests,
      pendingReservations: reservations.filter((r: any) => r.status === 'pendiente').length,
      confirmedReservations: reservations.filter((r: any) => r.status === 'confirmada').length,
      checkedInReservations: reservations.filter((r: any) => r.status === 'ingreso-registrado').length
    };
  },

  /**
   * Limpia todas las reservaciones (útil para desarrollo/testing)
   * CUIDADO: Esto eliminará TODAS las reservaciones
   */
  async clearAll(): Promise<void> {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Eliminar todas

    if (error) {
      console.error('Error clearing reservations:', error);
      throw new Error(`Error al limpiar reservaciones: ${error.message}`);
    }
  }
};
