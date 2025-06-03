// src/components/filters/NumberInputFilter.jsx

import { useState } from "react";

const NumberInputFilter = ({ category, selectedValue = "", onChange }) => {
  const [value, setValue] = useState(selectedValue);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="absolute ml-56 bg-white border shadow-xl rounded-xl w-64 p-3 z-50">
      <div className="font-medium mb-2">{category}</div>
      <input
        type="number"
        min="0"
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
      />
    </div>
  );
};

export default NumberInputFilter;
