import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('landing.features.workerReg.title'),
      description: t('landing.features.workerReg.desc'),
    },
    {
      icon: Building2,
      title: t('landing.features.establishmentMgmt.title'),
      description: t('landing.features.establishmentMgmt.desc'),
    },
    {
      icon: Shield,
      title: t('landing.features.departmentOversight.title'),
      description: t('landing.features.departmentOversight.desc'),
    },
  ];

  const benefits = [
    t('landing.benefits.secure'),
    t('landing.benefits.multilang'),
    t('landing.benefits.realtime'),
    t('landing.benefits.reporting'),
    t('landing.benefits.mobile'),
    t('landing.benefits.compliance')
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
              {t('landing.title')}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-100">
              {t('landing.subtitle')}
            </p>
            <p className="text-base md:text-lg mb-8 md:mb-12 text-blue-200 max-w-3xl mx-auto">
              {t('landing.description')}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg touch-manipulation"
            >
              {t('landing.getStarted')}
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('landing.featuresTitle')}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('landing.featuresSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group card-mobile">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('landing.quickAccess')}
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              {t('landing.quickAccessSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Worker Registration */}
            <Link
              to="/register/worker"
              className="card-mobile hover:shadow-xl transition-shadow group touch-manipulation"
            >
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600 mr-3" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {t('landing.registerAsWorker')}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {t('landing.workerRegistrationDesc')}
              </p>
              <div className="flex items-center text-green-600 group-hover:text-green-700">
                <span className="text-sm font-medium">{t('common.start')}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>

            {/* Establishment Registration */}
            <Link
              to="/register/establishment"
              className="card-mobile hover:shadow-xl transition-shadow group touch-manipulation"
            >
              <div className="flex items-center mb-4">
                <Building2 className="h-6 w-6 md:h-8 md:w-8 text-orange-600 mr-3" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {t('landing.registerAsEstablishment')}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {t('landing.establishmentRegistrationDesc')}
              </p>
              <div className="flex items-center text-orange-600 group-hover:text-orange-700">
                <span className="text-sm font-medium">{t('common.start')}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>

            {/* Login Options */}
            <div className="card-mobile lg:col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mr-3" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {t('landing.loginOptions')}
                </h3>
              </div>
              <div className="space-y-3">
                <Link
                  to="/login/worker"
                  className="block w-full text-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors touch-manipulation"
                >
                  {t('landing.loginAsWorker')}
                </Link>
                <Link
                  to="/login/establishment"
                  className="block w-full text-center px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors touch-manipulation"
                >
                  {t('landing.loginAsEstablishment')}
                </Link>
                <Link
                  to="/login/department"
                  className="block w-full text-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors touch-manipulation"
                >
                  {t('landing.loginAsDepartment')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                {t('landing.whyChoose')}
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                {t('landing.whyChooseSubtitle')}
              </p>
              <div className="space-y-3 md:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  {t('landing.getStartedToday')}
                </h3>
                <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base">
                  {t('landing.getStartedTodaySubtitle')}
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm md:text-base touch-manipulation"
                >
                  {t('landing.startRegistration')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;