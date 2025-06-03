// src/shared/components/filters/SearchableFilterList.jsx
import { useState, useEffect } from "react";

const SearchableFilterList = ({ category, options = [], selected = [], onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredOptions(
      options.filter((opt) => opt.toLowerCase().includes(lower))
    );
  }, [searchTerm, options]);

  const handleToggle = (value) => {
    const exists = selected.includes(value);
    const updated = exists
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(updated);
  };

  const handleSelectAll = () => {
    const isAllSelected = selected.length === options.length;
    onChange(isAllSelected ? [] : [...options]);
  };

  return (
    <div className="text-sm">
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div
        onClick={handleSelectAll}
        className="flex justify-between items-center cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
      >
        <span>Todos</span>
        <input
          type="checkbox"
          checked={selected.length === options.length}
          readOnly
          onClick={(e) => e.stopPropagation()}
          className="accent-blue-500"
        />
      </div>

      <div className="max-h-[220px] overflow-y-auto pr-1 mt-2 space-y-1">
        {filteredOptions.map((option) => (
          <div
            key={option}
            className="flex justify-between items-center cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
            onClick={() => handleToggle(option)}
          >
            <span className="truncate">{option}</span>
            <input
              type="checkbox"
              checked={selected.includes(option)}
              readOnly
              onClick={(e) => e.stopPropagation()}
              className="accent-blue-500"
            />
          </div>
        ))}
        {filteredOptions.length === 0 && (
          <div className="text-center text-gray-400 py-4">Sin resultados</div>
        )}
      </div>
    </div>
  );
};

export default SearchableFilterList;
