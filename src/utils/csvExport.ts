/**
 * UTILIDADES DE EXPORTACIÓN CSV
 *
 * Funciones para exportar datos a archivos CSV
 */

import type { Reservation } from '@/types/reservation';

/**
 * Convierte un array de reservaciones a formato CSV
 */
export function reservationsToCSV(reservations: Reservation[]): string {
  // Encabezados
  const headers = [
    'Código',
    'Nombre Invitado',
    'Número de Personas',
    'Acompañantes',
    'Estado',
    'Mesa',
    'Grupo',
    'Notas',
    'Fecha Creación',
    'Fecha Check-in'
  ];

  // Función helper para escapar valores CSV
  const escapeCSV = (value: any): string => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    // Si contiene comas, comillas o saltos de línea, envolver en comillas
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Convertir reservaciones a filas CSV
  const rows = reservations.map(reservation => {
    const accompanists = reservation.accompanistNames?.join('; ') || '';

    return [
      escapeCSV(reservation.code),
      escapeCSV(reservation.guestName),
      escapeCSV(reservation.numberOfGuests),
      escapeCSV(accompanists),
      escapeCSV(reservation.status),
      escapeCSV(reservation.table || ''),
      escapeCSV(reservation.group || ''),
      escapeCSV(reservation.notes || ''),
      escapeCSV(new Date(reservation.createdAt).toLocaleString('es-ES')),
      escapeCSV(reservation.checkedInAt ? new Date(reservation.checkedInAt).toLocaleString('es-ES') : '')
    ].join(',');
  });

  // Combinar encabezados y filas
  return [headers.join(','), ...rows].join('\n');
}

/**
 * Descarga un string CSV como archivo
 */
export function downloadCSV(csvContent: string, filename: string = 'export.csv'): void {
  // Agregar BOM para soporte de UTF-8 en Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

  // Crear link temporal y descargar
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Exporta reservaciones directamente a CSV
 */
export function exportReservationsToCSV(reservations: Reservation[]): void {
  const csv = reservationsToCSV(reservations);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `invitados-${timestamp}.csv`;

  downloadCSV(csv, filename);
}

/**
 * Exporta reservaciones filtradas por estado
 */
export function exportByStatus(reservations: Reservation[], status: string): void {
  const filtered = reservations.filter(r => r.status === status);
  const csv = reservationsToCSV(filtered);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `invitados-${status}-${timestamp}.csv`;

  downloadCSV(csv, filename);
}
