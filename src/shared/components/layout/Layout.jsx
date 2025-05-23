import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import HeaderUser from './HeaderUser';

const Layout = ({ children, user, userType, scroll = 'default' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

useEffect(() => {
  const body = document.body;

  const applyScrollBehavior = () => {
    const isDesktop = window.innerWidth >= 768;

    // Limpia todas las clases de scroll
    body.classList.remove(
      'overflow-hidden',
      'overflow-x-hidden',
      'overflow-y-hidden',
      'overflow-y-auto'
    );

    switch (scroll) {
      case 'none':
        body.classList.add('overflow-hidden');
        break;

      case 'vertical':
        body.classList.add('overflow-x-hidden');
        if (isDesktop) {
          body.classList.add('overflow-y-hidden');
        } else {
          body.classList.add('overflow-y-auto');
        }
        break;

      case 'horizontal':
        body.classList.add('overflow-y-auto', 'overflow-x-hidden');
        break;

      default:
        body.classList.add('overflow-y-auto', 'overflow-x-hidden');
        break;
    }
  };

  // Ejecutar al montar
  applyScrollBehavior();

  // Escuchar cambios de tamaño
  window.addEventListener('resize', applyScrollBehavior);

  return () => {
    window.removeEventListener('resize', applyScrollBehavior);
    body.classList.remove(
      'overflow-hidden',
      'overflow-x-hidden',
      'overflow-y-hidden',
      'overflow-y-auto'
    );
  };
}, [scroll]);


  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">
      <Sidebar
        userType={userType}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      >
        <div className="flex flex-col flex-1 min-w-0">
          <HeaderUser
            user={user}
            userType={userType}
            onMobileMenuClick={setMobileOpen}
            mobileOpen={mobileOpen}
          />

          <main className="flex-1 px-4 md:px-6 lg:px-8 md:pt-16 lg:pt-8 pb-8">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </Sidebar>
    </div>
  );
};

export default Layout;
