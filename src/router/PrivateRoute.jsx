import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirige inmediatamente
    if (!token) {
      setAuthorized(false);
      return;
    }

    // Si hay token, verifica con el backend
    api.get('/users/protected')
      .then(() => setAuthorized(true))
      .catch((err) => {
        const msg = err?.response?.data?.message;
        const showAlert = msg === 'Token inválido o expirado' || msg === 'Sesión inválida o reemplazada desde otro dispositivo';

        if (showAlert && !sessionStorage.getItem('alertShown')) {
          Swal.fire({
            icon: 'info',
            title: 'Sesión expirada',
            text: 'Tu sesión ha sido cerrada o ha expirado.',
            timer: 2500,
            showConfirmButton: false
          });
          sessionStorage.setItem('alertShown', 'true');
        }

        localStorage.removeItem('token');
        setAuthorized(false);
      });
  }, []);

  if (authorized === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="w-8 h-8 border-4 border-[#049774] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-lg">Verificando sesión...</p>
      </div>
    );
  }

  return authorized ? children : <Navigate to="/" />;
};

export default PrivateRoute;
