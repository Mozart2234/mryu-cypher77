/**
 * SISTEMA DE TOAST NOTIFICATIONS
 *
 * Componente de notificaciones toast estilo periódico
 * con soporte para success, error, warning, e info
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-600',
    icon: 'text-green-600',
    text: 'text-green-900',
    textSecondary: 'text-green-700',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-600',
    icon: 'text-red-600',
    text: 'text-red-900',
    textSecondary: 'text-red-700',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-600',
    icon: 'text-yellow-600',
    text: 'text-yellow-900',
    textSecondary: 'text-yellow-700',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-600',
    icon: 'text-blue-600',
    text: 'text-blue-900',
    textSecondary: 'text-blue-700',
  },
};

export function Toast({ id, type, message, description, duration = 5000, onClose }: ToastProps) {
  const Icon = toastIcons[type];
  const styles = toastStyles[type];

  useEffect(() => {
    if (duration === 0) return; // No auto-close si duration es 0

    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const toastContent = (
    <div
      className={`
        ${styles.bg} ${styles.border}
        border-2 shadow-xl rounded-lg p-4 mb-4 max-w-md w-full
        animate-slide-in-right
        flex items-start gap-3
      `}
      role="alert"
      aria-live="assertive"
    >
      <Icon className={`w-6 h-6 ${styles.icon} shrink-0 mt-0.5`} aria-hidden="true" />

      <div className="flex-1 min-w-0">
        <p className={`font-headline text-sm font-bold ${styles.text} mb-1`}>
          {message}
        </p>
        {description && (
          <p className={`font-sans text-xs ${styles.textSecondary} leading-relaxed`}>
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => onClose(id)}
        className={`
          ${styles.icon} hover:opacity-70 transition-opacity shrink-0
          focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg p-1
        `}
        aria-label="Cerrar notificación"
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );

  return createPortal(
    toastContent,
    document.body
  );
}

/**
 * Contenedor de toasts (debe montarse en la raíz de la app)
 */
export function ToastContainer({ toasts, onClose }: {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  const containerContent = (
    <div
      className="fixed top-4 right-4 z-[9999] pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      <div className="flex flex-col items-end pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </div>
    </div>
  );

  return createPortal(containerContent, document.body);
}
