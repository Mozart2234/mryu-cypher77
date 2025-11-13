/**
 * PÁGINA INVITATION PASS - PASE DE INVITACIÓN VINTAGE NEWSPAPER
 *
 * Vista del ticket/pase digital estilo periódico vintage con:
 * - Diseño tipo ticket de periódico antiguo
 * - Aceptar invitación y completar nombres
 * - QR code
 * - Check-in
 */

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { reservationService } from '@/services/reservationService';
import { eventConfig } from '@/config/eventConfig';
import type { Reservation } from '@/types/reservation';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, Clock, MapPin, Users, CheckCircle, Ticket, UserPlus, X } from 'lucide-react';

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

  // Estados para completar nombres
  const [showAccompanistModal, setShowAccompanistModal] = useState(false);
  const [accompanistNames, setAccompanistNames] = useState<string[]>([]);
  const [savingNames, setSavingNames] = useState(false);

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
        // Inicializar nombres si ya existen o crear array vacío
        const existingNames = data.accompanistNames || [];
        const emptySlots = data.numberOfGuests - 1; // -1 porque el invitado principal ya tiene nombre
        const initialNames = [
          ...existingNames,
          ...Array(Math.max(0, emptySlots - existingNames.length)).fill('')
        ];
        setAccompanistNames(initialNames);
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
      await loadReservation();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al registrar ingreso');
    } finally {
      setCheckingIn(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!reservation) return;

    try {
      await reservationService.update(reservation.id, {
        status: 'confirmada'
      });
      await loadReservation();

      // Si hay más de 1 invitado, abrir modal para completar nombres
      if (reservation.numberOfGuests > 1) {
        setShowAccompanistModal(true);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al aceptar invitación');
    }
  };

  const handleSaveAccompanists = async () => {
    if (!reservation) return;

    setSavingNames(true);
    try {
      const filteredNames = accompanistNames.filter(name => name.trim() !== '');
      await reservationService.update(reservation.id, {
        accompanistNames: filteredNames
      });
      await loadReservation();
      setShowAccompanistModal(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al guardar nombres');
    } finally {
      setSavingNames(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-newspaper-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-newspaper-black border-t-transparent"></div>
          <p className="mt-4 font-serif text-newspaper-gray-600">Cargando invitación...</p>
        </div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen bg-newspaper-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border-4 border-newspaper-black p-8 text-center">
          <div className="w-16 h-16 bg-newspaper-gray-200 border-2 border-newspaper-black mx-auto mb-4 flex items-center justify-center">
            <X className="w-8 h-8 text-newspaper-black" />
          </div>
          <h2 className="font-headline text-2xl font-bold text-newspaper-black mb-2">Invitación no encontrada</h2>
          <p className="font-serif text-newspaper-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const qrUrl = `${eventConfig.appUrl}/invitacion/${reservation.code}`;
  const isCheckedIn = reservation.status === 'ingreso-registrado';
  const isConfirmed = reservation.status === 'confirmada' || isCheckedIn;
  const isPending = reservation.status === 'pendiente';

  return (
    <div className="min-h-screen bg-newspaper-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header tipo periódico */}
        <div className="text-center mb-8 border-b-4 border-newspaper-black pb-6">
          <p className="font-sans text-xs uppercase tracking-widest text-newspaper-gray-600 mb-2">
            INVITACIÓN OFICIAL
          </p>
          <h1 className="font-headline text-4xl md:text-6xl font-black text-newspaper-black mb-2">
            {eventConfig.bride.name} & {eventConfig.groom.name}
          </h1>
          <p className="font-serif text-lg text-newspaper-gray-700">
            {eventConfig.date.full}
          </p>
        </div>

        {/* Ticket estilo vintage newspaper */}
        <div className="bg-white border-8 border-newspaper-black relative">
          {/* Perforaciones decorativas */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-newspaper-gray-200 border-b-2 border-dashed border-newspaper-gray-400"></div>

          {/* Header del ticket */}
          <div className="bg-newspaper-gray-100 border-b-4 border-newspaper-black p-6 mt-2">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">
                  PASE DE ADMISIÓN No.
                </p>
                <p className="font-mono text-2xl font-bold text-newspaper-black">{reservation.code}</p>
              </div>
              {isCheckedIn && (
                <div className="bg-newspaper-black text-white px-6 py-3 border-2 border-newspaper-black">
                  <p className="font-headline text-sm uppercase tracking-wider">✓ Ingresado</p>
                </div>
              )}
              {isConfirmed && !isCheckedIn && (
                <div className="bg-white border-4 border-newspaper-black px-6 py-3">
                  <p className="font-headline text-sm uppercase tracking-wider">✓ Confirmado</p>
                </div>
              )}
              {isPending && (
                <div className="bg-newspaper-gray-200 border-2 border-newspaper-gray-400 px-6 py-3">
                  <p className="font-headline text-sm uppercase tracking-wider">Pendiente</p>
                </div>
              )}
            </div>
          </div>

          {/* Información del invitado principal */}
          <div className="p-8 border-b-4 border-newspaper-black bg-white">
            <p className="font-sans text-xs uppercase tracking-widest text-newspaper-gray-600 mb-2">
              Invitado Principal
            </p>
            <h2 className="font-headline text-4xl font-bold text-newspaper-black mb-4">
              {reservation.guestName}
            </h2>
            <div className="flex items-center gap-3 text-newspaper-gray-700">
              <Users className="w-6 h-6" />
              <span className="font-serif text-xl">
                Admite {reservation.numberOfGuests} {reservation.numberOfGuests === 1 ? 'persona' : 'personas'}
              </span>
            </div>

            {/* Lista de acompañantes si existen */}
            {reservation.accompanistNames && reservation.accompanistNames.length > 0 && (
              <div className="mt-6 p-4 bg-newspaper-gray-50 border-2 border-newspaper-gray-300">
                <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-3">
                  Acompañantes Registrados
                </p>
                <ul className="space-y-2">
                  {reservation.accompanistNames.map((name, index) => (
                    <li key={index} className="flex items-center gap-2 font-serif text-newspaper-black">
                      <span className="w-6 h-6 bg-newspaper-black text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
                {isConfirmed && (
                  <button
                    onClick={() => setShowAccompanistModal(true)}
                    className="mt-4 text-sm font-sans uppercase tracking-wider text-newspaper-gray-600 hover:text-newspaper-black underline"
                  >
                    Editar nombres
                  </button>
                )}
              </div>
            )}

            {/* Botón para agregar acompañantes si no se han agregado */}
            {isConfirmed && reservation.numberOfGuests > 1 && (!reservation.accompanistNames || reservation.accompanistNames.length === 0) && (
              <button
                onClick={() => setShowAccompanistModal(true)}
                className="mt-4 border-2 border-newspaper-black px-6 py-3 font-sans text-sm uppercase tracking-wider hover:bg-newspaper-black hover:text-white transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Agregar nombres de acompañantes
              </button>
            )}
          </div>

          {/* Detalles del evento en columnas tipo periódico */}
          <div className="grid md:grid-cols-2 gap-px bg-newspaper-black">
            {/* Fecha */}
            <div className="bg-white p-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-8 h-8 text-newspaper-black flex-shrink-0" />
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">Fecha</p>
                  <p className="font-serif text-lg font-bold text-newspaper-black">{eventConfig.date.full}</p>
                </div>
              </div>
            </div>

            {/* Hora */}
            <div className="bg-white p-6">
              <div className="flex items-start gap-3">
                <Clock className="w-8 h-8 text-newspaper-black flex-shrink-0" />
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">Hora Ceremonia</p>
                  <p className="font-serif text-lg font-bold text-newspaper-black">{eventConfig.ceremony.time}</p>
                </div>
              </div>
            </div>

            {/* Ceremonia */}
            <div className="bg-white p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-8 h-8 text-newspaper-black flex-shrink-0" />
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">Ceremonia</p>
                  <p className="font-serif font-bold text-newspaper-black">{eventConfig.ceremony.name}</p>
                  <p className="font-serif text-sm text-newspaper-gray-700">{eventConfig.ceremony.address}</p>
                </div>
              </div>
            </div>

            {/* Recepción */}
            <div className="bg-white p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-8 h-8 text-newspaper-black flex-shrink-0" />
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">Recepción</p>
                  <p className="font-serif font-bold text-newspaper-black">{eventConfig.reception.name}</p>
                  <p className="font-serif text-sm text-newspaper-gray-700">{eventConfig.reception.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mesa y Grupo */}
          {(reservation.table || reservation.group) && (
            <div className="border-t-4 border-newspaper-black bg-newspaper-gray-100 p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {reservation.table && (
                  <div className="text-center p-4 bg-white border-4 border-newspaper-black">
                    <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">Mesa Asignada</p>
                    <p className="font-headline text-4xl font-black text-newspaper-black">{reservation.table}</p>
                  </div>
                )}
                {reservation.group && (
                  <div className="text-center p-4 bg-white border-4 border-newspaper-black">
                    <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-1">Grupo</p>
                    <p className="font-headline text-2xl font-bold text-newspaper-black">{reservation.group}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QR Code */}
          <div className="border-t-4 border-newspaper-black bg-newspaper-gray-50 p-8">
            <div className="text-center">
              <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-4">
                Código de Admisión
              </p>
              <div className="bg-white p-6 inline-block border-4 border-newspaper-black">
                <QRCodeSVG
                  value={qrUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="font-serif text-sm text-newspaper-gray-600 mt-4 max-w-md mx-auto">
                Presenta este código en la entrada del evento
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="border-t-4 border-newspaper-black bg-white p-6">
            {isPending && (
              <button
                onClick={handleAcceptInvitation}
                className="w-full bg-newspaper-black text-white px-8 py-4 font-headline text-xl uppercase tracking-wider hover:bg-newspaper-gray-800 transition-colors border-4 border-newspaper-black"
              >
                ✓ Aceptar Invitación
              </button>
            )}

            {isConfirmed && !isCheckedIn && (
              checkInSuccess ? (
                <div className="bg-newspaper-gray-100 border-4 border-newspaper-black text-newspaper-black p-6 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <p className="font-headline text-xl font-bold">¡Bienvenido al evento!</p>
                  <p className="font-serif mt-2">Ingreso registrado exitosamente</p>
                </div>
              ) : (
                <button
                  onClick={handleCheckIn}
                  disabled={checkingIn}
                  className="w-full bg-newspaper-black text-white px-8 py-4 font-headline text-xl uppercase tracking-wider hover:bg-newspaper-gray-800 transition-colors border-4 border-newspaper-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {checkingIn ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Registrando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Registrar mi ingreso
                    </>
                  )}
                </button>
              )
            )}
          </div>

          {/* Notas */}
          {reservation.notes && (
            <div className="border-t-4 border-newspaper-black bg-newspaper-gray-50 p-6">
              <p className="font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-2">Nota Especial</p>
              <p className="font-serif text-newspaper-gray-800 italic">{reservation.notes}</p>
            </div>
          )}

          {/* Perforaciones decorativas inferiores */}
          <div className="h-2 bg-newspaper-gray-200 border-t-2 border-dashed border-newspaper-gray-400"></div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 border-t-2 border-newspaper-gray-400 pt-6">
          <p className="font-serif text-sm text-newspaper-gray-600">
            Conserva este pase para acceder al evento
          </p>
          <p className="font-sans text-xs text-newspaper-gray-500 mt-2 uppercase tracking-wider">
            {eventConfig.bride.name} & {eventConfig.groom.name} • {eventConfig.date.year}
          </p>
        </div>
      </div>

      {/* Modal para completar nombres de acompañantes */}
      {showAccompanistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border-8 border-newspaper-black">
            {/* Header */}
            <div className="bg-newspaper-gray-100 border-b-4 border-newspaper-black p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-newspaper-black">
                    Nombres de Acompañantes
                  </h3>
                  <p className="font-serif text-sm text-newspaper-gray-700 mt-1">
                    Completa los nombres de las {reservation.numberOfGuests - 1} personas que te acompañarán
                  </p>
                </div>
                <button
                  onClick={() => setShowAccompanistModal(false)}
                  className="p-2 hover:bg-newspaper-gray-200 border-2 border-newspaper-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Formulario */}
            <div className="p-6 space-y-4">
              {accompanistNames.map((name, index) => (
                <div key={index}>
                  <label className="block font-sans text-xs uppercase tracking-wider text-newspaper-gray-600 mb-2">
                    Acompañante #{index + 1}
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
                    className="w-full px-4 py-3 border-4 border-newspaper-gray-300 focus:border-newspaper-black font-serif text-lg"
                  />
                </div>
              ))}
            </div>

            {/* Footer con botones */}
            <div className="border-t-4 border-newspaper-black p-6 flex gap-4">
              <button
                onClick={() => setShowAccompanistModal(false)}
                className="flex-1 bg-newspaper-gray-200 px-6 py-3 font-sans uppercase tracking-wider hover:bg-newspaper-gray-300 transition-colors border-2 border-newspaper-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAccompanists}
                disabled={savingNames}
                className="flex-1 bg-newspaper-black text-white px-6 py-3 font-sans uppercase tracking-wider hover:bg-newspaper-gray-800 transition-colors border-4 border-newspaper-black disabled:opacity-50"
              >
                {savingNames ? 'Guardando...' : 'Guardar Nombres'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
