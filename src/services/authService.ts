/**
 * SERVICIO DE AUTENTICACIÓN CON SUPABASE AUTH
 *
 * Implementación de autenticación real usando Supabase Auth
 */

import { supabase } from '../lib/supabase';

export interface AuthUser {
  id: string;
  email: string;
}

export const authService = {
  /**
   * Login con email y password
   */
  async login(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (!data.user) {
        return { user: null, error: 'No se pudo iniciar sesión' };
      }

      return {
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
        error: null,
      };
    } catch (err) {
      console.error('Error en login:', err);
      return { user: null, error: 'Error al iniciar sesión' };
    }
  },

  /**
   * Logout
   */
  async logout(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (err) {
      console.error('Error en logout:', err);
      return { error: 'Error al cerrar sesión' };
    }
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return null;

      return {
        id: user.id,
        email: user.email || '',
      };
    } catch (err) {
      console.error('Error obteniendo usuario:', err);
      return null;
    }
  },

  /**
   * Verificar si hay una sesión activa
   */
  async getSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (err) {
      console.error('Error obteniendo sesión:', err);
      return null;
    }
  },

  /**
   * Registro de nuevo usuario (solo para admins)
   */
  async signUp(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (!data.user) {
        return { user: null, error: 'No se pudo crear el usuario' };
      }

      return {
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
        error: null,
      };
    } catch (err) {
      console.error('Error en signUp:', err);
      return { user: null, error: 'Error al crear usuario' };
    }
  },
};
