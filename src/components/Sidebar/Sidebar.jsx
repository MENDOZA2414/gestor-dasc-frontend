import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { menuByUserType } from './SidebarConfig';
import SidebarItem from './SidebarItem';
import api from '../../api';

// CONTEXTO Y HOOK
const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

const Sidebar = ({
  children,
  userType = 'student',
  mobileOpen,
  setMobileOpen,
  onCollapseChange,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <aside className={`
          fixed top-0 left-0 h-screen z-50
          bg-[#1B1D2D] text-white transition-transform duration-300
          overflow-y-auto
          ${collapsed ? 'md:w-20' : 'md:w-64'}
          w-64 md:translate-x-0 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>

          {/* Encabezado con logo y botón de cerrar (X) */}
          <div className="relative">
            <div className={`flex items-center justify-between md:justify-center h-[112px] ${collapsed ? 'px-0' : 'px-6'} border-b border-white/10`}>
              <Link
                to="/dashboard"
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center' : 'justify-start pl-3'
                }`}
              >
                <img
                  src={collapsed ? '/dasc_icon.png' : '/dasc_blanco.png'}
                  alt="Logo DASC"
                  className={`transition-all duration-300 object-contain ${collapsed ? 'h-10' : 'h-12'}`}
                />
              </Link>
            </div>
          </div>

          {/* MENÚ + CERRAR SESIÓN */}
          <div className="flex flex-col justify-between h-[calc(100dvh-104px)]">
          {/* MENÚ */}
            <nav className="mt-6 space-y-1 px-2">
              {menuItems.map(item => (
                <SidebarItem
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                  setMobileOpen={setMobileOpen}
                />
              ))}
            </nav>

            {/* CERRAR SESIÓN */}
            <div className="px-2 mb-6 scroll-mb-20">
              <button
                onClick={handleLogout}
                title={collapsed ? 'Cerrar sesión' : ''}
                className={`flex items-center ${
                  collapsed ? 'justify-center' : 'justify-start'
                } w-full px-4 py-2 rounded-lg hover:bg-[#2c1c1c] transition-colors duration-200`}
              >
                <HiOutlineArrowRightOnRectangle
                  className="text-[22px] text-red-400"
                  style={{ flexShrink: 0 }}
                />
                {!collapsed && (
                  <span className="ml-4 text-red-400">Cerrar sesión</span>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* BOTÓN DE CERRAR MENÚ MÓVIL - ACOMPAÑA AL SIDEBAR */}
        <button
          onClick={() => setMobileOpen(false)}
          className={`
            md:hidden fixed top-6 z-50 p-2 bg-white rounded-full shadow transition-all duration-300
            ${mobileOpen ? 'left-64' : '-left-64'}
          `}
          title="Cerrar menú"
        >
          <FaTimes className="text-xl text-gray-800" />
        </button>

        {/* FONDO OSCURO MÓVIL */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
        )}

        {/* CONTENIDO */}
        <div
          className={`flex-1 transition-all duration-300 ${
            collapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
        >
          {children}
        </div>

        {/* BOTÓN DE COLAPSAR DESKTOP */}
        <button
          onClick={toggleSidebar}
          className={`hidden md:flex items-center justify-center fixed top-[28px] z-50 bg-white text-gray-800 shadow-md rounded-2xl p-2 transition-all duration-300 ${
            collapsed ? 'left-[5.5rem]' : 'left-[16.5rem]'
          }`}
          title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {collapsed ? (
            <FaChevronRight className="text-[1.25rem]" />
          ) : (
            <FaChevronLeft className="text-[1.25rem]" />
          )}
        </button>
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
