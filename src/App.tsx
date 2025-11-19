/**
 * COMPONENTE APP PRINCIPAL
 *
 * Configuración de rutas y estructura de la aplicación
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Páginas
import { Landing } from '@/pages/Landing';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { Login } from '@/components/admin/Login';
import { CheckIn } from '@/pages/CheckIn';
import { InvitationPass } from '@/pages/InvitationPass';
import { GuestList } from '@/pages/GuestList';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          {/* Ruta pública - Landing */}
          <Route path="/" element={<Landing />} />

          {/* Ruta de invitación individual (pase digital) */}
          <Route path="/invitacion/:code" element={<InvitationPass />} />

          {/* Ruta de lista para portero (accesible sin autenticación) */}
          <Route path="/lista-invitados" element={<GuestList />} />

          {/* Ruta de check-in (accesible sin autenticación) */}
          <Route path="/check-in" element={<CheckIn />} />

          {/* Login del admin */}
          <Route path="/admin/login" element={<Login />} />

          {/* Panel de administración (protegido) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirigir cualquier otra ruta al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
  );
}

export default App;
