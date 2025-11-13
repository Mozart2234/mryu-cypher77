/**
 * PÁGINA INVITATION PASS - PASE DE INVITACIÓN INDIVIDUAL
 *
 * Vista del ticket/pase digital para cada invitado con:
 * - Detalles del evento
 * - Información del invitado
 * - QR code
 * - Opción de check-in
 */

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { reservationService } from '@/services/reservationService';
import { eventConfig } from '@/config/eventConfig';
import type { Reservation } from '@/types/reservation';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, Clock, MapPin, Users, CheckCircle, Ticket } from 'lucide-react';

export function InvitationPass() {
  const { code } = useParams<{ code: string }>();
  const [searchParams] = useSearchParams();
  const codeFromQuery = searchParams.get('code');
  const finalCode = code || codeFromQuery;

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  useEffect(() => {
    loadReservation();
  }, [finalCode]);

  const loadReservation = async () => {
    if (!finalCode) {
      setError('Código de invitación no válido');
      setLoading(false);
      return;
    }

    try {
      const data = await reservationService.getByCode(finalCode);
      if (data) {
        setReservation(data);
      } else {
        setError('Invitación no encontrada');
      }
    } catch (err) {
      setError('Error al cargar la invitación');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!reservation) return;

    setCheckingIn(true);
    try {
      await reservationService.checkIn(reservation.id);
      setCheckInSuccess(true);
      // Recargar la reservación para mostrar el estado actualizado
      await loadReservation();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al registrar ingreso');
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-newspaper-gray-100 to-newspaper-gray-200 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-newspaper-accent border-t-transparent"></div>
          <p className="mt-4 text-newspaper-gray-600">Cargando invitación...</p>
        </div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-newspaper-gray-100 to-newspaper-gray-200 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-newspaper-black mb-2">Invitación no encontrada</h2>
          <p className="text-newspaper-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const qrUrl = `${eventConfig.appUrl}/invitacion/${reservation.code}`;
  const isCheckedIn = reservation.status === 'ingreso-registrado';

  return (
    <div className="min-h-screen bg-gradient-to-br from-newspaper-gray-100 via-white to-newspaper-gray-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-newspaper-black mb-2">
            {eventConfig.bride.name} & {eventConfig.groom.name}
          </h1>
          <p className="text-newspaper-gray-600 font-serif text-lg">
            Invitación Digital
          </p>
        </div>

        {/* Ticket/Pase */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-newspaper-black">
          {/* Header del ticket */}
          <div className="bg-gradient-to-r from-newspaper-black to-newspaper-gray-800 text-white p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-newspaper-black" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-80">Pase de Invitación</p>
                  <p className="font-mono text-sm font-bold">{reservation.code}</p>
                </div>
              </div>
              {isCheckedIn && (
                <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-bold">Ingresado</span>
                </div>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{reservation.guestName}</h2>
            <div className="flex items-center gap-2 text-white/80">
              <Users className="w-5 h-5" />
              <span className="text-lg">
                {reservation.numberOfGuests} {reservation.numberOfGuests === 1 ? 'persona' : 'personas'}
              </span>
            </div>
          </div>

          {/* Detalles del evento */}
          <div className="p-6 md:p-8 space-y-4">
            {/* Fecha y hora */}
            <div className="flex items-start gap-4 p-4 bg-newspaper-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-newspaper-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-newspaper-accent" />
              </div>
              <div>
                <p className="text-sm text-newspaper-gray-600 uppercase tracking-wider mb-1">Fecha</p>
                <p className="font-serif text-lg font-bold text-newspaper-black">{eventConfig.date.full}</p>
              </div>
            </div>

            {/* Ceremonia */}
            <div className="flex items-start gap-4 p-4 bg-newspaper-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-newspaper-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-newspaper-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-newspaper-gray-600 uppercase tracking-wider mb-1">Ceremonia</p>
                <p className="font-serif text-lg font-bold text-newspaper-black">{eventConfig.ceremony.name}</p>
                <p className="text-newspaper-gray-600">{eventConfig.ceremony.time}</p>
              </div>
            </div>

            {/* Recepción */}
            <div className="flex items-start gap-4 p-4 bg-newspaper-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-newspaper-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-newspaper-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-newspaper-gray-600 uppercase tracking-wider mb-1">Recepción</p>
                <p className="font-serif text-lg font-bold text-newspaper-black">{eventConfig.reception.name}</p>
                <p className="text-newspaper-gray-600">{eventConfig.reception.address}</p>
              </div>
            </div>

            {/* Mesa y Grupo (si existen) */}
            {(reservation.table || reservation.group) && (
              <div className="grid md:grid-cols-2 gap-4">
                {reservation.table && (
                  <div className="p-4 bg-newspaper-accent/5 border-2 border-newspaper-accent/20 rounded-xl text-center">
                    <p className="text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">Mesa</p>
                    <p className="text-2xl font-bold text-newspaper-accent">{reservation.table}</p>
                  </div>
                )}
                {reservation.group && (
                  <div className="p-4 bg-newspaper-accent/5 border-2 border-newspaper-accent/20 rounded-xl text-center">
                    <p className="text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">Grupo</p>
                    <p className="text-lg font-bold text-newspaper-accent">{reservation.group}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* QR Code */}
          <div className="p-6 md:p-8 bg-newspaper-gray-50 border-t-2 border-newspaper-gray-200">
            <div className="text-center">
              <p className="text-sm text-newspaper-gray-600 uppercase tracking-wider mb-4">
                Código QR de Invitación
              </p>
              <div className="bg-white p-6 rounded-2xl inline-block shadow-lg border-2 border-newspaper-gray-200">
                <QRCodeSVG
                  value={qrUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-xs text-newspaper-gray-500 mt-4 max-w-md mx-auto">
                Presenta este código QR o este pase digital en la entrada del evento
              </p>
            </div>
          </div>

          {/* Botón de Check-in */}
          {!isCheckedIn && (
            <div className="p-6 md:p-8 border-t-2 border-newspaper-gray-200">
              {checkInSuccess ? (
                <div className="bg-green-50 border-2 border-green-500 text-green-700 p-4 rounded-xl text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">¡Ingreso registrado exitosamente!</p>
                  <p className="text-sm mt-1">Bienvenido/a al evento</p>
                </div>
              ) : (
                <button
                  onClick={handleCheckIn}
                  disabled={checkingIn}
                  className="w-full bg-newspaper-black hover:bg-newspaper-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {checkingIn ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Registrando ingreso...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Registrar mi ingreso
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Notas adicionales */}
          {reservation.notes && (
            <div className="p-6 md:p-8 border-t-2 border-newspaper-gray-200 bg-yellow-50">
              <p className="text-xs uppercase tracking-wider text-newspaper-gray-600 mb-2">Notas</p>
              <p className="text-newspaper-gray-700 italic">{reservation.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-newspaper-gray-500 text-sm">
          <p>Conserva este pase digital para acceder al evento</p>
        </div>
      </div>
    </div>
  );
}
