import React from 'react';
import { Exercise } from '../../types';
import { Book } from 'lucide-react';

interface Props {
  exercises: Exercise[];
  onSelect: (exercise: Exercise) => void;
}

export default function ExerciseList({ exercises, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
        >
          <div className="flex items-center mb-4">
            <Book className="h-8 w-8 text-indigo-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              {exercise.title}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {exercise.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {exercise.entries.length} asientos
            </span>
            
            <button
              onClick={() => onSelect(exercise)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Comenzar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}