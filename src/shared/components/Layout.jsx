import React, { useState } from 'react';
import Sidebar from './Sidebar';
import HeaderUser from './HeaderUser';

const Layout = ({ children, user, userType }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar lateral */}
      <Sidebar
        userType={userType}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      >
        {/* Contenedor del header y contenido */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header superior */}
          <HeaderUser
            user={user}
            userType={userType}
            onMobileMenuClick={setMobileOpen}
            mobileOpen={mobileOpen}
          />

          {/* Contenido dinámico */}
          <main className="flex-1 px-4 md:px-6 lg:px-8 md:pt-16 lg:pt-8 pb-8 overflow-y-auto">
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
