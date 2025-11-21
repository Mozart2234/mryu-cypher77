/**
 * COMPONENTE LISTA DE RESERVACIONES
 *
 * Tabla con todas las reservaciones, búsqueda y filtros
 */

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { reservationService } from '@/services/reservationService';
import type { Reservation, ReservationStatus } from '@/types/reservation';
import { ReservationRow } from './ReservationRow';
import { Search, Filter } from 'lucide-react';

interface ReservationListProps {
  refreshTrigger: number;
  onUpdate: () => void;
}

export function ReservationList({ refreshTrigger, onUpdate }: ReservationListProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, [refreshTrigger]);

  useEffect(() => {
    filterReservations();
  }, [reservations, searchQuery, statusFilter]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await reservationService.getAll();
      // Ordenar por fecha de creación (más recientes primero)
      const sorted = data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setReservations(sorted);
    } finally {
      setLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = [...reservations];

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.guestName.toLowerCase().includes(query) ||
        r.code.toLowerCase().includes(query) ||
        r.group?.toLowerCase().includes(query)
      );
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    setFilteredReservations(filtered);
  };

  const handleCheckIn = async (id: string) => {
    try {
      await reservationService.checkIn(id);
      toast.success('Ingreso registrado', {
        description: 'El check-in se realizó correctamente'
      });
      onUpdate();
    } catch (error) {
      toast.error('Error al registrar ingreso', {
        description: error instanceof Error ? error.message : 'Intenta de nuevo'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await reservationService.delete(id);
      toast.success('Reservación eliminada', {
        description: 'La reservación se eliminó correctamente'
      });
      onUpdate();
    } catch (error) {
      toast.error('Error al eliminar reservación', {
        description: error instanceof Error ? error.message : 'Intenta de nuevo'
      });
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="text-center py-12 text-gray-500">
          Cargando reservaciones...
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Reservaciones</h3>

        {/* Controles de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              className="input pl-10"
              placeholder="Buscar por nombre, código o grupo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtro por estado */}
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="input pl-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ReservationStatus | 'all')}
              >
                <option value="all">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="ingreso-registrado">Ingresado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredReservations.length} de {reservations.length} reservaciones
        </div>
      </div>

      {/* Tabla */}
      {filteredReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchQuery || statusFilter !== 'all'
            ? 'No se encontraron reservaciones con los filtros aplicados'
            : 'No hay reservaciones aún'}
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Invitado</th>
                <th>Personas</th>
                <th>Código</th>
                <th>Mesa</th>
                <th>Grupo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map(reservation => (
                <ReservationRow
                  key={reservation.id}
                  reservation={reservation}
                  onCheckIn={handleCheckIn}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
