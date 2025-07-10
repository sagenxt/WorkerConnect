import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WorkerRegistrationData {
  // Step 1
  aadharNumber: string;
  otp: string;
  eShramId: string;
  bocwId: string;
  // Step 2
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  dateOfBirth: string;
  age: number;
  fatherOrHusbandName: string;
  caste: string;
  subCaste: string;
  // Step 3
  presentAddress: {
    doorNumber: string;
    street: string;
    district: string;
    mandalOrCity: string;
    villageOrArea: string;
    pincode: string;
  };
  permanentAddress: {
    doorNumber: string;
    street: string;
    district: string;
    mandalOrCity: string;
    villageOrArea: string;
    pincode: string;
  };
  sameAsPresent: boolean;
  // Step 4
  isNRESMember: string;
  nresDetails: string;
  isTradeUnionMember: string;
  tradeUnionDetails: string;
}

const initialData: WorkerRegistrationData = {
  aadharNumber: '',
  otp: '',
  eShramId: '',
  bocwId: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  maritalStatus: '',
  dateOfBirth: '',
  age: 0,
  fatherOrHusbandName: '',
  caste: '',
  subCaste: '',
  presentAddress: {
    doorNumber: '',
    street: '',
    district: '',
    mandalOrCity: '',
    villageOrArea: '',
    pincode: '',
  },
  permanentAddress: {
    doorNumber: '',
    street: '',
    district: '',
    mandalOrCity: '',
    villageOrArea: '',
    pincode: '',
  },
  sameAsPresent: false,
  isNRESMember: '',
  nresDetails: '',
  isTradeUnionMember: '',
  tradeUnionDetails: '',
};

const WorkerRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<WorkerRegistrationData>({
    // Step 1
    aadharNumber: '',
    otp: '',
    eShramId: '',
    bocwId: '',
    // Step 2
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    age: 0,
    fatherOrHusbandName: '',
    caste: '',
    subCaste: '',
    // Step 3
    presentAddress: {
      doorNumber: '',
      street: '',
      district: '',
      mandalOrCity: '',
      villageOrArea: '',
      pincode: ''
    },
    permanentAddress: {
      doorNumber: '',
      street: '',
      district: '',
      mandalOrCity: '',
      villageOrArea: '',
      pincode: ''
    },
    // Step 4
    isNRESMember: '',
    nresDetails: '',
    isTradeUnionMember: '',
    tradeUnionDetails: '',
    sameAsPresent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Stepper UI and navigation skeleton will be added in the next edit
  const [identityVerified, setIdentityVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Helper for number-only input
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number, field: keyof WorkerRegistrationData) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
    setForm(f => ({ ...f, [field]: value }));
  };

  // Step 1 UI
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Identify Yourself</h3>
      <p className="mb-2">Please verify your identity using your Aadhar card</p>
      <div>
        <label className="block text-sm font-medium mb-1">Aadhar Card Number *</label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={12}
          value={form.aadharNumber}
          onChange={e => handleNumberInput(e, 12, 'aadharNumber')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter 12-digit Aadhar number"
        />
        {form.aadharNumber.length > 0 && form.aadharNumber.length < 12 && (
          <p className="text-red-500 text-sm mt-1">Aadhar number must be 12 digits</p>
        )}
      </div>
      <div>
        <button
          className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold ${form.aadharNumber.length === 12 ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={form.aadharNumber.length !== 12 || otpSent}
          onClick={() => setOtpSent(true)}
        >
          Generate OTP
        </button>
      </div>
      {otpSent && !identityVerified && (
        <div>
          <label className="block text-sm font-medium mb-1">Enter OTP *</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={form.otp}
            onChange={e => handleNumberInput(e, 6, 'otp')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 6-digit OTP"
          />
          {form.otp.length > 0 && form.otp.length < 6 && (
            <p className="text-red-500 text-sm mt-1">OTP must be 6 digits</p>
          )}
          <button
            className={`mt-4 px-4 py-2 rounded bg-green-600 text-white font-semibold ${form.otp.length === 6 ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={form.otp.length !== 6}
            onClick={() => setIdentityVerified(true)}
          >
            Next
          </button>
        </div>
      )}
      {identityVerified && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h4 className="font-semibold text-green-700 mb-2">Identity Verified Successfully!</h4>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">eShram ID</label>
            <input
              type="text"
              value={form.eShramId}
              onChange={e => setForm(f => ({ ...f, eShramId: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter eShram ID"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">BoCW ID</label>
            <input
              type="text"
              value={form.bocwId}
              onChange={e => setForm(f => ({ ...f, bocwId: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter BoCW ID"
            />
          </div>
          <button
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold"
            onClick={() => setCurrentStep(2)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );

  // Step 2: Personal Information
  const [personalInfoErrors, setPersonalInfoErrors] = useState<{ [key: string]: string }>({});
  const genderOptions = ['Male', 'Female', 'Transgender'];
  const maritalStatusOptions = ['Single', 'Married'];

  // Helper to calculate age from date of birth
  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Step 2 UI
  const renderStep2 = () => (
    <div className="step step-2">
      <h2 className="text-xl font-bold mb-2">Personal Information</h2>
      <p className="mb-4">Please provide your personal information</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>First Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            className="input"
            value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
          />
          {personalInfoErrors.firstName && <div className="text-red-500 text-xs">{personalInfoErrors.firstName}</div>}
        </div>
        <div>
          <label>Middle Name</label>
          <input
            type="text"
            className="input"
            value={form.middleName}
            onChange={e => setForm(f => ({ ...f, middleName: e.target.value }))}
          />
        </div>
        <div>
          <label>Last Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            className="input"
            value={form.lastName}
            onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
          />
          {personalInfoErrors.lastName && <div className="text-red-500 text-xs">{personalInfoErrors.lastName}</div>}
        </div>
        <div>
          <label>Gender</label>
          <select
            className="input"
            value={form.gender}
            onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
          >
            <option value="">Select</option>
            {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label>Marital Status</label>
          <select
            className="input"
            value={form.maritalStatus}
            onChange={e => setForm(f => ({ ...f, maritalStatus: e.target.value }))}
          >
            <option value="">Select</option>
            {maritalStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label>Date of Birth<span className="text-red-500">*</span></label>
          <input
            type="date"
            className="input"
            value={form.dateOfBirth}
            min={(() => {
              const d = new Date();
              d.setFullYear(d.getFullYear() - 60);
              return d.toISOString().split('T')[0];
            })()}
            max={(() => {
              const d = new Date();
              d.setFullYear(d.getFullYear() - 18);
              return d.toISOString().split('T')[0];
            })()}
            onChange={e => {
              const dob = e.target.value;
              setForm(f => ({ ...f, dateOfBirth: dob, age: calculateAge(dob) }));
            }}
          />
          {personalInfoErrors.dateOfBirth && <div className="text-red-500 text-xs">{personalInfoErrors.dateOfBirth}</div>}
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            className="input bg-gray-100"
            value={form.age > 0 ? form.age : ''}
            readOnly
          />
        </div>
        <div>
          <label>Father/Husband Name</label>
          <input
            type="text"
            className="input"
            value={form.fatherOrHusbandName}
            onChange={e => setForm(f => ({ ...f, fatherOrHusbandName: e.target.value }))}
          />
        </div>
        <div className="md:col-span-2">
          <label>Caste</label>
          <textarea
            className="input"
            value={form.caste}
            onChange={e => setForm(f => ({ ...f, caste: e.target.value }))}
          />
        </div>
        <div className="md:col-span-2">
          <label>Sub Caste</label>
          <textarea
            className="input"
            value={form.subCaste}
            onChange={e => setForm(f => ({ ...f, subCaste: e.target.value }))}
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button className="btn" onClick={() => setCurrentStep(1)}>Back</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            // Validate required fields
            const errors: { [key: string]: string } = {};
            if (!form.firstName) errors.firstName = 'First Name is required';
            if (!form.lastName) errors.lastName = 'Last Name is required';
            if (!form.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';
            else {
              const age = calculateAge(form.dateOfBirth);
              if (age < 18 || age > 60) errors.dateOfBirth = 'Age must be between 18 and 60';
            }
            setPersonalInfoErrors(errors);
            if (Object.keys(errors).length === 0) setCurrentStep(3);
          }}
        >Next</button>
      </div>
    </div>
  );

  // Step 3: Address Details
  const [addressErrors, setAddressErrors] = useState<{ [key: string]: string }>({});
  const [sameAsPresent, setSameAsPresent] = useState(false);
  
  // Mock data for dropdowns
  const districtOptions = ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Adilabad', 'Khammam', 'Nalgonda', 'Medak', 'Rangareddy', 'Mahabubnagar'];
  const mandalOptions = ['Mandal 1', 'Mandal 2', 'Mandal 3', 'Mandal 4', 'Mandal 5'];
  const villageOptions = ['Village 1', 'Village 2', 'Village 3', 'Village 4', 'Village 5'];

  // Helper for pincode validation
  const handlePincodeInput = (e: React.ChangeEvent<HTMLInputElement>, addressType: 'present' | 'permanent') => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    if (addressType === 'present') {
      setForm(f => ({ 
        ...f, 
        presentAddress: { ...f.presentAddress, pincode: value }
      }));
    } else {
      setForm(f => ({ 
        ...f, 
        permanentAddress: { ...f.permanentAddress, pincode: value }
      }));
    }
  };

  // Copy present address to permanent address
  const copyPresentToPermanent = () => {
    setForm(f => ({
      ...f,
      permanentAddress: { ...f.presentAddress }
    }));
  };

  // Step 3 UI
  const renderStep3 = () => (
    <div className="step step-3">
      <h2 className="text-xl font-bold mb-2">Address Details</h2>
      <p className="mb-4">Please provide your present and permanent address details</p>
      
      {/* Present Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Present Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label>Door Number<span className="text-red-500">*</span></label>
            <textarea
              className="input"
              value={form.presentAddress.doorNumber}
              onChange={e => setForm(f => ({ 
                ...f, 
                presentAddress: { ...f.presentAddress, doorNumber: e.target.value }
              }))}
            />
            {addressErrors.presentDoorNumber && <div className="text-red-500 text-xs">{addressErrors.presentDoorNumber}</div>}
          </div>
          <div className="md:col-span-2">
            <label>Street<span className="text-red-500">*</span></label>
            <textarea
              className="input"
              value={form.presentAddress.street}
              onChange={e => setForm(f => ({ 
                ...f, 
                presentAddress: { ...f.presentAddress, street: e.target.value }
              }))}
            />
            {addressErrors.presentStreet && <div className="text-red-500 text-xs">{addressErrors.presentStreet}</div>}
          </div>
          <div>
            <label>District<span className="text-red-500">*</span></label>
            <select
              className="input"
              value={form.presentAddress.district}
              onChange={e => setForm(f => ({ 
                ...f, 
                presentAddress: { ...f.presentAddress, district: e.target.value }
              }))}
            >
              <option value="">Select District</option>
              {districtOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {addressErrors.presentDistrict && <div className="text-red-500 text-xs">{addressErrors.presentDistrict}</div>}
          </div>
          <div>
            <label>Mandal/City</label>
            <select
              className="input"
              value={form.presentAddress.mandalOrCity}
              onChange={e => setForm(f => ({ 
                ...f, 
                presentAddress: { ...f.presentAddress, mandalOrCity: e.target.value }
              }))}
            >
              <option value="">Select Mandal/City</option>
              {mandalOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label>Village/Area</label>
            <select
              className="input"
              value={form.presentAddress.villageOrArea}
              onChange={e => setForm(f => ({ 
                ...f, 
                presentAddress: { ...f.presentAddress, villageOrArea: e.target.value }
              }))}
            >
              <option value="">Select Village/Area</option>
              {villageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label>Pincode<span className="text-red-500">*</span></label>
            <input
              type="text"
              className="input"
              value={form.presentAddress.pincode}
              onChange={e => handlePincodeInput(e, 'present')}
              placeholder="Enter 6-digit pincode"
            />
            {addressErrors.presentPincode && <div className="text-red-500 text-xs">{addressErrors.presentPincode}</div>}
          </div>
        </div>
      </div>

      {/* Same as Present Address Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={sameAsPresent}
            onChange={e => {
              setSameAsPresent(e.target.checked);
              if (e.target.checked) {
                copyPresentToPermanent();
              }
            }}
          />
          Same as Present Address
        </label>
      </div>

      {/* Permanent Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Permanent Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label>Door Number<span className="text-red-500">*</span></label>
            <textarea
              className="input"
              value={form.permanentAddress.doorNumber}
              onChange={e => setForm(f => ({ 
                ...f, 
                permanentAddress: { ...f.permanentAddress, doorNumber: e.target.value }
              }))}
              disabled={sameAsPresent}
            />
            {addressErrors.permanentDoorNumber && <div className="text-red-500 text-xs">{addressErrors.permanentDoorNumber}</div>}
          </div>
          <div className="md:col-span-2">
            <label>Street<span className="text-red-500">*</span></label>
            <textarea
              className="input"
              value={form.permanentAddress.street}
              onChange={e => setForm(f => ({ 
                ...f, 
                permanentAddress: { ...f.permanentAddress, street: e.target.value }
              }))}
              disabled={sameAsPresent}
            />
            {addressErrors.permanentStreet && <div className="text-red-500 text-xs">{addressErrors.permanentStreet}</div>}
          </div>
          <div>
            <label>District<span className="text-red-500">*</span></label>
            <select
              className="input"
              value={form.permanentAddress.district}
              onChange={e => setForm(f => ({ 
                ...f, 
                permanentAddress: { ...f.permanentAddress, district: e.target.value }
              }))}
              disabled={sameAsPresent}
            >
              <option value="">Select District</option>
              {districtOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {addressErrors.permanentDistrict && <div className="text-red-500 text-xs">{addressErrors.permanentDistrict}</div>}
          </div>
          <div>
            <label>Mandal/City</label>
            <select
              className="input"
              value={form.permanentAddress.mandalOrCity}
              onChange={e => setForm(f => ({ 
                ...f, 
                permanentAddress: { ...f.permanentAddress, mandalOrCity: e.target.value }
              }))}
              disabled={sameAsPresent}
            >
              <option value="">Select Mandal/City</option>
              {mandalOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label>Village/Area</label>
            <select
              className="input"
              value={form.permanentAddress.villageOrArea}
              onChange={e => setForm(f => ({ 
                ...f, 
                permanentAddress: { ...f.permanentAddress, villageOrArea: e.target.value }
              }))}
              disabled={sameAsPresent}
            >
              <option value="">Select Village/Area</option>
              {villageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label>Pincode<span className="text-red-500">*</span></label>
            <input
              type="text"
              className="input"
              value={form.permanentAddress.pincode}
              onChange={e => handlePincodeInput(e, 'permanent')}
              placeholder="Enter 6-digit pincode"
              disabled={sameAsPresent}
            />
            {addressErrors.permanentPincode && <div className="text-red-500 text-xs">{addressErrors.permanentPincode}</div>}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="btn" onClick={() => setCurrentStep(2)}>Back</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            // Validate required fields
            const errors: { [key: string]: string } = {};
            
            // Present Address validation
            if (!form.presentAddress.doorNumber) errors.presentDoorNumber = 'Door Number is required';
            if (!form.presentAddress.street) errors.presentStreet = 'Street is required';
            if (!form.presentAddress.district) errors.presentDistrict = 'District is required';
            if (!form.presentAddress.pincode) errors.presentPincode = 'Pincode is required';
            else if (form.presentAddress.pincode.length !== 6) errors.presentPincode = 'Pincode must be 6 digits';
            
            // Permanent Address validation (only if not same as present)
            if (!sameAsPresent) {
              if (!form.permanentAddress.doorNumber) errors.permanentDoorNumber = 'Door Number is required';
              if (!form.permanentAddress.street) errors.permanentStreet = 'Street is required';
              if (!form.permanentAddress.district) errors.permanentDistrict = 'District is required';
              if (!form.permanentAddress.pincode) errors.permanentPincode = 'Pincode is required';
              else if (form.permanentAddress.pincode.length !== 6) errors.permanentPincode = 'Pincode must be 6 digits';
            }
            
            setAddressErrors(errors);
            if (Object.keys(errors).length === 0) setCurrentStep(4);
          }}
        >Next</button>
      </div>
    </div>
  );

  // Step 4: Other Details
  const [otherDetailsErrors, setOtherDetailsErrors] = useState<{ [key: string]: string }>({});
  const [showNresDetails, setShowNresDetails] = useState(false);
  const [showTradeUnionDetails, setShowTradeUnionDetails] = useState(false);

  // Step 4 UI
  const renderStep4 = () => (
    <div className="step step-4">
      <h2 className="text-xl font-bold mb-2">Other Details</h2>
      <p className="mb-4">Please provide additional information about your employment status</p>
      
      <div className="space-y-6">
        {/* NRES Member */}
        <div>
          <label>Is He/She NRES member?<span className="text-red-500">*</span></label>
          <select
            className="input"
            value={form.isNRESMember}
            onChange={e => {
              const value = e.target.value;
              setForm(f => ({ ...f, isNRESMember: value }));
              setShowNresDetails(value === 'Yes');
              if (value === 'No') {
                setForm(f => ({ ...f, nresDetails: '' }));
              }
            }}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {otherDetailsErrors.isNRESMember && <div className="text-red-500 text-xs">{otherDetailsErrors.isNRESMember}</div>}
        </div>

        {/* NRES Details - Conditional */}
        {showNresDetails && (
          <div>
            <label>NRES Details<span className="text-red-500">*</span></label>
            <textarea
              className="input"
              value={form.nresDetails}
              onChange={e => setForm(f => ({ ...f, nresDetails: e.target.value }))}
              placeholder="Please provide NRES membership details..."
            />
            {otherDetailsErrors.nresDetails && <div className="text-red-500 text-xs">{otherDetailsErrors.nresDetails}</div>}
          </div>
        )}

        {/* Trade Union Member */}
        <div>
          <label>Is He/She a member of Trade Union?<span className="text-red-500">*</span></label>
          <select
            className="input"
            value={form.isTradeUnionMember}
            onChange={e => {
              const value = e.target.value;
              setForm(f => ({ ...f, isTradeUnionMember: value }));
              setShowTradeUnionDetails(value === 'Yes');
              if (value === 'No') {
                setForm(f => ({ ...f, tradeUnionDetails: '' }));
              }
            }}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {otherDetailsErrors.isTradeUnionMember && <div className="text-red-500 text-xs">{otherDetailsErrors.isTradeUnionMember}</div>}
        </div>

        {/* Trade Union Details - Conditional */}
        {showTradeUnionDetails && (
          <div>
            <label>Trade Union Details<span className="text-red-500">*</span></label>
            <textarea
              className="input"
              value={form.tradeUnionDetails}
              onChange={e => setForm(f => ({ ...f, tradeUnionDetails: e.target.value }))}
              placeholder="Please provide Trade Union membership details..."
            />
            {otherDetailsErrors.tradeUnionDetails && <div className="text-red-500 text-xs">{otherDetailsErrors.tradeUnionDetails}</div>}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button className="btn" onClick={() => setCurrentStep(3)}>Back</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            // Validate required fields
            const errors: { [key: string]: string } = {};
            
            if (!form.isNRESMember) {
              errors.isNRESMember = 'Please select NRES membership status';
            } else if (form.isNRESMember === 'Yes' && !form.nresDetails.trim()) {
              errors.nresDetails = 'NRES details are required when member is Yes';
            }
            
            if (!form.isTradeUnionMember) {
              errors.isTradeUnionMember = 'Please select Trade Union membership status';
            } else if (form.isTradeUnionMember === 'Yes' && !form.tradeUnionDetails.trim()) {
              errors.tradeUnionDetails = 'Trade Union details are required when member is Yes';
            }
            
            setOtherDetailsErrors(errors);
            if (Object.keys(errors).length === 0) setCurrentStep(5);
          }}
        >Next</button>
      </div>
    </div>
  );

  // Step 5: Review & Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Step 5 UI
  const renderStep5 = () => (
    <div className="step step-5">
      <h2 className="text-xl font-bold mb-2">Review & Submit</h2>
      <p className="mb-4">Please review your information before submitting</p>
      
      {!submitSuccess ? (
        <div className="space-y-6">
          {/* Identity Verification Review */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Identity Verification</h3>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setCurrentStep(1)}
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><strong>Aadhar Number:</strong> {form.aadharNumber}</div>
              <div><strong>eShram ID:</strong> {form.eShramId}</div>
              <div><strong>BoCW ID:</strong> {form.bocwId}</div>
            </div>
          </div>

          {/* Personal Information Review */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setCurrentStep(2)}
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><strong>Name:</strong> {form.firstName} {form.middleName} {form.lastName}</div>
              <div><strong>Gender:</strong> {form.gender}</div>
              <div><strong>Marital Status:</strong> {form.maritalStatus}</div>
              <div><strong>Date of Birth:</strong> {form.dateOfBirth}</div>
              <div><strong>Age:</strong> {form.age}</div>
              <div><strong>Father/Husband Name:</strong> {form.fatherOrHusbandName}</div>
              <div><strong>Caste:</strong> {form.caste}</div>
              <div><strong>Sub Caste:</strong> {form.subCaste}</div>
            </div>
          </div>

          {/* Address Details Review */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Address Details</h3>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setCurrentStep(3)}
              >
                Edit
              </button>
            </div>
            
            {/* Present Address */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Present Address:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div><strong>Door Number:</strong> {form.presentAddress.doorNumber}</div>
                <div><strong>Street:</strong> {form.presentAddress.street}</div>
                <div><strong>District:</strong> {form.presentAddress.district}</div>
                <div><strong>Mandal/City:</strong> {form.presentAddress.mandalOrCity}</div>
                <div><strong>Village/Area:</strong> {form.presentAddress.villageOrArea}</div>
                <div><strong>Pincode:</strong> {form.presentAddress.pincode}</div>
              </div>
            </div>

            {/* Permanent Address */}
            <div>
              <h4 className="font-medium mb-2">Permanent Address:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div><strong>Door Number:</strong> {form.permanentAddress.doorNumber}</div>
                <div><strong>Street:</strong> {form.permanentAddress.street}</div>
                <div><strong>District:</strong> {form.permanentAddress.district}</div>
                <div><strong>Mandal/City:</strong> {form.permanentAddress.mandalOrCity}</div>
                <div><strong>Village/Area:</strong> {form.permanentAddress.villageOrArea}</div>
                <div><strong>Pincode:</strong> {form.permanentAddress.pincode}</div>
              </div>
            </div>
          </div>

          {/* Other Details Review */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Other Details</h3>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setCurrentStep(4)}
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><strong>NRES Member:</strong> {form.isNRESMember}</div>
              {form.isNRESMember === 'Yes' && (
                <div><strong>NRES Details:</strong> {form.nresDetails}</div>
              )}
              <div><strong>Trade Union Member:</strong> {form.isTradeUnionMember}</div>
              {form.isTradeUnionMember === 'Yes' && (
                <div><strong>Trade Union Details:</strong> {form.tradeUnionDetails}</div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button className="btn" onClick={() => setCurrentStep(4)}>Back</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsSubmitting(true);
                // Simulate API call
                setTimeout(() => {
                  setIsSubmitting(false);
                  setSubmitSuccess(true);
                }, 2000);
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h3 className="text-xl font-bold text-green-600 mb-2">Application Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">Your worker registration has been submitted and is under review.</p>
          <div className="space-y-2 text-sm text-gray-500">
            <p><strong>Application ID:</strong> WC-{Date.now().toString().slice(-6)}</p>
            <p><strong>Submission Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Status:</strong> Pending Review</p>
          </div>
          <button
            className="btn btn-primary mt-6"
            onClick={() => navigate('/worker-dashboard')}
          >
            Go to Dashboard
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
        <span>Identify Yourself</span>
        <span>Personal Info</span>
        <span>Address</span>
        <span>Other Details</span>
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
              Worker Registration
            </h1>
            <p className="text-gray-600">
              Complete your registration in 5 simple steps
            </p>
          </div>

          {renderStepper()}
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default WorkerRegistration;
