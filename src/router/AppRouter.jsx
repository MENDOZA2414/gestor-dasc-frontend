import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Login from '@modules/auth/pages/Login';
import RegisterStudent from '@modules/auth/components/RegisterStudent/RegisterStudent';
import PreRegister from '@modules/auth/pages/PreRegister';

import Home from '@modules/public/pages/Home';
import UserStudent from '@modules/user/pages/UserStudent';
import UserInternalAssessor from '@modules/user/pages/UserInternalAssessor';
import UserExternalAssessor from '@modules/user/pages/UserExternalAssessor';
import UserCompany from '@modules/user/pages/UserCompany';

import Dashboard from '@modules/admin/pages/Dashboard';
import Students from '@modules/admin/pages/Students';
import Assessors from '@modules/admin/pages/Assessors';
import Companies from '@modules/admin/pages/Companies';

import Header from "@modules/public/components/Header";
import Sidebar from '@shared/components/layout/Sidebar';
import HeaderUser from '@shared/components/layout/HeaderUser';
import Layout from '@shared/components/layout/Layout';

import PrivateRoute from '@router/PrivateRoute';
import api from '@utils/api';

const AppContent = () => {
  const location = useLocation();
  const showHeaderRoutes = ['/', '/login', '/register', '/preRegister'];
  const showHeader = showHeaderRoutes.includes(location.pathname);

  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
  const fetchUserData = async () => {
    const userTypeID = sessionStorage.getItem('userTypeID');
    const userID = sessionStorage.getItem('userID');
    const controlNumber = sessionStorage.getItem('controlNumber');

    if (!userTypeID) {
      setUserChecked(true);
      return;
    }

    let endpoint = '';
    let type = '';

    switch (parseInt(userTypeID)) {
      case 1:
        endpoint = `/internalAssessors/${userID}`;
        type = 'internalAssessor';
        break;
      case 2:
        if (!controlNumber) return;
        endpoint = `/students/${controlNumber}`;
        type = 'student';
        break;
      case 3:
        endpoint = `/externalAssessors/${userID}`;
        type = 'externalAssessor';
        break;
      case 4:
        endpoint = `/companies/${userID}`;
        type = 'company';
        break;
      case 99: {
        type = 'admin';

        try {
          const res = await api.get('/users/me');
          console.log('Respuesta /me:', res.data);

          const data = res.data.user || {};
          const fullName = data.fullName || '';
          const [firstName, ...resto] = fullName.split(' ');
          const firstLastName = resto.join(' ');

          setUser({
            username: fullName,
            firstName,
            firstLastName,
            logo: '/default_admin.png' // Imagen local
          });

          setUserType(type);
        } catch (err) {
          console.error('Error al obtener los datos del admin:', err);
        } finally {
          setUserChecked(true);
        }

        return; // Salir del fetchUserData
      }
      default:
        setUserChecked(true);
        return;
    }

    // Para estudiantes, asesores y empresa
    try {
      const res = await api.get(endpoint);
      const data = res.data;

      const fullName = `${data.firstName} ${data.firstLastName}`;

      setUser({
        username: fullName,
        firstName: data.firstName,
        firstLastName: data.firstLastName,
        logo: data.photo
      });

      setUserType(type);
    } catch (err) {
      console.error('Error al obtener los datos del usuario:', err);
    } finally {
      setUserChecked(true);
    }
  };

  fetchUserData();
  }, []);


  if (showHeader) {
    return (
      <div className="pt-20 bg-gray-100 min-h-screen w-full overflow-x-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterStudent />} />
          <Route path="/preRegister" element={<PreRegister />} />
        </Routes>
      </div>
    );
  }

  if (!userChecked) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-gray-600 text-lg">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Estudiante */}
      <Route path="/userStudent/*" element={
        <PrivateRoute>
          <Layout userType="student" user={user}>
            <Routes>
              <Route index element={<UserStudent />} />
            </Routes>
          </Layout>
        </PrivateRoute>
      } />

      {/* Asesor Interno */}
      <Route path="/userInternalAssessor/*" element={
        <PrivateRoute>
          <Layout userType="internalAssessor" user={user}>
            <Routes>
              <Route index element={<UserInternalAssessor />} />
            </Routes>
          </Layout>
        </PrivateRoute>
      } />

      {/* Asesor Externo */}
      <Route path="/userExternalAssessor/*" element={
        <PrivateRoute>
          <Layout userType="externalAssessor" user={user}>
            <Routes>
              <Route index element={<UserExternalAssessor />} />
            </Routes>
          </Layout>
        </PrivateRoute>
      } />

      {/* Entidad Receptora */}
      <Route path="/userCompany/*" element={
        <PrivateRoute>
          <Layout userType="company" user={user}>
            <Routes>
              <Route index element={<UserCompany />} />
            </Routes>
          </Layout>
        </PrivateRoute>
      } />

     <Route path="/admin/dashboard" element={
      <PrivateRoute allowedRoles={['Admin', 'SuperAdmin']}>
        <Layout user={user} userType={userType}>
          <Dashboard />
        </Layout>
      </PrivateRoute>
    } />

    <Route path="/admin/students" element={
      <PrivateRoute allowedRoles={['Admin', 'SuperAdmin']}>
        <Layout user={user} userType={userType}>
          <Students />
        </Layout>
      </PrivateRoute>
    } />

    <Route path="/admin/assessors" element={
      <PrivateRoute allowedRoles={['Admin', 'SuperAdmin']}>
        <Layout user={user} userType={userType}>
          <Assessors />
        </Layout>
      </PrivateRoute>
    } />

    <Route path="/admin/companies" element={
      <PrivateRoute allowedRoles={['Admin', 'SuperAdmin']}>
        <Layout user={user} userType={userType}>
          <Companies />
        </Layout>
      </PrivateRoute>
    } />

    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
