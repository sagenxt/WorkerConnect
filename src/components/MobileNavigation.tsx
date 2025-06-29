import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Building2, Shield, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isMobile } from '../utils/pwa';

const MobileNavigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!isMobile() || !user) {
    return null;
  }

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Profile', path: '/profile' },
    ...(user.type === 'department' ? [
      { icon: Shield, label: 'Dashboard', path: '/dashboard/department' }
    ] : []),
    ...(user.type === 'establishment' ? [
      { icon: Building2, label: 'Dashboard', path: '/dashboard/establishment' }
    ] : []),
    ...(user.type === 'worker' ? [
      { icon: User, label: 'Dashboard', path: '/dashboard/worker' }
    ] : []),
    { icon: Menu, label: 'More', path: '/menu' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;