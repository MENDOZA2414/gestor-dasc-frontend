import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const UserInternalAssesor = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/user/protected')
      .then(res => {
        console.log('✅ Sesión válida para asesor interno:', res.data.user);
        setUser(res.data.user);
      })
      .catch(() => {
        console.warn('❌ Sesión inválida. Redirigiendo al login...');
        navigate('/');
      });
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido{user?.username ? `, ${user.username}` : ''}:</h1>
      <p>Este es tu panel de Asesor Interno.</p>
    </div>
  );
};

export default UserInternalAssesor;
