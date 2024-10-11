import React, { useState, useEffect } from 'react';
import api from '../api';

export default function RegisterStudent() {
  const [foto, setFoto] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [celular, setCelular] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [career, setCareer] = useState('');
  const [semester, setSemester] = useState('');
  const [shift, setShift] = useState('');
  const [studentStatus, setStudentStatus] = useState('Activo');
  const [internalAssessorID, setInternalAssessorID] = useState('');
  const [internalAssessors, setInternalAssessors] = useState([]);
  const [step, setStep] = useState(1);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: nombre,
      firstLastName: apellidoPaterno,
      secondLastName: apellidoMaterno,
      dateOfBirth: fechaNacimiento,
      email,
      password,
      phone: celular,
      controlNumber,
      career,
      semester,
      shift,
      studentStatus,
      internalAssessorID,
      photo: foto ? foto : null,
      status: 'Pending' // O cualquier valor por defecto que desees
    };

    try {
      await api.post('/students/register', formData);
      alert('Registro exitoso');
    } catch (error) {
      console.error("Error al registrar el alumno:", error);
      alert('Hubo un error al registrar el alumno, por favor intente nuevamente.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <form className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md text-center" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col items-center">
          <h5 className="text-2xl font-bold mb-6">Registro de Alumno</h5>
          <div className="w-40 h-40 mb-4 flex justify-center items-center">
            {fotoUrl ? (
              <img className="w-full h-full object-cover rounded-full" src={fotoUrl} alt="Foto del alumno" />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full"></div>
            )}
          </div>
          {step === 1 && (
            <>
              <InputGroup label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <InputGroup label="Apellido Paterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
              <InputGroup label="Apellido Materno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
              <InputGroup label="Fecha de Nacimiento" type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
            </>
          )}
          {step === 2 && (
            <>
              <InputGroup label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputGroup label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputGroup label="Confirmar Contraseña" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
              <InputGroup label="Número Celular" type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} />
            </>
          )}
          {step === 3 && (
            <>
              <InputGroup label="Número de Control" value={controlNumber} onChange={(e) => setControlNumber(e.target.value)} />
              <SelectGroup label="Carrera" value={career} onChange={(e) => setCareer(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                { value: "IDS", label: "IDS" },
                { value: "ITC", label: "ITC" },
                { value: "IC", label: "IC" },
                { value: "LATI", label: "LATI" },
                { value: "LITI", label: "LITI" },
              ]} />
              <SelectGroup label="Semestre" value={semester} onChange={(e) => setSemester(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                { value: "0", label: "0" },
                { value: "9", label: "9" },
              ]} />
              <SelectGroup label="Turno" value={shift} onChange={(e) => setShift(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                { value: "TM", label: "TM" },
                { value: "TV", label: "TV" },
              ]} />
              <SelectGroup label="Asesor Interno" value={internalAssessorID} onChange={(e) => setInternalAssessorID(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                ...internalAssessors.map((assessor) => ({
                  value: assessor.internalAssessorID,
                  label: assessor.fullName,
                })),
              ]} />
            </>
          )}
          <div className="flex flex-col gap-3 mt-6 w-full">
            {step > 1 && (
              <button type="button" className="bg-slate-300 text-gray-700 font-medium py-3 px-6 rounded-lg text-base hover:bg-slate-400 transition-colors" onClick={() => setStep(step - 1)}>
                Anterior
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                className={`bg-blue-600 text-white font-medium py-3 px-6 rounded-lg text-base hover:bg-blue-700 transition-colors ${step === 1 ? 'w-full' : ''}`}
                onClick={() => setStep(step + 1)}
              >
                Siguiente
              </button>
            )}
            {step === 3 && (
              <button type="submit" className="bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg text-base hover:bg-emerald-700 transition-colors w-full">
                Registrar Alumno
              </button>
            )}
          </div>
        </div>
        <div className="mt-6">
          <p>¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a></p>
        </div>
      </form>
    </div>
  );
}

function InputGroup({ label, type = "text", value, onChange }) {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <input
        type={type}
        className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function SelectGroup({ label, value, onChange, options }) {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium mb-1 text-left">{label}</label>
      <select
        className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
