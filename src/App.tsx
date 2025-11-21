/**
 * COMPONENTE APP PRINCIPAL
 *
 * Configuración de rutas y estructura de la aplicación
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Páginas críticas (carga inmediata)
import { Landing } from '@/pages/Landing';
import { InvitationPass } from '@/pages/InvitationPass';

// Páginas lazy (carga diferida para admin/staff)
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const Login = lazy(() => import('@/components/admin/Login').then(m => ({ default: m.Login })));
const CheckIn = lazy(() => import('@/pages/CheckIn').then(m => ({ default: m.CheckIn })));
const GuestList = lazy(() => import('@/pages/GuestList').then(m => ({ default: m.GuestList })));
const ContentEditor = lazy(() => import('@/pages/ContentEditor').then(m => ({ default: m.ContentEditor })));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" richColors closeButton expand={true} />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando...</p>
            </div>
          </div>
        }>
          <Routes>
            {/* Ruta pública - Landing */}
            <Route path="/" element={<Landing />} />

            {/* Ruta de invitación individual (pase digital) */}
            <Route path="/invitacion/:code" element={<InvitationPass />} />

            {/* Ruta de lista para portero (accesible sin autenticación) */}
            <Route path="/lista-invitados" element={<GuestList />} />

            {/* Ruta de check-in (accesible sin autenticación) */}
            <Route path="/check-in" element={<CheckIn />} />

            {/* Editor de contenido (accesible sin autenticación) */}
            <Route path="/editor" element={<ContentEditor />} />

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
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
