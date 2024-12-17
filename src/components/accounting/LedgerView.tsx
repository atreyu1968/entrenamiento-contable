import React from 'react';
import { X, Search, Download } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function LedgerView({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Libro Mayor y Balance de Sumas y Saldos
          </h2>
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center px-3 py-1.5 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4 flex justify-between items-center">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Buscar cuenta..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="space-x-2">
              <select className="border rounded-lg px-3 py-2">
                <option>Enero 2024</option>
                <option>Febrero 2024</option>
                <option>Marzo 2024</option>
              </select>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Cuenta
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                    Debe
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                    Haber
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                    Saldo Deudor
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                    Saldo Acreedor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Ejemplo de datos */}
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">
                    <div className="font-medium text-gray-900">570</div>
                    <div className="text-gray-500">Caja, euros</div>
                  </td>
                  <td className="px-4 py-2 text-sm text-right">1.000,00</td>
                  <td className="px-4 py-2 text-sm text-right">500,00</td>
                  <td className="px-4 py-2 text-sm text-right">500,00</td>
                  <td className="px-4 py-2 text-sm text-right">-</td>
                </tr>
              </tbody>
              <tfoot className="bg-gray-50 font-medium">
                <tr>
                  <td className="px-4 py-2 text-sm">TOTALES</td>
                  <td className="px-4 py-2 text-sm text-right">1.000,00</td>
                  <td className="px-4 py-2 text-sm text-right">500,00</td>
                  <td className="px-4 py-2 text-sm text-right">500,00</td>
                  <td className="px-4 py-2 text-sm text-right">0,00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}