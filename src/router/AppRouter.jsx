import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import RegisterStudent from '../components/RegisterStudent/RegisterStudent';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../components/Home';
import UserStudent from '../components/UserStudent';
import UserInternalAssessor from '../components/UserInternalAssessor';
import UserExternalAssessor from '../components/UserExternalAssessor';
import UserCompany from '../components/UserCompany';
import Header from '../components/Header/Header';
import PreRegister from '../components/PreRegister';
import Sidebar from '../components/Sidebar/Sidebar';
import HeaderUser from '../components/HeaderUser/HeaderUser';
import Dashboard from '../modules/admin/pages/Dashboard'; 
import Students from '../modules/admin/pages/Students'; 
import api from '../api';


const Layout = ({ children, userType, user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
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
    <div className="flex w-full min-h-screen">
      <Sidebar
        userType={userType}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onCollapseChange={setCollapsed}
      />

      <div className="flex-1 min-w-0 transition-all duration-300">
        <HeaderUser
          user={user}
          userType={userType}
          onMobileMenuClick={() => setMobileOpen(prev => !prev)}
          collapsed={collapsed}
          mobileOpen={mobileOpen}
        />

        <main className="pt-20 px-4 bg-inherit">{children}</main>
      </div>
    </div>
  );
};

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
        default:
          setUserChecked(true);
          return;
      }

      try {
        const res = await api.get(endpoint);
        const data = res.data;
        const fullName = data.firstName + ' ' + data.firstLastName;
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
      <div className={`${showHeader ? 'pt-20' : ''} bg-gray-100 min-h-screen w-full overflow-x-hidden`}>
        {showHeader && <Header />}
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

      {/* Admin Dashboard nueva ruta */}
      <Route path="/admin/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      {/* Página de estudiantes */}
  <Route path="/admin/students" element={
    <PrivateRoute>
      <Students />
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
