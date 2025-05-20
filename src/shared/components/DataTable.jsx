import { FaEye, FaDownload, FaFilePdf } from 'react-icons/fa';

const DataTable = ({ columns, data, actions }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-4 py-2 text-left ${col.center ? 'text-center' : ''}`}>
                {col.label}
              </th>
            ))}
            {actions?.length > 0 && <th className="px-4 py-2 text-center">Opciones</th>}
          </tr>
        </thead>
        <tbody className="divide-y text-gray-700">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-6 text-gray-400">
                No hay datos disponibles.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 truncate">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions?.length > 0 && (
                  <td className="px-4 py-2 flex gap-2 justify-center items-center">
                    {actions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        title={action.label}
                        className={`p-1 rounded ${action.color || 'bg-gray-200'} text-white`}
                        onClick={() => action.onClick(row)}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
