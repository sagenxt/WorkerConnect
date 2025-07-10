import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check, X } from 'lucide-react-native';

interface FormData {
  // Step 1: Identify Yourself
  aadharNumber: string;
  otp: string;
  
  // Step 2: Personal Information
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  dateOfBirth: string;
  age: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  religion: string;
  category: string;
  
  // Step 3: Address Details
  presentAddress: {
    houseNo: string;
    street: string;
    village: string;
    postOffice: string;
    policeStation: string;
    district: string;
    state: string;
    pincode: string;
  };
  permanentAddress: {
    houseNo: string;
    street: string;
    village: string;
    postOffice: string;
    policeStation: string;
    district: string;
    state: string;
    pincode: string;
  };
  sameAsPresent: boolean;
  
  // Step 4: Other Details
  nres: string;
  tradeUnionMember: string;
  tradeUnionName: string;
  tradeUnionAddress: string;
}

const WorkerRegistrationScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    aadharNumber: '',
    otp: '',
    firstName: '',
    lastName: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    age: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    religion: '',
    category: '',
    presentAddress: {
      houseNo: '',
      street: '',
      village: '',
      postOffice: '',
      policeStation: '',
      district: '',
      state: '',
      pincode: '',
    },
    permanentAddress: {
      houseNo: '',
      street: '',
      village: '',
      postOffice: '',
      policeStation: '',
      district: '',
      state: '',
      pincode: '',
    },
    sameAsPresent: false,
    nres: '',
    tradeUnionMember: '',
    tradeUnionName: '',
    tradeUnionAddress: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateAddressField = (addressType: 'presentAddress' | 'permanentAddress', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value,
      },
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: any = {};

    switch (step) {
      case 1:
        if (!formData.aadharNumber) {
          newErrors.aadharNumber = 'Aadhar number is required';
        } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
          newErrors.aadharNumber = 'Aadhar number must be 12 digits';
        }
        if (!formData.otp) {
          newErrors.otp = 'OTP is required';
        } else if (!/^\d{6}$/.test(formData.otp)) {
          newErrors.otp = 'OTP must be 6 digits';
        }
        break;

      case 2:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.fatherName) newErrors.fatherName = 'Father\'s name is required';
        if (!formData.motherName) newErrors.motherName = 'Mother\'s name is required';
        if (!formData.religion) newErrors.religion = 'Religion is required';
        if (!formData.category) newErrors.category = 'Category is required';
        break;

      case 3:
        if (!formData.presentAddress.houseNo) newErrors.presentAddress = { ...newErrors.presentAddress, houseNo: 'House number is required' };
        if (!formData.presentAddress.street) newErrors.presentAddress = { ...newErrors.presentAddress, street: 'Street is required' };
        if (!formData.presentAddress.village) newErrors.presentAddress = { ...newErrors.presentAddress, village: 'Village is required' };
        if (!formData.presentAddress.postOffice) newErrors.presentAddress = { ...newErrors.presentAddress, postOffice: 'Post office is required' };
        if (!formData.presentAddress.policeStation) newErrors.presentAddress = { ...newErrors.presentAddress, policeStation: 'Police station is required' };
        if (!formData.presentAddress.district) newErrors.presentAddress = { ...newErrors.presentAddress, district: 'District is required' };
        if (!formData.presentAddress.state) newErrors.presentAddress = { ...newErrors.presentAddress, state: 'State is required' };
        if (!formData.presentAddress.pincode) newErrors.presentAddress = { ...newErrors.presentAddress, pincode: 'Pincode is required' };
        break;

      case 4:
        if (!formData.nres) newErrors.nres = 'NRES is required';
        if (!formData.tradeUnionMember) newErrors.tradeUnionMember = 'Trade union membership is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      Alert.alert(
        'Registration Successful',
        'Your worker registration has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Landing'),
          },
        ]
      );
    }
  };

  const copyPresentAddress = () => {
    setFormData(prev => ({
      ...prev,
      permanentAddress: { ...prev.presentAddress },
      sameAsPresent: true,
    }));
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 1: Identify Yourself</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Aadhar Number *</Text>
        <TextInput
          style={[styles.input, errors.aadharNumber && styles.inputError]}
          value={formData.aadharNumber}
          onChangeText={(value) => updateFormData('aadharNumber', value)}
          placeholder="Enter 12-digit Aadhar number"
          keyboardType="numeric"
          maxLength={12}
        />
        {errors.aadharNumber && <Text style={styles.errorText}>{errors.aadharNumber}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>OTP *</Text>
        <TextInput
          style={[styles.input, errors.otp && styles.inputError]}
          value={formData.otp}
          onChangeText={(value) => updateFormData('otp', value)}
          placeholder="Enter 6-digit OTP"
          keyboardType="numeric"
          maxLength={6}
        />
        {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 2: Personal Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name *</Text>
        <TextInput
          style={[styles.input, errors.firstName && styles.inputError]}
          value={formData.firstName}
          onChangeText={(value) => updateFormData('firstName', value)}
          placeholder="Enter first name"
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name *</Text>
        <TextInput
          style={[styles.input, errors.lastName && styles.inputError]}
          value={formData.lastName}
          onChangeText={(value) => updateFormData('lastName', value)}
          placeholder="Enter last name"
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender *</Text>
        <View style={styles.radioGroup}>
          {['Male', 'Female', 'Other'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => updateFormData('gender', option)}
            >
              <View style={styles.radioButton}>
                {formData.gender === option && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Marital Status *</Text>
        <View style={styles.radioGroup}>
          {['Single', 'Married', 'Divorced', 'Widowed'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => updateFormData('maritalStatus', option)}
            >
              <View style={styles.radioButton}>
                {formData.maritalStatus === option && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.maritalStatus && <Text style={styles.errorText}>{errors.maritalStatus}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth *</Text>
        <TextInput
          style={[styles.input, errors.dateOfBirth && styles.inputError]}
          value={formData.dateOfBirth}
          onChangeText={(value) => updateFormData('dateOfBirth', value)}
          placeholder="DD/MM/YYYY"
        />
        {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={formData.age}
          editable={false}
          placeholder="Auto-calculated"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Father's Name *</Text>
        <TextInput
          style={[styles.input, errors.fatherName && styles.inputError]}
          value={formData.fatherName}
          onChangeText={(value) => updateFormData('fatherName', value)}
          placeholder="Enter father's name"
        />
        {errors.fatherName && <Text style={styles.errorText}>{errors.fatherName}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mother's Name *</Text>
        <TextInput
          style={[styles.input, errors.motherName && styles.inputError]}
          value={formData.motherName}
          onChangeText={(value) => updateFormData('motherName', value)}
          placeholder="Enter mother's name"
        />
        {errors.motherName && <Text style={styles.errorText}>{errors.motherName}</Text>}
      </View>

      {formData.maritalStatus === 'Married' && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Spouse Name</Text>
          <TextInput
            style={styles.input}
            value={formData.spouseName}
            onChangeText={(value) => updateFormData('spouseName', value)}
            placeholder="Enter spouse's name"
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Religion *</Text>
        <TextInput
          style={[styles.input, errors.religion && styles.inputError]}
          value={formData.religion}
          onChangeText={(value) => updateFormData('religion', value)}
          placeholder="Enter religion"
        />
        {errors.religion && <Text style={styles.errorText}>{errors.religion}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category *</Text>
        <TextInput
          style={[styles.input, errors.category && styles.inputError]}
          value={formData.category}
          onChangeText={(value) => updateFormData('category', value)}
          placeholder="Enter category"
        />
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 3: Address Details</Text>
      
      <Text style={styles.sectionTitle}>Present Address</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>House Number *</Text>
        <TextInput
          style={[styles.input, errors.presentAddress?.houseNo && styles.inputError]}
          value={formData.presentAddress.houseNo}
          onChangeText={(value) => updateAddressField('presentAddress', 'houseNo', value)}
          placeholder="Enter house number"
        />
        {errors.presentAddress?.houseNo && <Text style={styles.errorText}>{errors.presentAddress.houseNo}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Street *</Text>
        <TextInput
          style={[styles.input, errors.presentAddress?.street && styles.inputError]}
          value={formData.presentAddress.street}
          onChangeText={(value) => updateAddressField('presentAddress', 'street', value)}
          placeholder="Enter street name"
        />
        {errors.presentAddress?.street && <Text style={styles.errorText}>{errors.presentAddress.street}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Village *</Text>
        <TextInput
          style={[styles.input, errors.presentAddress?.village && styles.inputError]}
          value={formData.presentAddress.village}
          onChangeText={(value) => updateAddressField('presentAddress', 'village', value)}
          placeholder="Enter village name"
        />
        {errors.presentAddress?.village && <Text style={styles.errorText}>{errors.presentAddress.village}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Post Office *</Text>
        <TextInput
          style={[styles.input, errors.presentAddress?.postOffice && styles.inputError]}
          value={formData.presentAddress.postOffice}
          onChangeText={(value) => updateAddressField('presentAddress', 'postOffice', value)}
          placeholder="Enter post office"
        />
        {errors.presentAddress?.postOffice && <Text style={styles.errorText}>{errors.presentAddress.postOffice}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Police Station *</Text>
        <TextInput
          style={[styles.input, errors.presentAddress?.policeStation && styles.inputError]}
          value={formData.presentAddress.policeStation}
          onChangeText={(value) => updateAddressField('presentAddress', 'policeStation', value)}
          placeholder="Enter police station"
        />
        {errors.presentAddress?.policeStation && <Text style={styles.errorText}>{errors.presentAddress.policeStation}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>District *</Text>
        <TextInput
          style={[styles.input, errors.presentAddress?.district && styles.inputError]}
          value={formData.presentAddress.district}
          onChangeText={(value) => updateAddressField('presentAddress', 'district', value)}
          placeholder="Enter district"
        />
        {errors.presentAddress?.district && <Text style={styles.errorText}>{errors.presentAddress.district}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>State *</Text>
        <TextInput
          style={[styles.input, errors.presentAddress?.state && styles.inputError]}
          value={formData.presentAddress.state}
          onChangeText={(value) => updateAddressField('presentAddress', 'state', value)}
          placeholder="Enter state"
        />
        {errors.presentAddress?.state && <Text style={styles.errorText}>{errors.presentAddress.state}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pincode *</Text>
        <TextInput
          style={[styles.input, errors.presentAddress?.pincode && styles.inputError]}
          value={formData.presentAddress.pincode}
          onChangeText={(value) => updateAddressField('presentAddress', 'pincode', value)}
          placeholder="Enter pincode"
          keyboardType="numeric"
          maxLength={6}
        />
        {errors.presentAddress?.pincode && <Text style={styles.errorText}>{errors.presentAddress.pincode}</Text>}
      </View>

      <TouchableOpacity style={styles.copyButton} onPress={copyPresentAddress}>
        <Text style={styles.copyButtonText}>Copy Present Address to Permanent Address</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Permanent Address</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>House Number</Text>
        <TextInput
          style={styles.input}
          value={formData.permanentAddress.houseNo}
          onChangeText={(value) => updateAddressField('permanentAddress', 'houseNo', value)}
          placeholder="Enter house number"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Street</Text>
        <TextInput
          style={styles.input}
          value={formData.permanentAddress.street}
          onChangeText={(value) => updateAddressField('permanentAddress', 'street', value)}
          placeholder="Enter street name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Village</Text>
        <TextInput
          style={styles.input}
          value={formData.permanentAddress.village}
          onChangeText={(value) => updateAddressField('permanentAddress', 'village', value)}
          placeholder="Enter village name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Post Office</Text>
        <TextInput
          style={styles.input}
          value={formData.permanentAddress.postOffice}
          onChangeText={(value) => updateAddressField('permanentAddress', 'postOffice', value)}
          placeholder="Enter post office"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Police Station</Text>
        <TextInput
          style={styles.input}
          value={formData.permanentAddress.policeStation}
          onChangeText={(value) => updateAddressField('permanentAddress', 'policeStation', value)}
          placeholder="Enter police station"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>District</Text>
        <TextInput
          style={styles.input}
          value={formData.permanentAddress.district}
          onChangeText={(value) => updateAddressField('permanentAddress', 'district', value)}
          placeholder="Enter district"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={formData.permanentAddress.state}
          onChangeText={(value) => updateAddressField('permanentAddress', 'state', value)}
          placeholder="Enter state"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pincode</Text>
        <TextInput
          style={styles.input}
          value={formData.permanentAddress.pincode}
          onChangeText={(value) => updateAddressField('permanentAddress', 'pincode', value)}
          placeholder="Enter pincode"
          keyboardType="numeric"
          maxLength={6}
        />
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 4: Other Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>NRES *</Text>
        <View style={styles.radioGroup}>
          {['Yes', 'No'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => updateFormData('nres', option)}
            >
              <View style={styles.radioButton}>
                {formData.nres === option && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.nres && <Text style={styles.errorText}>{errors.nres}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Trade Union Member *</Text>
        <View style={styles.radioGroup}>
          {['Yes', 'No'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => updateFormData('tradeUnionMember', option)}
            >
              <View style={styles.radioButton}>
                {formData.tradeUnionMember === option && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.tradeUnionMember && <Text style={styles.errorText}>{errors.tradeUnionMember}</Text>}
      </View>

      {formData.tradeUnionMember === 'Yes' && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trade Union Name</Text>
            <TextInput
              style={styles.input}
              value={formData.tradeUnionName}
              onChangeText={(value) => updateFormData('tradeUnionName', value)}
              placeholder="Enter trade union name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trade Union Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.tradeUnionAddress}
              onChangeText={(value) => updateFormData('tradeUnionAddress', value)}
              placeholder="Enter trade union address"
              multiline
              numberOfLines={3}
            />
          </View>
        </>
      )}
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 5: Review & Submit</Text>
      
      <ScrollView style={styles.reviewContainer}>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Personal Information</Text>
          <Text style={styles.reviewText}>Name: {formData.firstName} {formData.lastName}</Text>
          <Text style={styles.reviewText}>Gender: {formData.gender}</Text>
          <Text style={styles.reviewText}>Marital Status: {formData.maritalStatus}</Text>
          <Text style={styles.reviewText}>Date of Birth: {formData.dateOfBirth}</Text>
          <Text style={styles.reviewText}>Father's Name: {formData.fatherName}</Text>
          <Text style={styles.reviewText}>Mother's Name: {formData.motherName}</Text>
          {formData.maritalStatus === 'Married' && (
            <Text style={styles.reviewText}>Spouse Name: {formData.spouseName}</Text>
          )}
          <Text style={styles.reviewText}>Religion: {formData.religion}</Text>
          <Text style={styles.reviewText}>Category: {formData.category}</Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Present Address</Text>
          <Text style={styles.reviewText}>House No: {formData.presentAddress.houseNo}</Text>
          <Text style={styles.reviewText}>Street: {formData.presentAddress.street}</Text>
          <Text style={styles.reviewText}>Village: {formData.presentAddress.village}</Text>
          <Text style={styles.reviewText}>Post Office: {formData.presentAddress.postOffice}</Text>
          <Text style={styles.reviewText}>Police Station: {formData.presentAddress.policeStation}</Text>
          <Text style={styles.reviewText}>District: {formData.presentAddress.district}</Text>
          <Text style={styles.reviewText}>State: {formData.presentAddress.state}</Text>
          <Text style={styles.reviewText}>Pincode: {formData.presentAddress.pincode}</Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Permanent Address</Text>
          <Text style={styles.reviewText}>House No: {formData.permanentAddress.houseNo}</Text>
          <Text style={styles.reviewText}>Street: {formData.permanentAddress.street}</Text>
          <Text style={styles.reviewText}>Village: {formData.permanentAddress.village}</Text>
          <Text style={styles.reviewText}>Post Office: {formData.permanentAddress.postOffice}</Text>
          <Text style={styles.reviewText}>Police Station: {formData.permanentAddress.policeStation}</Text>
          <Text style={styles.reviewText}>District: {formData.permanentAddress.district}</Text>
          <Text style={styles.reviewText}>State: {formData.permanentAddress.state}</Text>
          <Text style={styles.reviewText}>Pincode: {formData.permanentAddress.pincode}</Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Other Details</Text>
          <Text style={styles.reviewText}>NRES: {formData.nres}</Text>
          <Text style={styles.reviewText}>Trade Union Member: {formData.tradeUnionMember}</Text>
          {formData.tradeUnionMember === 'Yes' && (
            <>
              <Text style={styles.reviewText}>Trade Union Name: {formData.tradeUnionName}</Text>
              <Text style={styles.reviewText}>Trade Union Address: {formData.tradeUnionAddress}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );

  const renderStep = () => {
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Worker Registration</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(currentStep / 5) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step {currentStep} of 5</Text>
        </View>

        {/* Step Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderStep()}
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigation}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
              <Text style={styles.prevButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentStep < 5 ? (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingVertical: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  copyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  reviewContainer: {
    flex: 1,
  },
  reviewSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  reviewSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 15,
  },
  prevButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  nextButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default WorkerRegistrationScreen; 