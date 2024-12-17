import React from 'react';
import { useProfileStore } from '../../stores/useProfileStore';
import Spinner from '../ui/Spinner';

export default function ProfileForm() {
  const { profile, isLoading, error, updateProfile } = useProfileStore();
  const [fullName, setFullName] = React.useState(profile?.full_name || '');
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({ full_name: fullName });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div>
        <label 
          htmlFor="fullName" 
          className="block text-sm font-medium text-gray-700"
        >
          Nombre completo
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSaving}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Guardando...
            </>
          ) : (
            'Guardar cambios'
          )}
        </button>
      </div>
    </form>
  );
}