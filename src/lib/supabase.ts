/**
 * CLIENTE SUPABASE
 *
 * Configuración del cliente de Supabase para la base de datos
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  );
}

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
