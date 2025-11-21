/**
 * PASE DE INVITACIÓN - ESTILO NEWSPAPER
 *
 * Ticket tipo periódico vintage con confirmación individual de acompañantes
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { eventConfig } from '@/config/eventConfig';
import { reservationService } from '@/services/reservationService';
import { useAuth } from '@/contexts/AuthContext';
import type { Reservation, Accompanist } from '@/types/reservation';
import { CheckCircle, Calendar, MapPin, Users, Printer, X, Check, AlertCircle, RefreshCw, Send, Loader2 } from 'lucide-react';
import { InvitationTicketSkeleton } from '@/components/SkeletonLoader';
import { MessageForm, type MessageFormRef } from '@/components/messages/MessageForm';
import { messageService } from '@/services/messageService';
import type { GuestMessage } from '@/types/message';

export function InvitationPass() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const messageFormRef = useRef<MessageFormRef>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState<'form' | 'message'>('form');
  const [mainGuestAttending, setMainGuestAttending] = useState(true);
  const [accompanists, setAccompanists] = useState<Accompanist[]>([]);
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);
  const [canSendMessage, setCanSendMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

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
      toast.error('No se pudo cargar la invitación. Verifica tu conexión a internet.', {
        description: 'Error de conexión'
      });
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
      setSendingMessage(false);
      setMessageSent(true);

      toast.success('¡Mensaje enviado!', {
        description: 'Tus palabras han sido enviadas a la pareja'
      });
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setConfirmationStep('form');
    setMessageSent(false);
  };

  const handleSkipMessage = () => {
    setShowConfirmModal(false);
    setConfirmationStep('form');
    setMessageSent(false);
  };

  const handleSendMessage = async () => {
    if (messageFormRef.current) {
      setSendingMessage(true);
      try {
        await messageFormRef.current.submit();
      } catch {
        setSendingMessage(false);
      }
    }
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

      toast.success('¡Confirmación guardada!', {
        description: 'Tu asistencia ha sido confirmada correctamente.'
      });

      // Cambiar al paso de mensaje en lugar de cerrar el modal
      setConfirmationStep('message');
    } catch (error) {
      console.error('Error saving confirmation:', error);
      toast.error('Error al guardar', {
        description: 'No se pudo guardar la confirmación. Por favor intenta de nuevo.'
      });
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
    return <InvitationTicketSkeleton />;
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

        {/* CTA Mejorado - Estilo Anuncio de Periódico Vintage */}
        {isPending && (
          <div className="bg-white border-4 border-double border-newspaper-black relative">
            {/* Decoración esquinas */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-newspaper-black"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-newspaper-black"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-newspaper-black"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-newspaper-black"></div>

            {/* Header del anuncio - Más llamativo */}
            <div className="bg-newspaper-black text-white px-6 py-4">
              <div className="text-center">
                <p className="font-serif text-[10px] uppercase tracking-[0.3em] opacity-70 mb-1">
                  ¡Atención Estimado Invitado!
                </p>
                <p className="font-headline text-lg md:text-xl font-black tracking-tight">
                  TU RESPUESTA ES IMPORTANTE
                </p>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="p-6 md:p-8">
              {/* Mensaje de bienvenida */}
              <div className="text-center mb-6">
                <p className="font-serif text-base md:text-lg text-newspaper-gray-700 leading-relaxed">
                  Nos encantaría contar con tu presencia en nuestra boda.
                </p>
                <p className="font-serif text-sm text-newspaper-gray-600 mt-2">
                  Por favor, tómate un momento para confirmar tu asistencia.
                </p>
              </div>

              {/* Indicador de Pasos - Estilo Editorial */}
              <div className="bg-newspaper-gray-50 border border-newspaper-gray-200 p-4 mb-6">
                <p className="font-serif text-[10px] uppercase tracking-[0.15em] text-center mb-3 text-newspaper-gray-500">
                  Solo 3 sencillos pasos
                </p>
                <div className="flex items-center justify-center gap-3 md:gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 bg-newspaper-black text-white flex items-center justify-center font-headline text-sm font-bold">1</span>
                    <span className="text-[10px] font-serif mt-1 text-newspaper-gray-600 hidden sm:block">Lee tu pase</span>
                  </div>
                  <div className="h-px w-6 bg-newspaper-gray-400"></div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 bg-newspaper-black text-white flex items-center justify-center font-headline text-sm font-bold">2</span>
                    <span className="text-[10px] font-serif mt-1 text-newspaper-gray-600 hidden sm:block">Confirma</span>
                  </div>
                  <div className="h-px w-6 bg-newspaper-gray-400"></div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 bg-newspaper-black text-white flex items-center justify-center font-headline text-sm font-bold">3</span>
                    <span className="text-[10px] font-serif mt-1 text-newspaper-gray-600 hidden sm:block">Mensaje</span>
                  </div>
                </div>
              </div>

              {/* CTA Principal - Más Grande y Atractivo */}
              <button
                onClick={handleOpenConfirmModal}
                className="w-full bg-newspaper-black text-white px-6 py-6 font-headline uppercase tracking-wider hover:bg-newspaper-gray-800 transition-all border-2 border-newspaper-black shadow-xl cursor-pointer active:scale-[0.99] group relative overflow-hidden hover:shadow-2xl"
              >
                {/* Efecto decorativo superior */}
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>

                {/* Contenido del botón */}
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-2xl">👆</span>
                  <span className="text-xl md:text-2xl font-black tracking-tight">¡CONFIRMA AQUÍ!</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-serif normal-case">Haz clic para confirmar tu asistencia</span>
                </div>
              </button>

              {/* Fecha límite destacada */}
              <div className="mt-4 text-center bg-yellow-50 border border-yellow-300 p-3">
                <p className="font-headline text-xs uppercase tracking-wider text-yellow-800">
                  ⏰ Fecha límite: <strong>5 de Enero, 2026</strong>
                </p>
              </div>

              {/* Nota inferior */}
              <p className="text-center mt-4 font-serif text-xs text-newspaper-gray-500 italic">
                Tu confirmación nos ayuda a preparar este día especial con todo el cariño que mereces
              </p>
            </div>
          </div>
        )}

        {/* Nota discreta para enviar mensaje (solo si ya está confirmado) */}
        {(isConfirmed || isCheckedIn) && guestMessages.length === 0 && (
          <div className="bg-newspaper-gray-50 border border-newspaper-gray-300 p-4 text-center">
            <p className="text-xs text-newspaper-gray-600 mb-2">
              <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
              <strong className="text-newspaper-black">Asistencia confirmada</strong>
            </p>
            <p className="font-sans text-sm text-newspaper-gray-700 mb-3">
              ¿Te gustaría dejar un mensaje para los novios?
            </p>
            <button
              onClick={() => {
                setConfirmationStep('message');
                setShowConfirmModal(true);
              }}
              className="inline-flex items-center gap-2 text-sm text-newspaper-black underline hover:text-newspaper-gray-700 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar mensaje</span>
            </button>
          </div>
        )}

      </div>

      {/* TICKET ESTILO BOLETO VINTAGE */}
      <div className="max-w-4xl mx-auto relative">
        {/* Borde perforado superior - efecto de troquelado */}
        <div className="relative h-5 overflow-visible">
          <div className="absolute inset-x-0 top-0 h-full bg-newspaper-gray-100"></div>
          <div className="absolute inset-x-4 bottom-0 flex justify-between">
            {Array.from({ length: 45 }).map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-white border border-newspaper-gray-300 translate-y-1/2"></div>
            ))}
          </div>
        </div>

        {/* Contenido del ticket */}
        <div className="bg-white border-4 border-newspaper-black shadow-2xl relative">
          {/* Muesca lateral izquierda (stub separator) */}
          <div className="absolute left-8 top-0 bottom-0 border-l-2 border-dashed border-newspaper-gray-300 pointer-events-none"></div>
          {/* Muesca lateral derecha (stub separator) */}
          <div className="absolute right-8 top-0 bottom-0 border-r-2 border-dashed border-newspaper-gray-300 pointer-events-none"></div>

          {/* Semicírculos de corte - izquierda */}
          <div className="absolute -left-3 top-1/3 w-6 h-6 rounded-full bg-newspaper-gray-100 border-r-2 border-newspaper-black"></div>
          <div className="absolute -left-3 top-2/3 w-6 h-6 rounded-full bg-newspaper-gray-100 border-r-2 border-newspaper-black"></div>
          {/* Semicírculos de corte - derecha */}
          <div className="absolute -right-3 top-1/3 w-6 h-6 rounded-full bg-newspaper-gray-100 border-l-2 border-newspaper-black"></div>
          <div className="absolute -right-3 top-2/3 w-6 h-6 rounded-full bg-newspaper-gray-100 border-l-2 border-newspaper-black"></div>
        {/* HEADER ESTILO PERIÓDICO VINTAGE PREMIUM */}
        <div className="border-b-4 border-double border-newspaper-black p-6 md:p-8 bg-gradient-to-b from-newspaper-cream to-newspaper-gray-50">
          <div className="text-center">
            {/* Masthead Premium */}
            <div className="mb-6">
              {/* Decoración superior */}
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="h-px flex-1 bg-newspaper-black max-w-24"></div>
                <span className="font-serif text-lg">❧</span>
                <div className="newspaper-page-number text-[10px] px-3 py-1 border border-newspaper-black bg-white">
                  PASE VIP · EDICIÓN ESPECIAL
                </div>
                <span className="font-serif text-lg">☙</span>
                <div className="h-px flex-1 bg-newspaper-black max-w-24"></div>
              </div>

              {/* Nombre del periódico */}
              <div className="border-y-4 border-double border-newspaper-black py-3 my-3">
                <h1 className="font-headline text-4xl md:text-5xl font-black text-newspaper-black leading-none tracking-tight">
                  THE WEDDING TIMES
                </h1>
              </div>

              {/* Fecha y edición */}
              <div className="flex items-center justify-center gap-4 text-xs font-serif">
                <span className="uppercase tracking-widest text-newspaper-gray-600">
                  {eventConfig.date.dayOfWeek}
                </span>
                <span className="text-newspaper-gray-400">•</span>
                <span className="font-bold text-newspaper-black">
                  {eventConfig.date.full.toUpperCase()}
                </span>
                <span className="text-newspaper-gray-400">•</span>
                <span className="uppercase tracking-widest text-newspaper-gray-600">
                  Edición Única
                </span>
              </div>
            </div>

            {/* Titular Principal - Estilo Portada */}
            <div className="bg-newspaper-black text-white p-5 md:p-6 my-4 relative">
              {/* Decoración esquinas */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/30"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/30"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/30"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/30"></div>

              <p className="font-serif text-xs uppercase tracking-[0.3em] opacity-80 mb-2">
                ¡Edición Extraordinaria!
              </p>
              <h2 className="font-headline text-2xl md:text-3xl font-black leading-tight tracking-tight">
                {eventConfig.bride.name} & {eventConfig.groom.name}
              </h2>
              <p className="font-serif text-sm mt-2 opacity-90 italic">
                Se unen en matrimonio · {eventConfig.date.month} {eventConfig.date.year}
              </p>
            </div>

            {/* Badge de Estado - más pequeño */}
            {isPending && (
              <div className="inline-block bg-yellow-100 border-2 border-yellow-600 px-4 py-1.5">
                <p className="font-headline text-xs uppercase tracking-widest text-yellow-800 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" />
                  Confirmación Pendiente
                </p>
              </div>
            )}
            {isConfirmed && (
              <div className="inline-block bg-green-100 border-2 border-green-600 px-4 py-1.5">
                <p className="font-headline text-xs uppercase tracking-widest flex items-center gap-2 justify-center text-green-800">
                  <Check className="w-3 h-3" />
                  Asistencia Confirmada
                </p>
              </div>
            )}
            {isCheckedIn && (
              <div className="inline-block bg-newspaper-black text-white px-4 py-1.5">
                <p className="font-headline text-xs uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  Ingreso Registrado
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL - ESTILO COLUMNAS DE PERIÓDICO */}
        <div className="p-6 md:p-10">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            {/* COLUMNA IZQUIERDA - QR Y CÓDIGO */}
            <div className="md:col-span-4">
              <div className="border-4 border-double border-newspaper-black p-5 bg-gradient-to-b from-white to-newspaper-gray-50 h-full">
                {/* Header del QR */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-px w-8 bg-newspaper-gray-400"></div>
                    <span className="font-serif text-sm text-newspaper-gray-400">✦</span>
                    <div className="h-px w-8 bg-newspaper-gray-400"></div>
                  </div>
                  <p className="font-headline text-[10px] uppercase tracking-[0.2em] text-newspaper-gray-600">
                    Código de Acceso Exclusivo
                  </p>
                </div>

                {/* QR Code con marco elegante */}
                <div className="relative bg-white p-3 border-2 border-newspaper-black mb-4">
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-newspaper-black"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-newspaper-black"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-newspaper-black"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-newspaper-black"></div>
                  <QRCodeSVG
                    value={qrUrl}
                    size={180}
                    level="H"
                    includeMargin={true}
                    className="w-full h-auto"
                  />
                </div>

                {/* Código */}
                <div className="bg-newspaper-black text-white py-2 px-4 text-center mb-3">
                  <p className="font-mono text-lg font-bold tracking-wider">
                    {reservation.code}
                  </p>
                </div>

                <p className="font-serif text-[11px] text-center text-newspaper-gray-600 leading-relaxed italic">
                  Presenta este código QR en la entrada del evento
                </p>
              </div>
            </div>

            {/* COLUMNA DERECHA - INFORMACIÓN DEL INVITADO */}
            <div className="md:col-span-8 space-y-5">
              {/* Invitado Principal - Estilo Anuncio */}
              <div className="border-l-4 border-newspaper-black pl-5 py-2 bg-gradient-to-r from-newspaper-gray-50 to-transparent">
                <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-newspaper-gray-500 mb-1">
                  ★ Invitado de Honor ★
                </p>
                <h3 className="font-headline text-2xl md:text-3xl font-black text-newspaper-black leading-tight">
                  {reservation.guestName}
                </h3>
              </div>

              {/* Estadísticas de Pases - Más elegante */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border-2 border-newspaper-black p-4 text-center relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2">
                    <span className="font-serif text-[9px] uppercase tracking-wider text-newspaper-gray-500">Pases</span>
                  </div>
                  <p className="font-headline text-4xl font-black text-newspaper-black">
                    {reservation.numberOfGuests}
                  </p>
                  <p className="font-serif text-[10px] uppercase tracking-wider text-newspaper-gray-600 mt-1">
                    {reservation.numberOfGuests === 1 ? 'Otorgado' : 'Otorgados'}
                  </p>
                </div>
                <div className="bg-newspaper-black text-white p-4 text-center relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-newspaper-black px-2 border-t border-x border-newspaper-gray-600">
                    <span className="font-serif text-[9px] uppercase tracking-wider text-newspaper-gray-300">Estado</span>
                  </div>
                  <p className="font-headline text-4xl font-black">
                    {confirmedCount}
                  </p>
                  <p className="font-serif text-[10px] uppercase tracking-wider opacity-80 mt-1">
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

          {/* DETALLES DEL EVENTO - ESTILO ANUNCIO VINTAGE */}
          <div className="mt-8 border-t-4 border-double border-newspaper-black pt-6">
            {/* Header de sección */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="font-serif text-base text-newspaper-gray-400">❧</span>
                <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-newspaper-gray-500">
                  Información Importante
                </p>
                <span className="font-serif text-base text-newspaper-gray-400">☙</span>
              </div>
              <h3 className="font-headline text-xl md:text-2xl font-black text-newspaper-black">
                DETALLES DEL EVENTO
              </h3>
              <div className="h-0.5 w-24 bg-newspaper-black mx-auto mt-2"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Ceremonia */}
              <div className="border-2 border-newspaper-black bg-white overflow-hidden">
                {/* Header */}
                <div className="bg-newspaper-gray-100 border-b-2 border-newspaper-black px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-newspaper-black text-white flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline text-sm font-bold text-newspaper-black uppercase tracking-wide">
                      Ceremonia Religiosa
                    </p>
                    <p className="font-serif text-xs text-newspaper-gray-600">{eventConfig.ceremony.time}</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-newspaper-gray-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-serif font-semibold text-sm text-newspaper-black">
                        {eventConfig.ceremony.name}
                      </p>
                      <p className="font-serif text-xs text-newspaper-gray-600">
                        {eventConfig.ceremony.address}
                      </p>
                    </div>
                  </div>
                  <a
                    href={eventConfig.ceremony.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-newspaper-black text-white px-4 py-2.5 font-headline text-xs uppercase tracking-wider hover:bg-newspaper-gray-800 transition cursor-pointer print:hidden"
                  >
                    <MapPin className="w-4 h-4" />
                    Ver en Google Maps
                  </a>
                </div>
              </div>

              {/* Recepción */}
              <div className="border-2 border-newspaper-black bg-newspaper-black text-white overflow-hidden">
                {/* Header */}
                <div className="bg-newspaper-gray-800 border-b border-newspaper-gray-600 px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white text-newspaper-black flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline text-sm font-bold uppercase tracking-wide">
                      Recepción
                    </p>
                    <p className="font-serif text-xs opacity-80">{eventConfig.reception.time}</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="w-4 h-4 opacity-70 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-serif font-semibold text-sm">
                        {eventConfig.reception.name}
                      </p>
                      <p className="font-serif text-xs opacity-80">
                        {eventConfig.reception.address}
                      </p>
                    </div>
                  </div>
                  <a
                    href={eventConfig.reception.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-white text-newspaper-black px-4 py-2.5 font-headline text-xs uppercase tracking-wider hover:bg-newspaper-gray-100 transition cursor-pointer print:hidden font-bold"
                  >
                    <MapPin className="w-4 h-4" />
                    Ver en Google Maps
                  </a>
                </div>
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

        {/* FOOTER ESTILO PERIÓDICO PREMIUM */}
        <div className="border-t-4 border-double border-newspaper-black p-6 md:p-8 bg-gradient-to-b from-newspaper-gray-50 to-newspaper-cream text-center">
          {/* Decoración */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 bg-newspaper-gray-300 max-w-20"></div>
            <span className="font-serif text-xl text-newspaper-gray-400">❦</span>
            <div className="h-px flex-1 bg-newspaper-gray-300 max-w-20"></div>
          </div>

          <p className="font-serif text-base italic text-newspaper-gray-700 mb-1">
            Con todo nuestro amor,
          </p>
          <p className="font-headline text-2xl md:text-3xl font-black text-newspaper-black mb-4">
            {eventConfig.groom.name} & {eventConfig.bride.name}
          </p>

          {/* Línea inferior decorativa */}
          <div className="border-t-2 border-newspaper-black pt-4 mt-4">
            <p className="font-serif text-[11px] text-newspaper-gray-600 italic">
              "Dos almas, un destino"
            </p>
            <p className="font-headline text-[10px] uppercase tracking-[0.2em] text-newspaper-gray-500 mt-2">
              Por favor presenta este pase digital en la entrada del evento
            </p>
          </div>
        </div>
        </div>{/* Cierre del contenido del ticket */}

        {/* Borde perforado inferior - efecto de troquelado */}
        <div className="relative h-5 overflow-visible">
          <div className="absolute inset-x-0 bottom-0 h-full bg-newspaper-gray-100"></div>
          <div className="absolute inset-x-4 top-0 flex justify-between">
            {Array.from({ length: 45 }).map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-white border border-newspaper-gray-300 -translate-y-1/2"></div>
            ))}
          </div>
        </div>
      </div>{/* Cierre del ticket container */}

      {/* MODAL DE CONFIRMACIÓN - ESTILO VINTAGE */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 print:hidden overflow-y-auto">
          <div className="bg-white border-4 border-newspaper-black max-w-3xl w-full my-8 shadow-2xl">
            {/* Header estilo periódico */}
            <div className="bg-newspaper-black text-white p-5 relative">
              {/* Decoración esquinas */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/30"></div>
              <div className="absolute top-2 right-10 w-3 h-3 border-t border-r border-white/30"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/30"></div>
              <div className="absolute bottom-2 right-10 w-3 h-3 border-b border-r border-white/30"></div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-serif text-[10px] uppercase tracking-[0.2em] opacity-70 mb-1">
                    The Wedding Times · Formulario Oficial
                  </p>
                  <h3 className="font-headline text-xl md:text-2xl font-black tracking-tight">
                    {confirmationStep === 'form' ? 'CONFIRMAR ASISTENCIA' : '✓ CONFIRMACIÓN EXITOSA'}
                  </h3>
                  <p className="font-serif text-sm opacity-80 mt-1 italic">
                    {reservation.guestName}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/20 transition border border-white/30"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className={`p-6 md:p-8 overflow-y-auto ${
              confirmationStep === 'message' ? 'max-h-[75vh]' : 'max-h-[60vh]'
            }`}>
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
              ) : messageSent ? (
                /* PASO 2B: Mensaje Enviado - Éxito */
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h4 className="font-headline text-2xl font-bold text-newspaper-black mb-2">
                    ¡Mensaje Enviado!
                  </h4>
                  <p className="text-newspaper-gray-700 mb-6">
                    Gracias por tus palabras. La pareja las recibirá con mucho cariño.
                  </p>
                  <div className="bg-newspaper-gray-100 border-2 border-newspaper-black p-4">
                    <p className="font-headline text-lg font-bold text-newspaper-black">
                      {getConfirmedCount()} {getConfirmedCount() === 1 ? 'persona confirmada' : 'personas confirmadas'}
                    </p>
                    <p className="text-sm text-newspaper-gray-600 mt-1">
                      ¡Nos vemos en la celebración!
                    </p>
                  </div>
                </div>
              ) : (
                /* PASO 2A: Formulario de Mensaje - Estilo Vintage */
                <>
                  <div className="mb-6 text-center">
                    {/* Badge de confirmación */}
                    <div className="inline-flex items-center gap-2 bg-green-100 border-2 border-green-600 px-4 py-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-700" />
                      <span className="font-headline text-sm font-bold text-green-800">
                        {getConfirmedCount()} {getConfirmedCount() === 1 ? 'persona confirmada' : 'personas confirmadas'}
                      </span>
                    </div>

                    {/* Separador vintage */}
                    <div className="flex items-center justify-center gap-3 my-4">
                      <div className="h-px flex-1 bg-newspaper-gray-300 max-w-16"></div>
                      <span className="font-serif text-newspaper-gray-400">✦</span>
                      <div className="h-px flex-1 bg-newspaper-gray-300 max-w-16"></div>
                    </div>

                    <h4 className="font-headline text-xl font-black text-newspaper-black mb-2 tracking-tight">
                      ENVÍA UN MENSAJE A LOS NOVIOS
                    </h4>
                    <p className="text-sm text-newspaper-gray-600 italic font-serif">
                      (Opcional) Comparte tus mejores deseos
                    </p>
                  </div>

                  {/* Formulario con estilo vintage */}
                  <div className="border-2 border-newspaper-black bg-white">
                    <div className="bg-newspaper-gray-100 border-b-2 border-newspaper-black p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-newspaper-black text-white flex items-center justify-center">
                          <Send className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-headline text-sm font-bold text-newspaper-black uppercase tracking-wide">
                            Mensaje para los Novios
                          </h3>
                          <p className="font-serif text-xs text-newspaper-gray-600 italic">
                            Deja unas palabras para {eventConfig.groom.name} y {eventConfig.bride.name} en este día especial
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <MessageForm
                        ref={messageFormRef}
                        reservationId={reservation.id}
                        guestName={reservation.guestName}
                        onSuccess={handleMessageSuccess}
                        showSubmitButton={false}
                        onCanSubmitChange={setCanSendMessage}
                        hideHeader={true}
                        hideWrapper={true}
                      />
                    </div>
                    <div className="border-t border-newspaper-gray-200 px-5 py-3 bg-newspaper-gray-50">
                      <p className="font-serif text-xs text-newspaper-gray-500 italic text-center">
                        Tu mensaje será enviado directamente a la pareja
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer - Estilo Vintage */}
            <div className="border-t-4 border-double border-newspaper-black p-6 bg-newspaper-gray-50">
              <div className="flex gap-4">
                {confirmationStep === 'form' ? (
                  <>
                    <button
                      onClick={handleSaveConfirmation}
                      className="flex-1 bg-newspaper-black text-white px-6 py-4 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-800 transition cursor-pointer border-2 border-newspaper-black shadow-md"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        Guardar Confirmación
                      </span>
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-4 bg-white border-2 border-newspaper-black font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-100 transition cursor-pointer text-newspaper-black"
                    >
                      Cancelar
                    </button>
                  </>
                ) : messageSent ? (
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 bg-newspaper-black text-white px-6 py-4 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-800 transition cursor-pointer border-2 border-newspaper-black shadow-md"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Cerrar
                    </span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSendMessage}
                      disabled={!canSendMessage || sendingMessage}
                      className="flex-1 bg-newspaper-black text-white px-6 py-4 font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-800 transition cursor-pointer disabled:bg-newspaper-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-newspaper-black shadow-md"
                    >
                      {sendingMessage ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Enviar Mensaje
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleSkipMessage}
                      disabled={sendingMessage}
                      className="px-6 py-4 bg-white border-2 border-newspaper-black font-headline text-sm uppercase tracking-wider hover:bg-newspaper-gray-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-newspaper-black font-bold"
                    >
                      Saltar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos de impresión mejorados - Solo imprime el ticket */}
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
            margin: 10mm;
          }

          /* Reset del body para impresión */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            height: auto !important;
            overflow: visible !important;
          }

          /* Ocultar TODO excepto el ticket */
          body > * {
            display: none !important;
          }

          /* Mostrar solo el contenedor principal de React */
          #root {
            display: block !important;
          }

          /* Ocultar elementos no imprimibles marcados con print:hidden */
          .print\\:hidden {
            display: none !important;
          }

          /* Contenedor principal de la página */
          .min-h-screen {
            min-height: auto !important;
            background: white !important;
            padding: 0 !important;
          }

          /* El ticket principal - hacerlo visible y centrado */
          .max-w-4xl {
            max-width: 100% !important;
            margin: 0 auto !important;
            page-break-inside: avoid !important;
          }

          /* Ocultar los bordes perforados en impresión para mejor apariencia */
          .relative.h-5.overflow-visible {
            display: none !important;
          }

          /* Contenido del ticket */
          .bg-white.border-4.border-newspaper-black {
            border-width: 2px !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
          }

          /* Ocultar semicírculos decorativos */
          .absolute.-left-3,
          .absolute.-right-3 {
            display: none !important;
          }

          /* Ocultar líneas de corte verticales */
          .absolute.left-8.top-0.bottom-0,
          .absolute.right-8.top-0.bottom-0 {
            display: none !important;
          }

          /* Asegurar que el QR sea del tamaño correcto */
          svg {
            width: 150px !important;
            height: 150px !important;
          }

          /* Mejorar contraste para impresión */
          .bg-newspaper-black {
            background-color: #000 !important;
            color: #fff !important;
          }

          .border-newspaper-black {
            border-color: #000 !important;
          }

          .text-newspaper-black {
            color: #000 !important;
          }

          /* Reducir espacios para que todo quepa en una página */
          .p-6, .p-8, .p-10 {
            padding: 12px !important;
          }

          .md\\:p-8, .md\\:p-10 {
            padding: 12px !important;
          }

          .gap-6, .gap-8 {
            gap: 12px !important;
          }

          .mb-4, .mb-6, .mb-8 {
            margin-bottom: 8px !important;
          }

          .mt-4, .mt-6, .mt-8 {
            margin-top: 8px !important;
          }

          /* Ajustar tamaños de fuente para impresión */
          .text-4xl, .text-5xl {
            font-size: 1.75rem !important;
          }

          .text-2xl, .text-3xl {
            font-size: 1.25rem !important;
          }

          .text-xl {
            font-size: 1rem !important;
          }

          .text-lg {
            font-size: 0.9rem !important;
          }

          /* Ajustar grid para impresión */
          .grid.md\\:grid-cols-12 {
            display: grid !important;
            grid-template-columns: 1fr 2fr !important;
          }

          .md\\:col-span-4 {
            grid-column: span 1 !important;
          }

          .md\\:col-span-8 {
            grid-column: span 1 !important;
          }

          /* Ocultar botones de Google Maps */
          a[href*="maps"] {
            display: none !important;
          }

          /* Asegurar legibilidad */
          body {
            font-size: 11pt !important;
            line-height: 1.3 !important;
          }

          /* Forzar que todo quepa en una página */
          .max-w-4xl > div {
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
