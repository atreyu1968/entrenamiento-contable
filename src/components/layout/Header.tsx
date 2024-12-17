import React from 'react';
import { BookOpen, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useProfileStore } from '../../stores/useProfileStore';

export default function Header() {
  const { signOut } = useAuthStore();
  const { profile } = useProfileStore();
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <header className="bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img 
              src="https://i.postimg.cc/SK17bvF1/MARCA-SOFTWARE.png" 
              alt="Logo" 
              className="h-8 w-auto"
            />
            <h1 className="ml-2 text-xl font-semibold text-white">
              Sistema de Entrenamiento Contable
            </h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-md hover:bg-orange-600 flex items-center transition-colors duration-200 gap-2"
              >
              <User className="h-5 w-5 text-white" />
                <span className="text-sm text-white font-medium">
                  {profile?.full_name}
                </span>
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-sm bg-white border border-gray-100">
                  <div className="py-1">
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}