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
  onCollapseChange, // NUEVO: para avisar al padre
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  // Avisar al padre cada vez que colapsa
  useEffect(() => {
    if (onCollapseChange) onCollapseChange(collapsed);
  }, [collapsed, onCollapseChange]);

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
          absolute top-[104px] md:fixed md:top-0 left-0
          h-[calc(100vh-104px)] md:h-screen
          bg-[#1B1D2D] text-white z-40 transition-all duration-300
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}>
          
          {/* Logo solo visible en escritorio */}
          <div className="hidden md:flex h-20">
            <div className={`w-full ${collapsed ? 'items-center justify-center' : 'items-start justify-start pl-8 pt-7'} flex`}>
              <Link to="/dashboard" title="DASC">
                <img
                  src={collapsed ? '/dasc_icon.png' : '/dasc_blanco.png'}
                  alt="Logo DASC"
                  className={`transition-all duration-300 object-contain ${collapsed ? 'h-10' : 'h-12'}`}
                />
              </Link>
            </div>
          </div>

          {/* MENÚ */}
          <nav className="mt-8 space-y-1">
            {menuItems.map((item) => (
              <SidebarItem key={item.path} item={item} collapsed={collapsed} setMobileOpen={setMobileOpen} />
            ))}
          </nav>

          {/* CERRAR SESIÓN */}
          <div className="absolute bottom-4 w-full px-2">
            <button
              onClick={handleLogout}
              title={collapsed ? 'Cerrar sesión' : ''}
              className={`flex items-center ${
                collapsed ? 'justify-center' : 'justify-start'
              } w-full px-4 py-2 rounded-lg hover:bg-[#2c1c1c] transition-colors duration-200`}>
              <HiOutlineArrowRightOnRectangle className="text-xl text-red-400" />
              {!collapsed && <span className="ml-4 text-red-400">Cerrar sesión</span>}
            </button>
          </div>
        </aside>

        {/* FONDO OSCURO PARA MÓVIL */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 top-[104px] bg-black bg-opacity-50 z-30 md:hidden"
          />
        )}

        {/* CONTENIDO PRINCIPAL */}
        <div className={`flex-1 transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'}`}>
          {children}
        </div>

        {/* BOTÓN DE COLAPSAR (solo escritorio) */}

        <button
          onClick={toggleSidebar}
          className={`hidden md:flex items-center justify-center fixed top-[28px] z-50 bg-white text-gray-800 shadow-md rounded-2xl p-2 transition-all duration-300
            ${collapsed ? 'left-[5.5rem]' : 'left-[16.5rem]'}`}
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
