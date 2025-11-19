/**
 * PÁGINA ADMIN DASHBOARD
 *
 * Panel principal de administración con estadísticas, formulario y lista
 */

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StatsCards } from '@/components/admin/StatsCards';
import { ReservationForm } from '@/components/admin/ReservationForm';
import { ReservationList } from '@/components/admin/ReservationList';
import { LogOut, Home, ListChecks, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventConfig } from '@/config/eventConfig';
import { reservationService } from '@/services/reservationService';
import { exportReservationsToCSV } from '@/utils/csvExport';

export function AdminDashboard() {
  const { logout } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleExportCSV = async () => {
    try {
      const reservations = await reservationService.getAll();
      exportReservationsToCSV(reservations);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error al exportar el archivo CSV');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Panel de Administración</h1>
            <p className="text-sm text-gray-500 mt-1">
              {eventConfig.bride.name} & {eventConfig.groom.name} - {eventConfig.date.full}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Ver Landing</span>
            </Link>
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
              title="Exportar lista de invitados a CSV"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Exportar CSV</span>
            </button>
            <Link
              to="/lista-invitados"
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
            >
              <ListChecks className="w-4 h-4" />
              <span className="text-sm">Lista para Portero</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Estadísticas */}
        <StatsCards refreshTrigger={refreshTrigger} />

        {/* Formulario de nueva reservación */}
        <div className="mb-8">
          <ReservationForm onSuccess={handleUpdate} />
        </div>

        {/* Lista de reservaciones */}
        <ReservationList refreshTrigger={refreshTrigger} onUpdate={handleUpdate} />
      </main>
    </div>
  );
}
