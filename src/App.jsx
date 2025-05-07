import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import RegisterStudent from './components/RegisterStudent/RegisterStudent';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import UserStudent from './components/UserStudent';
import UserInternalAssessor from './components/UserInternalAssessor';
import UserExternalAssessor from './components/UserExternalAssessor';
import UserCompany from './components/UserCompany';
import Header from './components/Header/Header';
import PreRegister from './components/PreRegister';
import Sidebar from './components/Sidebar/Sidebar';
import HeaderUser from './components/HeaderUser/HeaderUser';

// Nuevo componente Layout
const Layout = ({ children, userType, user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);
  
  
  return (
    <Sidebar userType={userType} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
      <div className="flex flex-col w-full">
        <HeaderUser
          user={user}
          userType={userType}
          onMobileMenuClick={() => setMobileOpen(true)}
        />
        <main className="pt-16 px-4 flex-1">{children}</main>
      </div>
    </Sidebar>
  );
};

const AppContent = () => {
  const location = useLocation();

  const showHeaderRoutes = ['/', '/login', '/register', '/preRegister'];
  const showHeader = showHeaderRoutes.includes(location.pathname);

  // Simulación temporal de usuario
  const user = { username: 'Usuario Ejemplo', logo: 'https://example.com/user-logo.png' };
  const userType = 'alumno';

  return (
    <div className={`${showHeader ? 'pt-20' : ''} bg-gray-100 min-h-screen w-full overflow-x-hidden`}>
      {showHeader && <Header />}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/preRegister" element={<PreRegister />} />

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