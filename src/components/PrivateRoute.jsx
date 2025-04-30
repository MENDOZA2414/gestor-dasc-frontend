import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';

const PrivateRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); // null = aún validando

  useEffect(() => {
    api.get('/user/protected')
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false));
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
