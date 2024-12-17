import { useState, useCallback } from 'react';
import { accounts as accountsData } from '../data/accounts';
import { Account } from '../types';

export function useAccounts() {
  const [accounts] = useState<Account[]>(accountsData);

  const searchAccounts = useCallback((query: string) => {
    if (!query) return accounts;
    
    const searchTerm = query.toLowerCase();
    return accounts.filter(
      account =>
        account.code.includes(searchTerm) ||
        account.name.toLowerCase().includes(searchTerm)
    );
  }, [accounts]);

  return {
    accounts,
    searchAccounts
  };
}