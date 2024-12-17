import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Compra de mercaderías con IGIC',
    description: 'Registra la compra de mercaderías por valor de 1.000€ más IGIC general (7%). El pago se realiza mediante transferencia bancaria.',
    entries: [
      {
        id: '1.1',
        date: '2024-03-14',
        description: '',
        accountCode: '',
        debit: 0,
        credit: 0
      },
      {
        id: '1.2',
        date: '2024-03-14',
        description: '',
        accountCode: '',
        debit: 0,
        credit: 0
      }
    ],
    autoCorrect: true,
    solution: [
      {
        id: '1.1',
        date: '2024-03-14',
        description: 'Compra de mercaderías',
        accountCode: '600',
        debit: 1000,
        credit: 0
      },
      {
        id: '1.2',
        date: '2024-03-14',
        description: 'IGIC soportado',
        accountCode: '472',
        debit: 70,
        credit: 0
      },
      {
        id: '1.3',
        date: '2024-03-14',
        description: 'Pago mediante transferencia',
        accountCode: '572',
        debit: 0,
        credit: 1070
      }
    ]
  },
  {
    id: '2',
    title: 'Venta de mercaderías con IGIC',
    description: 'Registra la venta de mercaderías por valor de 2.000€ más IGIC general (7%). El cobro se realiza en efectivo.',
    entries: [
      {
        id: '2.1',
        date: '2024-03-14',
        description: '',
        accountCode: '',
        debit: 0,
        credit: 0
      },
      {
        id: '2.2',
        date: '2024-03-14',
        description: '',
        accountCode: '',
        debit: 0,
        credit: 0
      }
    ],
    autoCorrect: true,
    solution: [
      {
        id: '2.1',
        date: '2024-03-14',
        description: 'Venta de mercaderías',
        accountCode: '570',
        debit: 2140,
        credit: 0
      },
      {
        id: '2.2',
        date: '2024-03-14',
        description: 'Importe de la venta',
        accountCode: '700',
        debit: 0,
        credit: 2000
      },
      {
        id: '2.3',
        date: '2024-03-14',
        description: 'IGIC repercutido',
        accountCode: '477',
        debit: 0,
        credit: 140
      }
    ]
  }
];