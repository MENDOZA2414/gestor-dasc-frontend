import React from 'react';
import { FaBell, FaEnvelope, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSidebar } from '../Sidebar/Sidebar';

const HeaderUser = ({ user, userType, onMobileMenuClick }) => {
  const { collapsed } = useSidebar();

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const getProfileLink = () => {
    switch (userType) {
      case 'student':
        return '/userStudent/profile';
      case 'internalAssessor':
        return '/userInternalAssessor/profile';
      case 'externalAssessor':
        return '/userExternalAssessor/profile';
      case 'company':
        return '/userCompany/profile';
      default:
        return '/userStudent/profile';
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-white p-4 border-b border-gray-200 shadow-md transition-all duration-300">
      {/* Botón hamburguesa solo en móvil */}
      <button
        onClick={onMobileMenuClick}
        className="md:hidden mr-4 text-gray-700"
        title="Menú"
      >
        <FaBars className="text-2xl" />
      </button>

      <div className="flex items-center">
        <div className="flex flex-col">
          {user && user.username && !collapsed && (
            <>
              <span className="text-lg font-medium">¡Hola {user.username}!</span>
              <span className="text-sm text-gray-500">{getCurrentDate()}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <div className="h-6 w-px bg-gray-300 mr-4"></div>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FaEnvelope className="text-xl" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 ml-2">
            <FaBell className="text-xl" />
          </button>
        </div>
        {user && user.logo && (
          <Link to={getProfileLink()}>
            <img src={user.logo} alt="Profile" className="w-12 h-12 rounded-full object-cover cursor-pointer" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderUser;
