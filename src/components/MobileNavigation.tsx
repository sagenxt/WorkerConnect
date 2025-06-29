import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Building2, Shield, Menu, Calendar, Users, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { isMobile } from '../utils/pwa';

const MobileNavigation: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (!isMobile() || !user) {
    return null;
  }

  const getNavItems = () => {
    const baseItems = [
      { icon: Home, label: t('navigation.home'), path: '/' }
    ];

    switch (user.type) {
      case 'worker':
        return [
          ...baseItems,
          { icon: Shield, label: t('navigation.dashboard'), path: '/dashboard/worker' },
          { icon: Calendar, label: t('worker.attendance'), path: '/attendance/history' },
          { icon: User, label: t('navigation.profile'), path: '/profile/worker' },
          { icon: Menu, label: t('navigation.more'), path: '/settings' }
        ];
      
      case 'establishment':
        return [
          ...baseItems,
          { icon: Building2, label: t('navigation.dashboard'), path: '/dashboard/establishment' },
          { icon: Users, label: t('establishment.workers'), path: '/workers/management' },
          { icon: User, label: t('navigation.profile'), path: '/profile/establishment' },
          { icon: Menu, label: t('navigation.more'), path: '/settings' }
        ];
      
      case 'department':
        return [
          ...baseItems,
          { icon: BarChart3, label: t('navigation.dashboard'), path: '/dashboard/department' },
          { icon: Users, label: t('department.workers'), path: '/establishments/management' },
          { icon: Shield, label: t('department.applications'), path: '/applications/review' },
          { icon: Menu, label: t('navigation.more'), path: '/settings' }
        ];
      
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors touch-manipulation ${
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