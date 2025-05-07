import React from 'react';
import { FaBell, FaEnvelope, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeaderUser = ({ user, userType, onMobileMenuClick }) => {
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const getProfileLink = () => {
    switch (userType) {
      case 'student': return '/userStudent/profile';
      case 'internalAssessor': return '/userInternalAssessor/profile';
      case 'externalAssessor': return '/userExternalAssessor/profile';
      case 'company': return '/userCompany/profile';
      default: return '/userStudent/profile';
    }
  };

  return (
    <header className="fixed top-0 z-40 bg-white py-4 px-6 shadow-md border-b border-gray-200 w-full transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Izquierda: botón y saludo */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            onClick={onMobileMenuClick}
            className="md:hidden text-gray-700"
            title="Menú"
          >
            <FaBars className="text-2xl" />
          </button>

          <div className="flex flex-col min-w-0">
            {user?.username && (
              <>
                <span className="text-base font-medium truncate">¡Hola {user.username}!</span>
                <span className="text-sm text-gray-500 truncate">{getCurrentDate()}</span>
              </>
            )}
          </div>
        </div>

        {/* Derecha: iconos y perfil */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FaEnvelope className="text-lg md:text-xl" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FaBell className="text-lg md:text-xl" />
          </button>
          {user?.logo && (
            <Link to={getProfileLink()}>
              <img
                src={user.logo}
                alt="Perfil"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
