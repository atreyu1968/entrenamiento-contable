import React from 'react';
import { Exercise, AccountingEntry } from '../../types';
import JournalEntry from '../accounting/JournalEntry';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';

interface Props {
  exercise: Exercise;
  onBack: () => void;
  onSubmit: (entries: AccountingEntry[]) => void;
}

export default function ExerciseView({ exercise, onBack, onSubmit }: Props) {
  const [entries, setEntries] = React.useState<AccountingEntry[]>(
    exercise.entries.map(entry => ({
      ...entry,
      debit: 0,
      credit: 0,
      description: '',
      accountCode: ''
    }))
  );

  const handleEntryUpdate = (updatedEntry: AccountingEntry) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>
        
        <button
          onClick={() => onSubmit(entries)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Entregar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {exercise.title}
        </h2>
        <p className="text-gray-600 mb-6">{exercise.description}</p>
        
        <div className="space-y-4">
          {entries.map(entry => (
            <JournalEntry
              key={entry.id}
              entry={entry}
              onUpdate={handleEntryUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}