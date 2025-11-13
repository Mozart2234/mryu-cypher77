/**
 * CONTEXTO DE AUTENTICACIÓN
 *
 * Maneja el estado de autenticación para el panel de administración.
 * Implementación simple con credenciales en configuración.
 *
 * PARA PRODUCCIÓN:
 * - Implementar autenticación con JWT
 * - Usar un servicio de autenticación (Auth0, Firebase Auth, etc.)
 * - Almacenar tokens de forma segura
 * - Implementar refresh tokens
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { eventConfig } from '@/config/eventConfig';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'wedding_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verificar si hay una sesión activa al cargar
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const { username: validUser, password: validPass } = eventConfig.admin.credentials;

    if (username === validUser && password === validPass) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
