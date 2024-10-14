import React, { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaBuilding, FaFileAlt, FaChalkboardTeacher, FaChartLine, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Creamos un contexto para compartir el estado del sidebar
const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuOptions = [
    { path: '/inicio', icon: FaHome, label: 'Inicio' },
    { path: '/perfil', icon: FaUser, label: 'Perfil' },
    { path: '/vacantes', icon: FaBuilding, label: 'Vacantes' },
    { path: '/documentos', icon: FaFileAlt, label: 'Documentos' },
    { path: '/asesor', icon: FaChalkboardTeacher, label: 'Asesor' },
    { path: '/practica-profesional', icon: FaChartLine, label: 'Practica Profesional' }
  ];

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      <div className="flex">
        <div className={`fixed top-0 left-0 h-screen bg-white shadow-md transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-64'}`}>
          <div className="p-4">
            <Link to="/inicio">
              <img
                src={collapsed ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxLK5sk12PfgCRwZzjgFkXp6W17hPwyLXGNQ&s" : "https://www.uabcs.mx/dasc/wp-content/uploads/2022/08/cropped-logo-dasc.png"}
                className={`transition-all duration-300 ${collapsed ? 'w-10 h-10' : 'w-36 h-12'}`}
                alt="Logo"
              />
            </Link>
          </div>
          <ul className="mt-8">
            {menuOptions.map((option) => (
              <li key={option.path} className="mb-2 px-4">
                <Link to={option.path} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <option.icon className="text-xl" />
                  </div>
                  {!collapsed && <span className="ml-4">{option.label}</span>}
                  {collapsed && (
                    <span className="absolute left-20 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {option.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-4 left-0 w-full px-4">
            <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-lg transition-all duration-300">
              <div className="w-6 h-6 flex items-center justify-center">
                <FaSignOutAlt className="text-xl" />
              </div>
              {!collapsed && <span className="ml-4">Cerrar sesión</span>}
              {collapsed && (
                <span className="absolute left-20 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Cerrar sesión
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className={`flex-1 ${collapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
          {children}
        </div>
        <button 
          onClick={toggleSidebar} 
          className={`fixed top-4 z-50 bg-white p-2 rounded-lg shadow-md transition-all duration-300 ${
            collapsed ? 'left-[5.5rem]' : 'left-[16.5rem]'
          }`}
        >
          {collapsed ? <FaChevronRight className="text-xl" /> : <FaChevronLeft className="text-xl" />}
        </button>
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;