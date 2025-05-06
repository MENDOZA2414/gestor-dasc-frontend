// src/components/RegisterStudent/inputs/DateInputGroup.jsx
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

export default function DateInputGroup({ label, value, onChange, required, error }) {
  return (
    <div className="w-full mb-3">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <input
        type="date"
        className={`w-full px-3 py-1.5 text-sm rounded-lg bg-gray-50 appearance-none focus:outline-none focus:border-transparent border ${error ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1 text-left flex items-center gap-1">
          <FaTimesCircle /> {error}
        </p>
      )}
    </div>
  );
}
