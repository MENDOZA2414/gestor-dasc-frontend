// src/components/RegisterStudent/inputs/ConfirmPasswordInputGroup.jsx
import React from 'react';
import { FaEye, FaEyeSlash, FaCheckSquare, FaTimesCircle } from 'react-icons/fa';

export default function ConfirmPasswordInputGroup({ label, password, confirmPassword, onChange, showPassword, setShowPasswordConfirm, error }) {
  const passwordsMatch = password === confirmPassword && confirmPassword !== '';

  return (
    <div className="w-full mb-3">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full px-3 py-1.5 text-sm border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent appearance-none`}
          value={confirmPassword}
          onChange={onChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPasswordConfirm(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showPassword ? <FaEyeSlash className="h-4 w-4 text-gray-500" /> : <FaEye className="h-4 w-4 text-gray-500" />}
        </button>
      </div>
      {error
        ? <p className="mt-2 text-xs text-red-500 text-left flex items-center gap-1"><FaTimesCircle /> {error}</p>
        : confirmPassword && (
          <p className={`mt-2 text-xs text-left ${passwordsMatch ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
            {passwordsMatch ? <FaCheckSquare /> : <FaTimesCircle />} {passwordsMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
          </p>
        )
      }
    </div>
  );
}
