/**
 * PASE DE INVITACIÓN - ESTILO NEWSPAPER MEJORADO
 *
 * Diseño minimalista tipo ticket de invitación, optimizado para impresión
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { eventConfig } from '@/config/eventConfig';
import { reservationService } from '@/services/reservationService';
import type { Reservation } from '@/types/reservation';
import { CheckCircle, Calendar, MapPin, Users, Printer, X } from 'lucide-react';

export function InvitationPass() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAccompanistModal, setShowAccompanistModal] = useState(false);
  const [accompanistNames, setAccompanistNames] = useState<string[]>([]);

  useEffect(() => {
    if (code) {
      loadReservation();
    }
  }, [code]);

  const loadReservation = async () => {
    if (!code) return;

    setLoading(true);
    try {
      const res = await reservationService.getByCode(code);
      if (res) {
        setReservation(res);
        // Inicializar nombres de acompañantes
        if (res.accompanistNames && res.accompanistNames.length > 0) {
          setAccompanistNames(res.accompanistNames);
        } else {
          // Crear array vacío para acompañantes
          const emptyNames = Array(Math.max(0, res.numberOfGuests - 1)).fill('');
          setAccompanistNames(emptyNames);
        }
      }
    } catch (error) {
      console.error('Error loading reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!reservation) return;

    await reservationService.update(reservation.id, {
      status: 'confirmada'
    });

    // Si hay más de 1 invitado y no hay nombres, mostrar modal
    if (reservation.numberOfGuests > 1 && (!reservation.accompanistNames || reservation.accompanistNames.length === 0)) {
      setShowAccompanistModal(true);
    }

    await loadReservation();
  };

  const handleSaveAccompanists = async () => {
    if (!reservation) return;

    const filteredNames = accompanistNames.filter(name => name.trim() !== '');

    await reservationService.update(reservation.id, {
      accompanistNames: filteredNames.length > 0 ? filteredNames : undefined
    });

    setShowAccompanistModal(false);
    await loadReservation();
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando invitación...</p>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Invitación no encontrada</h1>
          <p className="text-gray-600 mb-8">El código que proporcionaste no corresponde a ninguna reservación.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const isPending = reservation.status === 'pendiente';
  const isConfirmed = reservation.status === 'confirmada';
  const isCheckedIn = reservation.status === 'ingreso-registrado';
  const qrUrl = `${eventConfig.appUrl}/check-in?code=${reservation.code}`;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:p-0">
      {/* Botón de impresión (oculto en print) */}
      <div className="max-w-4xl mx-auto mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <Printer className="w-5 h-5" />
          Imprimir Pase
        </button>
      </div>

      {/* Pase de invitación */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none">
        {/* Header elegante */}
        <div className="border-b-2 border-gray-900 p-8 md:p-12 text-center">
          <div className="border-2 border-gray-300 p-6 inline-block">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
              Pase de Invitación
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {eventConfig.bride.name} & {eventConfig.groom.name}
            </h1>
            <p className="text-gray-600 font-serif text-lg">
              {eventConfig.date.full}
            </p>
          </div>
        </div>

        {/* Estado de confirmación */}
        <div className="bg-gray-50 border-b border-gray-200 p-6 print:bg-gray-50">
          {isPending && (
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div>
                <p className="font-semibold text-gray-900">Confirmación Pendiente</p>
                <p className="text-sm text-gray-600">Por favor confirma tu asistencia</p>
              </div>
              <button
                onClick={handleAcceptInvitation}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium print:hidden"
              >
                Confirmar Asistencia
              </button>
            </div>
          )}
          {isConfirmed && (
            <div className="flex items-center justify-center gap-3 text-green-700">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Asistencia Confirmada</span>
            </div>
          )}
          {isCheckedIn && (
            <div className="flex items-center justify-center gap-3 text-blue-700">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Ingreso Registrado</span>
            </div>
          )}
        </div>

        {/* Información del invitado */}
        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* QR Code */}
              <div className="flex flex-col items-center justify-center p-6 border-2 border-gray-300">
                <QRCodeSVG
                  value={qrUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="mb-4"
                />
                <p className="text-xs text-center text-gray-500 font-mono">
                  {reservation.code}
                </p>
              </div>

              {/* Detalles del invitado */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Invitado Principal</p>
                  <p className="text-2xl font-serif font-bold text-gray-900">{reservation.guestName}</p>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{reservation.numberOfGuests} {reservation.numberOfGuests === 1 ? 'Persona' : 'Personas'}</span>
                </div>

                {reservation.table && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Mesa Asignada</p>
                    <p className="text-xl font-semibold text-gray-900">{reservation.table}</p>
                  </div>
                )}

                {reservation.group && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Grupo</p>
                    <p className="text-gray-700">{reservation.group}</p>
                  </div>
                )}

                {/* Botón para agregar acompañantes si no existen */}
                {isConfirmed && reservation.numberOfGuests > 1 && (!reservation.accompanistNames || reservation.accompanistNames.length === 0) && (
                  <button
                    onClick={() => setShowAccompanistModal(true)}
                    className="w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg hover:bg-gray-200 transition border border-gray-300 print:hidden"
                  >
                    Agregar Nombres de Acompañantes
                  </button>
                )}
              </div>
            </div>

            {/* Acompañantes */}
            {reservation.accompanistNames && reservation.accompanistNames.length > 0 && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Acompañantes
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {reservation.accompanistNames.map((name, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detalles del evento */}
            <div className="space-y-6 border-t-2 border-gray-200 pt-8">
              <h3 className="font-serif text-2xl font-bold text-gray-900 text-center mb-6">
                Detalles del Evento
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Ceremonia */}
                <div className="p-4 border border-gray-300">
                  <div className="flex items-start gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Ceremonia Religiosa</p>
                      <p className="text-sm text-gray-600">{eventConfig.ceremony.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="text-gray-700">{eventConfig.ceremony.name}</p>
                      <p className="text-sm text-gray-600">{eventConfig.ceremony.address}</p>
                    </div>
                  </div>
                </div>

                {/* Recepción */}
                <div className="p-4 border border-gray-300">
                  <div className="flex items-start gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Recepción</p>
                      <p className="text-sm text-gray-600">{eventConfig.reception.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="text-gray-700">{eventConfig.reception.name}</p>
                      <p className="text-sm text-gray-600">{eventConfig.reception.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-900 p-8 text-center bg-gray-50">
          <p className="font-serif text-gray-700 italic">
            Con cariño, Alexei y Estephanie
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Por favor presenta este pase digital en la entrada
          </p>
        </div>
      </div>

      {/* Modal para agregar acompañantes */}
      {showAccompanistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nombres de Acompañantes
                </h3>
                <p className="text-gray-600">
                  Por favor completa los nombres de las personas que te acompañarán
                </p>
              </div>
              <button
                onClick={() => setShowAccompanistModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {accompanistNames.map((name, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Acompañante {index + 1}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const newNames = [...accompanistNames];
                      newNames[index] = e.target.value;
                      setAccompanistNames(newNames);
                    }}
                    placeholder="Nombre completo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveAccompanists}
                className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Guardar Nombres
              </button>
              <button
                onClick={() => setShowAccompanistModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos de impresión */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:bg-white {
            background-color: white !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:bg-gray-50 {
            background-color: #f9fafb !important;
          }
        }
      `}</style>
    </div>
  );
}
