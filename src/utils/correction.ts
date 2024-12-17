import { AccountingEntry, ValidationResult } from '../types';

export function compareEntries(
  studentEntries: AccountingEntry[],
  solutionEntries: AccountingEntry[]
): ValidationResult {
  const errors = [];

  // Validar número de asientos
  if (studentEntries.length !== solutionEntries.length) {
    errors.push({
      field: 'entries',
      message: 'El número de asientos no coincide con la solución'
    });
    return { isValid: false, errors };
  }

  // Comparar cada asiento
  studentEntries.forEach((entry, index) => {
    const solution = solutionEntries[index];

    // Validar cuenta
    if (entry.accountCode !== solution.accountCode) {
      errors.push({
        field: `entry-${index}-account`,
        message: `La cuenta ${entry.accountCode} no es correcta`
      });
    }

    // Validar importes
    if (entry.debit !== solution.debit || entry.credit !== solution.credit) {
      errors.push({
        field: `entry-${index}-amount`,
        message: 'Los importes no coinciden con la solución'
      });
    }

    // Validar IGIC si aplica
    if (solution.igicRate && (!entry.igicRate || entry.igicRate.rate !== solution.igicRate.rate)) {
      errors.push({
        field: `entry-${index}-igic`,
        message: 'El tipo de IGIC no es correcto'
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}