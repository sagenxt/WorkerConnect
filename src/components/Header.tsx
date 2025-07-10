import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Menu, X, Home, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backTo?: string;
  showMenu?: boolean;
  showHome?: boolean;
  showLogs?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  backTo,
  showMenu = false,
  showHome = true,
  showLogs = false,
  className = ''
}) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    if (path === '/') return t('landing.title');
    if (path.includes('/login/worker')) return t('landing.loginAsWorker');
    if (path.includes('/login/establishment')) return t('landing.loginAsEstablishment');
    if (path.includes('/login/department')) return t('landing.loginAsDepartment');
    if (path.includes('/register/worker')) return t('landing.registerAsWorker');
    if (path.includes('/register/establishment')) return t('landing.registerAsEstablishment');
    if (path.includes('/dashboard/worker')) return t('worker.dashboard');
    if (path.includes('/dashboard/establishment')) return t('establishment.dashboard');
    if (path.includes('/dashboard/department')) return t('department.dashboard');
    if (path === '/help') return t('help.title');
    if (path === '/logs') return t('logs.title');
    
    return 'WorkerConnect';
  };

  return (
    <>
      {/* Header */}
      <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Back button and title */}
            <div className="flex items-center space-x-4">
              {showBack && (
                <button
                  onClick={handleBack}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
              )}
              
              {showHome && !showBack && (
                <button
                  onClick={() => navigate('/')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                  aria-label="Go home"
                >
                  <Home className="h-5 w-5 text-gray-600" />
                </button>
              )}

              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {getPageTitle()}
              </h1>
            </div>

            {/* Right side - Menu button */}
            <div className="flex items-center space-x-2">
              {showLogs && (
                <button
                  onClick={() => navigate('/logs')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                  aria-label="View logs"
                >
                  <HelpCircle className="h-5 w-5 text-gray-600" />
                </button>
              )}

              {showMenu && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[80vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-2">
                  <button
                    onClick={() => {
                      navigate('/');
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Home className="h-5 w-5 mr-3" />
                    {t('navigation.home')}
                  </button>

                  {user && (
                    <button
                      onClick={() => {
                        navigate(`/dashboard/${user.type}`);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <User className="h-5 w-5 mr-3" />
                      {t('navigation.dashboard')}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      navigate('/help');
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                                         <HelpCircle className="h-5 w-5 mr-3" />
                    {t('help.title')}
                  </button>

                  {showLogs && (
                    <button
                      onClick={() => {
                        navigate('/logs');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      {t('logs.title')}
                    </button>
                  )}
                </nav>
              </div>

              {/* Menu Footer */}
              {user && (
                <div className="p-4 border-t border-gray-200">
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.type}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {t('auth.signOut')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;