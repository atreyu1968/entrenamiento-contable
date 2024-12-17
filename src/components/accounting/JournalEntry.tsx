import React from 'react';
import { AccountingEntry } from '../../types';
import { IGIC_RATES } from '../../config/igic';
import AccountSelector from './AccountSelector';
import { validateEntry } from '../../utils/validation';

interface Props {
  entry: AccountingEntry;
  onUpdate: (entry: AccountingEntry) => void;
}

export default function JournalEntry({ entry, onUpdate }: Props) {
  const [errors, setErrors] = React.useState<{[key: string]: string}>({});

  const handleUpdate = (updates: Partial<AccountingEntry>) => {
    const updatedEntry = { ...entry, ...updates };
    const validation = validateEntry(updatedEntry);
    
    setErrors(
      validation.errors.reduce((acc, error) => ({
        ...acc,
        [error.field]: error.message
      }), {})
    );
    
    onUpdate(updatedEntry);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="col-span-2">
        <input
          type="date"
          value={entry.date}
          onChange={(e) => handleUpdate({ date: e.target.value })}
          className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : ''}`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-500">{errors.date}</p>
        )}
      </div>
      
      <div className="col-span-2">
        <AccountSelector
          value={entry.accountCode}
          onChange={(value) => handleUpdate({ accountCode: value })}
        />
        {errors.accountCode && (
          <p className="mt-1 text-sm text-red-500">{errors.accountCode}</p>
        )}
      </div>
      
      <div className="col-span-3">
        <input
          type="text"
          value={entry.description}
          placeholder="Descripción"
          onChange={(e) => handleUpdate({ description: e.target.value })}
          className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>
      
      <div className="col-span-2">
        <select
          value={entry.igicRate?.rate}
          onChange={(e) => {
            const rate = IGIC_RATES.find(r => r.rate === Number(e.target.value));
            handleUpdate({ igicRate: rate });
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Sin IGIC</option>
          {IGIC_RATES.map((rate) => (
            <option key={rate.rate} value={rate.rate}>
              {rate.name} ({rate.rate}%)
            </option>
          ))}
        </select>
      </div>
      
      <div className="col-span-1.5">
        <input
          type="number"
          value={entry.debit}
          placeholder="Debe"
          onChange={(e) => handleUpdate({ debit: Number(e.target.value) })}
          className={`w-full p-2 border rounded ${errors.amount ? 'border-red-500' : ''}`}
        />
      </div>
      
      <div className="col-span-1.5">
        <input
          type="number"
          value={entry.credit}
          placeholder="Haber"
          onChange={(e) => handleUpdate({ credit: Number(e.target.value) })}
          className={`w-full p-2 border rounded ${errors.amount ? 'border-red-500' : ''}`}
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
        )}
      </div>
    </div>
  );
}