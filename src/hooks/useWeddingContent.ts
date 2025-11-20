/**
 * HOOK: useWeddingContent
 *
 * Hook personalizado para cargar y usar el contenido dinámico desde Supabase
 * con fallback a eventConfig si no hay conexión o datos
 */

import { useState, useEffect } from 'react';
import { buildEventConfig } from '@/services/contentService';
import { eventConfig as staticConfig } from '@/config/eventConfig';

export function useWeddingContent() {
  const [config, setConfig] = useState<any>(staticConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFromDatabase, setIsFromDatabase] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      setLoading(true);
      setError(null);

      // Intentar cargar desde Supabase
      const dynamicConfig = await buildEventConfig();

      // Si hay datos en la BD, usarlos
      if (Object.keys(dynamicConfig).length > 0) {
        setConfig(dynamicConfig);
        setIsFromDatabase(true);
      } else {
        // Fallback al config estático
        setConfig(staticConfig);
        setIsFromDatabase(false);
      }
    } catch (err) {
      console.warn('Error loading dynamic content, using static config:', err);
      setError(err as Error);
      // Fallback al config estático
      setConfig(staticConfig);
      setIsFromDatabase(false);
    } finally {
      setLoading(false);
    }
  }

  // Función para refrescar el contenido
  async function refresh() {
    await loadContent();
  }

  return {
    config,
    loading,
    error,
    isFromDatabase,
    refresh
  };
}
