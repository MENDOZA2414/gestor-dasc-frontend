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
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Verificando sesión...</p>
      </div>
    );
  }

  return authorized ? children : <Navigate to="/" />;
};

export default PrivateRoute;
