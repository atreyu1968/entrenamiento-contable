import React from 'react';
import { Cog, Database, Bot, Shield } from 'lucide-react';
import SettingsForm from '../components/settings/SettingsForm';

type TabType = 'general' | 'database' | 'openai' | 'security';

interface TabProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-orange-100 text-orange-700'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<TabType>('general');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Configuración del Sistema
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <Tab
              icon={Cog}
              label="General"
              isActive={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
            />
            <Tab
              icon={Database}
              label="Base de Datos"
              isActive={activeTab === 'database'}
              onClick={() => setActiveTab('database')}
            />
            <Tab
              icon={Bot}
              label="OpenAI"
              isActive={activeTab === 'openai'}
              onClick={() => setActiveTab('openai')}
            />
            <Tab
              icon={Shield}
              label="Seguridad"
              isActive={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
            />
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración General</h3>
              <SettingsForm section="general" />
            </div>
          )}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración de Base de Datos</h3>
              <SettingsForm section="database" />
            </div>
          )}
          {activeTab === 'openai' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración de OpenAI</h3>
              <SettingsForm section="openai" />
            </div>
          )}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración de Seguridad</h3>
              <SettingsForm section="security" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}