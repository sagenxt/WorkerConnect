import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import FormInput from '../components/FormInput';

const EstablishmentLogin: React.FC = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = t('forms.validation.email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t('forms.validation.email');
    }

    if (!formData.password.trim()) {
      newErrors.password = t('forms.validation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      login({
        id: '1',
        type: 'establishment',
        name: 'ABC Construction Ltd.',
        email: formData.email
      });
      
      setIsLoading(false);
      navigate('/dashboard/establishment');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('landing.loginAsEstablishment')}
          </h2>
          <p className="mt-2 text-gray-600">
            {t('establishment.login')}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                <FormInput
                  label={t('auth.email')}
                  type="email"
                  value={formData.email}
                  onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                  placeholder={t('forms.placeholders.enterEmail')}
                  required
                  error={errors.email}
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                <FormInput
                  label={t('auth.password')}
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                  placeholder={t('auth.password')}
                  required
                  error={errors.password}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? t('auth.signingIn') : t('auth.signIn')}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            {t('auth.dontHaveAccount')}{' '}
            <Link
              to="/register/establishment"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              {t('landing.registerAsEstablishment')}
            </Link>
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            {t('navigation.login')} {t('common.as')}{' '}
            <Link to="/login/worker" className="text-green-600 hover:text-green-700">
              {t('worker.login')}
            </Link>
            {' '}{t('common.or')}{' '}
            <Link to="/login/department" className="text-blue-600 hover:text-blue-700">
              {t('department.department')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentLogin;