import React, { createContext, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { menuByUserType } from './SidebarConfig';
import SidebarItem from './SidebarItem';
import api from '../../api';

// CONTEXTO Y HOOK
const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

const Sidebar = ({ children, userType = 'student' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = async () => {
    try {
      await api.get('/users/logout');
      localStorage.removeItem('token');
      sessionStorage.clear();
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const menuItems = menuByUserType[userType] || [];

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      <div className="flex">
        {/* SIDEBAR */}
        <aside className={`fixed top-0 left-0 h-screen bg-[#1B1D2D] text-white shadow-md z-50 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
          {/* LOGO */}
          <div className={`flex ${collapsed ? 'items-center justify-center h-20' : 'items-start justify-start pl-8 pt-7 h-20'}`}>
            <Link to="/dashboard" title="DASC">
              <img
                src={collapsed ? '/dasc_icon.png' : '/dasc_blanco.png'}
                alt="Logo DASC"
                className={`transition-all duration-300 object-contain ${collapsed ? 'h-8' : 'h-12'}`}

              />
            </Link>
          </div>

          {/* MENÚ */}
          <nav className="mt-8 space-y-1">
            {menuItems.map((item) => (
              <SidebarItem key={item.path} item={item} collapsed={collapsed} />
            ))}
          </nav>

          {/* CERRAR SESIÓN */}
          <div className="absolute bottom-4 w-full px-2">
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                collapsed ? 'justify-center' : 'justify-start'
              } w-full px-4 py-2 rounded-lg hover:bg-[#2c1c1c] transition-colors duration-200`}
            >
              <HiOutlineArrowRightOnRectangle className="text-xl text-red-400" />
              {!collapsed && <span className="ml-4 text-red-400">Cerrar sesión</span>}
            </button>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
          {children}
        </div>

        {/* BOTÓN DE COLAPSAR */}
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 z-50 bg-white text-gray-800 shadow-md rounded-full p-1 transition-all duration-300 ${
            collapsed ? 'left-[5.5rem]' : 'left-[16.5rem]'
          }`}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
