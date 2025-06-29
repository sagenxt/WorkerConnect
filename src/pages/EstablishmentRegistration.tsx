import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { 
  DISTRICTS, 
  ESTABLISHMENT_CATEGORIES, 
  NATURE_OF_WORK,
  getDistrictLabel,
  getEstablishmentCategoryLabel,
  getNatureOfWorkLabel
} from '../utils/constants';

const EstablishmentRegistration: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    // Establishment Details
    establishmentName: '',
    ownerName: '',
    emailAddress: '',
    mobileNumber: '',
    
    // Address Details
    doorNumber: '',
    street: '',
    district: '',
    mandal: '',
    village: '',
    pincode: '',
    
    // Business Details
    hasPlanApproval: '',
    planApprovalId: '',
    establishmentCategory: '',
    natureOfWork: '',
    commencementDate: '',
    completionDate: '',
    contractorsWorking: '',
    contractors: [],
    
    // Construction Details
    estimatedCost: '',
    constructionArea: '',
    builtUpArea: '',
    basicEstimationCost: '',
    maleWorkers: '',
    femaleWorkers: '',
    
    // Declaration
    declaration: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sections = [
    { id: 1, title: 'Establishment Details' },
    { id: 2, title: 'Address Details' },
    { id: 3, title: 'Business Details' },
    { id: 4, title: 'Construction Details' },
    { id: 5, title: 'Review & Submit' }
  ];

  const districtOptions = DISTRICTS.map(district => ({
    value: district.name.toLowerCase().replace(/\s+/g, '_'),
    label: district.name
  }));

  const establishmentCategoryOptions = ESTABLISHMENT_CATEGORIES.map(category => ({
    value: category.toLowerCase().replace(/\s+/g, '_'),
    label: category
  }));

  const natureOfWorkOptions = NATURE_OF_WORK.map(nature => ({
    value: nature.toLowerCase().replace(/\s+/g, '_'),
    label: nature
  }));

  const validateCurrentSection = () => {
    const newErrors: Record<string, string> = {};

    switch (currentSection) {
      case 1:
        if (!formData.establishmentName.trim()) newErrors.establishmentName = 'Establishment name is required';
        if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner/Manager name is required';
        if (!formData.emailAddress.trim()) newErrors.emailAddress = 'Email address is required';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
        break;
      case 2:
        if (!formData.doorNumber.trim()) newErrors.doorNumber = 'Door number is required';
        if (!formData.street.trim()) newErrors.street = 'Street is required';
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        break;
      case 3:
        if (!formData.establishmentCategory) newErrors.establishmentCategory = 'Category is required';
        if (!formData.natureOfWork) newErrors.natureOfWork = 'Nature of work is required';
        if (!formData.commencementDate) newErrors.commencementDate = 'Commencement date is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentSection() && currentSection < 5) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.declaration) {
      setErrors({ declaration: 'Please accept the declaration' });
      return;
    }
    
    console.log('Establishment registration submitted:', formData);
    alert('Registration submitted successfully!');
    navigate('/');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('establishment.establishmentDetails')}
            </h3>
            
            <FormInput
              label={t('establishment.establishmentName')}
              value={formData.establishmentName}
              onChange={(value) => setFormData({ ...formData, establishmentName: value })}
              required
              error={errors.establishmentName}
            />
            
            <FormInput
              label={t('establishment.ownerName')}
              value={formData.ownerName}
              onChange={(value) => setFormData({ ...formData, ownerName: value })}
              required
              error={errors.ownerName}
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                label={t('establishment.emailAddress')}
                type="email"
                value={formData.emailAddress}
                onChange={(value) => setFormData({ ...formData, emailAddress: value })}
                required
                error={errors.emailAddress}
              />
              
              <FormInput
                label={t('establishment.mobileNumber')}
                type="tel"
                value={formData.mobileNumber}
                onChange={(value) => setFormData({ ...formData, mobileNumber: value })}
                required
                maxLength={10}
                error={errors.mobileNumber}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('worker.addressDetails')}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                label={t('worker.doorNumber')}
                value={formData.doorNumber}
                onChange={(value) => setFormData({ ...formData, doorNumber: value })}
                required
                error={errors.doorNumber}
              />
              
              <FormInput
                label={t('worker.street')}
                value={formData.street}
                onChange={(value) => setFormData({ ...formData, street: value })}
                required
                error={errors.street}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <FormSelect
                label={t('worker.district')}
                value={formData.district}
                onChange={(value) => setFormData({ ...formData, district: value })}
                options={districtOptions}
                required
                error={errors.district}
              />
              
              <FormInput
                label={t('worker.mandal')}
                value={formData.mandal}
                onChange={(value) => setFormData({ ...formData, mandal: value })}
              />
              
              <FormInput
                label={t('worker.village')}
                value={formData.village}
                onChange={(value) => setFormData({ ...formData, village: value })}
              />
            </div>
            
            <FormInput
              label={t('worker.pincode')}
              value={formData.pincode}
              onChange={(value) => setFormData({ ...formData, pincode: value })}
              maxLength={6}
              pattern="[0-9]*"
              required
              error={errors.pincode}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('establishment.businessDetails')}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormSelect
                label={t('establishment.planApprovalId')}
                value={formData.hasPlanApproval}
                onChange={(value) => setFormData({ ...formData, hasPlanApproval: value })}
                options={[
                  { value: 'yes', label: t('common.yes') },
                  { value: 'no', label: t('common.no') }
                ]}
              />
              
              {formData.hasPlanApproval === 'yes' && (
                <FormInput
                  label={t('establishment.planApprovalIdValue')}
                  value={formData.planApprovalId}
                  onChange={(value) => setFormData({ ...formData, planApprovalId: value })}
                />
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormSelect
                label={t('establishment.establishmentCategory')}
                value={formData.establishmentCategory}
                onChange={(value) => setFormData({ ...formData, establishmentCategory: value })}
                options={establishmentCategoryOptions}
                required
                error={errors.establishmentCategory}
              />
              
              <FormSelect
                label={t('establishment.natureOfWork')}
                value={formData.natureOfWork}
                onChange={(value) => setFormData({ ...formData, natureOfWork: value })}
                options={natureOfWorkOptions}
                required
                error={errors.natureOfWork}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('establishment.commencementDate')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.commencementDate}
                  onChange={(e) => setFormData({ ...formData, commencementDate: e.target.value })}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.commencementDate ? 'border-red-500' : ''
                  }`}
                />
                {errors.commencementDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.commencementDate}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('establishment.completionDate')}
                </label>
                <input
                  type="date"
                  value={formData.completionDate}
                  onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                  min={formData.commencementDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Construction Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                label={t('establishment.estimatedCost')}
                value={formData.estimatedCost}
                onChange={(value) => setFormData({ ...formData, estimatedCost: value })}
                placeholder="e.g., 10,00,00,000"
              />
              
              <FormInput
                label={t('establishment.constructionArea')}
                value={formData.constructionArea}
                onChange={(value) => setFormData({ ...formData, constructionArea: value })}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                label={t('establishment.builtUpArea')}
                value={formData.builtUpArea}
                onChange={(value) => setFormData({ ...formData, builtUpArea: value })}
                placeholder="Area in sq ft"
              />
              
              <FormInput
                label={t('establishment.basicEstimationCost')}
                value={formData.basicEstimationCost}
                onChange={(value) => setFormData({ ...formData, basicEstimationCost: value })}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                label={t('establishment.maleWorkers')}
                type="number"
                value={formData.maleWorkers}
                onChange={(value) => setFormData({ ...formData, maleWorkers: value })}
                placeholder="Number of male workers"
              />
              
              <FormInput
                label={t('establishment.femaleWorkers')}
                type="number"
                value={formData.femaleWorkers}
                onChange={(value) => setFormData({ ...formData, femaleWorkers: value })}
                placeholder="Number of female workers"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Review & Submit
            </h3>
            
            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Establishment Details</h4>
                <p className="text-gray-600">Name: {formData.establishmentName}</p>
                <p className="text-gray-600">Owner: {formData.ownerName}</p>
                <p className="text-gray-600">Email: {formData.emailAddress}</p>
                <p className="text-gray-600">Mobile: {formData.mobileNumber}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Address</h4>
                <p className="text-gray-600">
                  {formData.doorNumber}, {formData.street}, {getDistrictLabel(formData.district)}, {formData.pincode}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Business Details</h4>
                <p className="text-gray-600">Category: {getEstablishmentCategoryLabel(formData.establishmentCategory)}</p>
                <p className="text-gray-600">Nature of Work: {getNatureOfWorkLabel(formData.natureOfWork)}</p>
                <p className="text-gray-600">Commencement: {formData.commencementDate}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="declaration"
                  checked={formData.declaration}
                  onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                  className="mt-1"
                />
                <label htmlFor="declaration" className="text-sm text-blue-900">
                  {t('establishment.declarationText')}
                </label>
              </div>
              {errors.declaration && (
                <p className="mt-2 text-sm text-red-600">{errors.declaration}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                {t('establishment.registration')}
              </h1>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              {sections.map((section, index) => (
                <div key={section.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentSection >= section.id
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {section.id}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentSection >= section.id ? 'text-orange-600 font-medium' : 'text-gray-500'
                  }`}>
                    {section.title}
                  </span>
                  {index < sections.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      currentSection > section.id ? 'bg-orange-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            {renderSection()}
            
            <div className="flex justify-between mt-8">
              {currentSection > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  {t('common.previous')}
                </button>
              )}
              
              {currentSection < 5 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium ml-auto"
                >
                  {t('common.next')}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium ml-auto"
                >
                  {t('common.submit')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentRegistration;