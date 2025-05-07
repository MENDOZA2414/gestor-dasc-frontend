import React from 'react';
import { FaBars } from 'react-icons/fa';
import { HiOutlineBell } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';

const HeaderUser = ({ user, userType, onMobileMenuClick, collapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getProfileLink = () => {
    switch (userType) {
      case 'student': return '/userStudent/profile';
      case 'internalAssessor': return '/userInternalAssessor/profile';
      case 'externalAssessor': return '/userExternalAssessor/profile';
      case 'company': return '/userCompany/profile';
      default: return '/userStudent/profile';
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
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
      ];

  const match = titlesByPath.find((item) => currentPath.startsWith(item.path));
  const currentTitle = match ? match.title : 'Dashboard';

  return (
    <header className="fixed top-0 left-0 z-40 w-full bg-white border-b border-gray-200 shadow-md">
      <div className="flex items-center justify-between pr-6 h-[104px] transition-all duration-300">

        {/* IZQUIERDA */}
        <div
          className={`flex items-center gap-6 pl-6 transition-all duration-300 ${
            collapsed ? 'ml-[8rem]' : 'ml-[19rem]'
          }`}
        >
          {/* Botón de menú en móvil */}
          <button
            onClick={onMobileMenuClick}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl shadow bg-white"
            title="Menú"
          >
            <FaBars className="text-xl text-gray-700" />
          </button>

          {/* Título y fecha */}
          <div className="flex flex-col">
            <span className="text-2xl font-semibold text-gray-900">{currentTitle}</span>
            <span className="text-sm text-gray-500">{getCurrentDate()}</span>
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-5">
          <div className="h-6 w-px bg-gray-300"></div>
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            <HiOutlineBell className="text-2xl" />
          </button>
          <Link to={getProfileLink()}>
            <img
              src={user?.logo || 'https://i.pravatar.cc/100?u=default'}
              alt="Perfil"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
