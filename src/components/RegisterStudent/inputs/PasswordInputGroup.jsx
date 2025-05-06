// src/components/RegisterStudent/inputs/PasswordInputGroup.jsx
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaCheckSquare, FaRegSquare, FaTimesCircle } from 'react-icons/fa';

export default function PasswordInputGroup({ label, value, onChange, showPassword, setShowPassword, required, minLength, error }) {
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setHasLowerCase(/[a-z]/.test(value));
    setHasUpperCase(/[A-Z]/.test(value));
    setHasDigit(/\d/.test(value));
    setHasSpecialChar(/[@$!%*?&]/.test(value));
    setHasMinLength(value.length >= minLength);
  }, [value, minLength]);

  const renderRequirement = (met, text) => (
    <li className={`flex items-center gap-2 text-xs ${met ? 'text-green-500' : 'text-gray-500'}`}>
      {met ? <FaCheckSquare /> : <FaRegSquare />} {text}
    </li>
  );

  const allValid = hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar && hasMinLength;

  return (
    <div className="w-full mb-3">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full px-3 py-1.5 text-sm rounded-lg bg-gray-50 appearance-none focus:outline-none focus:border-transparent border ${error ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          minLength={minLength}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showPassword ? <FaEyeSlash className="h-4 w-4 text-gray-500" /> : <FaEye className="h-4 w-4 text-gray-500" />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1 text-left flex items-center gap-1"><FaTimesCircle /> {error}</p>}
      {allValid && (
        <p className="mt-2 text-xs text-green-500 flex items-center gap-2"><FaCheckSquare /> La contraseña es segura</p>
      )}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${focused && !allValid ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <ul className="space-y-1">
          {renderRequirement(hasLowerCase, 'Al menos una letra minúscula')}
          {renderRequirement(hasUpperCase, 'Al menos una letra mayúscula')}
          {renderRequirement(hasDigit, 'Al menos un dígito')}
          {renderRequirement(hasSpecialChar, 'Al menos un carácter especial (@$!%*?&)')}
          {renderRequirement(hasMinLength, `Al menos ${minLength} caracteres`)}
        </ul>
      </div>
    </div>
  );
}
