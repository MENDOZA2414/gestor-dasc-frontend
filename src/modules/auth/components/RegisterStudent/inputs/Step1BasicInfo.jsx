import React from 'react';
import InputGroup from './InputGroup';
import DateInputGroup from './DateInputGroup';

export default function Step1BasicInfo({ data, onChange, errors }) {
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
