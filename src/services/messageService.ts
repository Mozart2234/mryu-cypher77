/**
 * SERVICIO DE MENSAJES DE INVITADOS - SUPABASE
 *
 * Gestiona todas las operaciones CRUD de mensajes de invitados usando Supabase
 */

import { supabase } from '@/lib/supabase';
import type {
  GuestMessage,
  GuestMessageDB,
  CreateMessageDTO,
  UpdateMessageDTO
} from '@/types/message';

/**
 * Convierte un registro de Supabase al formato de GuestMessage
 */
function mapFromDatabase(record: GuestMessageDB): GuestMessage {
  return {
    id: record.id,
    reservationId: record.reservation_id,
    guestName: record.guest_name,
    message: record.message,
    messageType: record.message_type,
    isPublic: record.is_public,
    isBlocked: record.is_blocked,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  };
}

/**
 * Convierte un DTO al formato de la base de datos
 */
function mapToDatabase(data: Partial<GuestMessage>): Partial<GuestMessageDB> {
  const dbData: any = {};

  if (data.reservationId !== undefined) dbData.reservation_id = data.reservationId;
  if (data.guestName !== undefined) dbData.guest_name = data.guestName;
  if (data.message !== undefined) dbData.message = data.message;
  if (data.messageType !== undefined) dbData.message_type = data.messageType;
  if (data.isPublic !== undefined) dbData.is_public = data.isPublic;
  if (data.isBlocked !== undefined) dbData.is_blocked = data.isBlocked;

  return dbData;
}

export const messageService = {
  /**
   * Crea un nuevo mensaje de invitado
   */
  async create(data: CreateMessageDTO): Promise<GuestMessage> {
    // Validaciones
    if (!data.guestName || data.guestName.trim().length === 0) {
      throw new Error('El nombre del invitado es requerido');
    }

    if (!data.message || data.message.trim().length === 0) {
      throw new Error('El mensaje no puede estar vacío');
    }

    if (data.message.length > 500) {
      throw new Error('El mensaje no puede exceder 500 caracteres');
    }

    if (!data.reservationId) {
      throw new Error('ID de reservación es requerido');
    }

    const messageData: Partial<GuestMessage> = {
      reservationId: data.reservationId,
      guestName: data.guestName,
      message: data.message.trim(),
      messageType: data.messageType || 'wishes',
      isPublic: data.isPublic !== undefined ? data.isPublic : true,
      isBlocked: false // Por defecto NO bloqueado
    };

    const dbData = mapToDatabase(messageData);

    const { data: newMessage, error } = await supabase
      .from('guest_messages')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Error creating message:', error);
      throw new Error(`Error al crear mensaje: ${error.message}`);
    }

    return mapFromDatabase(newMessage);
  },

  /**
   * Obtiene un mensaje por ID
   */
  async getById(id: string): Promise<GuestMessage | null> {
    const { data, error } = await supabase
      .from('guest_messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No encontrado
      }
      console.error('Error fetching message:', error);
      throw new Error(`Error al obtener mensaje: ${error.message}`);
    }

    return mapFromDatabase(data);
  },

  /**
   * Obtiene todos los mensajes de una reservación
   */
  async getByReservationId(reservationId: string): Promise<GuestMessage[]> {
    const { data, error } = await supabase
      .from('guest_messages')
      .select('*')
      .eq('reservation_id', reservationId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages by reservation:', error);
      throw new Error(`Error al obtener mensajes: ${error.message}`);
    }

    return data.map(mapFromDatabase);
  },

  /**
   * Obtiene todos los mensajes (para admin)
   */
  async getAll(): Promise<GuestMessage[]> {
    const { data, error } = await supabase
      .from('guest_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all messages:', error);
      throw new Error(`Error al obtener mensajes: ${error.message}`);
    }

    return data.map(mapFromDatabase);
  },

  /**
   * Obtiene solo mensajes públicos y NO bloqueados (para muro público)
   */
  async getPublicMessages(): Promise<GuestMessage[]> {
    const { data, error } = await supabase
      .from('guest_messages')
      .select('*')
      .eq('is_public', true)
      .eq('is_blocked', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public messages:', error);
      throw new Error(`Error al obtener mensajes públicos: ${error.message}`);
    }

    return data.map(mapFromDatabase);
  },

  /**
   * Bloquea o desbloquea un mensaje (toggle)
   */
  async toggleBlocked(id: string): Promise<GuestMessage> {
    // Primero obtener el mensaje actual
    const currentMessage = await this.getById(id);
    if (!currentMessage) {
      throw new Error('Mensaje no encontrado');
    }

    // Toggle el estado
    const newBlockedState = !currentMessage.isBlocked;

    const { data, error } = await supabase
      .from('guest_messages')
      .update({ is_blocked: newBlockedState, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling blocked status:', error);
      throw new Error(`Error al cambiar estado del mensaje: ${error.message}`);
    }

    return mapFromDatabase(data);
  },

  /**
   * Actualiza un mensaje
   */
  async update(id: string, data: UpdateMessageDTO): Promise<GuestMessage> {
    if (data.message && data.message.length > 500) {
      throw new Error('El mensaje no puede exceder 500 caracteres');
    }

    const dbData = mapToDatabase(data as Partial<GuestMessage>);
    dbData.updated_at = new Date().toISOString();

    const { data: updatedMessage, error } = await supabase
      .from('guest_messages')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating message:', error);
      throw new Error(`Error al actualizar mensaje: ${error.message}`);
    }

    return mapFromDatabase(updatedMessage);
  },

  /**
   * Elimina un mensaje permanentemente
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('guest_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
      throw new Error(`Error al eliminar mensaje: ${error.message}`);
    }
  },

  /**
   * Obtiene estadísticas de mensajes
   */
  async getStats(): Promise<{
    total: number;
    public: number;
    private: number;
    blocked: number;
    active: number;
  }> {
    const { data, error } = await supabase
      .from('guest_messages')
      .select('is_public, is_blocked');

    if (error) {
      console.error('Error fetching message stats:', error);
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }

    const total = data.length;
    const publicMessages = data.filter(m => m.is_public).length;
    const privateMessages = data.filter(m => !m.is_public).length;
    const blocked = data.filter(m => m.is_blocked).length;
    const active = data.filter(m => !m.is_blocked).length;

    return {
      total,
      public: publicMessages,
      private: privateMessages,
      blocked,
      active
    };
  }
};
