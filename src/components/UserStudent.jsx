import React, { useEffect, useState } from 'react';
import api from '../api';

const UserStudent = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.get('/users/protected').then(res => {
      setUser(res.data.user);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Bienvenido:</h1>
      <p className="text-lg">{user.email}</p>
    </div>
  );
};

export default UserStudent;
