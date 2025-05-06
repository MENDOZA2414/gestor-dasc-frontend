import React, { createContext, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
          <div className="p-4 flex justify-center">
            <Link to="/dashboard">
              <img
                src={collapsed
                  ? 'https://i.imgur.com/Dd9rZ2E.png'
                  : 'https://www.uabcs.mx/dasc/wp-content/uploads/2022/08/cropped-logo-dasc.png'}
                alt="Logo"
                className={`transition-all duration-300 ${collapsed ? 'w-10 h-10' : 'w-40 h-12'}`}
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
              className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-[#292C45] transition-colors"
            >
              <FaSignOutAlt className="text-xl" />
              {!collapsed && <span className="ml-4">Cerrar sesión</span>}
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
