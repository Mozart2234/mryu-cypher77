/**
 * TYPES: Guest Messages
 *
 * Tipos TypeScript para el sistema de mensajes de invitados
 */

export type MessageType = 'wishes' | 'advice' | 'memory' | 'other';

export interface GuestMessage {
  id: string;
  reservationId: string;
  guestName: string;
  message: string;
  messageType: MessageType;
  isPublic: boolean;
  isBlocked: boolean;  // Admin puede bloquear mensajes inapropiados
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageDTO {
  reservationId: string;
  guestName: string;
  message: string;
  messageType?: MessageType;
  isPublic?: boolean;
}

export interface UpdateMessageDTO {
  message?: string;
  messageType?: MessageType;
  isPublic?: boolean;
}

// Para mapeo de base de datos (snake_case)
export interface GuestMessageDB {
  id: string;
  reservation_id: string;
  guest_name: string;
  message: string;
  message_type: MessageType;
  is_public: boolean;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
}
