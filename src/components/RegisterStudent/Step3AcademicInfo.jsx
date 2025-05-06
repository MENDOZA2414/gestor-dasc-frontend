// src/components/RegisterStudent/Step3AcademicInfo.jsx
import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import SelectGroup from './inputs/SelectGroup';

export default function Step3AcademicInfo({ data, onChange, internalAssessors, errors }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const semestreOptions = (data.career === 'LATI' || data.career === 'LITI')
    ? [
        { value: '', label: 'Seleccione' },
        { value: '0', label: '0' },
        { value: '7', label: '7' }
      ]
    : [
        { value: '', label: 'Seleccione' },
        { value: '0', label: '0' },
        { value: '9', label: '9' }
      ];

  return (
    <>
      <SelectGroup label="Carrera" value={data.career} onChange={onChange('career')} options={[
        { value: '', label: 'Seleccione' },
        { value: 'IDS', label: 'IDS' },
        { value: 'ITC', label: 'ITC' },
        { value: 'IC', label: 'IC' },
        { value: 'LATI', label: 'LATI' },
        { value: 'LITI', label: 'LITI' },
      ]} required error={errors?.career} />

      <div className="relative w-full mb-3">
        <label className="block text-sm font-medium mb-1 text-left">Semestre</label>
        <div className="relative">
          <select
            className={`w-full px-3 py-1.5 text-sm border ${errors?.semester ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors?.semester ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent appearance-none`}
            value={data.semester}
            onChange={onChange('semester')}
            required
          >
            {semestreOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowTooltip(!showTooltip)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <FaQuestionCircle className={`h-4 w-4 ${showTooltip ? 'text-blue-500' : 'text-gray-500'}`} />
          </button>
        </div>
        {errors?.semester && <p className="text-xs text-red-500 mt-1 text-left flex items-center gap-1"><FaTimesCircle /> {errors.semester}</p>}
        <div className={`transition-all duration-500 ease-in-out ${showTooltip ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="text-xs text-blue-700 bg-blue-100 border border-blue-300 rounded-md p-2 shadow-sm">
            En caso de que no estés cursando un semestre, selecciona 0
          </div>
        </div>
      </div>

      <SelectGroup label="Turno" value={data.shift} onChange={onChange('shift')} options={[
        { value: '', label: 'Seleccione' },
        { value: 'TM', label: 'TM' },
        { value: 'TV', label: 'TV' },
      ]} required error={errors?.shift} />

      <SelectGroup label="Asesor Interno" value={data.internalAssessorID} onChange={onChange('internalAssessorID')} options={[
        { value: '', label: 'Seleccione' },
        ...internalAssessors.map((assessor) => ({
          value: assessor.internalAssessorID,
          label: assessor.fullName,
        }))
      ]} required error={errors?.internalAssessorID} />
    </>
  );
}
