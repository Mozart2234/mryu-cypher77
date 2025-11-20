/**
 * CONTEXTO DE AUTENTICACIÓN CON SUPABASE AUTH
 *
 * Maneja el estado de autenticación para el panel de administración.
 * Usa Supabase Auth para autenticación real con JWT.
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService, type AuthUser } from '@/services/authService';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializar desde localStorage para evitar flash durante HMR
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const stored = localStorage.getItem('auth_state');
    return stored ? JSON.parse(stored) : false;
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Sincronizar estado con localStorage
  useEffect(() => {
    localStorage.setItem('auth_state', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }, [user]);

  // Verificar sesión al cargar y escuchar cambios de auth
  useEffect(() => {
    // Verificar sesión inicial
    checkSession();

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const authUser = {
          id: session.user.id,
          email: session.user.email || '',
        };
        setUser(authUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    setLoading(true);
    const session = await authService.getSession();

    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email || '',
      });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error: string | null }> => {
    const { user: authUser, error } = await authService.login(email, password);

    if (error || !authUser) {
      return { success: false, error: error || 'Error al iniciar sesión' };
    }

    setUser(authUser);
    setIsAuthenticated(true);
    return { success: true, error: null };
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    // Limpiar localStorage
    localStorage.removeItem('auth_state');
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
