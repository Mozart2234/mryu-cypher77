/**
 * COMPONENTE TARJETAS DE ESTADÍSTICAS
 *
 * Muestra las métricas de capacidad y reservaciones
 */

import { useEffect, useState } from 'react';
import { reservationService } from '@/services/reservationService';
import type { ReservationStats } from '@/types/reservation';
import { Users, UserCheck, UserPlus, AlertCircle } from 'lucide-react';
import { eventConfig } from '@/config/eventConfig';

interface StatsCardsProps {
  refreshTrigger: number;
}

export function StatsCards({ refreshTrigger }: StatsCardsProps) {
  const [stats, setStats] = useState<ReservationStats>({
    totalReservations: 0,
    totalGuests: 0,
    availableSpots: eventConfig.maxCapacity,
    pendingReservations: 0,
    confirmedReservations: 0,
    checkedInReservations: 0
  });

  useEffect(() => {
    loadStats();
  }, [refreshTrigger]);

  const loadStats = async () => {
    const data = await reservationService.getStats();
    setStats(data);
  };

  const capacityPercentage = (stats.totalGuests / eventConfig.maxCapacity) * 100;
  const isNearCapacity = capacityPercentage >= 90;

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      {/* Capacidad total */}
      <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">Reservados</p>
            <p className="text-3xl font-bold">
              {stats.totalGuests} / {eventConfig.maxCapacity}
            </p>
            <p className="text-blue-100 text-sm mt-2">
              {capacityPercentage.toFixed(1)}% de capacidad
            </p>
          </div>
          <Users className="w-10 h-10 text-blue-200" />
        </div>
        {isNearCapacity && (
          <div className="mt-3 flex items-center text-yellow-200 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            Cerca del límite
          </div>
        )}
      </div>

      {/* Lugares disponibles */}
      <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-green-100 text-sm mb-1">Disponibles</p>
            <p className="text-3xl font-bold">{stats.availableSpots}</p>
            <p className="text-green-100 text-sm mt-2">lugares libres</p>
          </div>
          <UserPlus className="w-10 h-10 text-green-200" />
        </div>
      </div>

      {/* Total reservaciones */}
      <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-purple-100 text-sm mb-1">Reservaciones</p>
            <p className="text-3xl font-bold">{stats.totalReservations}</p>
            <p className="text-purple-100 text-sm mt-2">confirmadas</p>
          </div>
          <UserCheck className="w-10 h-10 text-purple-200" />
        </div>
      </div>

      {/* Check-ins realizados */}
      <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-orange-100 text-sm mb-1">Ingresados</p>
            <p className="text-3xl font-bold">{stats.checkedInReservations}</p>
            <p className="text-orange-100 text-sm mt-2">
              de {stats.totalReservations} reservaciones
            </p>
          </div>
          <UserCheck className="w-10 h-10 text-orange-200" />
        </div>
      </div>
    </div>
  );
}
