import React from 'react';
import ExerciseList from '../components/exercises/ExerciseList';
import ExerciseView from '../components/exercises/ExerciseView';
import { AccountingEntry } from '../types';
import { useExerciseStore } from '../stores/useExerciseStore';
import { compareEntries } from '../utils/correction';
import { Loader2 } from 'lucide-react';

export default function ExercisesPage() {
  const {
    exercises,
    selectedExercise,
    isLoading,
    error,
    fetchExercises,
    selectExercise,
    submitExercise
  } = useExerciseStore();

  const [feedback, setFeedback] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const handleExerciseSubmit = async (entries: AccountingEntry[]) => {
    if (!selectedExercise?.solution) return;

    const result = compareEntries(entries, selectedExercise.solution);
    
    if (result.isValid) {
      setFeedback('¡Ejercicio completado correctamente! 🎉');
      await submitExercise(selectedExercise.id, entries);
    } else {
      setFeedback(
        'Hay errores en el ejercicio. Por favor, revisa los siguientes puntos:\n' +
        result.errors.map(error => `- ${error.message}`).join('\n')
      );
    }
  };

  if (selectedExercise) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExerciseView
          exercise={selectedExercise}
          onBack={() => {
            setSelectedExercise(null);
            setFeedback(null);
          }}
          onSubmit={handleExerciseSubmit}
        />
        
        {feedback && (
          <div className={`mt-6 p-4 rounded-lg ${
            feedback.includes('correctamente')
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}>
            <pre className="whitespace-pre-wrap font-sans">{feedback}</pre>
          </div>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          Error al cargar los ejercicios: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Ejercicios Prácticos
      </h1>
      <ExerciseList
        exercises={exercises}
        onSelect={selectExercise}
      />
    </div>
  );
}