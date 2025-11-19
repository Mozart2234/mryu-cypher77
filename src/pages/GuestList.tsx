/**
 * PÁGINA GUEST LIST - LISTA PARA PORTERO
 *
 * Vista simple y clara para el personal de entrada con:
 * - Lista completa de invitados
 * - Cantidad de personas por invitado
 * - Estado de check-in
 * - Totales y estadísticas
 * - Opción de imprimir
 */

import { useState, useEffect } from 'react';
import { reservationService } from '@/services/reservationService';
import { eventConfig } from '@/config/eventConfig';
import type { Reservation } from '@/types/reservation';
import { Users, CheckCircle, Clock, Printer, Search } from 'lucide-react';

export function GuestList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalGuests: 0,
    checkedIn: 0,
    pending: 0,
    guestsCheckedIn: 0,
    guestsPending: 0
  });

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [reservations, searchQuery]);

  const loadReservations = async () => {
    try {
      const data = await reservationService.getAll();
      // Ordenar alfabéticamente por nombre
      const sorted = data.sort((a, b) => a.guestName.localeCompare(b.guestName));
      setReservations(sorted);
      calculateStats(sorted);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Reservation[]) => {
    const checkedIn = data.filter(r => r.status === 'ingreso-registrado');
    const pending = data.filter(r => r.status !== 'ingreso-registrado');

    setStats({
      totalReservations: data.length,
      totalGuests: data.reduce((sum, r) => sum + r.numberOfGuests, 0),
      checkedIn: checkedIn.length,
      pending: pending.length,
      guestsCheckedIn: checkedIn.reduce((sum, r) => sum + r.numberOfGuests, 0),
      guestsPending: pending.reduce((sum, r) => sum + r.numberOfGuests, 0)
    });
  };

  const filterReservations = () => {
    if (!searchQuery.trim()) {
      setFilteredReservations(reservations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = reservations.filter(r =>
      r.guestName.toLowerCase().includes(query) ||
      r.code.toLowerCase().includes(query) ||
      r.table?.toLowerCase().includes(query) ||
      r.group?.toLowerCase().includes(query)
    );
    setFilteredReservations(filtered);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-newspaper-accent border-t-transparent"></div>
          <p className="mt-4 text-newspaper-gray-600">Cargando lista de invitados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - se oculta al imprimir */}
      <div className="print:hidden bg-newspaper-black text-white p-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Lista de Invitados</h1>
              <p className="text-gray-300">
                {eventConfig.bride.name} & {eventConfig.groom.name} - {eventConfig.date.full}
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="bg-white text-newspaper-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Imprimir Lista
            </button>
          </div>

          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 rounded-lg text-newspaper-black"
              placeholder="Buscar por nombre, código, mesa o grupo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Estadísticas - resaltadas al imprimir */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 print:mb-6">
          <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg print:break-inside-avoid">
            <p className="text-xs uppercase text-blue-600 font-bold mb-1">Total Reservaciones</p>
            <p className="text-3xl font-black text-blue-900">{stats.totalReservations}</p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-lg print:break-inside-avoid">
            <p className="text-xs uppercase text-purple-600 font-bold mb-1">Total Invitados</p>
            <p className="text-3xl font-black text-purple-900">{stats.totalGuests}</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg print:break-inside-avoid">
            <p className="text-xs uppercase text-green-600 font-bold mb-1">Ingresados</p>
            <p className="text-3xl font-black text-green-900">{stats.checkedIn}</p>
            <p className="text-xs text-green-600 mt-1">{stats.guestsCheckedIn} personas</p>
          </div>
          <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-lg print:break-inside-avoid">
            <p className="text-xs uppercase text-orange-600 font-bold mb-1">Pendientes</p>
            <p className="text-3xl font-black text-orange-900">{stats.pending}</p>
            <p className="text-xs text-orange-600 mt-1">{stats.guestsPending} personas</p>
          </div>
        </div>

        {/* Título para impresión */}
        <div className="hidden print:block mb-6 pb-4 border-b-2 border-newspaper-black">
          <h1 className="text-4xl font-bold text-center mb-2">
            LISTA DE INVITADOS
          </h1>
          <p className="text-center text-lg">
            {eventConfig.bride.name} & {eventConfig.groom.name}
          </p>
          <p className="text-center text-newspaper-gray-600">
            {eventConfig.date.full}
          </p>
        </div>

        {/* Tabla de invitados */}
        <div className="bg-white border-2 border-newspaper-black rounded-lg overflow-hidden print:border print:rounded-none">
          <table className="w-full">
            <thead className="bg-newspaper-black text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase font-bold">#</th>
                <th className="px-4 py-3 text-left text-xs uppercase font-bold">Invitado</th>
                <th className="px-4 py-3 text-center text-xs uppercase font-bold">Personas</th>
                <th className="px-4 py-3 text-center text-xs uppercase font-bold print:hidden">Código</th>
                <th className="px-4 py-3 text-center text-xs uppercase font-bold">Mesa</th>
                <th className="px-4 py-3 text-center text-xs uppercase font-bold print:hidden">Grupo</th>
                <th className="px-4 py-3 text-center text-xs uppercase font-bold">Estado</th>
                <th className="px-4 py-3 text-center text-xs uppercase font-bold print:table-cell hidden">Firma</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-newspaper-gray-500">
                    {searchQuery ? 'No se encontraron resultados' : 'No hay invitados registrados'}
                  </td>
                </tr>
              ) : (
                filteredReservations.map((reservation, index) => (
                  <tr
                    key={reservation.id}
                    className={`border-b border-newspaper-gray-200 hover:bg-newspaper-gray-50 print:hover:bg-transparent ${
                      reservation.status === 'ingreso-registrado' ? 'bg-green-50 print:bg-transparent' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-newspaper-gray-600 font-mono text-sm">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-bold text-newspaper-black">
                      {reservation.guestName}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-4 h-4 text-newspaper-gray-500" />
                        <span className="font-bold text-lg">{reservation.numberOfGuests}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center print:hidden">
                      <code className="bg-gray-100 px-2 py-1 rounded-sm text-xs font-mono">
                        {reservation.code}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-newspaper-accent">
                      {reservation.table || '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-newspaper-gray-600 print:hidden">
                      {reservation.group || '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {reservation.status === 'ingreso-registrado' ? (
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full print:bg-transparent print:border print:border-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs font-bold">Ingresado</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full print:bg-transparent print:border print:border-orange-700">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-bold">Pendiente</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center hidden print:table-cell">
                      <div className="h-8 border-b border-newspaper-gray-400"></div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Resumen al final - solo para impresión */}
        <div className="hidden print:block mt-8 pt-4 border-t-2 border-newspaper-black">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm mb-2"><strong>Total Reservaciones:</strong> {stats.totalReservations}</p>
              <p className="text-sm mb-2"><strong>Total Invitados:</strong> {stats.totalGuests}</p>
            </div>
            <div>
              <p className="text-sm mb-2"><strong>Ingresados:</strong> {stats.checkedIn} ({stats.guestsCheckedIn} personas)</p>
              <p className="text-sm mb-2"><strong>Pendientes:</strong> {stats.pending} ({stats.guestsPending} personas)</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs text-newspaper-gray-600">
              Lista generada el {new Date().toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Notas para el portero */}
        <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg print:break-before-page print:mt-0">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>📋</span>
            Instrucciones para el Personal de Entrada
          </h3>
          <ul className="space-y-2 text-sm text-newspaper-gray-700">
            <li>• Verificar el nombre del invitado en la lista</li>
            <li>• Confirmar la cantidad de personas que ingresan</li>
            <li>• Marcar como "Ingresado" una vez verificado</li>
            <li>• Si tienen QR, escanear para registro automático</li>
            <li>• En caso de dudas, contactar al coordinador del evento</li>
          </ul>
        </div>
      </div>

      {/* Estilos de impresión */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 1cm;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          .print\\:break-before-page {
            break-before: page;
          }
        }
      `}</style>
    </div>
  );
}
