import React from 'react';
import { FaBell, FaEnvelope, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeaderUser = ({ user, userType, onMobileMenuClick, collapsed }) => {
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
    <header className="fixed top-0 left-0 z-40 w-full bg-white border-b border-gray-200 shadow-md">
      <div
        className={`flex items-center justify-between py-3 pr-6 transition-all duration-300 ${
          collapsed ? 'pl-[6rem]' : 'pl-[19rem]'
        }`}
      >
        {/* IZQUIERDA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuClick}
            className="text-gray-700 md:hidden"
            title="Menú"
          >
            <FaBars className="text-2xl" />
          </button>
          <div className="flex flex-col">
            <span className="text-base font-medium truncate">¡Hola {user.username}!</span>
            <span className="text-sm text-gray-500 truncate">{getCurrentDate()}</span>
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-3">
          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded-full">
            <FaEnvelope className="text-lg" />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded-full">
            <FaBell className="text-lg" />
          </button>
          <Link to={getProfileLink()}>
            <img
              src={user?.logo || 'https://i.pravatar.cc/100?u=default'}
              alt="Perfil"
              className="w-9 h-9 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
