import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ item, collapsed, setMobileOpen }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.path);
  
  return (
    <Link
      to={item.path}
      title={collapsed ? item.label : ''}
      onClick={() => setMobileOpen(false)}
      className={`group flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-all duration-200
        ${isActive ? 'bg-[#292C45]' : 'hover:bg-[#292C45]'}
        ${collapsed ? 'justify-center' : ''}
      `}
    >
      <item.icon
        className={`text-white transition-all duration-200 ${
          collapsed ? 'text-[22px]' : 'text-[22px]'
        }`}
        style={{ flexShrink: 0 }}
      />

      {!collapsed && <span className="text-white">{item.label}</span>}
    </Link>
  );
};

export default SidebarItem;
