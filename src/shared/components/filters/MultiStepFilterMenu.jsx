// src/shared/components/filters/MultiStepFilterMenu.jsx
import { useState } from "react";
import SearchableFilterList from "./SearchableFilterList";

const MultiStepFilterMenu = ({ category, config, selected = {}, onChange }) => {
  const [selectedType, setSelectedType] = useState(null);
  const steps = config.steps || {};

  const handleTypeSelect = (type) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const handleUpdateTypeOptions = (type, newValues) => {
    onChange({
      ...selected,
      [type]: newValues,
    });
  };

  const getAllOptionsChecked = (type) => {
    const all = steps[type]?.options || [];
    return selected?.[type]?.length === all.length;
  };

  return (
    <div className="flex">
      {/* Segundo nivel: Interno / Externo */}
      <div className="min-w-[160px] bg-white shadow-xl rounded-r-xl text-sm p-3 border-r">
        <div className="font-medium mb-2">Tipo</div>
        {steps.typeOptions.map((type) => (
          <div
            key={type}
            onClick={() => handleTypeSelect(type)}
            className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
              selectedType === type ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            <span>{type}</span>
            <input
              type="checkbox"
              checked={!!selected?.[type]?.length}
              readOnly
              onClick={(e) => e.stopPropagation()}
              className="accent-blue-500"
            />
          </div>
        ))}
      </div>

      {/* Tercer nivel: asesores (con búsqueda) */}
      {selectedType && steps[selectedType] && (
        <div className="min-w-[220px] bg-white shadow-xl rounded-r-xl text-sm p-3">
          <SearchableFilterList
            category={`${category} - ${selectedType}`}
            options={steps[selectedType].options}
            selected={selected[selectedType]}
            onChange={(newValues) => handleUpdateTypeOptions(selectedType, newValues)}
          />
        </div>
      )}
    </div>
  );
};

export default MultiStepFilterMenu;
