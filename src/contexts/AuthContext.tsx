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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificar sesión al cargar y escuchar cambios de auth
  useEffect(() => {
    // Verificar sesión inicial
    checkSession();

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
