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
    confirmedAttendees: 0,
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
      <div className="card bg-white border border-gray-200 hover:border-gray-300 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Reservados</p>
            <p className="text-3xl font-semibold text-gray-900">
              {stats.totalGuests} <span className="text-lg text-gray-400">/ {eventConfig.maxCapacity}</span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              {capacityPercentage.toFixed(1)}% de capacidad
            </p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <Users className="w-6 h-6 text-gray-600" />
          </div>
        </div>
        {isNearCapacity && (
          <div className="mt-3 pt-3 border-t border-gray-200 flex items-center text-amber-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            Cerca del límite
          </div>
        )}
      </div>

      {/* Lugares disponibles */}
      <div className="card bg-white border border-gray-200 hover:border-gray-300 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Disponibles</p>
            <p className="text-3xl font-semibold text-gray-900">{stats.availableSpots}</p>
            <p className="text-gray-600 text-sm mt-2">lugares libres</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <UserPlus className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Total reservaciones */}
      <div className="card bg-white border border-gray-200 hover:border-gray-300 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Reservaciones</p>
            <p className="text-3xl font-semibold text-gray-900">{stats.totalReservations}</p>
            <p className="text-gray-600 text-sm mt-2">confirmadas</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <UserCheck className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Check-ins realizados */}
      <div className="card bg-white border border-gray-200 hover:border-gray-300 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Ingresados</p>
            <p className="text-3xl font-semibold text-gray-900">{stats.checkedInReservations}</p>
            <p className="text-gray-600 text-sm mt-2">
              de {stats.totalReservations} reservaciones
            </p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <UserCheck className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
