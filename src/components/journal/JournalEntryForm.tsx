import React from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { AccountingEntry } from '../../types';
import AccountSelector from '../accounting/AccountSelector';

interface Props {
  entries: AccountingEntry[];
  onSave: (entries: AccountingEntry[]) => void;
}

export default function JournalEntryForm({ entries, onSave }: Props) {
  const [localEntries, setLocalEntries] = React.useState<AccountingEntry[]>(entries);

  const addEntry = () => {
    setLocalEntries(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0],
        description: '',
        accountCode: '',
        debit: 0,
        credit: 0
      }
    ]);
  };

  const removeEntry = (id: string) => {
    setLocalEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, updates: Partial<AccountingEntry>) => {
    setLocalEntries(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Asientos Contables</h2>
        <div className="flex space-x-2">
          <button
            onClick={addEntry}
            className="flex items-center px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nuevo Asiento
          </button>
          <button
            onClick={() => onSave(localEntries)}
            className="flex items-center px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <Save className="h-4 w-4 mr-1" />
            Guardar
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 mb-2">
          <div className="col-span-2">Fecha</div>
          <div className="col-span-3">Cuenta</div>
          <div className="col-span-3">Descripción</div>
          <div className="col-span-2 text-right">Debe</div>
          <div className="col-span-2 text-right">Haber</div>
        </div>

        {localEntries.map((entry) => (
          <div key={entry.id} className="bg-gray-50 p-3 rounded-lg space-y-2">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-2">
              <input
                type="date"
                value={entry.date}
                onChange={(e) => updateEntry(entry.id, { date: e.target.value })}
                className="w-full border rounded px-2 py-1.5"
              />
              </div>
              <div className="col-span-3">
                <AccountSelector
                  value={entry.accountCode}
                  onChange={(value) => updateEntry(entry.id, { accountCode: value })}
                />
              </div>
              
              <div className="col-span-3">
                <input
                  type="text"
                  value={entry.description}
                  onChange={(e) => updateEntry(entry.id, { description: e.target.value })}
                  placeholder="Descripción"
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              
              <div className="col-span-2 relative">
                <input
                  type="number"
                  value={entry.debit || ''}
                  onChange={(e) => updateEntry(entry.id, { debit: Number(e.target.value) })}
                  placeholder="Debe"
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div className="col-span-2">
                <input
                  type="number"
                  value={entry.credit || ''}
                  onChange={(e) => updateEntry(entry.id, { credit: Number(e.target.value) })}
                  placeholder="Haber"
                  className="w-full border rounded px-2 py-1"
                />
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}