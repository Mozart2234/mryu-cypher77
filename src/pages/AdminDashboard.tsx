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
import { LogOut, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventConfig } from '@/config/eventConfig';

export function AdminDashboard() {
  const { logout } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark">Panel de Administración</h1>
            <p className="text-sm text-gray-600">
              {eventConfig.bride.name} & {eventConfig.groom.name} - {eventConfig.date.full}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <Home className="w-4 h-4" />
              <span>Ver Landing</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
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
