import React from 'react';
import { useExerciseStore } from '../../stores/useExerciseStore';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import Spinner from '../ui/Spinner';

export default function ExerciseManagement() {
  const { exercises, isLoading, error, fetchExercises } = useExerciseStore();
  const [showAddModal, setShowAddModal] = React.useState(false);

  React.useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md">
        Error al cargar ejercicios: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Ejercicios</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Ejercicio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-indigo-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">
                  {exercise.title}
                </h3>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-indigo-600">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {exercise.description}
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {exercise.entries.length} asientos
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                exercise.autoCorrect
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {exercise.autoCorrect ? 'Auto-corrección' : 'Corrección manual'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}