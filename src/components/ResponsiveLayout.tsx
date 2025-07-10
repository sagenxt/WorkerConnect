import React from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  showScrollbar?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'white' | 'gray' | 'blue' | 'transparent';
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  className = '',
  showScrollbar = true,
  maxWidth = '7xl',
  padding = 'md',
  background = 'transparent'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-2 sm:px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    transparent: ''
  };

  const scrollbarClasses = showScrollbar 
    ? 'overflow-y-auto scrollbar-responsive' 
    : 'overflow-hidden';

  return (
    <div className={`
      min-h-screen
      ${backgroundClasses[background]}
      ${scrollbarClasses}
      ${className}
    `}>
      <div className={`
        mx-auto
        ${maxWidthClasses[maxWidth]}
        ${paddingClasses[padding]}
        py-4 sm:py-6 lg:py-8
      `}>
        {children}
      </div>
    </div>
  );
};

export default ResponsiveLayout; 