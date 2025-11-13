/**
 * COMPONENTE FORMULARIO DE RESERVACIÓN
 *
 * Formulario para crear nuevas reservaciones manualmente
 */

import { useState, FormEvent } from 'react';
import { reservationService } from '@/services/reservationService';
import { eventConfig } from '@/config/eventConfig';
import type { CreateReservationDTO, Reservation } from '@/types/reservation';
import { UserPlus, Users, Table, UsersRound, FileText, Link as LinkIcon, Copy, CheckCircle, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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
  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newReservation = await reservationService.create(formData);
      setCreatedReservation(newReservation);

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

  const handleCopyLink = () => {
    if (createdReservation) {
      const invitationUrl = `${eventConfig.appUrl}/invitacion/${createdReservation.code}`;
      navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseModal = () => {
    setCreatedReservation(null);
    setCopied(false);
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

      {/* Modal de éxito con link de invitación */}
      {createdReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">¡Reservación Creada!</h3>
                    <p className="text-green-100 text-sm">La invitación está lista</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Información del invitado */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Invitado</p>
                <p className="text-xl font-bold text-newspaper-black">{createdReservation.guestName}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {createdReservation.numberOfGuests} persona(s)
                  </span>
                  {createdReservation.table && (
                    <span className="flex items-center gap-1">
                      <Table className="w-4 h-4" />
                      {createdReservation.table}
                    </span>
                  )}
                </div>
              </div>

              {/* Link de invitación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <LinkIcon className="w-4 h-4 inline mr-2" />
                  Link de Invitación
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${eventConfig.appUrl}/invitacion/${createdReservation.code}`}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-newspaper-black text-white hover:bg-newspaper-gray-800'
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copiar
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Envía este link al invitado para que vea su pase digital
                </p>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 mb-4">Código QR</p>
                <div className="inline-block bg-white p-4 rounded-xl border-2 border-gray-200">
                  <QRCodeSVG
                    value={`${eventConfig.appUrl}/invitacion/${createdReservation.code}`}
                    size={180}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  El invitado también puede usar este QR en la entrada
                </p>
              </div>

              {/* Acciones */}
              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-newspaper-black text-white px-6 py-3 rounded-lg font-bold hover:bg-newspaper-gray-800 transition-colors"
                >
                  Crear Otra Reservación
                </button>
                <a
                  href={`${eventConfig.appUrl}/invitacion/${createdReservation.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors text-center"
                >
                  Ver Pase Digital
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
