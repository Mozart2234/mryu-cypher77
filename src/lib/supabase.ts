/**
 * CLIENTE SUPABASE
 *
 * Configuración del cliente de Supabase para la base de datos
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qbcajeoppzgfmwurltoc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiY2FqZW9wcHpnZm13dXJsdG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMDA5MzMsImV4cCI6MjA3ODU3NjkzM30.pW8GfWuiOgopwooiXt4GmE16NcXTmi7qJChrAHAYchA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Tipos de la base de datos
 */
export interface Database {
  public: {
    Tables: {
      reservations: {
        Row: {
          id: string;
          code: string;
          guest_name: string;
          number_of_guests: number;
          accompanist_names: string[] | null;
          status: 'pendiente' | 'confirmada' | 'ingreso-registrado';
          table: string | null;
          group: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          checked_in_at: string | null;
        };
        Insert: {
          id?: string;
          code: string;
          guest_name: string;
          number_of_guests: number;
          accompanist_names?: string[] | null;
          status?: 'pendiente' | 'confirmada' | 'ingreso-registrado';
          table?: string | null;
          group?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          checked_in_at?: string | null;
        };
        Update: {
          id?: string;
          code?: string;
          guest_name?: string;
          number_of_guests?: number;
          accompanist_names?: string[] | null;
          status?: 'pendiente' | 'confirmada' | 'ingreso-registrado';
          table?: string | null;
          group?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          checked_in_at?: string | null;
        };
      };
    };
  };
}
