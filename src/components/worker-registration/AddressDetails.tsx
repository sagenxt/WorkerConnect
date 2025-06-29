import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import { DISTRICTS } from '../../utils/constants';

interface AddressDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({
  formData,
  setFormData,
  onNext,
  onPrevious
}) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const districtOptions = DISTRICTS.map(district => ({
    value: district.name.toLowerCase().replace(/\s+/g, '_'),
    label: district.name
  }));

  const handleSameAsPresent = (checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        sameAsPresent: true,
        permanentAddress: { ...formData.presentAddress }
      });
    } else {
      setFormData({
        ...formData,
        sameAsPresent: false,
        permanentAddress: {
          doorNumber: '',
          street: '',
          district: '',
          mandal: '',
          village: '',
          pincode: ''
        }
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Present Address validation
    if (!formData.presentAddress?.doorNumber?.trim()) {
      newErrors.presentDoorNumber = 'Door number is required';
    }
    if (!formData.presentAddress?.street?.trim()) {
      newErrors.presentStreet = 'Street is required';
    }
    if (!formData.presentAddress?.district) {
      newErrors.presentDistrict = 'District is required';
    }
    if (!formData.presentAddress?.pincode?.trim()) {
      newErrors.presentPincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.presentAddress.pincode.trim())) {
      newErrors.presentPincode = 'Please enter a valid 6-digit pincode';
    }

    // Permanent Address validation (if not same as present)
    if (!formData.sameAsPresent) {
      if (!formData.permanentAddress?.doorNumber?.trim()) {
        newErrors.permanentDoorNumber = 'Door number is required';
      }
      if (!formData.permanentAddress?.street?.trim()) {
        newErrors.permanentStreet = 'Street is required';
      }
      if (!formData.permanentAddress?.district) {
        newErrors.permanentDistrict = 'District is required';
      }
      if (!formData.permanentAddress?.pincode?.trim()) {
        newErrors.permanentPincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.permanentAddress.pincode.trim())) {
        newErrors.permanentPincode = 'Please enter a valid 6-digit pincode';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          {t('worker.addressDetails')}
        </h2>
        <p className="text-gray-600 mt-2">
          Please provide your present and permanent address details
        </p>
      </div>

      {/* Present Address */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('worker.presentAddress')}
        </h3>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              label={t('worker.doorNumber')}
              value={formData.presentAddress?.doorNumber || ''}
              onChange={(value) => setFormData({
                ...formData,
                presentAddress: { ...formData.presentAddress, doorNumber: value }
              })}
              required
              error={errors.presentDoorNumber}
            />
            
            <FormInput
              label={t('worker.street')}
              value={formData.presentAddress?.street || ''}
              onChange={(value) => setFormData({
                ...formData,
                presentAddress: { ...formData.presentAddress, street: value }
              })}
              required
              error={errors.presentStreet}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <FormSelect
              label={t('worker.district')}
              value={formData.presentAddress?.district || ''}
              onChange={(value) => setFormData({
                ...formData,
                presentAddress: { ...formData.presentAddress, district: value }
              })}
              options={districtOptions}
              required
              error={errors.presentDistrict}
            />
            
            <FormInput
              label={t('worker.mandal')}
              value={formData.presentAddress?.mandal || ''}
              onChange={(value) => setFormData({
                ...formData,
                presentAddress: { ...formData.presentAddress, mandal: value }
              })}
            />
            
            <FormInput
              label={t('worker.village')}
              value={formData.presentAddress?.village || ''}
              onChange={(value) => setFormData({
                ...formData,
                presentAddress: { ...formData.presentAddress, village: value }
              })}
            />
          </div>
          
          <FormInput
            label={t('worker.pincode')}
            value={formData.presentAddress?.pincode || ''}
            onChange={(value) => setFormData({
              ...formData,
              presentAddress: { ...formData.presentAddress, pincode: value }
            })}
            maxLength={6}
            pattern="[0-9]*"
            required
            error={errors.presentPincode}
          />
        </div>
      </div>

      {/* Same as Present Address Checkbox */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="sameAsPresent"
          checked={formData.sameAsPresent || false}
          onChange={(e) => handleSameAsPresent(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="sameAsPresent" className="text-sm font-medium text-gray-700">
          {t('worker.sameAsPresent')}
        </label>
      </div>

      {/* Permanent Address */}
      <div className="bg-green-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('worker.permanentAddress')}
        </h3>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              label={t('worker.doorNumber')}
              value={formData.permanentAddress?.doorNumber || ''}
              onChange={(value) => setFormData({
                ...formData,
                permanentAddress: { ...formData.permanentAddress, doorNumber: value }
              })}
              required={!formData.sameAsPresent}
              disabled={formData.sameAsPresent}
              error={errors.permanentDoorNumber}
            />
            
            <FormInput
              label={t('worker.street')}
              value={formData.permanentAddress?.street || ''}
              onChange={(value) => setFormData({
                ...formData,
                permanentAddress: { ...formData.permanentAddress, street: value }
              })}
              required={!formData.sameAsPresent}
              disabled={formData.sameAsPresent}
              error={errors.permanentStreet}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <FormSelect
              label={t('worker.district')}
              value={formData.permanentAddress?.district || ''}
              onChange={(value) => setFormData({
                ...formData,
                permanentAddress: { ...formData.permanentAddress, district: value }
              })}
              options={districtOptions}
              required={!formData.sameAsPresent}
              disabled={formData.sameAsPresent}
              error={errors.permanentDistrict}
            />
            
            <FormInput
              label={t('worker.mandal')}
              value={formData.permanentAddress?.mandal || ''}
              onChange={(value) => setFormData({
                ...formData,
                permanentAddress: { ...formData.permanentAddress, mandal: value }
              })}
              disabled={formData.sameAsPresent}
            />
            
            <FormInput
              label={t('worker.village')}
              value={formData.permanentAddress?.village || ''}
              onChange={(value) => setFormData({
                ...formData,
                permanentAddress: { ...formData.permanentAddress, village: value }
              })}
              disabled={formData.sameAsPresent}
            />
          </div>
          
          <FormInput
            label={t('worker.pincode')}
            value={formData.permanentAddress?.pincode || ''}
            onChange={(value) => setFormData({
              ...formData,
              permanentAddress: { ...formData.permanentAddress, pincode: value }
            })}
            maxLength={6}
            pattern="[0-9]*"
            required={!formData.sameAsPresent}
            disabled={formData.sameAsPresent}
            error={errors.permanentPincode}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          {t('common.previous')}
        </button>
        
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          {t('common.next')}
        </button>
      </div>
    </div>
  );
};

export default AddressDetails;