import React, { useState, useEffect } from 'react';
import Step1BasicInfo from "./inputs/Step1BasicInfo";
import Step2Credentials from "./inputs/Step2Credentials";
import Step3AcademicInfo from "./inputs/Step3AcademicInfo";
import Step4PhotoUpload from "./inputs/Step4PhotoUpload";

import { validateEmail, validatePassword, validateAge } from './validations';
import api from '@utils/api';
import Swal from 'sweetalert2';

// Función que genera imagen con iniciales y color aleatorio
function generateInitialsImage(name, lastName) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const baseColors = ['#3498db', '#1abc9c', '#9b59b6', '#f39c12', '#e74c3c'];
  const base = baseColors[Math.floor(Math.random() * baseColors.length)];
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = shadeColor(base, -40);
  ctx.font = 'bold 120px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const initials = `${name.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], 'avatar.png', { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      resolve({ file, url });
    });
  });
}

function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, parseInt(R * (100 + percent) / 100));
  G = Math.min(255, parseInt(G * (100 + percent) / 100));
  B = Math.min(255, parseInt(B * (100 + percent) / 100));

  const RR = R.toString(16).padStart(2, '0');
  const GG = G.toString(16).padStart(2, '0');
  const BB = B.toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
}

export default function RegisterStudent() {
  const [step, setStep] = useState(1);
  const [foto, setFoto] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(null);
  const [omitirFoto, setOmitirFoto] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    firstLastName: '',
    secondLastName: '',
    dateOfBirth: '',
    controlNumber: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    career: '',
    semester: '',
    shift: '',
    studentStatus: 'Activo',
    status: 'Pendiente',
    internalAssessorID: ''
  });

  const [internalAssessors, setInternalAssessors] = useState([]);

  useEffect(() => {
    api.get('/internalAssessors')
      .then((res) => setInternalAssessors(res.data))
      .catch((err) => console.error('Error al obtener asesores internos:', err));
  }, []);

  // Generar avatar si se omite foto y hay nombre
  useEffect(() => {
    const crearAvatar = async () => {
      if (
        omitirFoto &&
        !foto &&
        formData.firstName.trim() &&
        formData.firstLastName.trim()
      ) {
        const { file, url } = await generateInitialsImage(
          formData.firstName,
          formData.firstLastName
        );
        setFoto(file);
        setFotoUrl(url);
      }
    };
    crearAvatar();
  }, [omitirFoto, formData.firstName, formData.firstLastName]);

  const prevFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const lector = new FileReader();
    lector.readAsDataURL(file);
    lector.onload = () => {
      setFotoUrl(lector.result);
      setFoto(file);
    };
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const isStepValid = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Nombre requerido';
      if (!formData.firstLastName.trim()) newErrors.firstLastName = 'Apellido paterno requerido';
      if (!formData.secondLastName.trim()) newErrors.secondLastName = 'Apellido materno requerido';
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Fecha requerida';
      } else if (validateAge(formData.dateOfBirth) < 18) {
        newErrors.dateOfBirth = 'Debes tener al menos 18 años';
      }
      if (!formData.controlNumber || formData.controlNumber.length !== 10) {
        newErrors.controlNumber = 'Número de control inválido';
      }
    }

    if (step === 2) {
      if (!formData.email.trim()) newErrors.email = 'Correo requerido';
      else if (!validateEmail(formData.email)) newErrors.email = 'Correo inválido';
      if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
      else if (!validatePassword(formData.password)) newErrors.password = 'Contraseña débil';
      if (!formData.passwordConfirm) newErrors.passwordConfirm = 'Confirma la contraseña';
      else if (formData.password !== formData.passwordConfirm) newErrors.passwordConfirm = 'No coinciden';
      if (!formData.phone.trim()) newErrors.phone = 'Celular requerido';
      else if (formData.phone.length !== 10) newErrors.phone = 'Debe tener 10 dígitos';
    }

    if (step === 3) {
      if (!formData.career) newErrors.career = 'Selecciona una carrera';
      if (!formData.semester) newErrors.semester = 'Selecciona un semestre';
      if (!formData.shift) newErrors.shift = 'Selecciona un turno';
      if (!formData.internalAssessorID) newErrors.internalAssessorID = 'Selecciona un asesor interno';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Campos inválidos',
        html: Object.values(newErrors).map(msg => `<p>${msg}</p>`).join(''),
      });
      return false;
    }

    return true;
  };

  
  const handleFinalSubmit = async () => {
    if (!isStepValid()) return;

    if (!foto && !omitirFoto) {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Sin foto seleccionada',
        text: '¿Deseas continuar sin subir una foto de perfil?',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
      });

      if (!result.isConfirmed) return;

      setOmitirFoto(true);

      const initials = `${formData.firstName[0] || ''}${formData.firstLastName[0] || ''}`.toUpperCase();
      const { file, url } = await generateInitialsImage(formData.firstName, formData.firstLastName);
      setFoto(file);
      setFotoUrl(url);
    }

    handleSubmit();
  };

  const handleSubmit = async () => {
    if (!isStepValid()) return;

    if (!omitirFoto && !foto) {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Sin foto seleccionada',
        text: '¿Deseas continuar sin subir una foto de perfil?',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
      });
      if (!result.isConfirmed) return;
    }

    const sendData = new FormData();
    Object.entries(formData).forEach(([key, value]) => sendData.append(key, value));
    if (foto) sendData.append("photo", foto);

    try {
      await api.post('/students/register', sendData);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.href = '/login';
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Error al registrar alumno'
      });
    }
  };

  const sharedButtonClass = "rounded-lg py-2 px-4 text-sm cursor-pointer transition duration-300";

  return (
    <div className="flex justify-center items-start pt-6 min-h-screen bg-gray-100 font-poppins px-4">
      <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-center mb-4">Registro de Alumno</h2>
        {step === 1 && <Step1BasicInfo data={formData} onChange={handleChange} errors={errors} />}
        {step === 2 && <Step2Credentials data={formData} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} showPasswordConfirm={showPasswordConfirm} setShowPasswordConfirm={setShowPasswordConfirm} errors={errors} />}
        {step === 3 && <Step3AcademicInfo data={formData} onChange={handleChange} internalAssessors={internalAssessors} errors={errors} />}
        {step === 4 && <Step4PhotoUpload fotoUrl={fotoUrl} foto={foto} omitirFoto={omitirFoto} setOmitirFoto={setOmitirFoto} prevFoto={prevFoto} />}

        <div className="mt-4 flex flex-col gap-2">
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)} className={`bg-slate-300 text-black hover:bg-slate-400 ${sharedButtonClass}`}>Anterior</button>
          )}
          {step < 4 ? (
            <button type="button" onClick={() => isStepValid() && setStep(step + 1)} className={`bg-blue-600 text-white hover:bg-blue-700 ${sharedButtonClass}`}>Siguiente</button>
          ) : (
            <button type="button" onClick={handleFinalSubmit} className={`bg-[#049774] text-white hover:bg-[#037d5e] ${sharedButtonClass}`}>Registrar Alumno</button>
          )}
        </div>
        <p className="mt-4 text-sm text-center">¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a></p>
      </form>
    </div>
  );
}
