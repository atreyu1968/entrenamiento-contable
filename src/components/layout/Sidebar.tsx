import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator, 
  FileText, 
  BarChart3, 
  Settings,
  MessageSquare,
  Shield
} from 'lucide-react';
import { useProfileStore } from '../../stores/useProfileStore';

const defaultNavigation = [
  { name: 'Ejercicios', icon: BookOpen, path: '/exercises' },
  { name: 'Diario', icon: FileText, path: '/journal' },
  { name: 'Calculadora IGIC', icon: Calculator, path: '/calculator' },
  { name: 'Informes', icon: BarChart3, path: '/reports' },
  { name: 'Configuración', icon: Settings, path: '/settings' },
];

const adminNavigation = [
  { name: 'Panel Admin', icon: Shield, path: '/admin' },
  ...defaultNavigation
];

export default function Sidebar() {
  const { profile } = useProfileStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigation = profile?.role === 'admin' ? adminNavigation : defaultNavigation;

  return (
    <div className="w-64 bg-gray-800 text-gray-100 p-4 flex flex-col h-full">
      <nav className="space-y-2">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors duration-200 text-sm ${
              location.pathname === item.path ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}