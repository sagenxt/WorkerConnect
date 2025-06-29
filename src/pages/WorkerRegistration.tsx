import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Stepper from '../components/Stepper';
import IdentityVerification from '../components/worker-registration/IdentityVerification';
import PersonalInformation from '../components/worker-registration/PersonalInformation';
import WorkplaceDetails from '../components/worker-registration/WorkplaceDetails';
import AddressDetails from '../components/worker-registration/AddressDetails';
import BankDetails from '../components/worker-registration/BankDetails';
import OtherDetails from '../components/worker-registration/OtherDetails';
import DocumentUpload from '../components/worker-registration/DocumentUpload';
import ReviewSubmit from '../components/worker-registration/ReviewSubmit';

const WorkerRegistration: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Identity
    aadharNumber: '',
    otp: '',
    isOtpVerified: false,
    eshramId: '',
    bocwId: '',
    
    // Personal Info
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    maritalStatus: '',
    fatherHusbandName: '',
    caste: '',
    subCaste: '',
    dependents: [],
    
    // Workplace
    employerName: '',
    constructionOrg: '',
    tradeOfWork: '',
    workerCategory: '',
    
    // Address
    presentAddress: {
      doorNumber: '',
      street: '',
      district: '',
      mandal: '',
      village: '',
      pincode: ''
    },
    permanentAddress: {
      doorNumber: '',
      street: '',
      district: '',
      mandal: '',
      village: '',
      pincode: ''
    },
    sameAsPresent: false,
    
    // Bank Details
    accountNumber: '',
    confirmAccountNumber: '',
    bankName: '',
    ifscCode: '',
    branchName: '',
    branchAddress: '',
    
    // Other Details
    isNresWorker: '',
    isTradeUnionMember: '',
    
    // Documents
    documents: {
      passportPhoto: null,
      aadharCard: null,
      checkPassbook: null,
      nresDocument: null
    }
  });

  const steps = [
    { id: 1, title: 'Identity', completed: currentStep > 1 },
    { id: 2, title: 'Personal', completed: currentStep > 2 },
    { id: 3, title: 'Workplace', completed: currentStep > 3 },
    { id: 4, title: 'Address', completed: currentStep > 4 },
    { id: 5, title: 'Bank', completed: currentStep > 5 },
    { id: 6, title: 'Other', completed: currentStep > 6 },
    { id: 7, title: 'Documents', completed: currentStep > 7 },
    { id: 8, title: 'Review', completed: false }
  ];

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Process form submission
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully!');
    navigate('/');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <IdentityVerification
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PersonalInformation
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <WorkplaceDetails
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <AddressDetails
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <BankDetails
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 6:
        return (
          <OtherDetails
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 7:
        return (
          <DocumentUpload
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 8:
        return (
          <ReviewSubmit
            formData={formData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              {t('worker.registration')}
            </h1>
          </div>
          
          <div className="p-6">
            <Stepper steps={steps} currentStep={currentStep} />
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerRegistration;