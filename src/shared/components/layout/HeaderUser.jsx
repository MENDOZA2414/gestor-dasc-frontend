import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { HiOutlineBell } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import { getUnreadNotifications } from '@modules/admin/services/notificationService';

const HeaderUser = ({ user, userType, onMobileMenuClick, collapsed, mobileOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (userType === 'admin') {
      const fetchNotifications = async () => {
        const notis = await getUnreadNotifications();
        setNotifications(notis);
      };

      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [userType]);

  const getProfileLink = () => {
    switch (userType) {
      case 'student': return '/userStudent/profile';
      case 'internalAssessor': return '/userInternalAssessor/profile';
      case 'externalAssessor': return '/userExternalAssessor/profile';
      case 'company': return '/userCompany/profile';
      case 'admin': return null;
      default: return '/userStudent/profile';
    }
  };

  const getCurrentDate = () => {
    const fechaCompleta = new Date().toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const fechaCorta = new Date().toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });

    return (
      <>
        <span className="hidden sm:inline">{fechaCompleta}</span>
        <span className="inline sm:hidden">{fechaCorta}</span>
      </>
    );
  };

  const titlesByPath = [
    { path: '/userStudent/profile', title: 'Perfil' },
    { path: '/userStudent/practice', title: 'Práctica' },
    { path: '/userStudent/documents', title: 'Documentos' },
    { path: '/userStudent', title: 'Inicio' },
    { path: '/userInternalAssessor/profile', title: 'Perfil' },
    { path: '/userInternalAssessor/reports', title: 'Reportes' },
    { path: '/userInternalAssessor', title: 'Inicio' },
    { path: '/userExternalAssessor/profile', title: 'Perfil' },
    { path: '/userExternalAssessor/evaluations', title: 'Evaluaciones' },
    { path: '/userExternalAssessor', title: 'Inicio' },
    { path: '/userCompany/profile', title: 'Perfil' },
    { path: '/userCompany/vacancies', title: 'Vacantes' },
    { path: '/userCompany', title: 'Inicio' },
    { path: '/admin/dashboard', title: 'Dashboard' },
    { path: '/admin/students', title: 'Alumnos' },
    { path: '/admin/assessors', title: 'Asesores' },
    { path: '/admin/companies', title: 'Entidades' },
    { path: '/admin/reports', title: 'Reportes' },
  ];

  const match = titlesByPath.find((item) => currentPath.startsWith(item.path));
  const currentTitle = match ? match.title : 'Dashboard';

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 shadow-md fixed top-0 left-0 z-40 md:relative md:top-auto md:left-auto md:z-0">
        <div className="flex items-center justify-between pr-4 h-[64px] md:h-[104px] transition-all duration-300">

          {/* IZQUIERDA */}
          <div className="flex items-center gap-6 pl-6 transition-all duration-300 md:ml-20">
            <button
              onClick={() => {
                if (window.innerWidth < 768) {
                  onMobileMenuClick(prev => !prev);
                }
              }}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg shadow bg-white"
              title="Menú"
            >
              <FaBars className="text-lg text-gray-700" />
            </button>

            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-semibold text-gray-900">{currentTitle}</span>
              <span className="text-xs md:text-sm text-gray-500">{getCurrentDate()}</span>
            </div>
          </div>

          {/* DERECHA */}
          <div className="flex items-center gap-3 sm:gap-5 relative">
            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

            {userType === 'admin' && (
              <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)} className="text-gray-600 hover:text-gray-800 transition-colors">
                  <HiOutlineBell className="text-2xl" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-3 z-50">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Notificaciones</h4>
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500">No hay nuevas notificaciones.</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.notificationID} className="text-sm text-gray-800 border-b py-1 last:border-b-0">
                          {n.message}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            <span className="hidden sm:inline text-gray-600 text-sm font-medium whitespace-nowrap">
              {userType === 'admin' ? user?.username : `${user?.firstName} ${user?.firstLastName}`}
            </span>

            {userType === 'admin' ? (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-white font-bold text-lg select-none" title="Administrador">
                A
              </div>
            ) : (
              <Link to={getProfileLink()}>
                <img
                  src={user?.logo}
                  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
            )}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => onMobileMenuClick(false)}
        ></div>
      )}
    </>
  );
};

export default HeaderUser;
