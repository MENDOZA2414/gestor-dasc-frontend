import React, { useState } from 'react';

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
  const [step, setStep] = useState(1);

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <form className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md text-center">
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
              <div className="flex w-full items-center mb-4">
                <label htmlFor="fileUpload" className="bg-gray-200 text-black py-2 px-4 rounded-l-lg border border-gray-300 cursor-pointer whitespace-nowrap">
                  Seleccionar archivo
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={prevFoto}
                  className="hidden"
                />
                <input
                  type="text"
                  className="w-full py-2 px-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  value={foto ? foto.name : "Sin archivos seleccionados"}
                  readOnly
                />
              </div>
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
              <InputGroup label="Número Celular" type="tel" value={celular} onChange={(e) => handleNumericInput(e, setCelular, 10)} />
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
              <SelectGroup label="Estado del Estudiante" value={studentStatus} onChange={(e) => setStudentStatus(e.target.value)} options={[
                { value: "Activo", label: "Activo" },
                { value: "Inactivo", label: "Inactivo" },
              ]} />
              <SelectGroup label="Seleccione su asesor" value={studentStatus} onChange={(e) => setStudentStatus(e.target.value)} options={[
                { value: "", label: "Seleccione" },
                { value: "Asesor1", label: "Asesor1" },
                { value: "Asesor2", label: "Asesor2" },
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
