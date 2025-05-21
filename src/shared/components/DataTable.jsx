import { FaEye, FaDownload, FaFilePdf } from 'react-icons/fa';

const DataTable = ({ columns, data, actions = [], emptyMessage = 'No hay datos disponibles.' }) => {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm table-fixed">
        <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-2 ${col.center ? 'text-center' : 'text-left'} truncate`}
              >
                {col.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-2 text-center w-[96px] min-w-[96px]">Acciones</th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y text-gray-700">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                className="text-center py-6 text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition">
                {columns.map((col, colIndex) => (
                 <td key={colIndex} className="px-4 py-2 max-w-[220px]">
                  <div className="flex items-center gap-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">
                    {col.render ? col.render(row) : (
                      <span>{truncateMiddle(row[col.key])}</span>
                    )}
                  </div>
                </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-4 py-2 flex gap-2 justify-center items-center w-[96px] min-w-[96px]">
                    {actions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        title={action.label}
                        onClick={() => action.onClick(row)}
                        className={`p-1 rounded ${action.color || 'bg-gray-200'} ${
                          action.textColor || 'text-white'
                        }`}
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
