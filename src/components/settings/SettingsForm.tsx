import React from 'react';
import { Save, ExternalLink } from 'lucide-react';
import { useSettingsStore } from '../../stores/useSettingsStore';
import Spinner from '../ui/Spinner';
import { SystemSettings } from '../../config/settings';

interface Props {
  section: 'general' | 'database' | 'openai' | 'security';
}

export default function SettingsForm({ section }: Props) {
  const { settings, isLoading, error, updateSettings } = useSettingsStore();
  const [localSettings, setLocalSettings] = React.useState<SystemSettings>(settings);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(localSettings);
  };

  const renderSection = () => {
    switch (section) {
      case 'general':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Intentos máximos por ejercicio
              </label>
              <input
                type="number"
                value={localSettings.general.maxAttempts}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  general: { ...prev.general, maxAttempts: parseInt(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.general.autoGrading}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, autoGrading: e.target.checked }
                  }))}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Habilitar corrección automática
                </span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Retraso del feedback (segundos)
              </label>
              <input
                type="number"
                value={localSettings.general.feedbackDelay}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  general: { ...prev.general, feedbackDelay: parseInt(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de IGIC por defecto (%)
              </label>
              <input
                type="number"
                value={localSettings.general.defaultIGICRate}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  general: { ...prev.general, defaultIGICRate: parseInt(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-4">
            <div className="flex justify-end mb-4">
              <a
                href="https://supabase.com/dashboard/project/cedtbxcikwnruuslhipa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir Dashboard de Supabase
              </a>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL de Supabase
              </label>
              <input
                type="text"
                value={localSettings.supabase.url}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  supabase: { ...prev.supabase, url: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Clave Anónima
              </label>
              <input
                type="password"
                value={localSettings.supabase.anonKey}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  supabase: { ...prev.supabase, anonKey: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
        );

      case 'openai':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                API Key de OpenAI
              </label>
              <input
                type="password"
                value={localSettings.openai.apiKey}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  openai: { ...prev.openai, apiKey: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Modelo
              </label>
              <select
                value={localSettings.openai.model}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  openai: { ...prev.openai, model: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Máximo de Tokens
              </label>
              <input
                type="number"
                value={localSettings.openai.maxTokens}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  openai: { ...prev.openai, maxTokens: parseInt(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Temperatura
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={localSettings.openai.temperature}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  openai: { ...prev.openai, temperature: parseFloat(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Configuración de seguridad en desarrollo...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {renderSection()}

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {isLoading ? (
            <Spinner size="sm" className="mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Guardar cambios
        </button>
      </div>
    </form>
  );
}