/**
 * COMPONENTE FORMULARIO DE RESERVACIÓN
 *
 * Formulario para crear nuevas reservaciones manualmente
 * Refactorizado con React Hook Form
 */

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import { reservationService } from '@/services/reservationService';
import { eventConfig } from '@/config/eventConfig';
import type { CreateReservationDTO, Reservation } from '@/types/reservation';
import { UserPlus, Users, Table, UsersRound, FileText, Link as LinkIcon, Copy, CheckCircle, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { generateWhatsAppMessage, generatePlainTextMessage } from '@/config/messageTemplates';
import { copyToClipboard } from '@/utils/shareHelpers';

interface ReservationFormProps {
  onSuccess: () => void;
}

interface ReservationFormData {
  guestName: string;
  numberOfGuests: number;
  accompanistNames: { name: string }[];
  table: string;
  group: string;
  notes: string;
}

export function ReservationForm({ onSuccess }: ReservationFormProps) {
  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [copiedPlain, setCopiedPlain] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ReservationFormData>({
    defaultValues: {
      guestName: '',
      numberOfGuests: 1,
      accompanistNames: [],
      table: '',
      group: '',
      notes: ''
    }
  });

  const { fields, replace } = useFieldArray({
    control,
    name: 'accompanistNames'
  });

  // Ajustar array de acompañantes cuando cambia numberOfGuests
  const handleNumberOfGuestsChange = (value: number) => {
    const numAccompanists = Math.max(0, value - 1);
    const newFields = Array(numAccompanists).fill(null).map((_, i) => ({
      name: fields[i]?.name || ''
    }));
    replace(newFields);
  };

  const onSubmit = async (data: ReservationFormData) => {
    try {
      // Filtrar nombres vacíos
      const filteredNames = data.accompanistNames
        .map(a => a.name.trim())
        .filter(name => name !== '');

      const dataToSubmit: CreateReservationDTO = {
        guestName: data.guestName.trim(),
        numberOfGuests: data.numberOfGuests,
        accompanistNames: filteredNames.length > 0 ? filteredNames : undefined,
        table: data.table.trim() || undefined,
        group: data.group.trim() || undefined,
        notes: data.notes.trim() || undefined
      };

      const newReservation = await reservationService.create(dataToSubmit);
      setCreatedReservation(newReservation);

      // Limpiar formulario
      reset();

      toast.success('Reservación creada exitosamente', {
        description: `Invitación para ${newReservation.guestName} está lista`
      });

      onSuccess();
    } catch (err) {
      console.error('Error creating reservation:', err);
      toast.error('Error al crear reservación', {
        description: err instanceof Error ? err.message : 'Intenta de nuevo'
      });
    }
  };

  const handleCopyLink = async () => {
    if (!createdReservation) return;

    const invitationUrl = `${eventConfig.appUrl}/invitacion/${createdReservation.code}`;
    await copyToClipboard(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Link copiado al portapapeles');
  };

  const handleCloseModal = () => {
    setCreatedReservation(null);
    setCopied(false);
    setCopiedWhatsApp(false);
    setCopiedPlain(false);
  };

  const handleCopyWhatsApp = async () => {
    if (!createdReservation) return;

    const invitationUrl = `${eventConfig.appUrl}/invitacion/${createdReservation.code}`;
    const message = generateWhatsAppMessage({
      guestName: createdReservation.guestName,
      code: createdReservation.code,
      invitationUrl
    });

    await copyToClipboard(message);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
    toast.success('Mensaje WhatsApp copiado');
  };

  const handleCopyPlainText = async () => {
    if (!createdReservation) return;

    const invitationUrl = `${eventConfig.appUrl}/invitacion/${createdReservation.code}`;
    const message = generatePlainTextMessage({
      guestName: createdReservation.guestName,
      code: createdReservation.code,
      invitationUrl
    });

    await copyToClipboard(message);
    setCopiedPlain(true);
    setTimeout(() => setCopiedPlain(false), 2000);
    toast.success('Texto plano copiado');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
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
            {...register('guestName', {
              required: 'El nombre es requerido',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
            })}
            type="text"
            className="input"
            placeholder="Ej: Juan Pérez"
          />
          {errors.guestName && (
            <p className="text-xs text-red-600 mt-1">{errors.guestName.message}</p>
          )}
        </div>

        {/* Número de personas */}
        <div>
          <label className="label">
            <UsersRound className="w-4 h-4 inline mr-2" />
            Número de personas *
          </label>
          <input
            {...register('numberOfGuests', {
              required: 'Requerido',
              min: { value: 1, message: 'Mínimo 1 persona' },
              max: { value: 10, message: 'Máximo 10 personas' },
              onChange: (e) => handleNumberOfGuestsChange(parseInt(e.target.value) || 1)
            })}
            type="number"
            className="input"
            min="1"
            max="10"
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 10 personas por reservación</p>
          {errors.numberOfGuests && (
            <p className="text-xs text-red-600 mt-1">{errors.numberOfGuests.message}</p>
          )}
        </div>

        {/* Nombres de acompañantes */}
        {fields.length > 0 && (
          <div className="md:col-span-2 border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-gray-600 mr-2" />
              <h4 className="font-semibold text-gray-800">
                Nombres de Acompañantes ({fields.length} persona{fields.length !== 1 ? 's' : ''})
              </h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Opcional: Puedes agregar los nombres ahora o el invitado los completará después
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Acompañante #{index + 1}
                  </label>
                  <input
                    {...register(`accompanistNames.${index}.name`)}
                    type="text"
                    className="input text-sm"
                    placeholder="Nombre completo"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mesa */}
        <div>
          <label className="label">
            <Table className="w-4 h-4 inline mr-2" />
            Mesa (opcional)
          </label>
          <input
            {...register('table')}
            type="text"
            className="input"
            placeholder="Ej: Mesa 5"
          />
        </div>

        {/* Grupo/Familia */}
        <div>
          <label className="label">Grupo/Familia (opcional)</label>
          <input
            {...register('group')}
            type="text"
            className="input"
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
            {...register('notes')}
            className="input"
            rows={2}
            placeholder="Ej: Requiere silla alta para bebé"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creando...' : 'Crear Reservación'}
        </button>
      </div>

      {/* Modal de éxito con link de invitación */}
      {createdReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="bg-gray-900 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">Reservación Creada</h3>
                    <p className="text-gray-300 text-sm">La invitación está lista</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Información del invitado */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Invitado Principal</p>
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

                {/* Acompañantes registrados */}
                {createdReservation.accompanistNames && createdReservation.accompanistNames.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Acompañantes Registrados:</p>
                    <ul className="space-y-1">
                      {createdReservation.accompanistNames.map((name, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Si no hay acompañantes y numberOfGuests > 1 */}
                {(!createdReservation.accompanistNames || createdReservation.accompanistNames.length === 0) && createdReservation.numberOfGuests > 1 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 italic">
                      El invitado completará los nombres de los {createdReservation.numberOfGuests - 1} acompañante{createdReservation.numberOfGuests - 1 !== 1 ? 's' : ''} al aceptar la invitación
                    </p>
                  </div>
                )}
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
                    type="button"
                    onClick={handleCopyLink}
                    className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      copied
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-800 text-white hover:bg-gray-900'
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

              {/* Botones para copiar mensaje */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Compartir Invitación
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleCopyWhatsApp}
                    className={`flex flex-col items-center gap-2 px-4 py-4 rounded-lg font-medium transition-all border-2 ${
                      copiedWhatsApp
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-green-600 text-white hover:bg-green-700 border-green-600'
                    }`}
                  >
                    <Copy className="w-6 h-6" />
                    <span className="text-sm text-center">
                      {copiedWhatsApp ? '¡Copiado!' : 'WhatsApp'}
                    </span>
                    <span className="text-xs opacity-90">Con negritas</span>
                  </button>

                  {/* Plain Text Button */}
                  <button
                    type="button"
                    onClick={handleCopyPlainText}
                    className={`flex flex-col items-center gap-2 px-4 py-4 rounded-lg font-medium transition-all border-2 ${
                      copiedPlain
                        ? 'bg-gray-700 text-white border-gray-700'
                        : 'bg-gray-600 text-white hover:bg-gray-700 border-gray-600'
                    }`}
                  >
                    <FileText className="w-6 h-6" />
                    <span className="text-sm text-center">
                      {copiedPlain ? '¡Copiado!' : 'Texto Plano'}
                    </span>
                    <span className="text-xs opacity-90">Sin formato</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  WhatsApp: usa formato con negritas (*texto*) | Texto Plano: sin formato especial
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
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 border border-gray-300 transition-colors"
                >
                  Crear Otra Reservación
                </button>
                <a
                  href={`${eventConfig.appUrl}/invitacion/${createdReservation.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center"
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
