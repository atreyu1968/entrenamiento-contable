import { AccountingEntry, ValidationResult } from '../types';

export function validateEntry(entry: AccountingEntry): ValidationResult {
  const errors = [];

  // Validar fecha
  if (!entry.date) {
    errors.push({
      field: 'date',
      message: 'La fecha es obligatoria'
    });
  }

  // Validar código de cuenta
  if (!entry.accountCode) {
    errors.push({
      field: 'accountCode',
      message: 'El código de cuenta es obligatorio'
    });
  }

  // Validar descripción
  if (!entry.description) {
    errors.push({
      field: 'description',
      message: 'La descripción es obligatoria'
    });
  }

  // Validar debe/haber
  if (entry.debit < 0 || entry.credit < 0) {
    errors.push({
      field: 'amount',
      message: 'Los importes no pueden ser negativos'
    });
  }

  if (entry.debit > 0 && entry.credit > 0) {
    errors.push({
      field: 'amount',
      message: 'Un asiento no puede tener debe y haber simultáneamente'
    });
  }

  if (entry.debit === 0 && entry.credit === 0) {
    errors.push({
      field: 'amount',
      message: 'El asiento debe tener un importe en el debe o en el haber'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}