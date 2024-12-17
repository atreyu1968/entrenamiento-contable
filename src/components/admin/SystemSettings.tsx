import React from 'react';
import { Save } from 'lucide-react';

interface Settings {
  maxAttempts: number;
  autoGrading: boolean;
  feedbackDelay: number;
  defaultIGICRate: number;
}

export default function SystemSettings() {
  const [settings, setSettings] = React.useState<Settings>({
    maxAttempts: 3,
    autoGrading: true,
    feedbackDelay: 0,
    defaultIGICRate: 7
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Configuración del Sistema
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Configuración General
          </h3>
          
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="maxAttempts"
                className="block text-sm font-medium text-gray-700"
              >
                Intentos máximos por ejercicio
              </label>
              <input
                type="number"
                id="maxAttempts"
                value={settings.maxAttempts}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  maxAttempts: parseInt(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label 
                htmlFor="feedbackDelay"
                className="block text-sm font-medium text-gray-700"
              >
                Retraso del feedback (segundos)
              </label>
              <input
                type="number"
                id="feedbackDelay"
                value={settings.feedbackDelay}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  feedbackDelay: parseInt(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label 
                htmlFor="defaultIGICRate"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de IGIC por defecto (%)
              </label>
              <input
                type="number"
                id="defaultIGICRate"
                value={settings.defaultIGICRate}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  defaultIGICRate: parseInt(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoGrading"
                checked={settings.autoGrading}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  autoGrading: e.target.checked
                }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="autoGrading"
                className="ml-2 block text-sm text-gray-900"
              >
                Habilitar corrección automática por defecto
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}