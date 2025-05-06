// src/components/RegisterStudent/inputs/SelectGroup.jsx
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

export default function SelectGroup({ label, value, onChange, options, required, error }) {
  return (
    <div className="w-full mb-3">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <select
        className={`w-full px-3 py-1.5 text-sm border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent appearance-none`}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1 text-left flex items-center gap-1"><FaTimesCircle /> {error}</p>}
    </div>
  );
}
