/**
 * HOOK PARA MANEJO DE TOAST NOTIFICATIONS
 *
 * Hook personalizado para gestionar notificaciones toast
 */

import { useState, useCallback } from 'react';
import type { ToastProps, ToastType } from '@/components/Toast';

let toastIdCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback(
    (type: ToastType, message: string, description?: string, duration?: number) => {
      const id = `toast-${++toastIdCounter}`;
      const newToast: ToastProps = {
        id,
        type,
        message,
        description,
        duration,
        onClose: (toastId: string) => {
          setToasts((prev) => prev.filter((t) => t.id !== toastId));
        },
      };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const success = useCallback(
    (message: string, description?: string, duration?: number) => {
      showToast('success', message, description, duration);
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, description?: string, duration?: number) => {
      showToast('error', message, description, duration);
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, description?: string, duration?: number) => {
      showToast('warning', message, description, duration);
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, description?: string, duration?: number) => {
      showToast('info', message, description, duration);
    },
    [showToast]
  );

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    success,
    error,
    warning,
    info,
    closeToast,
  };
}
