import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const UserExternalAssessor = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/protected')
      .then(res => {
        console.log('✅ Sesión válida para asesor externo:', res.data.user);
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
      <p>Este es tu panel de Asesor Externo.</p>
    </div>
  );
};

export default UserExternalAssessor;
