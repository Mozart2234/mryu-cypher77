/**
 * PASE DE INVITACIÓN - ESTILO NEWSPAPER
 *
 * Ticket tipo periódico vintage con confirmación individual de acompañantes
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { eventConfig } from '@/config/eventConfig';
import { reservationService } from '@/services/reservationService';
import { useAuth } from '@/contexts/AuthContext';
import type { Reservation, Accompanist } from '@/types/reservation';
import { CheckCircle, Calendar, MapPin, Users, Printer, X, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { InvitationTicketSkeleton } from '@/components/SkeletonLoader';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/Toast';
import { MessageForm } from '@/components/messages/MessageForm';
import { messageService } from '@/services/messageService';
import type { GuestMessage } from '@/types/message';

export function InvitationPass() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState<'form' | 'message'>('form');
  const [mainGuestAttending, setMainGuestAttending] = useState(true);
  const [accompanists, setAccompanists] = useState<Accompanist[]>([]);
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);

  useEffect(() => {
    if (code) {
      loadReservation();
    }
  }, [code]);

  const loadReservation = async () => {
    if (!code) return;

    setLoading(true);
    setError(null);

    try {
      const res = await reservationService.getByCode(code);
      if (res) {
        setReservation(res);
        setMainGuestAttending(res.mainGuestAttending);

        // Inicializar acompañantes
        if (res.accompanists && res.accompanists.length > 0) {
          setAccompanists(res.accompanists);
        } else {
          // Crear estructura vacía basado en numberOfGuests
          const emptyAccompanists: Accompanist[] = [];
          for (let i = 0; i < res.numberOfGuests - 1; i++) {
            emptyAccompanists.push({
              name: res.accompanistNames?.[i] || '',
              willAttend: true
            });
          }
          setAccompanists(emptyAccompanists);
        }

        // Cargar mensajes si la reservación está confirmada
        if (res.status === 'confirmada' || res.status === 'ingreso-registrado') {
          loadMessages(res.id);
        }
      } else {
        setError('not_found');
      }
    } catch (error) {
      console.error('Error loading reservation:', error);
      setError('network_error');
      toast.error(
        'Error de conexión',
        'No se pudo cargar la invitación. Verifica tu conexión a internet.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (reservationId: string) => {
    try {
      const messages = await messageService.getByReservationId(reservationId);
      setGuestMessages(messages);
    } catch (error) {
      console.error('Error loading messages:', error);
      // No mostrar error al usuario, solo log
    }
  };

  const handleMessageSuccess = () => {
    if (reservation) {
      loadMessages(reservation.id);
      // No mostrar toast aquí - el MessageForm ya tiene su propio mensaje de éxito con auto-scroll
      // Cerrar el modal después de enviar el mensaje
      setShowConfirmModal(false);
      setConfirmationStep('form');
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setConfirmationStep('form');
  };

  const handleSkipMessage = () => {
    setShowConfirmModal(false);
    setConfirmationStep('form');
  };

  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleSaveConfirmation = async () => {
    if (!reservation) return;

    try {
      await reservationService.update(reservation.id, {
        status: 'confirmada',
        mainGuestAttending,
        accompanists: accompanists.filter(a => a.name.trim() !== '')
      });

      await loadReservation();

      toast.success(
        '¡Confirmación guardada!',
        'Tu asistencia ha sido confirmada correctamente.'
      );

      // Cambiar al paso de mensaje en lugar de cerrar el modal
      setConfirmationStep('message');
    } catch (error) {
      console.error('Error saving confirmation:', error);
      toast.error(
        'Error al guardar',
        'No se pudo guardar la confirmación. Por favor intenta de nuevo.'
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getConfirmedCount = () => {
    let count = mainGuestAttending ? 1 : 0;
    count += accompanists.filter(a => a.willAttend && a.name.trim() !== '').length;
    return count;
  };

  if (loading) {
    return (
      <>
        <InvitationTicketSkeleton />
        <ToastContainer toasts={toast.toasts} onClose={toast.closeToast} />
      </>
    );
  }

  if (!reservation || error === 'not_found') {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-newspaper-gray-100 px-4">
          <div className="max-w-md">
            {/* Icono de error */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-newspaper-gray-200 border-4 border-newspaper-black rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-newspaper-gray-600" />
              </div>
            </div>

            <h1 className="font-headline text-4xl font-bold text-newspaper-black mb-4 text-center">
              Invitación no encontrada
            </h1>
            <p className="newspaper-body text-newspaper-gray-700 mb-8 text-center">
              El código <code className="bg-newspaper-gray-200 px-2 py-1 rounded font-mono text-sm">{code}</code> no corresponde a ninguna reservación.
            </p>

            {/* Sugerencias */}
            <div className="bg-white border-2 border-newspaper-black p-6 mb-6">
              <p className="font-headline text-sm font-bold uppercase tracking-wider mb-3 text-newspaper-black">
                Verifica lo siguiente:
              </p>
              <ul className="space-y-2 text-sm text-newspaper-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-newspaper-accent font-bold">•</span>
                  <span>El código debe tener el formato <strong>WED-1234</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-newspaper-accent font-bold">•</span>
                  <span>Revisa que no haya espacios adicionales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-newspaper-accent font-bold">•</span>
                  <span>Consulta el mensaje original con tu código</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-newspaper-gray-200 text-newspaper-black px-6 py-3 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-300 transition border-2 border-newspaper-black"
              >
                Volver al inicio
              </button>
              {error === 'network_error' && (
                <button
                  onClick={() => loadReservation()}
                  className="flex-1 bg-newspaper-black text-white px-6 py-3 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-900 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reintentar
                </button>
              )}
            </div>
          </div>
        </div>
        <ToastContainer toasts={toast.toasts} onClose={toast.closeToast} />
      </>
    );
  }

  const isPending = reservation.status === 'pendiente';
  const isConfirmed = reservation.status === 'confirmada';
  const isCheckedIn = reservation.status === 'ingreso-registrado';
  const qrUrl = `${eventConfig.appUrl}/invitacion/${reservation.code}`;
  const confirmedCount = getConfirmedCount();

  return (
    <div className="min-h-screen bg-newspaper-gray-100 py-8 px-4 print:bg-white print:p-0">
      {/* Botones de acción (ocultos en print) */}
      <div className="max-w-5xl mx-auto mb-6 print:hidden">
        <div className="flex gap-3 mb-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-newspaper-black text-white px-6 py-3 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-900 transition"
          >
            <Printer className="w-5 h-5" />
            Imprimir
          </button>
          {/* Solo el admin puede editar confirmaciones ya realizadas */}
          {isConfirmed && isAuthenticated && (
            <button
              onClick={handleOpenConfirmModal}
              className="flex items-center gap-2 bg-newspaper-gray-700 text-white px-6 py-3 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-600 transition"
            >
              Editar Confirmación (Admin)
            </button>
          )}
        </div>

        {/* CTA Mejorado con Indicador de Pasos */}
        {isPending && (
          <div className="bg-white border-4 border-newspaper-black p-6">
            {/* Indicador de Pasos */}
            <div className="bg-newspaper-gray-100 border-2 border-newspaper-black p-4 mb-6">
              <p className="font-headline text-xs uppercase tracking-widest text-center mb-3 text-newspaper-gray-600">
                Pasos para Confirmar tu Asistencia
              </p>
              <div className="flex items-center justify-center gap-2 text-sm font-headline">
                <span className="flex items-center gap-1">
                  <span className="w-6 h-6 bg-newspaper-black text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span className="hidden sm:inline">Lee tu invitación</span>
                </span>
                <span className="text-newspaper-gray-400">→</span>
                <span className="flex items-center gap-1">
                  <span className="w-6 h-6 bg-newspaper-black text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span className="hidden sm:inline">Confirma asistencia</span>
                </span>
                <span className="text-newspaper-gray-400">→</span>
                <span className="flex items-center gap-1">
                  <span className="w-6 h-6 bg-newspaper-black text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span className="hidden sm:inline">Envía mensaje</span>
                </span>
              </div>
            </div>

            {/* CTA Principal Grande */}
            <button
              onClick={handleOpenConfirmModal}
              className="w-full bg-newspaper-black text-white px-8 py-6 font-headline text-lg uppercase tracking-wider hover:bg-newspaper-gray-900 transition-all border-4 border-newspaper-black hover:scale-[1.02] transform shadow-lg cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <CheckCircle className="w-7 h-7" />
                <span className="text-2xl font-bold">Confirmar Asistencia</span>
              </div>
              <p className="text-xs opacity-90 font-sans normal-case tracking-normal">
                Por favor confirma antes del 5 de Enero, 2026
              </p>
            </button>

            {/* Nota urgente */}
            <div className="mt-4 text-center">
              <p className="text-xs text-newspaper-gray-600 italic">
                Tu confirmación nos ayuda a organizar mejor este día especial
              </p>
            </div>
          </div>
        )}

      </div>

      {/* TICKET ESTILO PERIÓDICO */}
      <div className="max-w-5xl mx-auto bg-white border-8 border-newspaper-black print:border-4">
        {/* HEADER ESTILO PERIÓDICO */}
        <div className="border-b-4 border-newspaper-black p-8 md:p-12 bg-white">
          <div className="text-center">
            {/* Masthead */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="flex-1 h-0.5 bg-newspaper-black"></div>
                <div className="newspaper-page-number text-xs">PASE OFICIAL</div>
                <div className="flex-1 h-0.5 bg-newspaper-black"></div>
              </div>
              <h1 className="font-headline text-5xl md:text-6xl font-bold text-newspaper-black mb-2 leading-none">
                THE WEDDING TIMES
              </h1>
              <div className="newspaper-divider-double my-3"></div>
              <p className="newspaper-meta text-sm">
                {eventConfig.date.full.toUpperCase()}
              </p>
            </div>

            {/* Titular Principal */}
            <div className="bg-newspaper-gray-900 text-white p-6 my-6">
              <h2 className="font-headline text-3xl md:text-4xl font-bold leading-tight">
                {eventConfig.bride.name} & {eventConfig.groom.name}
              </h2>
              <p className="font-headline text-lg mt-2 opacity-90">
                SE CASAN EN {eventConfig.date.month}
              </p>
            </div>

            {/* Badge de Estado */}
            {isPending && (
              <div className="inline-block bg-newspaper-gray-200 border-2 border-newspaper-black px-6 py-2">
                <p className="font-headline text-sm uppercase tracking-widest text-newspaper-black">
                  ⚠ Confirmación Pendiente
                </p>
              </div>
            )}
            {isConfirmed && (
              <div className="inline-block bg-newspaper-black text-white px-6 py-2">
                <p className="font-headline text-sm uppercase tracking-widest flex items-center gap-2 justify-center">
                  <Check className="w-4 h-4" />
                  Asistencia Confirmada
                </p>
              </div>
            )}
            {isCheckedIn && (
              <div className="inline-block bg-newspaper-gray-700 text-white px-6 py-2">
                <p className="font-headline text-sm uppercase tracking-widest">
                  ✓ Ingreso Registrado
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL - ESTILO COLUMNAS DE PERIÓDICO */}
        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-12 gap-8">
            {/* COLUMNA IZQUIERDA - QR Y CÓDIGO */}
            <div className="md:col-span-4">
              <div className="border-4 border-newspaper-black p-6 bg-newspaper-gray-50 h-full">
                <p className="font-headline text-xs uppercase tracking-widest text-center mb-4 text-newspaper-gray-600">
                  Código de Acceso
                </p>
                <div className="bg-white p-4 border-2 border-newspaper-gray-300 mb-4">
                  <QRCodeSVG
                    value={qrUrl}
                    size={200}
                    level="H"
                    includeMargin={true}
                    className="w-full h-auto"
                  />
                </div>
                <p className="font-mono text-center text-xl font-bold text-newspaper-black mb-2">
                  {reservation.code}
                </p>
                <div className="newspaper-divider-thin my-3"></div>
                <p className="newspaper-body text-xs text-center text-newspaper-gray-700 leading-relaxed">
                  Presenta este código QR en la entrada del evento
                </p>
              </div>
            </div>

            {/* COLUMNA DERECHA - INFORMACIÓN DEL INVITADO */}
            <div className="md:col-span-8 space-y-6">
              {/* Invitado Principal */}
              <div className="border-l-4 border-newspaper-black pl-6">
                <p className="newspaper-page-number text-xs mb-2">INVITADO PRINCIPAL</p>
                <h3 className="font-headline text-3xl md:text-4xl font-bold text-newspaper-black">
                  {reservation.guestName}
                </h3>
              </div>

              {/* Estadísticas de Pases */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-newspaper-gray-100 border-2 border-newspaper-black p-4 text-center">
                  <p className="font-headline text-3xl font-bold text-newspaper-black">
                    {reservation.numberOfGuests}
                  </p>
                  <p className="newspaper-page-number text-xs mt-1">
                    {reservation.numberOfGuests === 1 ? 'Pase Otorgado' : 'Pases Otorgados'}
                  </p>
                </div>
                <div className="bg-newspaper-black text-white p-4 text-center">
                  <p className="font-headline text-3xl font-bold">
                    {confirmedCount}
                  </p>
                  <p className="font-headline text-xs uppercase tracking-wider mt-1">
                    {confirmedCount === 1 ? 'Confirmado' : 'Confirmados'}
                  </p>
                </div>
              </div>

              {/* Acompañantes */}
              {reservation.numberOfGuests > 1 && (
                <div className="border-2 border-newspaper-gray-300 p-6 bg-white">
                  <h4 className="font-headline text-lg font-bold text-newspaper-black mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    ACOMPAÑANTES
                  </h4>

                  {reservation.accompanists && reservation.accompanists.length > 0 ? (
                    <ul className="space-y-3">
                      {reservation.accompanists.map((acc, index) => (
                        <li key={index} className="flex items-center gap-3 border-b border-newspaper-gray-200 pb-2">
                          <span className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                            ${acc.willAttend ? 'bg-newspaper-black text-white' : 'bg-newspaper-gray-300 text-newspaper-gray-600'}
                          `}>
                            {acc.willAttend ? '✓' : '✗'}
                          </span>
                          <span className={`newspaper-body flex-1 ${acc.willAttend ? 'text-newspaper-black' : 'text-newspaper-gray-500 line-through'}`}>
                            {acc.name || `Acompañante ${index + 1}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="newspaper-body text-newspaper-gray-600 italic text-sm">
                      {reservation.numberOfGuests - 1} {reservation.numberOfGuests - 1 === 1 ? 'acompañante disponible' : 'acompañantes disponibles'}.
                      Presiona "Confirmar Asistencia" para agregar nombres.
                    </p>
                  )}
                </div>
              )}

              {/* Información Adicional */}
              {(reservation.table || reservation.group) && (
                <div className="grid grid-cols-2 gap-4">
                  {reservation.table && (
                    <div className="border-2 border-newspaper-black p-4">
                      <p className="newspaper-page-number text-xs mb-1">MESA ASIGNADA</p>
                      <p className="font-headline text-2xl font-bold text-newspaper-black">
                        {reservation.table}
                      </p>
                    </div>
                  )}
                  {reservation.group && (
                    <div className="border-2 border-newspaper-gray-400 p-4">
                      <p className="newspaper-page-number text-xs mb-1">GRUPO</p>
                      <p className="newspaper-body text-newspaper-black">
                        {reservation.group}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* DETALLES DEL EVENTO - ESTILO ANUNCIO DE PERIÓDICO */}
          <div className="mt-10 border-t-4 border-newspaper-black pt-8">
            <div className="text-center mb-8">
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-newspaper-black mb-2">
                DETALLES DEL EVENTO
              </h3>
              <div className="newspaper-divider-thick"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ceremonia */}
              <div className="border-4 border-newspaper-black p-6 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-newspaper-black text-white flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-headline text-lg font-bold text-newspaper-black">
                      CEREMONIA RELIGIOSA
                    </p>
                    <p className="newspaper-meta text-sm">{eventConfig.ceremony.time}</p>
                  </div>
                </div>
                <div className="newspaper-divider-thin mb-3"></div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-newspaper-gray-600 mt-1 shrink-0" />
                  <div>
                    <p className="newspaper-body font-semibold text-newspaper-black">
                      {eventConfig.ceremony.name}
                    </p>
                    <p className="newspaper-body text-sm text-newspaper-gray-700">
                      {eventConfig.ceremony.address}, {eventConfig.ceremony.city}
                    </p>
                  </div>
                </div>
                <a
                  href={eventConfig.ceremony.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-newspaper-black text-white px-4 py-3 font-headline text-xs uppercase tracking-wider hover:bg-newspaper-gray-900 transition cursor-pointer print:hidden"
                >
                  <MapPin className="w-4 h-4" />
                  Ver en Google Maps
                </a>
              </div>

              {/* Recepción */}
              <div className="border-4 border-newspaper-black p-6 bg-newspaper-gray-900 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white text-newspaper-black flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-headline text-lg font-bold">
                      RECEPCIÓN
                    </p>
                    <p className="font-headline text-sm opacity-90">{eventConfig.reception.time}</p>
                  </div>
                </div>
                <div className="h-px bg-white/30 mb-3"></div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 mt-1 shrink-0 opacity-90" />
                  <div>
                    <p className="font-serif font-semibold">
                      {eventConfig.reception.name}
                    </p>
                    <p className="font-serif text-sm opacity-90">
                      {eventConfig.reception.address}, {eventConfig.reception.city}
                    </p>
                  </div>
                </div>
                <a
                  href={eventConfig.reception.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white text-newspaper-black px-4 py-3 font-headline text-xs uppercase tracking-wider hover:bg-newspaper-gray-100 transition cursor-pointer print:hidden"
                >
                  <MapPin className="w-4 h-4" />
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* MENSAJE DEL INVITADO - Al final del ticket */}
        {guestMessages.length > 0 && (
          <div className="border-t-4 border-newspaper-black p-6 md:p-8 bg-white print:hidden">
            <div className="max-w-2xl mx-auto">
              <p className="font-headline text-xs uppercase tracking-widest text-center mb-4 text-newspaper-gray-600">
                Tu Mensaje Enviado
              </p>
              <div className="bg-newspaper-gray-50 border-2 border-newspaper-black p-6">
                <p className="font-serif text-newspaper-black leading-relaxed italic text-center">
                  "{guestMessages[0].message}"
                </p>
                <p className="text-sm text-newspaper-gray-700 mt-4 text-right font-sans">
                  — {guestMessages[0].guestName}
                </p>
                <div className="mt-4 pt-4 border-t border-newspaper-gray-300 text-center">
                  {guestMessages[0].isPublic && !guestMessages[0].isBlocked ? (
                    <p className="text-xs text-green-700 font-sans">
                      ✓ Este mensaje será visible públicamente en la sección "Cartas al Editor"
                    </p>
                  ) : guestMessages[0].isBlocked ? (
                    <p className="text-xs text-red-700 font-sans">
                      Este mensaje ha sido moderado por el administrador
                    </p>
                  ) : (
                    <p className="text-xs text-newspaper-gray-600 font-sans">
                      Mensaje privado - Solo visible para los novios
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER ESTILO PERIÓDICO */}
        <div className="border-t-4 border-newspaper-black p-8 bg-newspaper-gray-50 text-center">
          <div className="newspaper-divider-thin mb-4"></div>
          <p className="font-serif text-lg italic text-newspaper-black mb-2">
            Con cariño,
          </p>
          <p className="font-headline text-xl font-bold text-newspaper-black">
            {eventConfig.groom.name} y {eventConfig.bride.name}
          </p>
          <div className="newspaper-divider-thin mt-4 mb-4"></div>
          <p className="newspaper-page-number text-xs">
            Por favor presenta este pase digital en la entrada del evento
          </p>
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 print:hidden overflow-y-auto">
          <div className="bg-white border-4 border-newspaper-black max-w-3xl w-full my-8">
            {/* Header */}
            <div className="bg-newspaper-black text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="font-headline text-2xl font-bold mb-1">
                  {confirmationStep === 'form' ? 'CONFIRMAR ASISTENCIA' : '✓ CONFIRMACIÓN EXITOSA'}
                </h3>
                <p className="font-headline text-sm opacity-90 uppercase tracking-wider">
                  {reservation.guestName}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
              {confirmationStep === 'form' ? (
                /* PASO 1: Formulario de Confirmación */
                <>
                  <div className="mb-6">
                    <p className="newspaper-body text-newspaper-gray-700 leading-relaxed mb-4">
                      Por favor confirma quién asistirá al evento. Puedes marcar individualmente cada invitado.
                    </p>
                  </div>

                  {/* Invitado Principal */}
                  <div className="border-2 border-newspaper-black p-4 mb-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mainGuestAttending}
                        onChange={(e) => setMainGuestAttending(e.target.checked)}
                        className="w-6 h-6 accent-newspaper-black"
                      />
                      <div>
                        <p className="font-headline font-bold text-lg text-newspaper-black">
                          {reservation.guestName}
                        </p>
                        <p className="newspaper-page-number text-xs">Invitado Principal</p>
                      </div>
                    </label>
                  </div>

                  {/* Acompañantes */}
                  {accompanists.length > 0 && (
                    <div>
                      <h4 className="font-headline font-bold text-lg text-newspaper-black mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        ACOMPAÑANTES ({accompanists.length})
                      </h4>
                      <div className="space-y-3">
                        {accompanists.map((acc, index) => (
                          <div key={index} className="border border-newspaper-gray-300 p-4 bg-newspaper-gray-50">
                            <label className="flex items-start gap-3 cursor-pointer mb-3">
                              <input
                                type="checkbox"
                                checked={acc.willAttend}
                                onChange={(e) => {
                                  const updated = [...accompanists];
                                  updated[index].willAttend = e.target.checked;
                                  setAccompanists(updated);
                                }}
                                className="w-5 h-5 mt-1 accent-newspaper-black"
                              />
                              <span className="newspaper-body font-semibold text-newspaper-black">
                                Acompañante {index + 1}
                              </span>
                            </label>
                            <input
                              type="text"
                              value={acc.name}
                              onChange={(e) => {
                                const updated = [...accompanists];
                                updated[index].name = e.target.value;
                                setAccompanists(updated);
                              }}
                              placeholder="Nombre completo"
                              className="w-full px-4 py-2 border-2 border-newspaper-gray-300 newspaper-body focus:border-newspaper-black focus:outline-hidden"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resumen */}
                  <div className="mt-6 bg-newspaper-black text-white p-4 text-center">
                    <p className="font-headline text-sm uppercase tracking-wider mb-1">
                      Total Confirmados
                    </p>
                    <p className="font-headline text-4xl font-bold">
                      {getConfirmedCount()} / {reservation.numberOfGuests}
                    </p>
                  </div>
                </>
              ) : (
                /* PASO 2: Formulario de Mensaje */
                <>
                  <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <p className="font-headline text-lg font-bold text-newspaper-black mb-2">
                      {getConfirmedCount()} {getConfirmedCount() === 1 ? 'persona confirmada' : 'personas confirmadas'}
                    </p>
                    <div className="newspaper-divider-thick my-4"></div>
                    <h4 className="font-headline text-xl font-bold text-newspaper-black mb-2">
                      ENVÍA UN MENSAJE A LOS NOVIOS
                    </h4>
                    <p className="text-sm text-newspaper-gray-700">
                      (Opcional) Comparte tus mejores deseos
                    </p>
                  </div>

                  <MessageForm
                    reservationId={reservation.id}
                    guestName={reservation.guestName}
                    onSuccess={handleMessageSuccess}
                  />
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t-2 border-newspaper-gray-300 p-6 flex gap-3">
              {confirmationStep === 'form' ? (
                <>
                  <button
                    onClick={handleSaveConfirmation}
                    className="flex-1 bg-newspaper-black text-white px-6 py-4 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-900 transition cursor-pointer"
                  >
                    Guardar Confirmación
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-4 border-2 border-newspaper-black font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-100 transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSkipMessage}
                  className="flex-1 px-6 py-4 border-2 border-newspaper-black font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-100 transition cursor-pointer"
                >
                  Cerrar (sin mensaje)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer toasts={toast.toasts} onClose={toast.closeToast} />

      {/* Estilos de impresión mejorados */}
      <style>{`
        @media print {
          /* Preservar colores y estilos */
          * {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Configuración de página */
          @page {
            size: A4 portrait;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
          }

          /* Ocultar elementos no imprimibles */
          .print\\:hidden {
            display: none !important;
          }

          /* Ajustar contenedor principal */
          .print\\:bg-white {
            background-color: white !important;
          }

          .print\\:p-0 {
            padding: 0 !important;
          }

          /* Reducir border del ticket para impresión */
          .print\\:border-4 {
            border-width: 4px !important;
          }

          /* Asegurar que el ticket ocupe toda la página */
          .max-w-5xl {
            max-width: 100% !important;
            margin: 0 !important;
          }

          /* Ajustar padding interno para impresión */
          section {
            padding: 1cm !important;
          }

          /* Evitar saltos de página dentro de secciones importantes */
          .border-4.border-newspaper-black {
            page-break-inside: avoid;
          }

          /* Asegurar que el QR sea del tamaño correcto */
          svg {
            width: 180px !important;
            height: 180px !important;
          }

          /* Mejorar contraste para impresión */
          .bg-newspaper-black {
            background-color: #000 !important;
          }

          .border-newspaper-black {
            border-color: #000 !important;
          }

          .text-newspaper-black {
            color: #000 !important;
          }

          /* Asegurar que backgrounds se impriman */
          .bg-newspaper-gray-900,
          .bg-newspaper-gray-50 {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }

          /* Reducir espacios para que todo quepa en una página */
          .py-8, .py-12, .py-16 {
            padding-top: 0.5cm !important;
            padding-bottom: 0.5cm !important;
          }

          .p-8, .p-12 {
            padding: 0.5cm !important;
          }

          .mb-8, .mb-12, .mb-16 {
            margin-bottom: 0.5cm !important;
          }

          .mt-10, .mt-12, .mt-20 {
            margin-top: 0.5cm !important;
          }

          /* Ajustar tamaños de fuente para impresión */
          .text-5xl, .text-6xl {
            font-size: 2.5rem !important;
          }

          .text-3xl, .text-4xl {
            font-size: 1.75rem !important;
          }

          /* Asegurar legibilidad */
          body {
            font-size: 12pt !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>
    </div>
  );
}
