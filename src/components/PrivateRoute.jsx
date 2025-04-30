import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); // null = aún validando

useEffect(() => {
  api.get('/user/protected')
    .then(() => setAuthorized(true))
    .catch((err) => {
      const msg = err?.response?.data?.message;
    
      if (!sessionStorage.getItem('alertShown')) {
        Swal.fire({
          icon: 'info',
          title: msg === 'No hay sesión activa' ? 'No has iniciado sesión' : 'Sesión expirada',
          text: msg === 'No hay sesión activa'
            ? 'Por favor, inicia sesión para acceder a esta sección.'
            : 'Tu sesión ha expirado. Vuelve a iniciar sesión.',
          timer: 2500,
          showConfirmButton: false
        });
        sessionStorage.setItem('alertShown', 'true');
      }
    
      setAuthorized(false);
    });    
}, []);


  if (authorized === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="w-8 h-8 border-4 border-[#049774] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-lg">Cargando...</p>
      </div>
    );
  }
  

  return authorized ? children : <Navigate to="/" />;
};

export default PrivateRoute;
