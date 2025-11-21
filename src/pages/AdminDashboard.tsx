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
import { MessagesPanel } from '@/components/admin/MessagesPanel';
import { LogOut, Home, ListChecks, Download, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventConfig } from '@/config/eventConfig';
import { reservationService } from '@/services/reservationService';
import { exportReservationsToCSV } from '@/utils/csvExport';

type TabType = 'reservations' | 'messages';

export function AdminDashboard() {
  const { logout } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('reservations');

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
        {/* Pestañas */}
        <div className="flex items-center gap-2 mb-8 bg-white border border-gray-200 rounded-lg p-2">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'reservations'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            Reservaciones
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Mensajes de Invitados
          </button>
        </div>

        {/* Contenido según pestaña activa */}
        {activeTab === 'reservations' ? (
          <>
            {/* Estadísticas */}
            <StatsCards refreshTrigger={refreshTrigger} />

            {/* Formulario de nueva reservación */}
            <div className="mb-8">
              <ReservationForm onSuccess={handleUpdate} />
            </div>

            {/* Lista de reservaciones */}
            <ReservationList refreshTrigger={refreshTrigger} onUpdate={handleUpdate} />
          </>
        ) : (
          /* Panel de mensajes */
          <MessagesPanel />
        )}
      </main>
    </div>
  );
}
