import React, { useEffect, useState } from 'react';
import api from '@utils/api';

const UserStudent = () => {
  const [user, setUser] = useState({});
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Obtener datos del usuario general
    api.get('/users/protected').then(res => {
      setUser(res.data.user);
    });

    // Obtener datos del estudiante usando controlNumber
    const controlNumber = sessionStorage.getItem('controlNumber');
    if (controlNumber) {
      api.get(`/students/${controlNumber}`)
        .then(res => setStudentData(res.data))
        .catch(err => console.error('Error al obtener datos del estudiante:', err));
    }
  }, []);
};

export default UserStudent;
