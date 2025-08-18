import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Globe, LogOut, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 safe-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              {t('landing.title')}
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              to="/mobile"
              className="flex items-center space-x-1 px-2 md:px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors touch-manipulation"
            >
              <Smartphone className="h-4 w-4" />
              <span className="text-sm font-medium hidden md:inline">
                {t('mobile.downloadApp')}
              </span>
            </Link>
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-1 px-2 md:px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors touch-manipulation"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'తెలుగు' : 'English'}
              </span>
            </button>

            {user && (
              <>
                {/* <span className="hidden md:block text-sm text-gray-600">
                  {t('common.welcome')}, {user.name}
                </span> */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-2 md:px-3 py-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors touch-manipulation"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('navigation.logout')}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;