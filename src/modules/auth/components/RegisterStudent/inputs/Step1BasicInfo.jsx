import React from 'react';
import InputGroup from './InputGroup';
import DateInputGroup from './DateInputGroup';

export default function Step1BasicInfo({ data, onChange, errors }) {
  // Limitar entrada numérica de exactamente 10 caracteres
  const handleNumericInput = (field) => (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(field)({ target: { value } });
  };

  return (
    <>
      <InputGroup
        label="Nombre"
        value={data.firstName}
        onChange={onChange('firstName')}
        required
        error={errors?.firstName}
      />
      <InputGroup
        label="Apellido Paterno"
        value={data.firstLastName}
        onChange={onChange('firstLastName')}
        required
        error={errors?.firstLastName}
      />
      <InputGroup
        label="Apellido Materno"
        value={data.secondLastName}
        onChange={onChange('secondLastName')}
        error={errors?.secondLastName}
      />
      <DateInputGroup
        label="Fecha de Nacimiento"
        value={data.dateOfBirth}
        onChange={onChange('dateOfBirth')}
        required
        error={errors?.dateOfBirth}
      />
      <InputGroup
        label="Número de Control"
        type="text"
        value={data.controlNumber}
        onChange={handleNumericInput('controlNumber')}
        required
        error={errors?.controlNumber}
      />
    </>
  );
}
