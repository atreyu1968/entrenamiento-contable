import React from 'react';
import { useProfileStore } from '../stores/useProfileStore';
import { Shield, Users, BookOpen, Settings } from 'lucide-react';
import UserManagement from '../components/admin/UserManagement';
import ExerciseManagement from '../components/admin/ExerciseManagement';
import SystemSettings from '../components/admin/SystemSettings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<'users' | 'exercises' | 'settings'>('users');
  const { profile } = useProfileStore();

  if (profile?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600">No tienes permisos de administrador.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
            >
              <Users className="h-5 w-5 mr-2" />
              Usuarios
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`${
                activeTab === 'exercises'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Ejercicios
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`${
                activeTab === 'settings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
            >
              <Settings className="h-5 w-5 mr-2" />
              Configuración
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'exercises' && <ExerciseManagement />}
          {activeTab === 'settings' && <SystemSettings />}
        </div>
      </div>
    </div>
  );
}