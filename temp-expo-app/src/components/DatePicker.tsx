import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Calendar, X } from 'lucide-react-native';
import DatePicker from 'react-native-date-picker';
import { useLanguage } from '../contexts/LanguageContext';

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  disabled?: boolean;
  error?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  label,
  required = false,
  minimumDate,
  maximumDate,
  mode = 'date',
  disabled = false,
  error,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useLanguage();

  const formatDate = (date: Date): string => {
    if (language === 'te') {
      // Telugu date format
      return date.toLocaleDateString('te-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else {
      // English date format
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(language === 'te' ? 'te-IN' : 'en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDisplayValue = (): string => {
    if (!value) return placeholder;
    
    if (mode === 'date') {
      return formatDate(value);
    } else if (mode === 'time') {
      return formatTime(value);
    } else {
      return `${formatDate(value)} ${formatTime(value)}`;
    }
  };

  const handleDateChange = (date: Date) => {
    onChange(date);
    if (mode === 'date') {
      setIsVisible(false);
    }
  };

  const handleConfirm = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const openPicker = () => {
    if (!disabled) {
      setIsVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.input,
          disabled && styles.disabled,
          error && styles.error,
        ]}
        onPress={openPicker}
        disabled={disabled}
      >
        <View style={styles.inputContent}>
          <Calendar size={20} color={disabled ? '#ccc' : '#666'} />
          <Text style={[
            styles.inputText,
            !value && styles.placeholder,
            disabled && styles.disabledText,
          ]}>
            {getDisplayValue()}
          </Text>
        </View>
        <ChevronLeft 
          size={20} 
          color={disabled ? '#ccc' : '#666'} 
          style={styles.chevron}
        />
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={handleCancel}
            >
              <X size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {mode === 'date' ? t('common.selectDate') : 
               mode === 'time' ? t('common.selectTime') : 
               t('common.selectDateTime')}
            </Text>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>{t('common.ok')}</Text>
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          <View style={styles.pickerContainer}>
            <DatePicker
              date={value || new Date()}
              onDateChange={handleDateChange}
              mode={mode}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              locale={language}
              style={styles.picker}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#F44336',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  placeholder: {
    color: '#999',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  disabledText: {
    color: '#ccc',
  },
  error: {
    borderColor: '#F44336',
  },
  chevron: {
    transform: [{ rotate: '90deg' }],
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  picker: {
    width: Platform.OS === 'ios' ? 320 : '100%',
  },
});

export default CustomDatePicker; 