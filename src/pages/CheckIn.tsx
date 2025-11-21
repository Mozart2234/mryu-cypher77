/**
 * PÁGINA CHECK-IN
 *
 * Permite confirmar el ingreso de invitados mediante:
 * 1. URL con código QR (desde parámetro ?code=XXXXX)
 * 2. Escaneo de QR con cámara
 * 3. Búsqueda manual por código
 * 4. Búsqueda por nombre del invitado
 */

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { reservationService } from '@/services/reservationService';
import type { Reservation } from '@/types/reservation';
import { QRScanner } from '@/components/checkin/QRScanner';
import {
  CheckCircle,
  XCircle,
  Camera,
  Search,
  Home,
  Users,
  Table,
  AlertCircle,
  User,
  Loader2
} from 'lucide-react';

export function CheckIn() {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [searchResults, setSearchResults] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchingName, setSearchingName] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // Cargar código desde URL al montar el componente
  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode) {
      setCode(urlCode);
      handleSearch(urlCode);
    }
  }, [searchParams]);

  // Búsqueda por nombre con debounce
  useEffect(() => {
    if (nameSearch.length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchingName(true);
      try {
        const results = await reservationService.searchByName(nameSearch);
        setSearchResults(results);
      } catch (err) {
        console.error('Error searching by name:', err);
      } finally {
        setSearchingName(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [nameSearch]);

  const handleSearch = async (searchCode?: string) => {
    const codeToSearch = searchCode || code;
    if (!codeToSearch) {
      setError('Ingresa un código');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
    setReservation(null);
    setSearchResults([]);
    setNameSearch('');

    try {
      const found = await reservationService.getByCode(codeToSearch);

      if (!found) {
        setError('Código no válido. Verifica el código e intenta nuevamente.');
        return;
      }

      setReservation(found);
    } catch (err) {
      setError('Error al buscar la reservación');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFromSearch = (selected: Reservation) => {
    setReservation(selected);
    setSearchResults([]);
    setNameSearch('');
    setCode(selected.code);
  };

  const handleCheckIn = async () => {
    if (!reservation) return;

    setLoading(true);
    setError('');

    try {
      await reservationService.checkIn(reservation.id);
      setSuccess(true);

      // Recargar la reservación para ver el estado actualizado
      const updated = await reservationService.getById(reservation.id);
      if (updated) {
        setReservation(updated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar ingreso');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (scannedCode: string) => {
    setCode(scannedCode);
    setShowScanner(false);
    handleSearch(scannedCode);
  };

  const resetForm = () => {
    setCode('');
    setNameSearch('');
    setReservation(null);
    setSearchResults([]);
    setError('');
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Check-In</h1>
          <p className="text-gray-600">Confirma el ingreso de los invitados</p>
          <Link
            to="/admin"
            className="inline-flex items-center space-x-2 mt-4 text-sm text-gray-600 hover:text-gray-900"
          >
            <Home className="w-4 h-4" />
            <span>Volver al panel</span>
          </Link>
        </div>

        {/* Búsqueda y escaneo */}
        {!reservation && (
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Buscar Reservación</h2>

            {/* Botón para escanear QR */}
            <button
              onClick={() => setShowScanner(true)}
              className="w-full btn-primary mb-4 flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Escanear Código QR</span>
            </button>

            <div className="relative flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">o buscar por</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Búsqueda por código */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de reservación
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder="Ej: WED-1234"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={() => handleSearch()}
                  disabled={loading}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Buscar</span>
                </button>
              </div>
            </div>

            {/* Búsqueda por nombre */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del invitado
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input w-full pl-10"
                  placeholder="Escribe al menos 2 letras..."
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchingName && (
                  <Loader2 className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 animate-spin" />
                )}
              </div>

              {/* Resultados de búsqueda por nombre */}
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {searchResults.map((result) => {
                    // Verificar si la coincidencia viene de un acompañante
                    const matchingAccompanist = result.accompanists?.find(
                      acc => acc.name?.toLowerCase().includes(nameSearch.toLowerCase())
                    );
                    const isAccompanistMatch = matchingAccompanist && !result.guestName.toLowerCase().includes(nameSearch.toLowerCase());

                    return (
                      <button
                        key={result.id}
                        onClick={() => handleSelectFromSearch(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{result.guestName}</p>
                            {isAccompanistMatch && (
                              <p className="text-xs text-purple-600 font-medium">
                                Acompañante: {matchingAccompanist.name}
                              </p>
                            )}
                            <p className="text-sm text-gray-500">
                              {result.numberOfGuests} {result.numberOfGuests === 1 ? 'persona' : 'personas'}
                              {result.table && ` • Mesa ${result.table}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {result.code}
                            </code>
                            <span className={`text-xs px-2 py-1 rounded ${
                              result.status === 'ingreso-registrado'
                                ? 'bg-green-100 text-green-700'
                                : result.status === 'confirmada'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {result.status === 'ingreso-registrado'
                                ? '✓ Ingresado'
                                : result.status === 'confirmada'
                                ? 'Confirmada'
                                : 'Pendiente'}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {nameSearch.length >= 2 && !searchingName && searchResults.length === 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  No se encontraron invitados con ese nombre
                </p>
              )}
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start">
                <XCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Información de la reservación */}
        {reservation && (
          <div className="card">
            {/* Status badge */}
            <div className="mb-6">
              {reservation.status === 'ingreso-registrado' ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-green-900">Ya registrado</p>
                    <p className="text-sm text-green-700">
                      Este invitado ya ingresó al evento
                    </p>
                  </div>
                </div>
              ) : success ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-green-900">¡Ingreso confirmado!</p>
                    <p className="text-sm text-green-700">
                      Bienvenido al evento
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-center">
                  <AlertCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-blue-900">Reservación encontrada</p>
                    <p className="text-sm text-blue-700">
                      Confirma el ingreso del invitado
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Datos de la reservación */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between py-3 border-b">
                <span className="text-gray-600">Nombre</span>
                <span className="font-semibold text-lg">{reservation.guestName}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Número de personas
                </span>
                <span className="font-semibold text-lg">{reservation.numberOfGuests}</span>
              </div>

              {reservation.table && (
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600 flex items-center">
                    <Table className="w-4 h-4 mr-2" />
                    Mesa asignada
                  </span>
                  <span className="font-semibold">{reservation.table}</span>
                </div>
              )}

              {reservation.group && (
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Grupo</span>
                  <span className="font-semibold">{reservation.group}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Código</span>
                <code className="font-mono bg-gray-100 px-3 py-1 rounded-sm">
                  {reservation.code}
                </code>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Estado</span>
                <span className={`badge ${reservation.status === 'ingreso-registrado'
                    ? 'badge-checked-in'
                    : reservation.status === 'confirmada'
                      ? 'badge-confirmed'
                      : 'badge-pending'
                  }`}>
                  {reservation.status === 'ingreso-registrado'
                    ? 'Ingresado'
                    : reservation.status === 'confirmada'
                      ? 'Confirmada'
                      : 'Pendiente'}
                </span>
              </div>

              {reservation.notes && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-900 mb-1">Notas:</p>
                  <p className="text-sm text-yellow-800">{reservation.notes}</p>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex gap-3">
              {reservation.status !== 'ingreso-registrado' && !success && (
                <button
                  onClick={handleCheckIn}
                  disabled={loading}
                  className="flex-1 btn-success flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{loading ? 'Procesando...' : 'Confirmar Ingreso'}</span>
                </button>
              )}
              <button
                onClick={resetForm}
                className="flex-1 btn-secondary"
              >
                {reservation.status === 'ingreso-registrado' || success
                  ? 'Escanear Otro'
                  : 'Cancelar'}
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start">
                <XCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scanner modal */}
      {showScanner && (
        <QRScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
      )}
    </div>
  );
}
