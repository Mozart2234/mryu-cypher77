/**
 * COMPONENTE: Messages Panel (Admin)
 *
 * Panel de administración para gestionar mensajes de invitados
 */

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { messageService } from '@/services/messageService';
import type { GuestMessage, MessageType } from '@/types/message';
import {
  MessageSquare,
  Trash2,
  Ban,
  CheckCircle,
  Filter,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

type FilterType = 'all' | 'active' | 'blocked' | 'public' | 'private';

const MESSAGE_TYPE_LABELS: Record<MessageType, string> = {
  wishes: '💝 Buenos deseos',
  advice: '💡 Consejo',
  memory: '📸 Recuerdo',
  other: '✨ Otro'
};

export function MessagesPanel() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [stats, setStats] = useState({
    total: 0,
    public: 0,
    private: 0,
    blocked: 0,
    active: 0
  });

  useEffect(() => {
    loadMessages();
    loadStats();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getAll();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Error al cargar los mensajes', {
        description: 'No se pudieron cargar los mensajes'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await messageService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleToggleBlocked = async (id: string, currentBlocked: boolean) => {
    toast.promise(
      messageService.toggleBlocked(id).then(async () => {
        await loadMessages();
        await loadStats();
      }),
      {
        loading: 'Actualizando mensaje...',
        success: currentBlocked ? 'Mensaje desbloqueado correctamente' : 'Mensaje bloqueado correctamente',
        error: 'Error al cambiar el estado del mensaje'
      }
    );
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este mensaje? Esta acción es permanente.')) {
      return;
    }

    toast.promise(
      messageService.delete(id).then(async () => {
        await loadMessages();
        await loadStats();
      }),
      {
        loading: 'Eliminando mensaje...',
        success: 'Mensaje eliminado correctamente',
        error: 'Error al eliminar el mensaje'
      }
    );
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    if (filter === 'active') return !msg.isBlocked;
    if (filter === 'blocked') return msg.isBlocked;
    if (filter === 'public') return msg.isPublic;
    if (filter === 'private') return !msg.isPublic;
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              Mensajes de Invitados
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Gestiona y modera los mensajes enviados por los invitados
            </p>
          </div>
          <button
            onClick={() => {
              loadMessages();
              loadStats();
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Actualizar</span>
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.active}</p>
            <p className="text-xs text-green-600 mt-1">Activos</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{stats.blocked}</p>
            <p className="text-xs text-red-600 mt-1">Bloqueados</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.public}</p>
            <p className="text-xs text-blue-600 mt-1">Públicos</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-700">{stats.private}</p>
            <p className="text-xs text-gray-600 mt-1">Privados</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2 mt-6">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Filtrar:</span>
          <div className="flex gap-2">
            {[
              { value: 'all' as FilterType, label: 'Todos' },
              { value: 'active' as FilterType, label: 'Activos' },
              { value: 'blocked' as FilterType, label: 'Bloqueados' },
              { value: 'public' as FilterType, label: 'Públicos' },
              { value: 'private' as FilterType, label: 'Privados' }
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  filter === f.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Cargando mensajes...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay mensajes con este filtro</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`border-2 rounded-lg p-5 transition-all ${
                  message.isBlocked
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Header del mensaje */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold text-gray-900">
                        {message.guestName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {MESSAGE_TYPE_LABELS[message.messageType]}
                      </span>
                      {message.isPublic ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                          <Eye className="w-3 h-3" />
                          Público
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                          <EyeOff className="w-3 h-3" />
                          Privado
                        </span>
                      )}
                      {message.isBlocked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                          <Ban className="w-3 h-3" />
                          Bloqueado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Activo
                        </span>
                      )}
                    </div>

                    {/* Contenido del mensaje */}
                    <p className="text-gray-700 leading-relaxed mb-3 italic">
                      "{message.message}"
                    </p>

                    {/* Metadata */}
                    <p className="text-xs text-gray-500">
                      Enviado el {new Date(message.createdAt).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleToggleBlocked(message.id, message.isBlocked)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        message.isBlocked
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                      title={message.isBlocked ? 'Desbloquear mensaje' : 'Bloquear mensaje'}
                    >
                      {message.isBlocked ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Desbloquear
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4" />
                          Bloquear
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Eliminar mensaje permanentemente"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
