import React from 'react';
import InputGroup from './inputs/InputGroup';
import PasswordInputGroup from './inputs/PasswordInputGroup';
import ConfirmPasswordInputGroup from './inputs/ConfirmPasswordInputGroup';

export default function Step2Credentials({ data, onChange, showPassword, setShowPassword, showPasswordConfirm, setShowPasswordConfirm, errors }) {
  return (
    <>
      <InputGroup
        label="Correo Electrónico"
        type="email"
        value={data.email}
        onChange={onChange('email')}
        required
        error={errors?.email}
      />
      <PasswordInputGroup
        label="Contraseña"
        value={data.password}
        onChange={onChange('password')}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        required
        minLength={8}
        error={errors?.password}
      />
      <ConfirmPasswordInputGroup
        label="Confirmar Contraseña"
        password={data.password}
        confirmPassword={data.passwordConfirm}
        onChange={onChange('passwordConfirm')}
        showPassword={showPasswordConfirm}
        setShowPasswordConfirm={setShowPasswordConfirm}
        error={errors?.passwordConfirm}
      />
      <InputGroup
        label="Número Celular"
        type="tel"
        value={data.phone}
        onChange={onChange('phone')}
        required
        pattern="\d{10}"
        error={errors?.phone}
      />
    </>
  );
}
