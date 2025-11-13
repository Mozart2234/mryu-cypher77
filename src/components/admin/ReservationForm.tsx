/**
 * COMPONENTE FORMULARIO DE RESERVACIÓN
 *
 * Formulario para crear nuevas reservaciones manualmente
 */

import { useState, FormEvent } from 'react';
import { reservationService } from '@/services/reservationService';
import type { CreateReservationDTO } from '@/types/reservation';
import { UserPlus, Users, Table, UsersRound, FileText } from 'lucide-react';

interface ReservationFormProps {
  onSuccess: () => void;
}

export function ReservationForm({ onSuccess }: ReservationFormProps) {
  const [formData, setFormData] = useState<CreateReservationDTO>({
    guestName: '',
    numberOfGuests: 1,
    table: '',
    group: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await reservationService.create(formData);

      // Limpiar formulario
      setFormData({
        guestName: '',
        numberOfGuests: 1,
        table: '',
        group: '',
        notes: ''
      });

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear reservación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="flex items-center mb-6">
        <UserPlus className="w-6 h-6 text-primary mr-3" />
        <h3 className="text-xl font-semibold">Nueva Reservación</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Nombre del invitado */}
        <div className="md:col-span-2">
          <label className="label">
            <Users className="w-4 h-4 inline mr-2" />
            Nombre del invitado principal *
          </label>
          <input
            type="text"
            className="input"
            value={formData.guestName}
            onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
            placeholder="Ej: Juan Pérez"
            required
          />
        </div>

        {/* Número de personas */}
        <div>
          <label className="label">
            <UsersRound className="w-4 h-4 inline mr-2" />
            Número de personas *
          </label>
          <input
            type="number"
            className="input"
            min="1"
            max="10"
            value={formData.numberOfGuests}
            onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 10 personas por reservación</p>
        </div>

        {/* Mesa */}
        <div>
          <label className="label">
            <Table className="w-4 h-4 inline mr-2" />
            Mesa (opcional)
          </label>
          <input
            type="text"
            className="input"
            value={formData.table}
            onChange={(e) => setFormData({ ...formData, table: e.target.value })}
            placeholder="Ej: Mesa 5"
          />
        </div>

        {/* Grupo/Familia */}
        <div>
          <label className="label">Grupo/Familia (opcional)</label>
          <input
            type="text"
            className="input"
            value={formData.group}
            onChange={(e) => setFormData({ ...formData, group: e.target.value })}
            placeholder="Ej: Familia Pérez"
          />
        </div>

        {/* Notas */}
        <div>
          <label className="label">
            <FileText className="w-4 h-4 inline mr-2" />
            Notas (opcional)
          </label>
          <textarea
            className="input"
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Ej: Requiere silla alta para bebé"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creando...' : 'Crear Reservación'}
        </button>
      </div>
    </form>
  );
}
