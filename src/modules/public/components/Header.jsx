import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Ajusta este valor según sea necesario
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Estudiantes', path: '/estudiantes' },
    { name: 'Empresas', path: '/empresas' },
    { name: 'DASC', path: '/dasc' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const authItems = [
    { name: 'Iniciar sesión', path: '/login' },
    { name: 'Registro', path: '/preRegister' },
  ];

  return (
    <header className="font-poppins bg-white shadow-md w-full fixed top-0 z-50">
      <div className="max-w-full mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/dasc.png"
                alt="Logo DASC"
                className="h-12 w-auto"
              />
            </Link>
          </div>
          {!isMobile ? (
            <nav className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <NavLink key={item.name} to={item.path}>
                  {item.name}
                </NavLink>
              ))}
              <div className="h-6 w-px bg-gray-300 mx-2"></div>
              {authItems.map((item) => (
                <NavLink key={item.name} to={item.path}>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          ) : (
            <div>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Abrir menú principal</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      {isMenuOpen && isMobile && (
        <div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <MobileNavLink key={item.name} to={item.path} onClick={toggleMenu}>
                {item.name}
              </MobileNavLink>
            ))}
            <div className="border-t border-gray-300 my-2"></div>
            {authItems.map((item) => (
              <MobileNavLink key={item.name} to={item.path} onClick={toggleMenu}>
                {item.name}
              </MobileNavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ children, ...props }) {
  return (
    <Link
      className="text-gray-700 px-3 py-2 rounded-md text-base font-medium transition duration-300 hover:text-blue-600"
      {...props}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ children, ...props }) {
  return (
    <Link
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 transition duration-300"
      {...props}
    >
      {children}
    </Link>
  );
}