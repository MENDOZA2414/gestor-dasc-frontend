import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const [authorized, setAuthorized] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRoles = JSON.parse(sessionStorage.getItem('roles') || '[]');

    // Si no hay token, no hay sesión
    if (!token) {
      setAuthorized(false);
      return;
    }

    api.get('/users/protected')
      .then(async () => {
        if (allowedRoles.length > 0) {
          const hasPermission = userRoles.some(role => allowedRoles.includes(role));

          if (!hasPermission) {
            // Cierra sesión (mientras uses GET)
            try {
              await api.post('/users/logout');
            } catch (logoutErr) {
              if (logoutErr?.response?.status !== 401) {
                console.warn('Error al cerrar sesión por acceso no autorizado:', logoutErr);
              }
            }

            // Mostrar alerta una sola vez
            if (!sessionStorage.getItem('alertShown')) {
              Swal.fire({
                icon: 'warning',
                title: 'Acceso no autorizado',
                text: 'No tienes permisos para acceder a esta sección.',
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false
              });
              sessionStorage.setItem('alertShown', 'true');
            }

            localStorage.removeItem('token');
            sessionStorage.clear();
          }

          setAuthorized(hasPermission);
        } else {
          setAuthorized(true);
        }
      })
      .catch((err) => {
        const msg = err?.response?.data?.message;
        if (
          (msg === 'Token inválido o expirado' || msg === 'Sesión inválida o reemplazada desde otro dispositivo') &&
          !sessionStorage.getItem('alertShown')
        ) {
          Swal.fire({
            icon: 'info',
            title: 'Sesión expirada',
            text: 'Tu sesión ha sido cerrada o ha expirado.',
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false
          });
          sessionStorage.setItem('alertShown', 'true');
        }

        localStorage.removeItem('token');
        sessionStorage.clear();
        setAuthorized(false);
      });
  }, []);

  useEffect(() => {
    if (location.pathname === '/login') {
      sessionStorage.removeItem('alertShown');
    }
  }, [location.pathname]);

  if (authorized === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white font-poppins flex-col px-4">
        <div className="w-8 h-8 border-4 border-[#049774] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-lg">Verificando sesión...</p>
      </div>
    );
  }

  return authorized ? children : <Navigate to="/login?expired=true" state={{ from: location }} />;
};

export default PrivateRoute;
