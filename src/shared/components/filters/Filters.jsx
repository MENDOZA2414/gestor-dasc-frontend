// src/components/Filters.jsx

import filterSchema from "./filterSchema";

import FilterPanel from "./FilterPanel";

const Filters = ({ viewType = "students", onFilterChange }) => {
  // Soporte para vistas anidadas como "modals.documentosAlumno"
  const schema = viewType.includes(".")
    ? viewType.split(".").reduce((acc, part) => acc?.[part], filterSchema)
    : filterSchema[viewType];

  if (!schema) return null;

  return <FilterPanel schema={schema} onApplyFilters={onFilterChange} />;
};

export default Filters;
