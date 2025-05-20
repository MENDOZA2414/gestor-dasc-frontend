import React from 'react';
import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';
import Card from '../../../shared/components/Card';

const reports = [
  { name: 'Reporte 12/06...pdf' },
  { name: 'Reporte 09/06...pdf' },
  { name: 'Reporte 02/06...pdf' },
];

const GeneratedReportsTable = () => {
  return (
    <Card title="Reportes generados" className="col-span-12 md:col-span-3 h-[300px]">
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="text-left px-4 py-2">Nombre archivos</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {reports.map((report, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 flex items-center gap-2">
                  <FaFilePdf className="text-red-600 text-lg" />
                  <span className="truncate">{report.name}</span>
                  <button className="ml-auto bg-blue-500 text-white p-1 rounded">
                    <FaDownload />
                  </button>
                  <button className="bg-gray-200 text-black p-1 rounded">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default GeneratedReportsTable;
