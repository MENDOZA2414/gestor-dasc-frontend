// src/components/RegisterStudent/inputs/InputGroup.jsx
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

export default function InputGroup({ label, type = 'text', value, onChange, required, minLength, maxLength, pattern, error }) {
  return (
    <div className="w-full mb-3">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <input
        type={type}
        className={`w-full px-3 py-1.5 text-sm border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent appearance-none`}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
      />
      {error && <p className="text-xs text-red-500 mt-1 text-left flex items-center gap-1"><FaTimesCircle /> {error}</p>}
    </div>
  );
}
