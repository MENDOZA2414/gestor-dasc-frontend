// src/components/RegisterStudent/Step1BasicInfo.jsx
import React from 'react';
import InputGroup from './inputs/InputGroup';
import DateInputGroup from './inputs/DateInputGroup';

export default function Step1BasicInfo({ data, onChange, errors }) {
  return (
    <>
      <InputGroup label="Nombre" value={data.nombre} onChange={onChange('nombre')} required error={errors?.nombre} />
      <InputGroup label="Apellido Paterno" value={data.apellidoPaterno} onChange={onChange('apellidoPaterno')} required error={errors?.apellidoPaterno} />
      <InputGroup label="Apellido Materno" value={data.apellidoMaterno} onChange={onChange('apellidoMaterno')} error={errors?.apellidoMaterno} />
      <DateInputGroup label="Fecha de Nacimiento" value={data.fechaNacimiento} onChange={onChange('fechaNacimiento')} required error={errors?.fechaNacimiento} />
      <InputGroup 
        label="Número de Control" 
        value={data.controlNumber} 
        onChange={onChange('controlNumber')} 
        required 
        maxLength={10} 
        pattern="\d*" 
        error={errors?.controlNumber}
      />
    </>
  );
}
