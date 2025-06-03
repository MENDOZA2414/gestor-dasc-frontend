// src/shared/components/filters/ActiveFiltersPopup.jsx
import { useEffect, useRef } from "react";

const ActiveFiltersPopup = ({ filters, schema, onRemove, onClose }) => {
  const ref = useRef(null);

  // Cerrar popup si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onClose]);

  // Convertir los filtros activos en etiquetas legibles
  const renderFilters = () => {
    return Object.entries(filters).flatMap(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return [];

      const values = typeof value === "boolean"
        ? [key]
        : Array.isArray(value)
        ? value
        : typeof value === "object"
        ? Object.values(value).flat()
        : [value];

      return values.map((val, idx) => (
        <div
          key={`${key}-${idx}-${val}`}
          className="flex items-center justify-between px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
        >
          <span className="text-gray-700 mr-2">{val}</span>
          <button
            onClick={() => onRemove(key, val)}
            className="text-gray-500 hover:text-red-500"
            title={`Quitar ${val}`}
          >
            ✕
          </button>
        </div>
      ));
    });
  };

  return (
    <div
      ref={ref}
      className="absolute top-12 right-0 bg-white shadow-lg rounded-xl border w-64 z-50 p-3 space-y-2"
    >
      <div className="font-medium text-gray-700 mb-2">Filtros activos</div>
      {renderFilters().length > 0 ? (
        <div className="space-y-1">{renderFilters()}</div>
      ) : (
        <div className="text-sm text-gray-400">No hay filtros activos</div>
      )}
    </div>
  );
};

export default ActiveFiltersPopup;
