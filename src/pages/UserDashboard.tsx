import React from 'react';
import { useProfileStore } from '../stores/useProfileStore';
import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react';
import ExerciseList from '../components/exercises/ExerciseList';
import { useExerciseStore } from '../stores/useExerciseStore';
import Spinner from '../components/ui/Spinner';

export default function UserDashboard() {
  const { profile } = useProfileStore();
  const { exercises, isLoading, error, fetchExercises } = useExerciseStore();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          Error al cargar ejercicios: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {profile?.full_name}
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Continúa con tu aprendizaje de contabilidad y IGIC
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Ejercicios Completados
              </p>
              <p className="text-2xl font-semibold text-gray-900">12/20</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <Award className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Puntuación Media
              </p>
              <p className="text-2xl font-semibold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <Clock className="h-10 w-10 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Tiempo de Estudio
              </p>
              <p className="text-2xl font-semibold text-gray-900">8.5h</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Racha Actual
              </p>
              <p className="text-2xl font-semibold text-gray-900">5 días</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Ejercicios Disponibles
        </h2>
        <ExerciseList
          exercises={exercises}
          onSelect={(exercise) => {
            // TODO: Implementar navegación al ejercicio
            console.log('Seleccionado:', exercise);
          }}
        />
      </div>
      </div>
  );
}