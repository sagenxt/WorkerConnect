import React, { useState } from 'react';
import { User, Edit, Save, X, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { GENDERS, MARITAL_STATUS } from '../utils/constants';

const WorkerProfile: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    maritalStatus: 'married',
    mobileNumber: '9876543210',
    emailAddress: 'john.doe@example.com',
    aadharNumber: '1234-5678-9012',
    tradeOfWork: 'mason',
    workerCategory: 'skilled'
  });

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', profileData);
    setIsEditing(false);
    alert(t('notifications.updateSuccess'));
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="min-h-screen py-8 mobile-nav-spacing">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t('worker.profile')}
                </h1>
                <p className="text-gray-600">
                  {t('worker.manageProfile')}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {t('common.edit')}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    {t('common.cancel')}
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {t('common.save')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="card-mobile mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-gray-600">{t('worker.profile')}</p>
              <p className="text-sm text-gray-500">ID: WK001</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="card-mobile mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('worker.personalInfo')}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label={t('worker.firstName')}
              value={profileData.firstName}
              onChange={(value) => setProfileData({ ...profileData, firstName: value })}
              disabled={!isEditing}
            />
            
            <FormInput
              label={t('worker.lastName')}
              value={profileData.lastName}
              onChange={(value) => setProfileData({ ...profileData, lastName: value })}
              disabled={!isEditing}
            />
            
            <FormSelect
              label={t('worker.gender')}
              value={profileData.gender}
              onChange={(value) => setProfileData({ ...profileData, gender: value })}
              options={GENDERS}
              disabled={!isEditing}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('worker.dateOfBirth')}
              </label>
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
            
            <FormSelect
              label={t('worker.maritalStatus')}
              value={profileData.maritalStatus}
              onChange={(value) => setProfileData({ ...profileData, maritalStatus: value })}
              options={MARITAL_STATUS.map(status => ({ value: status.toLowerCase(), label: status }))}
              disabled={!isEditing}
            />
            
            <FormInput
              label={t('worker.mobileNumber')}
              value={profileData.mobileNumber}
              onChange={(value) => setProfileData({ ...profileData, mobileNumber: value })}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Work Information */}
        <div className="card-mobile mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('worker.workplaceDetails')}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label={t('worker.tradeOfWork')}
              value={profileData.tradeOfWork}
              onChange={(value) => setProfileData({ ...profileData, tradeOfWork: value })}
              disabled={!isEditing}
            />
            
            <FormInput
              label={t('worker.workerCategory')}
              value={profileData.workerCategory}
              onChange={(value) => setProfileData({ ...profileData, workerCategory: value })}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Identity Information */}
        <div className="card-mobile">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('worker.identityInfo')}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label={t('worker.aadharNumber')}
              value={profileData.aadharNumber}
              onChange={(value) => setProfileData({ ...profileData, aadharNumber: value })}
              disabled={true} // Aadhar should not be editable
            />
            
            <FormInput
              label={t('worker.emailAddress')}
              value={profileData.emailAddress}
              onChange={(value) => setProfileData({ ...profileData, emailAddress: value })}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;