export interface User {
  id: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
}

export interface IGICRate {
  name: string;
  rate: number;
  description: string;
}

export interface AccountingEntry {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  accountCode: string;
  igicRate?: IGICRate;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  entries: AccountingEntry[];
  autoCorrect: boolean;
  solution?: AccountingEntry[];
}

export interface Account {
  code: string;
  name: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    field: string;
    message: string;
  }[];
}