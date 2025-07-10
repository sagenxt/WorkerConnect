import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EstablishmentRegistrationData {
  // Step 1: Establishment Details
  establishmentName: string;
  contactPersonName: string;
  emailAddress: string;
  mobileNumber: string;
  
  // Step 2: Address Details
  doorNumber: string;
  street: string;
  district: string;
  mandalOrCity: string;
  villageOrArea: string;
  pincode: string;
  
  // Step 3: Business Details
  hasPlanApprovalId: string;
  planApprovalId: string;
  categoryOfEstablishment: string;
  natureOfWork: string;
  dateOfCommencement: string;
  tentativeDateOfCompletion: string;
  
  // Step 4: Construction Details
  estimatedCostForConstruction: string;
  constructionArea: string;
  builtUpArea: string;
  basicEstimationCost: string;
  maleWorkers: string;
  femaleWorkers: string;
  
  // Step 5: Review & Submit
  confirmationChecked: boolean;
}

const EstablishmentRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<EstablishmentRegistrationData>({
    // Step 1
    establishmentName: '',
    contactPersonName: '',
    emailAddress: '',
    mobileNumber: '',
    // Step 2
    doorNumber: '',
    street: '',
    district: '',
    mandalOrCity: '',
    villageOrArea: '',
    pincode: '',
    // Step 3
    hasPlanApprovalId: '',
    planApprovalId: '',
    categoryOfEstablishment: '',
    natureOfWork: '',
    dateOfCommencement: '',
    tentativeDateOfCompletion: '',
    // Step 4
    estimatedCostForConstruction: '',
    constructionArea: '',
    builtUpArea: '',
    basicEstimationCost: '',
    maleWorkers: '',
    femaleWorkers: '',
    // Step 5
    confirmationChecked: false
  });

  // Step 1: Establishment Details
  const [establishmentErrors, setEstablishmentErrors] = useState<{ [key: string]: string }>({});

  // Helper for number-only input
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number, field: keyof EstablishmentRegistrationData) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
    setForm(f => ({ ...f, [field]: value }));
  };

  // Helper for number formatting (Indian format)
  const formatIndianNumber = (value: string): string => {
    const num = value.replace(/,/g, '');
    if (num === '') return '';
    const numValue = parseInt(num);
    if (isNaN(numValue)) return '';
    return numValue.toLocaleString('en-IN');
  };

  const handleNumberFormatInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof EstablishmentRegistrationData) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setForm(f => ({ ...f, [field]: value }));
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Step 1 UI
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Establishment Details</h3>
      <p className="mb-4">Please provide your establishment information</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Establishment Name *</label>
          <input
            type="text"
            value={form.establishmentName}
            onChange={e => setForm(f => ({ ...f, establishmentName: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter establishment name"
          />
          {establishmentErrors.establishmentName && <div className="text-red-500 text-xs">{establishmentErrors.establishmentName}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Owner/Manager/Contact Person Name *</label>
          <input
            type="text"
            value={form.contactPersonName}
            onChange={e => setForm(f => ({ ...f, contactPersonName: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact person name"
          />
          {establishmentErrors.contactPersonName && <div className="text-red-500 text-xs">{establishmentErrors.contactPersonName}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address *</label>
          <input
            type="email"
            value={form.emailAddress}
            onChange={e => setForm(f => ({ ...f, emailAddress: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
          {establishmentErrors.emailAddress && <div className="text-red-500 text-xs">{establishmentErrors.emailAddress}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number *</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={form.mobileNumber}
            onChange={e => handleNumberInput(e, 10, 'mobileNumber')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 10-digit mobile number"
          />
          {form.mobileNumber.length > 0 && form.mobileNumber.length < 10 && (
            <p className="text-red-500 text-sm mt-1">Mobile number must be 10 digits</p>
          )}
          {establishmentErrors.mobileNumber && <div className="text-red-500 text-xs">{establishmentErrors.mobileNumber}</div>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="btn" onClick={() => navigate('/')}>Back</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            const errors: { [key: string]: string } = {};
            if (!form.establishmentName) errors.establishmentName = 'Establishment name is required';
            if (!form.contactPersonName) errors.contactPersonName = 'Contact person name is required';
            if (!form.emailAddress) {
              errors.emailAddress = 'Email address is required';
            } else if (!validateEmail(form.emailAddress)) {
              errors.emailAddress = 'Please enter a valid email address';
            }
            if (!form.mobileNumber) {
              errors.mobileNumber = 'Mobile number is required';
            } else if (form.mobileNumber.length !== 10) {
              errors.mobileNumber = 'Mobile number must be 10 digits';
            }
            
            setEstablishmentErrors(errors);
            if (Object.keys(errors).length === 0) setCurrentStep(2);
          }}
        >Next</button>
      </div>
    </div>
  );

  // Step 2: Address Details
  const [addressErrors, setAddressErrors] = useState<{ [key: string]: string }>({});
  
  // Mock data for dropdowns
  const districtOptions = ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Adilabad', 'Khammam', 'Nalgonda', 'Medak', 'Rangareddy', 'Mahabubnagar'];
  const mandalOptions = ['Mandal 1', 'Mandal 2', 'Mandal 3', 'Mandal 4', 'Mandal 5'];
  const villageOptions = ['Village 1', 'Village 2', 'Village 3', 'Village 4', 'Village 5'];

  // Step 2 UI
  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Address Details</h3>
      <p className="mb-4">Please provide your establishment address</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Door Number *</label>
          <input
            type="text"
            value={form.doorNumber}
            onChange={e => setForm(f => ({ ...f, doorNumber: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter door number"
          />
          {addressErrors.doorNumber && <div className="text-red-500 text-xs">{addressErrors.doorNumber}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Street *</label>
          <input
            type="text"
            value={form.street}
            onChange={e => setForm(f => ({ ...f, street: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter street address"
          />
          {addressErrors.street && <div className="text-red-500 text-xs">{addressErrors.street}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">District *</label>
          <select
            value={form.district}
            onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select District</option>
            {districtOptions.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          {addressErrors.district && <div className="text-red-500 text-xs">{addressErrors.district}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mandal/City *</label>
          <select
            value={form.mandalOrCity}
            onChange={e => setForm(f => ({ ...f, mandalOrCity: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Mandal/City</option>
            {mandalOptions.map(mandal => (
              <option key={mandal} value={mandal}>{mandal}</option>
            ))}
          </select>
          {addressErrors.mandalOrCity && <div className="text-red-500 text-xs">{addressErrors.mandalOrCity}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Village/Area *</label>
          <select
            value={form.villageOrArea}
            onChange={e => setForm(f => ({ ...f, villageOrArea: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Village/Area</option>
            {villageOptions.map(village => (
              <option key={village} value={village}>{village}</option>
            ))}
          </select>
          {addressErrors.villageOrArea && <div className="text-red-500 text-xs">{addressErrors.villageOrArea}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pincode *</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={form.pincode}
            onChange={e => handleNumberInput(e, 6, 'pincode')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 6-digit pincode"
          />
          {form.pincode.length > 0 && form.pincode.length < 6 && (
            <p className="text-red-500 text-sm mt-1">Pincode must be 6 digits</p>
          )}
          {addressErrors.pincode && <div className="text-red-500 text-xs">{addressErrors.pincode}</div>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="btn" onClick={() => setCurrentStep(1)}>Back</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            const errors: { [key: string]: string } = {};
            if (!form.doorNumber) errors.doorNumber = 'Door number is required';
            if (!form.street) errors.street = 'Street is required';
            if (!form.district) errors.district = 'District is required';
            if (!form.mandalOrCity) errors.mandalOrCity = 'Mandal/City is required';
            if (!form.villageOrArea) errors.villageOrArea = 'Village/Area is required';
            if (!form.pincode || form.pincode.length !== 6) errors.pincode = 'Valid pincode is required';
            
            setAddressErrors(errors);
            if (Object.keys(errors).length === 0) setCurrentStep(3);
          }}
        >Next</button>
      </div>
    </div>
  );

  // Step 3: Business Details
  const [businessErrors, setBusinessErrors] = useState<{ [key: string]: string }>({});
  const [showPlanApprovalField, setShowPlanApprovalField] = useState(false);
  
  const categoryOptions = ['Residential', 'Commercial', 'Industrial', 'Mixed Use', 'Educational', 'Healthcare', 'Religious', 'Other'];
  const natureOfWorkOptions = ['Construction', 'Renovation', 'Extension', 'Demolition', 'Maintenance', 'Other'];

  // Step 3 UI
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h3>
      <p className="mb-4">Please provide your business information</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Do you have the Plan Approval ID? *</label>
          <select
            value={form.hasPlanApprovalId}
            onChange={e => {
              const value = e.target.value;
              setForm(f => ({ ...f, hasPlanApprovalId: value }));
              setShowPlanApprovalField(value === 'Yes');
              if (value === 'No') {
                setForm(f => ({ ...f, planApprovalId: '' }));
              }
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {businessErrors.hasPlanApprovalId && <div className="text-red-500 text-xs">{businessErrors.hasPlanApprovalId}</div>}
        </div>

        {showPlanApprovalField && (
          <div>
            <label className="block text-sm font-medium mb-1">Plan Approval ID *</label>
            <textarea
              value={form.planApprovalId}
              onChange={e => setForm(f => ({ ...f, planApprovalId: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Plan Approval ID"
              rows={3}
            />
            {businessErrors.planApprovalId && <div className="text-red-500 text-xs">{businessErrors.planApprovalId}</div>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Category of Establishment *</label>
          <select
            value={form.categoryOfEstablishment}
            onChange={e => setForm(f => ({ ...f, categoryOfEstablishment: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categoryOptions.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {businessErrors.categoryOfEstablishment && <div className="text-red-500 text-xs">{businessErrors.categoryOfEstablishment}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nature of Work *</label>
          <select
            value={form.natureOfWork}
            onChange={e => setForm(f => ({ ...f, natureOfWork: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Nature of Work</option>
            {natureOfWorkOptions.map(nature => (
              <option key={nature} value={nature}>{nature}</option>
            ))}
          </select>
          {businessErrors.natureOfWork && <div className="text-red-500 text-xs">{businessErrors.natureOfWork}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date of Commencement *</label>
          <input
            type="date"
            value={form.dateOfCommencement}
            onChange={e => setForm(f => ({ ...f, dateOfCommencement: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split('T')[0]}
          />
          {businessErrors.dateOfCommencement && <div className="text-red-500 text-xs">{businessErrors.dateOfCommencement}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tentative Date of Completion</label>
          <input
            type="date"
            value={form.tentativeDateOfCompletion}
            onChange={e => setForm(f => ({ ...f, tentativeDateOfCompletion: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="btn" onClick={() => setCurrentStep(2)}>Back</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            const errors: { [key: string]: string } = {};
            if (!form.hasPlanApprovalId) errors.hasPlanApprovalId = 'Please select if you have Plan Approval ID';
            if (showPlanApprovalField && !form.planApprovalId) errors.planApprovalId = 'Plan Approval ID is required';
            if (!form.categoryOfEstablishment) errors.categoryOfEstablishment = 'Category is required';
            if (!form.natureOfWork) errors.natureOfWork = 'Nature of work is required';
            if (!form.dateOfCommencement) errors.dateOfCommencement = 'Date of commencement is required';
            
            setBusinessErrors(errors);
            if (Object.keys(errors).length === 0) setCurrentStep(4);
          }}
        >Next</button>
      </div>
    </div>
  );

  // Step 4: Construction Details
  const [constructionErrors, setConstructionErrors] = useState<{ [key: string]: string }>({});

  // Step 4 UI
  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Construction Details</h3>
      <p className="mb-4">Please provide construction information</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Estimated Cost for Construction (₹)</label>
          <input
            type="text"
            value={formatIndianNumber(form.estimatedCostForConstruction)}
            onChange={e => handleNumberFormatInput(e, 'estimatedCostForConstruction')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 10,00,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Construction Area (sq ft)</label>
          <input
            type="number"
            value={form.constructionArea}
            onChange={e => setForm(f => ({ ...f, constructionArea: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter construction area"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Built-up Area (sq ft)</label>
          <input
            type="number"
            value={form.builtUpArea}
            onChange={e => setForm(f => ({ ...f, builtUpArea: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter built-up area"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Basic Estimation Cost (₹)</label>
          <input
            type="text"
            value={formatIndianNumber(form.basicEstimationCost)}
            onChange={e => handleNumberFormatInput(e, 'basicEstimationCost')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 10,00,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Male Workers</label>
          <input
            type="number"
            value={form.maleWorkers}
            onChange={e => setForm(f => ({ ...f, maleWorkers: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of male workers"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Female Workers</label>
          <input
            type="number"
            value={form.femaleWorkers}
            onChange={e => setForm(f => ({ ...f, femaleWorkers: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of female workers"
            min="0"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="btn" onClick={() => setCurrentStep(3)}>Back</button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep(5)}
        >Next</button>
      </div>
    </div>
  );

  // Step 5: Review & Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Step 5 UI
  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Review & Submit</h3>
      <p className="mb-4">Please review your information before submitting</p>
      
      {!submitSuccess ? (
        <div className="space-y-6">
          {/* Establishment Details */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Establishment Details</h4>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setCurrentStep(1)}
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">Establishment Name:</span> {form.establishmentName}</div>
              <div><span className="font-medium">Contact Person:</span> {form.contactPersonName}</div>
              <div><span className="font-medium">Email:</span> {form.emailAddress}</div>
              <div><span className="font-medium">Mobile:</span> {form.mobileNumber}</div>
            </div>
          </div>

          {/* Address Details */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Address Details</h4>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setCurrentStep(2)}
              >
                Edit
              </button>
            </div>
            <div className="text-sm">
              <p>{form.doorNumber}, {form.street}</p>
              <p>{form.district}, {form.mandalOrCity}</p>
              <p>{form.villageOrArea} - {form.pincode}</p>
            </div>
          </div>

          {/* Business Details */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Business Details</h4>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setCurrentStep(3)}
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">Plan Approval ID:</span> {form.hasPlanApprovalId}</div>
              {showPlanApprovalField && <div><span className="font-medium">Plan Approval ID:</span> {form.planApprovalId}</div>}
              <div><span className="font-medium">Category:</span> {form.categoryOfEstablishment}</div>
              <div><span className="font-medium">Nature of Work:</span> {form.natureOfWork}</div>
              <div><span className="font-medium">Commencement Date:</span> {form.dateOfCommencement}</div>
              <div><span className="font-medium">Completion Date:</span> {form.tentativeDateOfCompletion || 'Not specified'}</div>
            </div>
          </div>

          {/* Construction Details */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Construction Details</h4>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setCurrentStep(4)}
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">Estimated Cost:</span> ₹{formatIndianNumber(form.estimatedCostForConstruction) || 'Not specified'}</div>
              <div><span className="font-medium">Construction Area:</span> {form.constructionArea || 'Not specified'} sq ft</div>
              <div><span className="font-medium">Built-up Area:</span> {form.builtUpArea || 'Not specified'} sq ft</div>
              <div><span className="font-medium">Basic Estimation Cost:</span> ₹{formatIndianNumber(form.basicEstimationCost) || 'Not specified'}</div>
              <div><span className="font-medium">Male Workers:</span> {form.maleWorkers || '0'}</div>
              <div><span className="font-medium">Female Workers:</span> {form.femaleWorkers || '0'}</div>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="confirmation"
                checked={form.confirmationChecked}
                onChange={e => setForm(f => ({ ...f, confirmationChecked: e.target.checked }))}
                className="mr-3 mt-1"
              />
              <label htmlFor="confirmation" className="text-sm">
                I confirm that the information provided is true to the best of my knowledge and declare that no child labour is employed. I am aware that furnishing false information may lead to legal consequences and cancellation of my registration.
              </label>
            </div>
            {!form.confirmationChecked && (
              <p className="text-red-500 text-xs mt-2">Please confirm the declaration to proceed</p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button className="btn" onClick={() => setCurrentStep(4)}>Back</button>
            <button
              className="btn btn-primary"
              disabled={isSubmitting || !form.confirmationChecked}
              onClick={async () => {
                setIsSubmitting(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                setSubmitSuccess(true);
                setIsSubmitting(false);
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h3>
          <p className="text-gray-600 mb-4">
            Your establishment registration application has been submitted successfully.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-medium">Application ID: EST-{Date.now().toString().slice(-8)}</p>
            <p className="text-blue-600 text-sm">Please save this ID for future reference</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Go to Landing Page
          </button>
        </div>
      )}
    </div>
  );

  // Stepper UI
  const renderStepper = () => (
    <div className="stepper mb-8">
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
            {step < 5 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>Establishment</span>
        <span>Address</span>
        <span>Business</span>
        <span>Construction</span>
        <span>Review</span>
      </div>
    </div>
  );

  // Main render function
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Establishment Registration
            </h1>
            <p className="text-gray-600">
              Complete your establishment registration in 5 simple steps
            </p>
          </div>

          {renderStepper()}
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default EstablishmentRegistration; 