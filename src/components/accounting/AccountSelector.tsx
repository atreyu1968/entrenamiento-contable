import React from 'react';
import { Search } from 'lucide-react';
import { useAccounts } from '../../hooks/useAccounts';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AccountSelector({ value, onChange }: Props) {
  const { accounts, searchAccounts } = useAccounts();
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState(value);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const filteredAccounts = React.useMemo(() => {
    return searchAccounts(search);
  }, [search, searchAccounts]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onChange(e.target.value);
          }}
          onClick={() => setIsOpen(true)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Buscar cuenta..."
        />
        <Search className="absolute right-2 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <ul className="max-h-60 overflow-auto">
            {filteredAccounts.map((account) => (
              <li
                key={account.code}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  account.code === value ? 'bg-indigo-50' : ''
                }`}
                onClick={() => {
                  onChange(account.code);
                  setSearch(account.code);
                  setIsOpen(false);
                }}
              >
                <span className="font-medium">{account.code}</span>
                <span className="ml-2 text-gray-600">{account.name}</span>
              </li>
            )).slice(0, 10)}
            {filteredAccounts.length > 10 && (
              <li className="px-4 py-2 text-sm text-gray-500 bg-gray-50">
                Mostrando 10 de {filteredAccounts.length} resultados
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}