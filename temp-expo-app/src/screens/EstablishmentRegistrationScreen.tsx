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
  // Step 1: Establishment Details
  establishmentName: string;
  contactPersonName: string;
  emailAddress: string;
  mobileNumber: string;
  
  // Step 2: Address Details
  doorNumber: string;
  street: string;
  district: string;
  mandalCity: string;
  villageArea: string;
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
  confirmCheckbox: boolean;
}

// Andhra Pradesh Districts
const districts = [
  'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 
  'Kurnool', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'
];

// Sample Mandals for each district (you can expand this)
const mandalsByDistrict: { [key: string]: string[] } = {
  'Anantapur': ['Anantapur', 'Dharmavaram', 'Guntakal', 'Hindupur', 'Kadiri', 'Penukonda', 'Tadipatri'],
  'Chittoor': ['Chittoor', 'Tirupati', 'Madanapalle', 'Palamaner', 'Punganur', 'Srikalahasti'],
  'East Godavari': ['Kakinada', 'Rajahmundry', 'Amalapuram', 'Peddapuram', 'Ramachandrapuram', 'Tuni'],
  'Guntur': ['Guntur', 'Tenali', 'Narasaraopet', 'Bapatla', 'Macherla', 'Piduguralla'],
  'Krishna': ['Vijayawada', 'Machilipatnam', 'Gudivada', 'Nuzvid', 'Jaggayyapeta', 'Nandigama'],
  'Kurnool': ['Kurnool', 'Nandyal', 'Adoni', 'Yemmiganur', 'Dhone', 'Pattikonda'],
  'Prakasam': ['Ongole', 'Markapur', 'Giddalur', 'Kandukur', 'Chirala', 'Parchur'],
  'Srikakulam': ['Srikakulam', 'Palakonda', 'Tekkali', 'Pathapatnam', 'Amadalavalasa', 'Narasannapeta'],
  'Visakhapatnam': ['Visakhapatnam', 'Vizianagaram', 'Anakapalle', 'Bheemunipatnam', 'Paderu', 'Araku'],
  'Vizianagaram': ['Vizianagaram', 'Gajapathinagaram', 'Salyapeta', 'Bobbili', 'Parvathipuram', 'Kurupam'],
  'West Godavari': ['Eluru', 'Bhimavaram', 'Tadepalligudem', 'Narsapur', 'Palakol', 'Tanuku'],
  'YSR Kadapa': ['Kadapa', 'Proddatur', 'Jammalamadugu', 'Mydukur', 'Badvel', 'Pulivendula']
};

// Sample Villages for each mandal (you can expand this)
const villagesByMandal: { [key: string]: string[] } = {
  'Anantapur': ['Anantapur Village', 'Kadiri Village', 'Dharmavaram Village', 'Hindupur Village'],
  'Tirupati': ['Tirupati Village', 'Alipiri Village', 'Srinivasa Mangapuram Village'],
  'Kakinada': ['Kakinada Village', 'Pedagantyada Village', 'Chinagadili Village'],
  'Guntur': ['Guntur Village', 'Amaravati Village', 'Mangalagiri Village'],
  'Vijayawada': ['Vijayawada Village', 'Kondapalli Village', 'Gudavalli Village'],
  'Kurnool': ['Kurnool Village', 'Nandyal Village', 'Adoni Village'],
  'Ongole': ['Ongole Village', 'Chirala Village', 'Kandukur Village'],
  'Srikakulam': ['Srikakulam Village', 'Palakonda Village', 'Tekkali Village'],
  'Visakhapatnam': ['Visakhapatnam Village', 'Anakapalle Village', 'Bheemunipatnam Village'],
  'Vizianagaram': ['Vizianagaram Village', 'Gajapathinagaram Village', 'Bobbili Village'],
  'Eluru': ['Eluru Village', 'Bhimavaram Village', 'Tadepalligudem Village'],
  'Kadapa': ['Kadapa Village', 'Proddatur Village', 'Jammalamadugu Village']
};

// Categories of Establishment
const establishmentCategories = [
  'Construction', 'Manufacturing', 'Service', 'Retail', 'Wholesale', 
  'Transportation', 'Healthcare', 'Education', 'Hospitality', 'Other'
];

// Nature of Work
const natureOfWork = [
  'Residential Construction', 'Commercial Construction', 'Infrastructure Development',
  'Manufacturing', 'Assembly', 'Processing', 'Service Provision', 'Trading',
  'Transportation', 'Healthcare Services', 'Educational Services', 'Other'
];

const EstablishmentRegistrationScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    establishmentName: '',
    contactPersonName: '',
    emailAddress: '',
    mobileNumber: '',
    doorNumber: '',
    street: '',
    district: '',
    mandalCity: '',
    villageArea: '',
    pincode: '',
    hasPlanApprovalId: '',
    planApprovalId: '',
    categoryOfEstablishment: '',
    natureOfWork: '',
    dateOfCommencement: '',
    tentativeDateOfCompletion: '',
    estimatedCostForConstruction: '',
    constructionArea: '',
    builtUpArea: '',
    basicEstimationCost: '',
    maleWorkers: '',
    femaleWorkers: '',
    confirmCheckbox: false,
  });

  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.establishmentName.trim()) {
          Alert.alert('Error', 'Establishment Name is required');
          return false;
        }
        if (!formData.contactPersonName.trim()) {
          Alert.alert('Error', 'Contact Person Name is required');
          return false;
        }
        if (!formData.emailAddress.trim()) {
          Alert.alert('Error', 'Email Address is required');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
          Alert.alert('Error', 'Please enter a valid email address');
          return false;
        }
        if (!formData.mobileNumber.trim()) {
          Alert.alert('Error', 'Mobile Number is required');
          return false;
        }
        if (!/^\d{10}$/.test(formData.mobileNumber)) {
          Alert.alert('Error', 'Mobile Number must be exactly 10 digits');
          return false;
        }
        return true;

      case 2:
        if (!formData.doorNumber.trim()) {
          Alert.alert('Error', 'Door Number is required');
          return false;
        }
        if (!formData.street.trim()) {
          Alert.alert('Error', 'Street is required');
          return false;
        }
        if (!formData.district) {
          Alert.alert('Error', 'District is required');
          return false;
        }
        if (!formData.mandalCity) {
          Alert.alert('Error', 'Mandal/City is required');
          return false;
        }
        if (!formData.villageArea) {
          Alert.alert('Error', 'Village/Area is required');
          return false;
        }
        if (!formData.pincode.trim()) {
          Alert.alert('Error', 'Pincode is required');
          return false;
        }
        if (!/^\d{6}$/.test(formData.pincode)) {
          Alert.alert('Error', 'Pincode must be exactly 6 digits');
          return false;
        }
        return true;

      case 3:
        if (!formData.hasPlanApprovalId) {
          Alert.alert('Error', 'Please select whether you have Plan Approval ID');
          return false;
        }
        if (formData.hasPlanApprovalId === 'Yes' && !formData.planApprovalId.trim()) {
          Alert.alert('Error', 'Plan Approval ID is required');
          return false;
        }
        if (!formData.categoryOfEstablishment) {
          Alert.alert('Error', 'Category of Establishment is required');
          return false;
        }
        if (!formData.natureOfWork) {
          Alert.alert('Error', 'Nature of Work is required');
          return false;
        }
        if (!formData.dateOfCommencement) {
          Alert.alert('Error', 'Date of Commencement is required');
          return false;
        }
        return true;

      case 4:
        // All fields are optional in step 4
        return true;

      case 5:
        if (!formData.confirmCheckbox) {
          Alert.alert('Error', 'Please confirm the declaration');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatNumber = (value: string): string => {
    const numValue = value.replace(/,/g, '');
    if (numValue === '') return '';
    const number = parseInt(numValue);
    if (isNaN(number)) return '';
    return number.toLocaleString('en-IN');
  };

  const handleNumberInput = (field: keyof FormData, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    updateFormData(field, numericValue);
  };

  const handleSubmit = () => {
    if (validateStep(5)) {
      Alert.alert(
        'Success',
        'Establishment registration submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Landing')
          }
        ]
      );
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 1: Establishment Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Establishment Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.establishmentName}
          onChangeText={(value) => updateFormData('establishmentName', value)}
          placeholder="Enter establishment name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Owner/Manager/Contact Person Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.contactPersonName}
          onChangeText={(value) => updateFormData('contactPersonName', value)}
          placeholder="Enter contact person name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={formData.emailAddress}
          onChangeText={(value) => updateFormData('emailAddress', value)}
          placeholder="Enter email address"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mobile Number *</Text>
        <TextInput
          style={styles.input}
          value={formData.mobileNumber}
          onChangeText={(value) => handleNumberInput('mobileNumber', value)}
          placeholder="Enter 10-digit mobile number"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 2: Address Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Door Number *</Text>
        <TextInput
          style={styles.input}
          value={formData.doorNumber}
          onChangeText={(value) => updateFormData('doorNumber', value)}
          placeholder="Enter door number"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Street *</Text>
        <TextInput
          style={styles.input}
          value={formData.street}
          onChangeText={(value) => updateFormData('street', value)}
          placeholder="Enter street name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>District *</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(showDropdown === 'district' ? null : 'district')}
        >
          <Text style={[styles.dropdownText, !formData.district && styles.placeholderText]}>
            {formData.district || 'Select district'}
          </Text>
          <ChevronLeft size={20} color="#666" style={styles.dropdownIcon} />
        </TouchableOpacity>
        {showDropdown === 'district' && (
          <View style={styles.dropdownList}>
            <ScrollView style={styles.dropdownScroll}>
              {districts.map((district) => (
                <TouchableOpacity
                  key={district}
                  style={styles.dropdownItem}
                  onPress={() => {
                    updateFormData('district', district);
                    updateFormData('mandalCity', '');
                    updateFormData('villageArea', '');
                    setShowDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{district}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mandal/City *</Text>
        <TouchableOpacity
          style={[styles.dropdown, !formData.district && styles.disabled]}
          onPress={() => {
            if (formData.district) {
              setShowDropdown(showDropdown === 'mandal' ? null : 'mandal');
            }
          }}
          disabled={!formData.district}
        >
          <Text style={[styles.dropdownText, !formData.mandalCity && styles.placeholderText]}>
            {formData.mandalCity || 'Select mandal/city'}
          </Text>
          <ChevronLeft size={20} color="#666" style={styles.dropdownIcon} />
        </TouchableOpacity>
        {showDropdown === 'mandal' && formData.district && (
          <View style={styles.dropdownList}>
            <ScrollView style={styles.dropdownScroll}>
              {mandalsByDistrict[formData.district]?.map((mandal) => (
                <TouchableOpacity
                  key={mandal}
                  style={styles.dropdownItem}
                  onPress={() => {
                    updateFormData('mandalCity', mandal);
                    updateFormData('villageArea', '');
                    setShowDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{mandal}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Village/Area *</Text>
        <TouchableOpacity
          style={[styles.dropdown, !formData.mandalCity && styles.disabled]}
          onPress={() => {
            if (formData.mandalCity) {
              setShowDropdown(showDropdown === 'village' ? null : 'village');
            }
          }}
          disabled={!formData.mandalCity}
        >
          <Text style={[styles.dropdownText, !formData.villageArea && styles.placeholderText]}>
            {formData.villageArea || 'Select village/area'}
          </Text>
          <ChevronLeft size={20} color="#666" style={styles.dropdownIcon} />
        </TouchableOpacity>
        {showDropdown === 'village' && formData.mandalCity && (
          <View style={styles.dropdownList}>
            <ScrollView style={styles.dropdownScroll}>
              {villagesByMandal[formData.mandalCity]?.map((village) => (
                <TouchableOpacity
                  key={village}
                  style={styles.dropdownItem}
                  onPress={() => {
                    updateFormData('villageArea', village);
                    setShowDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{village}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pincode *</Text>
        <TextInput
          style={styles.input}
          value={formData.pincode}
          onChangeText={(value) => handleNumberInput('pincode', value)}
          placeholder="Enter 6-digit pincode"
          keyboardType="numeric"
          maxLength={6}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 3: Business Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Do you have the Plan Approval ID? *</Text>
        <View style={styles.radioGroup}>
          {['Yes', 'No'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => updateFormData('hasPlanApprovalId', option)}
            >
              <View style={styles.radioButton}>
                {formData.hasPlanApprovalId === option && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {formData.hasPlanApprovalId === 'Yes' && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Plan Approval ID *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.planApprovalId}
            onChangeText={(value) => updateFormData('planApprovalId', value)}
            placeholder="Enter plan approval ID"
            multiline
            numberOfLines={3}
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category of Establishment *</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(showDropdown === 'category' ? null : 'category')}
        >
          <Text style={[styles.dropdownText, !formData.categoryOfEstablishment && styles.placeholderText]}>
            {formData.categoryOfEstablishment || 'Select category'}
          </Text>
          <ChevronLeft size={20} color="#666" style={styles.dropdownIcon} />
        </TouchableOpacity>
        {showDropdown === 'category' && (
          <View style={styles.dropdownList}>
            <ScrollView style={styles.dropdownScroll}>
              {establishmentCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.dropdownItem}
                  onPress={() => {
                    updateFormData('categoryOfEstablishment', category);
                    setShowDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nature of Work *</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(showDropdown === 'nature' ? null : 'nature')}
        >
          <Text style={[styles.dropdownText, !formData.natureOfWork && styles.placeholderText]}>
            {formData.natureOfWork || 'Select nature of work'}
          </Text>
          <ChevronLeft size={20} color="#666" style={styles.dropdownIcon} />
        </TouchableOpacity>
        {showDropdown === 'nature' && (
          <View style={styles.dropdownList}>
            <ScrollView style={styles.dropdownScroll}>
              {natureOfWork.map((nature) => (
                <TouchableOpacity
                  key={nature}
                  style={styles.dropdownItem}
                  onPress={() => {
                    updateFormData('natureOfWork', nature);
                    setShowDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{nature}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Commencement *</Text>
        <TextInput
          style={styles.input}
          value={formData.dateOfCommencement}
          onChangeText={(value) => updateFormData('dateOfCommencement', value)}
          placeholder="DD/MM/YYYY"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tentative Date of Completion</Text>
        <TextInput
          style={styles.input}
          value={formData.tentativeDateOfCompletion}
          onChangeText={(value) => updateFormData('tentativeDateOfCompletion', value)}
          placeholder="DD/MM/YYYY"
        />
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 4: Construction Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Estimated Cost for Construction</Text>
        <TextInput
          style={styles.input}
          value={formData.estimatedCostForConstruction}
          onChangeText={(value) => {
            const numericValue = value.replace(/[^0-9]/g, '');
            const formattedValue = numericValue ? formatNumber(numericValue) : '';
            updateFormData('estimatedCostForConstruction', formattedValue);
          }}
          placeholder="e.g., 10,00,000"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Construction Area (sq ft)</Text>
        <TextInput
          style={styles.input}
          value={formData.constructionArea}
          onChangeText={(value) => handleNumberInput('constructionArea', value)}
          placeholder="Enter construction area"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Built-up Area (sq ft)</Text>
        <TextInput
          style={styles.input}
          value={formData.builtUpArea}
          onChangeText={(value) => handleNumberInput('builtUpArea', value)}
          placeholder="Enter built-up area"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Basic Estimation Cost</Text>
        <TextInput
          style={styles.input}
          value={formData.basicEstimationCost}
          onChangeText={(value) => {
            const numericValue = value.replace(/[^0-9]/g, '');
            const formattedValue = numericValue ? formatNumber(numericValue) : '';
            updateFormData('basicEstimationCost', formattedValue);
          }}
          placeholder="e.g., 10,00,000"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Male Workers</Text>
        <TextInput
          style={styles.input}
          value={formData.maleWorkers}
          onChangeText={(value) => handleNumberInput('maleWorkers', value)}
          placeholder="Enter number of male workers"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Female Workers</Text>
        <TextInput
          style={styles.input}
          value={formData.femaleWorkers}
          onChangeText={(value) => handleNumberInput('femaleWorkers', value)}
          placeholder="Enter number of female workers"
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 5: Review & Submit</Text>
      
      <ScrollView style={styles.reviewContainer}>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Establishment Details</Text>
          <Text style={styles.reviewText}>Name: {formData.establishmentName}</Text>
          <Text style={styles.reviewText}>Contact Person: {formData.contactPersonName}</Text>
          <Text style={styles.reviewText}>Email: {formData.emailAddress}</Text>
          <Text style={styles.reviewText}>Mobile: {formData.mobileNumber}</Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Address Details</Text>
          <Text style={styles.reviewText}>Door No: {formData.doorNumber}</Text>
          <Text style={styles.reviewText}>Street: {formData.street}</Text>
          <Text style={styles.reviewText}>District: {formData.district}</Text>
          <Text style={styles.reviewText}>Mandal/City: {formData.mandalCity}</Text>
          <Text style={styles.reviewText}>Village/Area: {formData.villageArea}</Text>
          <Text style={styles.reviewText}>Pincode: {formData.pincode}</Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Business Details</Text>
          <Text style={styles.reviewText}>Plan Approval ID: {formData.hasPlanApprovalId}</Text>
          {formData.hasPlanApprovalId === 'Yes' && (
            <Text style={styles.reviewText}>Plan ID: {formData.planApprovalId}</Text>
          )}
          <Text style={styles.reviewText}>Category: {formData.categoryOfEstablishment}</Text>
          <Text style={styles.reviewText}>Nature of Work: {formData.natureOfWork}</Text>
          <Text style={styles.reviewText}>Commencement: {formData.dateOfCommencement}</Text>
          <Text style={styles.reviewText}>Completion: {formData.tentativeDateOfCompletion}</Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Construction Details</Text>
          <Text style={styles.reviewText}>Estimated Cost: ₹{formData.estimatedCostForConstruction}</Text>
          <Text style={styles.reviewText}>Construction Area: {formData.constructionArea} sq ft</Text>
          <Text style={styles.reviewText}>Built-up Area: {formData.builtUpArea} sq ft</Text>
          <Text style={styles.reviewText}>Basic Cost: ₹{formData.basicEstimationCost}</Text>
          <Text style={styles.reviewText}>Male Workers: {formData.maleWorkers}</Text>
          <Text style={styles.reviewText}>Female Workers: {formData.femaleWorkers}</Text>
        </View>

        <View style={styles.inputGroup}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => updateFormData('confirmCheckbox', !formData.confirmCheckbox)}
          >
            <View style={styles.checkbox}>
              {formData.confirmCheckbox && <Check size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>
              I confirm that the information provided is true to the best of my knowledge and declare that no child labour is employed. I am aware that furnishing false information may lead to legal consequences and cancellation of my registration.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

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
          <Text style={styles.headerTitle}>Establishment Registration</Text>
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
          {renderCurrentStep()}
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigation}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
              <Text style={styles.prevButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentStep < 5 ? (
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownIcon: {
    transform: [{ rotate: '90deg' }] as any,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
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

export default EstablishmentRegistrationScreen; 