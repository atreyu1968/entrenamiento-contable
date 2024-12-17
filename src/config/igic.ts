import { IGICRate } from '../types';

export const IGIC_RATES: IGICRate[] = [
  { name: 'General', rate: 7, description: 'Tipo general del IGIC' },
  { name: 'Reducido', rate: 3, description: 'Tipo reducido' },
  { name: 'Cero', rate: 0, description: 'Tipo cero' },
  { name: 'Incrementado', rate: 9.5, description: 'Tipo incrementado' },
  { name: 'Especial', rate: 13.5, description: 'Tipo especial' },
  { name: 'Especial Incrementado', rate: 20, description: 'Tipo especial incrementado' },
];