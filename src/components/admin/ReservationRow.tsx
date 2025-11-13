/**
 * COMPONENTE FILA DE RESERVACIÓN
 *
 * Representa una fila en la tabla de reservaciones con acciones
 */

import { useState } from 'react';
import type { Reservation } from '@/types/reservation';
import { QRCodeSVG } from 'qrcode.react';
import { eventConfig } from '@/config/eventConfig';
import {
  CheckCircle,
  Trash2,
  QrCode,
  Users,
  X,
  Ticket,
  ExternalLink
} from 'lucide-react';

interface ReservationRowProps {
  reservation: Reservation;
  onCheckIn: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ReservationRow({ reservation, onCheckIn, onDelete }: ReservationRowProps) {
  const [showQR, setShowQR] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <span className="badge badge-pending">Pendiente</span>;
      case 'confirmada':
        return <span className="badge badge-confirmed">Confirmada</span>;
      case 'ingreso-registrado':
        return <span className="badge badge-checked-in">Ingresado</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const qrUrl = `${eventConfig.appUrl}/check-in?code=${reservation.code}`;
  const canCheckIn = reservation.status !== 'ingreso-registrado';

  return (
    <>
      <tr>
        <td className="font-medium">
          <div>{reservation.guestName}</div>
          {reservation.accompanistNames && reservation.accompanistNames.length > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              +{reservation.accompanistNames.length} acompañante{reservation.accompanistNames.length !== 1 ? 's' : ''}
            </div>
          )}
        </td>
        <td>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-gray-500" />
            {reservation.numberOfGuests}
          </div>
        </td>
        <td>
          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
            {reservation.code}
          </code>
        </td>
        <td>{reservation.table || '-'}</td>
        <td>{reservation.group || '-'}</td>
        <td>{getStatusBadge(reservation.status)}</td>
        <td>
          <div className="flex items-center space-x-2">
            {/* Ver Pase Digital */}
            <a
              href={`${eventConfig.appUrl}/invitacion/${reservation.code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              title="Ver Pase Digital"
            >
              <Ticket className="w-4 h-4 text-purple-600" />
            </a>

            {/* Ver QR */}
            <button
              onClick={() => setShowQR(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Ver QR"
            >
              <QrCode className="w-4 h-4 text-blue-600" />
            </button>

            {/* Check-in */}
            {canCheckIn && (
              <button
                onClick={() => onCheckIn(reservation.id)}
                className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                title="Marcar ingreso"
              >
                <CheckCircle className="w-4 h-4 text-green-600" />
              </button>
            )}

            {/* Eliminar */}
            <button
              onClick={() => {
                if (confirm('¿Eliminar esta reservación?')) {
                  onDelete(reservation.id);
                }
              }}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </td>
      </tr>

      {/* Modal QR */}
      {showQR && (
        <tr>
          <td colSpan={7} className="bg-gray-50">
            <div className="p-6">
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{reservation.guestName}</h4>
                    <p className="text-sm text-gray-600">Código: {reservation.code}</p>
                  </div>
                  <button
                    onClick={() => setShowQR(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-center bg-white p-4 rounded-lg border-2 border-gray-200">
                  <QRCodeSVG
                    value={qrUrl}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p className="flex justify-between">
                    <span>Personas:</span>
                    <span className="font-semibold">{reservation.numberOfGuests}</span>
                  </p>
                  {reservation.table && (
                    <p className="flex justify-between">
                      <span>Mesa:</span>
                      <span className="font-semibold">{reservation.table}</span>
                    </p>
                  )}
                  <p className="flex justify-between">
                    <span>Estado:</span>
                    {getStatusBadge(reservation.status)}
                  </p>
                </div>

                {/* Acompañantes registrados */}
                {reservation.accompanistNames && reservation.accompanistNames.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Acompañantes Registrados:
                    </p>
                    <ul className="space-y-1">
                      {reservation.accompanistNames.map((name, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-300 rounded-full text-xs font-semibold">
                            {index + 1}
                          </span>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t text-xs text-gray-500 text-center">
                  Este QR puede ser escaneado en la entrada del evento
                </div>

                <button
                  onClick={() => window.print()}
                  className="w-full mt-4 btn-secondary"
                >
                  Imprimir QR
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
