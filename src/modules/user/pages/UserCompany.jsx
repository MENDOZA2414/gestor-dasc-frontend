import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@utils/api';

const UserCompany = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/protected')
      .then(res => {
        console.log('✅ Sesión válida para entidad receptora:', res.data.user);
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
      <p>Este es tu panel como Entidad Receptora.</p>
    </div>
  );
};

export default UserCompany;
