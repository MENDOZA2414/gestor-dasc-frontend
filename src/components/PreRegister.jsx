import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

export default function PreRegister() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleNextClick = () => {
    switch (selectedRole) {
      case 'empresa':
        navigate('/registerCompany');
        break;
      case 'alumno':
        navigate('/register');
        break;
      case 'asesor':
        navigate('/registrarAsesor');
        break;
      default:
        break;
    }
  };

  const isCardSelected = (role) => selectedRole === role ? 'border-black' : 'border-gray-300';

  return (
    <div className="font-poppins max-w-7xl mx-auto p-12 min-h-[calc(100vh-80px)] bg-gray-100 overflow-auto">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Selecciona el <span className="text-blue-600">tipo de usuario</span> deseado para registrarte
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {[
          { role: 'empresa', title: 'Empresa', subtitle: 'Registrate como entidad receptora', Icon: FaBuilding },
          { role: 'alumno', title: 'Alumno', subtitle: 'Registrate como alumno del DASC', Icon: FaUserGraduate },
          { role: 'asesor', title: 'Asesor', subtitle: 'Registrate como asesor interno', Icon: FaChalkboardTeacher },
        ].map(({ role, title, subtitle, Icon }) => (
          <div 
            key={role}
            className={`relative bg-white rounded-2xl shadow-md w-80 p-4 pt-14 text-center cursor-pointer transition transform hover:-translate-y-2 ${isCardSelected(role)} border-2`}
            onClick={() => handleRoleChange(role)}
          >
            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-xl w-28 h-28 flex items-center justify-center shadow-md ${isCardSelected(role)} border-2`}>
              <Icon className="text-4xl" />
            </div>
            <div className="p-4 flex flex-col h-56">
              <div>
                <h3 className="mt-8 text-xl font-bold">{title}</h3>
                <h4 className="text-lg text-gray-600 mt-2">
                  {subtitle}
                </h4>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <label className="inline-block relative cursor-pointer text-4xl">
                  <input
                    type="checkbox"
                    checked={selectedRole === role}
                    readOnly
                    className="absolute opacity-0 w-0 h-0"
                  />
                  <span className={`relative inline-block w-10 h-10 bg-white rounded-full border-2 ${selectedRole === role ? 'border-black' : 'border-gray-300'}`}>
                    {selectedRole === role && (
                      <span className="absolute top-1/2 left-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 bg-slate-950 rounded-full"></span>
                    )}
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          className="bg-blue-600 text-white py-3 px-5 text-base rounded-2xl cursor-pointer transition hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleNextClick}
          disabled={!selectedRole}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}