import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 

const UserStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    api.get('/user/protected')
      .then(res => {
        console.log('✅ Sesión válida para estudiante:', res.data.user);
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        console.warn('❌ Sesión inválida. Redirigiendo al login...');
        navigate('/');
      });
  }, [navigate]);
  if (loading) return null;
  return (
    <div>
       <h1>Bienvenido:</h1>
       <p>{user.email}</p>
    </div>
  );
};

export default UserStudent;
