import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import HeaderUser from './HeaderUser';

const Layout = ({ children, userType, user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  return (
    <div className="flex w-full min-h-screen bg-[#f7f8fa]">
      <Sidebar
        userType={userType}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onCollapseChange={setCollapsed}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <HeaderUser
          user={user}
          userType={userType}
          onMobileMenuClick={() => setMobileOpen(prev => !prev)}
          collapsed={collapsed}
          mobileOpen={mobileOpen}
        />

        <main className="flex-1 pt-[80px] md:pt-4 pb-8 px-4 sm:px-6 lg:px-8 bg-[#f7f8fa]">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
