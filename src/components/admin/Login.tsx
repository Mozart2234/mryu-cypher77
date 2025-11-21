/**
 * COMPONENTE LOGIN CON SUPABASE AUTH
 *
 * Formulario de autenticación para acceder al panel de administración
 * Usa Supabase Auth - Refactorizado con React Hook Form
 */

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { success, error: loginError } = await login(data.email, data.password);

      if (success) {
        toast.success('Sesión iniciada correctamente');
        navigate('/admin');
      } else {
        toast.error('Error al iniciar sesión', {
          description: loginError || 'Credenciales incorrectas'
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Error inesperado al iniciar sesión', {
        description: 'Por favor intenta de nuevo'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-dark">Panel de Administración</h2>
            <p className="text-gray-600 mt-2">Ingresa con tu cuenta Supabase</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                {...register('email', {
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                type="email"
                className="input"
                placeholder="admin@example.com"
                autoComplete="email"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="label">
                <Lock className="w-4 h-4 inline mr-2" />
                Contraseña
              </label>
              <input
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'Mínimo 6 caracteres'
                  }
                })}
                type="password"
                className="input"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              <strong>Nota:</strong> Ahora usa Supabase Auth. Crea un usuario en el dashboard de Supabase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
