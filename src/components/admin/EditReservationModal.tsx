/**
 * COMPONENTE MODAL DE EDICIÓN DE RESERVACIÓN
 *
 * Permite al admin editar cualquier detalle de una reservación
 */

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { reservationService } from '@/services/reservationService';
import type { Reservation, ReservationStatus } from '@/types/reservation';
import { X, Save } from 'lucide-react';

interface EditReservationModalProps {
  reservation: Reservation;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditReservationModal({ reservation, onClose, onSuccess }: EditReservationModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    guestName: reservation.guestName,
    numberOfGuests: reservation.numberOfGuests,
    accompanistNames: reservation.accompanistNames || [],
    status: reservation.status,
    table: reservation.table || '',
    group: reservation.group || '',
    notes: reservation.notes || ''
  });

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validaciones
      if (!formData.guestName.trim()) {
        toast.error('El nombre del invitado es requerido');
        setLoading(false);
        return;
      }

      if (formData.numberOfGuests < 1) {
        toast.error('Debe haber al menos 1 persona');
        setLoading(false);
        return;
      }

      // Actualizar reservación
      await reservationService.update(reservation.id, {
        guestName: formData.guestName.trim(),
        numberOfGuests: formData.numberOfGuests,
        accompanistNames: formData.accompanistNames.filter(name => name.trim() !== ''),
        status: formData.status,
        table: formData.table.trim() || undefined,
        group: formData.group.trim() || undefined,
        notes: formData.notes.trim() || undefined
      });

      toast.success('Reservación actualizada', {
        description: 'Los cambios se guardaron correctamente'
      });

      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Error al actualizar', {
        description: error instanceof Error ? error.message : 'Intenta de nuevo'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAccompanistChange = (index: number, value: string) => {
    const updated = [...formData.accompanistNames];
    updated[index] = value;
    setFormData({ ...formData, accompanistNames: updated });
  };

  const addAccompanist = () => {
    if (formData.accompanistNames.length < formData.numberOfGuests - 1) {
      setFormData({
        ...formData,
        accompanistNames: [...formData.accompanistNames, '']
      });
    }
  };

  const removeAccompanist = (index: number) => {
    const updated = formData.accompanistNames.filter((_, i) => i !== index);
    setFormData({ ...formData, accompanistNames: updated });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Editar Reservación</h2>
            <p className="text-sm text-gray-500 mt-1">Código: {reservation.code}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre del invitado */}
          <div>
            <label className="label">
              Nombre del Invitado Principal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input"
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              required
            />
          </div>

          {/* Número de personas */}
          <div>
            <label className="label">
              Número de Personas <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="input"
              min="1"
              max="10"
              value={formData.numberOfGuests}
              onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Incluye al invitado principal y sus acompañantes
            </p>
          </div>

          {/* Acompañantes */}
          {formData.numberOfGuests > 1 && (
            <div>
              <label className="label">
                Nombres de Acompañantes (opcional)
              </label>
              <div className="space-y-2">
                {formData.accompanistNames.map((name, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder={`Acompañante ${index + 1}`}
                      value={name}
                      onChange={(e) => handleAccompanistChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeAccompanist(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.accompanistNames.length < formData.numberOfGuests - 1 && (
                  <button
                    type="button"
                    onClick={addAccompanist}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Agregar acompañante
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Estado */}
          <div>
            <label className="label">
              Estado <span className="text-red-500">*</span>
            </label>
            <select
              className="input"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ReservationStatus })}
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="ingreso-registrado">Ingreso Registrado</option>
            </select>
          </div>

          {/* Mesa y Grupo */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Mesa (opcional)</label>
              <input
                type="text"
                className="input"
                placeholder="Ej: Mesa 5"
                value={formData.table}
                onChange={(e) => setFormData({ ...formData, table: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Grupo (opcional)</label>
              <input
                type="text"
                className="input"
                placeholder="Ej: Familia, Amigos"
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
              />
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="label">Notas (opcional)</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Notas adicionales sobre esta reservación..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
