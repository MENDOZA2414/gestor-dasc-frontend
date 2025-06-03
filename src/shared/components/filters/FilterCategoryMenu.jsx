// src/shared/components/filters/FilterCategoryMenu.jsx
import MultiStepFilterMenu from "./MultiStepFilterMenu";
import SearchableFilterList from "./SearchableFilterList";
import DateFilter from "./DateFilter";
import NumberInputFilter from "./NumberInputFilter";

const FilterCategoryMenu = ({ category, config, selected = [], onChange }) => {
  // 🔒 Si el tipo es "searchOnly", no se muestra ningún submenú
  if (config.type === "searchOnly") {
    return null;
  }

  const handleMultiChange = (value) => {
    if (!Array.isArray(selected)) return onChange([value]);
    const exists = selected.includes(value);
    const updated = exists
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(updated);
  };

  const handleSelectAll = () => {
    const all = config.options || [];
    const isAllSelected = selected?.length === all.length;
    onChange(isAllSelected ? [] : [...all]);
  };

  if (config.type === "multi-step") {
    return (
      <MultiStepFilterMenu
        category={category}
        config={config}
        selected={selected}
        onChange={onChange}
      />
    );
  }

  if (config.type === "searchable") {
    return (
      <SearchableFilterList
        category={category}
        options={config.options}
        selected={selected}
        onChange={onChange}
      />
    );
  }

  if (config.type === "date") {
    return <DateFilter value={selected} onChange={onChange} />;
  }

  if (config.type === "number") {
    return <NumberInputFilter value={selected} onChange={onChange} />;
  }

  return (
    <div className="min-w-[180px] bg-white shadow-xl rounded-r-xl text-sm p-3">
      <div className="font-medium mb-2">Todos</div>
      <div className="flex flex-col gap-2">
        <div
          onClick={handleSelectAll}
          className="flex justify-between items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
        >
          <span>Todos</span>
          <input
            type="checkbox"
            checked={selected?.length === config.options?.length}
            readOnly
            onClick={(e) => e.stopPropagation()}
            className="accent-blue-500"
          />
        </div>

        {config.options?.map((option) => (
          <div
            key={option}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
            onClick={() => handleMultiChange(option)}
          >
            <span>{option}</span>
            <input
              type="checkbox"
              checked={selected?.includes(option)}
              readOnly
              onClick={(e) => e.stopPropagation()}
              className="accent-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCategoryMenu;
