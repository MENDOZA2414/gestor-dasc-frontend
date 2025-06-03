import React from 'react';
import InputGroup from './InputGroup';
import PasswordInputGroup from './PasswordInputGroup';
import ConfirmPasswordInputGroup from './ConfirmPasswordInputGroup';

export default function Step2Credentials({ data, onChange, showPassword, setShowPassword, showPasswordConfirm, setShowPasswordConfirm, errors }) {
  // Entrada estricta para números de 10 dígitos
  const handleNumericInput = (field) => (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(field)({ target: { value } });
  };

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
        type="text"
        value={data.phone}
        onChange={handleNumericInput('phone')}
        required
        error={errors?.phone}
      />
    </>
  );
}
