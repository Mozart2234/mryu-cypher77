/**
 * COMPONENTE ORNAMENT - ORNAMENTOS DECORATIVOS
 *
 * Ornamentos y decoraciones estilo periódico vintage
 * Viñetas, divisores, stamps y elementos decorativos
 */

interface OrnamentProps {
  type?: 'divider' | 'flourish' | 'stamp' | 'corner' | 'center' | 'banner';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Ornament({ type = 'divider', size = 'md', className = '' }: OrnamentProps) {
  const baseClasses = 'text-newspaper-black/20';

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  // Divisor con viñetas
  if (type === 'divider') {
    return (
      <div className={`flex items-center justify-center gap-4 my-6 ${className}`}>
        <div className={`flex-1 border-t border-newspaper-border`}></div>
        <div className={`${baseClasses} ${sizeClasses[size]} font-serif`}>❖</div>
        <div className={`flex-1 border-t border-newspaper-border`}></div>
      </div>
    );
  }

  // Floritura decorativa (ornamento central)
  if (type === 'flourish') {
    return (
      <div className={`flex justify-center my-6 ${className}`}>
        <div className={`${baseClasses} ${sizeClasses[size]} font-serif flex items-center gap-2`}>
          <span>❦</span>
          <span>❖</span>
          <span>❦</span>
        </div>
      </div>
    );
  }

  // Stamp/Sello decorativo
  if (type === 'stamp') {
    return (
      <div className={`inline-block ${className}`}>
        <div className="border-2 border-double border-newspaper-black/30 px-3 py-1 rotate-[-2deg]">
          <span className={`${baseClasses} ${sizeClasses[size]} font-bold uppercase tracking-wider`}>
            ★
          </span>
        </div>
      </div>
    );
  }

  // Esquinas decorativas
  if (type === 'corner') {
    return (
      <div className={`relative ${className}`}>
        {/* Top-left corner */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-newspaper-black/20"></div>
        {/* Top-right corner */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-newspaper-black/20"></div>
        {/* Bottom-left corner */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-newspaper-black/20"></div>
        {/* Bottom-right corner */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-newspaper-black/20"></div>
      </div>
    );
  }

  // Ornamento central (símbolo decorativo único)
  if (type === 'center') {
    return (
      <div className={`flex justify-center my-6 ${className}`}>
        <div className={`${baseClasses} ${sizeClasses[size]} font-serif`}>
          ✦
        </div>
      </div>
    );
  }

  // Banner decorativo
  if (type === 'banner') {
    return (
      <div className={`relative my-8 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="flex-1 border-t-2 border-newspaper-black/20"></div>
          <div className={`mx-4 ${baseClasses} ${sizeClasses[size]} font-serif flex gap-2`}>
            <span>✦</span>
            <span>❖</span>
            <span>✦</span>
          </div>
          <div className="flex-1 border-t-2 border-newspaper-black/20"></div>
        </div>
        <div className="flex items-center justify-center mt-1">
          <div className="flex-1 border-t border-newspaper-black/10"></div>
          <div className={`mx-8 ${baseClasses} text-xs`}>✦</div>
          <div className="flex-1 border-t border-newspaper-black/10"></div>
        </div>
      </div>
    );
  }

  return null;
}
