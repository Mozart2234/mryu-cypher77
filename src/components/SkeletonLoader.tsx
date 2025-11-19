/**
 * SKELETON LOADER COMPONENT
 *
 * Componente de carga skeleton estilo periódico
 * para mostrar mientras se cargan datos
 */

interface SkeletonLoaderProps {
  variant?: 'ticket' | 'card' | 'text' | 'circle';
  className?: string;
}

export function SkeletonLoader({ variant = 'text', className = '' }: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-newspaper-gray-300';

  if (variant === 'ticket') {
    return (
      <div className={`min-h-screen bg-newspaper-gray-100 py-8 px-4 ${className}`}>
        <div className="max-w-5xl mx-auto bg-white border-8 border-newspaper-black">
          {/* Header skeleton */}
          <div className="border-b-4 border-newspaper-black p-8 md:p-12">
            <div className="text-center space-y-4">
              <div className={`h-8 ${baseClasses} rounded max-w-md mx-auto`}></div>
              <div className={`h-16 ${baseClasses} rounded max-w-2xl mx-auto`}></div>
              <div className={`h-4 ${baseClasses} rounded max-w-xs mx-auto`}></div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-12 gap-8">
              {/* QR skeleton */}
              <div className="md:col-span-4">
                <div className="border-4 border-newspaper-black p-6 bg-newspaper-gray-50 h-full">
                  <div className={`w-full aspect-square ${baseClasses} rounded mb-4`}></div>
                  <div className={`h-8 ${baseClasses} rounded mb-2`}></div>
                  <div className={`h-4 ${baseClasses} rounded`}></div>
                </div>
              </div>

              {/* Info skeleton */}
              <div className="md:col-span-8 space-y-6">
                <div className={`h-12 ${baseClasses} rounded`}></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`h-24 ${baseClasses} rounded`}></div>
                  <div className={`h-24 ${baseClasses} rounded`}></div>
                </div>
                <div className={`h-32 ${baseClasses} rounded`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`${baseClasses} rounded-lg p-6 ${className}`}>
        <div className="space-y-3">
          <div className={`h-6 ${baseClasses} rounded w-3/4`}></div>
          <div className={`h-4 ${baseClasses} rounded w-full`}></div>
          <div className={`h-4 ${baseClasses} rounded w-5/6`}></div>
        </div>
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div className={`${baseClasses} rounded-full ${className}`}></div>
    );
  }

  // Default: text skeleton
  return (
    <div className={`${baseClasses} rounded h-4 ${className}`}></div>
  );
}

/**
 * Skeleton específico para el ticket de invitación
 */
export function InvitationTicketSkeleton() {
  return <SkeletonLoader variant="ticket" />;
}
