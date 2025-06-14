import React from "react";
import IconButton from '@shared/components/buttons/IconButton';

const DataTable = React.forwardRef(
  ({ columns, data, actions = [], emptyMessage = "No hay datos disponibles.", maxHeight }, ref) => {
    return (
      <div ref={ref} className="rounded-xl border border-gray-200 shadow-sm h-full flex flex-col overflow-hidden">
        <div
          className="overflow-y-auto flex-grow scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-md"
          style={maxHeight ? { maxHeight } : {}}
        >
          <div className="overflow-auto w-full">
            <table className="w-full text-sm min-w-max">
              <thead className="bg-gray-100 text-gray-700 font-semibold sticky top-0 z-10">
                <tr>
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className={`px-4 py-2 ${col.center ? "text-center" : "text-left"} whitespace-nowrap`}
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
                        <td
                          key={colIndex}
                          className={`px-4 py-2 ${col.key === "view" ? "w-[48px] text-center" : "whitespace-nowrap"}`}
                        >
                          <div
                            className={`flex items-center gap-2 ${
                              col.key === "view" ? "justify-center" : ""
                            }`}
                          >
                            {col.render ? col.render(row) : <span>{row[col.key]}</span>}
                          </div>
                        </td>
                      ))}
                      {actions.length > 0 && (
                        <td className="px-4 py-2 flex gap-2 justify-center items-center min-w-fit">
                          {actions.map((action, aIdx) => (
                            <IconButton
                              key={aIdx}
                              icon={action.type}
                              title={action.title}
                              onClick={() => action.onClick(row)}
                            />
                          ))}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

export default DataTable;
