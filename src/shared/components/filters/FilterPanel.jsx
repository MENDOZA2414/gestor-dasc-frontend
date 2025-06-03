import { useState, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import FilterCategoryMenu from "./FilterCategoryMenu";
import ActiveFiltersPopup from "./ActiveFiltersPopup";

const FilterPanel = ({ schema, onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filters, setFilters] = useState({});

  const handleToggle = () => setOpen(!open);

  const handleCategorySelect = (category) => {
    const type = schema[category]?.type;

    if (type === "searchOnly") {
      setFilters((prev) => {
        const isActive = !!prev[category];
        const updated = { ...prev };
        if (isActive) {
          delete updated[category];
        } else {
          updated[category] = true;
        }
        onApplyFilters(updated);
        return updated;
      });

      setActiveCategory(null);
      return;
    }

    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [category]: value };
      return updated;
    });
  };

  const isFilterActive = (category) => {
    const value = filters[category];
    if (!value) return false;
    if (typeof value === "boolean") return value;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") {
      return Object.values(value).some((arr) => arr.length > 0);
    }
    return false;
  };

  const getFilterCount = () => {
    return Object.entries(filters).reduce((acc, [key, val]) => {
      if (!val) return acc;
      if (typeof val === "boolean") return val ? acc + 1 : acc;
      if (Array.isArray(val)) return val.length > 0 ? acc + 1 : acc;
      if (typeof val === "object") {
        const nested = Object.values(val).flat();
        return nested.length > 0 ? acc + 1 : acc;
      }
      return acc;
    }, 0);
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setOpen(false);
  };

  const handleRemoveFilter = (key, valToRemove) => {
    setFilters((prev) => {
      const updated = { ...prev };
      const current = updated[key];

      if (typeof current === "boolean") {
        delete updated[key];
      } else if (Array.isArray(current)) {
        updated[key] = current.filter((v) => String(v) !== String(valToRemove));
        if (updated[key].length === 0) delete updated[key];
      } else if (typeof current === "object") {
        const nested = { ...current };
        for (const nestedKey in nested) {
          nested[nestedKey] = nested[nestedKey].filter(
            (v) => String(v) !== String(valToRemove)
          );
          if (nested[nestedKey].length === 0) delete nested[nestedKey];
        }
        if (Object.keys(nested).length === 0) {
          delete updated[key];
        } else {
          updated[key] = nested;
        }
      }

      onApplyFilters(updated); // ✅ actualiza la tabla al instante
      return updated;
    });
  };

  useEffect(() => {
    if (getFilterCount() === 0 && showPopup) {
      setShowPopup(false);
    }
  }, [filters]);

  return (
    <div className="relative z-50 flex items-center gap-2">
      <div className="relative flex items-center gap-2">
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-50"
        >
          <FaSlidersH className="text-gray-500" />
          Filtros
        </button>

        <div className="w-8 h-8 flex items-center justify-center relative">
          {getFilterCount() > 0 && (
            <button
              onClick={() => setShowPopup((prev) => !prev)}
              className="bg-blue-500 text-white text-xs rounded-full min-w-[28px] h-[32px] flex items-center justify-center font-semibold hover:bg-blue-600"
              title="Ver filtros activos"
            >
              {getFilterCount()}
            </button>
          )}

          {showPopup && (
            <ActiveFiltersPopup
              filters={filters}
              schema={schema}
              onRemove={handleRemoveFilter}
              onClose={() => setShowPopup(false)}
            />
          )}
        </div>
      </div>

      {open && (
        <div className="absolute top-full mt-2 flex bg-white rounded-xl shadow-xl border text-sm min-w-[180px]">
          <div className="flex flex-col border-r min-w-[180px]">
            <div className="px-4 py-3 font-medium">Filtros</div>
            {Object.keys(schema).map((category) => (
              <div
                key={category}
                className={`px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
                  activeCategory === category ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <span>{category}</span>
                <input
                  type="checkbox"
                  checked={isFilterActive(category)}
                  readOnly
                  onClick={(e) => e.stopPropagation()}
                  className="accent-blue-500"
                />
              </div>
            ))}
            <button
              onClick={handleApply}
              className="m-3 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md"
            >
              Aplicar filtros
            </button>
          </div>

          {activeCategory && schema[activeCategory]?.type !== "searchOnly" && (
            <FilterCategoryMenu
              category={activeCategory}
              config={schema[activeCategory]}
              selected={filters[activeCategory]}
              onChange={(value) => handleFilterChange(activeCategory, value)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
