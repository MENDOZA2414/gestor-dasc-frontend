import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import RegisterStudent from './components/RegisterStudent/RegisterStudent';
import Home from './components/Home';
import UserStudent from './components/UserStudent';
import UserInternalAssessor from './components/UserInternalAssessor';
import UserExternalAssessor from './components/UserExternalAssessor';
import UserCompany from './components/UserCompany';
import Header from './components/Header';
import PreRegister from './components/PreRegister';
import Sidebar from './components/Sidebar';
import HeaderUser from './components/HeaderUser';

// Nuevo componente Layout
const Layout = ({ children, userType, user }) => {
  return (
    <Sidebar>
      <HeaderUser user={user} userType={userType} />
      <main className="p-4">{children}</main>
    </Sidebar>
  );
};

const AppContent = () => {
  const location = useLocation();

  const showHeaderRoutes = ['/', '/login', '/register', '/preRegister'];
  const showHeader = showHeaderRoutes.includes(location.pathname);

  // Simulación de usuario y tipo de usuario (deberías obtener estos datos de tu sistema de autenticación)
  const user = { username: 'Usuario Ejemplo', logo: 'https://example.com/user-logo.png' };
  const userType = 'alumno'; // Esto podría ser 'alumno', 'asesorInterno', 'asesorExterno', o 'entidadReceptora'

  return (
    <div className={`${showHeader ? 'pt-20' : ''} bg-gray-100 min-h-screen`}>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/preRegister" element={<PreRegister />} />
        
        {/* Rutas que usan el nuevo Layout */}
        <Route path="/userStudent/*" element={
          <Layout userType="alumno" user={user}>
            <Routes>
              <Route index element={<UserStudent />} />
              {/* Añade aquí más rutas específicas del estudiante si es necesario */}
            </Routes>
          </Layout>
        } />
        <Route path="/userInternalAssessor/*" element={
          <Layout userType="asesorInterno" user={user}>
            <Routes>
              <Route index element={<UserInternalAssessor />} />
              {/* Añade aquí más rutas específicas del asesor interno si es necesario */}
            </Routes>
          </Layout>
        } />
        <Route path="/userExternalAssessor/*" element={
          <Layout userType="asesorExterno" user={user}>
            <Routes>
              <Route index element={<UserExternalAssessor />} />
              {/* Añade aquí más rutas específicas del asesor externo si es necesario */}
            </Routes>
          </Layout>
        } />
        <Route path="/userCompany/*" element={
          <Layout userType="entidadReceptora" user={user}>
            <Routes>
              <Route index element={<UserCompany />} />
              {/* Añade aquí más rutas específicas de la empresa si es necesario */}
            </Routes>
          </Layout>
        } />
      </Routes>
    </div>
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