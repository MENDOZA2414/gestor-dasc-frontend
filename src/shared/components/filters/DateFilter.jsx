// src/components/filters/DateFilter.jsx

import { useState } from "react";

const DateFilter = ({ category, selectedDate = "", onChange }) => {
  const [value, setValue] = useState(selectedDate);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="absolute ml-56 bg-white border shadow-xl rounded-xl w-64 p-3 z-50">
      <div className="font-medium mb-2">{category}</div>
      <input
        type="date"
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
      />
    </div>
  );
};

export default DateFilter;
