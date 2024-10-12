import React, { useState, useEffect } from 'react';
import api from '../api';

export default function RegisterStudent() {
  const [foto, setFoto] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [celular, setCelular] = useState('');
  const [career, setCareer] = useState('');
  const [semester, setSemester] = useState('');
  const [shift, setShift] = useState('');
  const [studentStatus, setStudentStatus] = useState('Activo');
  const [internalAssessorID, setInternalAssessorID] = useState('');
  const [internalAssessors, setInternalAssessors] = useState([]);
  const [step, setStep] = useState(1);
  const [omitirFoto, setOmitirFoto] = useState(false);

  useEffect(() => {
    const fetchInternalAssessors = async () => {
      try {
        const response = await api.get('/internalAssessors');
        setInternalAssessors(response.data);
      } catch (error) {
        console.error('Error al obtener asesores internos:', error);
      }
    };

    fetchInternalAssessors();
  }, []);

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

  const handleNumericInput = (e, setter, maxLength) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= maxLength) {
      setter(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
  
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellidoPaterno", apellidoPaterno);
    formData.append("apellidoMaterno", apellidoMaterno);
    formData.append("fechaNacimiento", fechaNacimiento);
    formData.append("controlNumber", controlNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("celular", celular);
    formData.append("career", career);
    formData.append("semester", semester);
    formData.append("shift", shift);
    formData.append("studentStatus", studentStatus);
    formData.append("internalAssessorID", internalAssessorID);
  
    if (!omitirFoto && foto) {
      formData.append("photo", foto);
    }
  
    try {
      await api.post('/students/register', formData);
      alert('Registro exitoso');
    } catch (error) {
      console.error("Error al registrar el alumno:", error);
      alert('Hubo un error al registrar el alumno, por favor intente nuevamente.');
    }
  };

  return (
    <div className="flex justify-center items-start pt-6 min-h-[calc(100vh-80px)] bg-gray-100 font-poppins overflow-auto px-4 sm:px-6 lg:px-8">
      <form className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col items-center">
          <h5 className="text-xl font-bold mb-4">Registro de Alumno</h5>
          {step === 1 && (
            <>
              <InputGroup label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              <InputGroup label="Apellido Paterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} required />
              <InputGroup label="Apellido Materno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} required />
              <InputGroup label="Fecha de Nacimiento" type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
              <InputGroup label="Número de Control" value={controlNumber} onChange={(e) => setControlNumber(e.target.value)} required />
            </>
          )}
          {step === 2 && (
            <>
              <InputGroup label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <InputGroup label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="8" />
              <InputGroup label="Confirmar Contraseña" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required minLength="8" />
              <InputGroup label="Número Celular" type="tel" value={celular} onChange={(e) => handleNumericInput(e, setCelular, 10)} required pattern="\d{10}" />
            </>
          )}
          {step === 3 && (
            <>
              <SelectGroup label="Carrera" value={career} onChange={(e) => setCareer(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                { value: "IDS", label: "IDS" },
                { value: "ITC", label: "ITC" },
                { value: "IC", label: "IC" },
                { value: "LATI", label: "LATI" },
                { value: "LITI", label: "LITI" },
              ]} required />
              <SelectGroup label="Semestre" value={semester} onChange={(e) => setSemester(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                { value: "0", label: "0" },
                { value: "9", label: "9" },
              ]} required />
              <SelectGroup label="Turno" value={shift} onChange={(e) => setShift(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                { value: "TM", label: "TM" },
                { value: "TV", label: "TV" },
              ]} required />
              <SelectGroup label="Asesor Interno" value={internalAssessorID} onChange={(e) => setInternalAssessorID(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                ...internalAssessors.map((assessor) => ({
                  value: assessor.internalAssessorID,
                  label: assessor.fullName,
                })),
              ]} required />
            </>
          )}
          {step === 4 && (
            <>
              <h6 className="text-base text-gray-700 font-medium mb-3">Selecciona una foto de perfil</h6>
              <div className="w-32 h-32 mb-3 flex justify-center items-center">
                {fotoUrl ? (
                  <img className="w-full h-full object-cover rounded-full" src={fotoUrl} alt="Foto del alumno" />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full"></div>
                )}
              </div>
              <div className="flex w-full items-center mb-3">
                <label htmlFor="fileUpload" className="bg-gray-200 text-black py-1.5 px-3 rounded-l-lg border border-gray-300 cursor-pointer whitespace-nowrap text-sm">
                  Seleccionar archivo
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={prevFoto}
                  className="hidden"
                  disabled={omitirFoto}
                />
                <input
                  type="text"
                  className="w-full py-1.5 px-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 text-gray-500 cursor-not-allowed text-sm"
                  value={foto ? foto.name : "Sin archivos seleccionados"}
                  readOnly
                />
              </div>
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="omitirFoto"
                  checked={omitirFoto}
                  onChange={(e) => setOmitirFoto(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="omitirFoto" className="text-sm text-gray-700">
                  Omitir foto de perfil
                </label>
              </div>
            </>
          )}
          <div className="flex flex-col gap-2 mt-4 w-full">
            {step > 1 && (
              <button type="button" className="bg-slate-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm hover:bg-slate-400 transition-colors" onClick={() => setStep(step - 1)}>
                Anterior
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                className={`bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors ${step === 1 ? 'w-full' : ''}`}
                onClick={() => setStep(step + 1)}
              >
                Siguiente
              </button>
            )}
            {step === 4 && (
              <button type="submit" className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg text-sm hover:bg-emerald-700 transition-colors w-full">
                Registrar Alumno
              </button>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm">¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a></p>
        </div>
      </form>
    </div>
  );
}

function InputGroup({ label, type = "text", value, onChange, required, minLength, pattern }) {
  return (
    <div className="w-full mb-3">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <input
        type={type}
        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        pattern={pattern}
      />
    </div>
  );
}

function SelectGroup({ label, value, onChange, options, required }) {
  return (
    <div className="w-full mb-3">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <select
        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}