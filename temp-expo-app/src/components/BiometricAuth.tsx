import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Fingerprint, Eye, AlertCircle, CheckCircle, XCircle, Lock } from 'lucide-react-native';
import { BiometricAuth as ExpoBiometricAuth } from 'expo-local-authentication';

interface BiometricAuthProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  onClose: () => void;
  visible: boolean;
  title?: string;
  description?: string;
}

const BiometricAuth: React.FC<BiometricAuthProps> = ({
  onSuccess,
  onError,
  onClose,
  visible,
  title = 'Biometric Authentication',
  description = 'Please authenticate using your biometric credentials',
}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStatus, setAuthStatus] = useState<'idle' | 'authenticating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'face' | 'iris' | 'unknown'>('unknown');
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (visible) {
      checkBiometricAvailability();
    }
  }, [visible]);

  const checkBiometricAvailability = async () => {
    try {
      const hasHardware = await ExpoBiometricAuth.hasHardwareAsync();
      const isEnrolled = await ExpoBiometricAuth.isEnrolledAsync();
      const supportedTypes = await ExpoBiometricAuth.supportedAuthenticationTypesAsync();

      if (!hasHardware) {
        setErrorMessage('Biometric authentication is not available on this device');
        setAuthStatus('error');
        setIsAvailable(false);
        return;
      }

      if (!isEnrolled) {
        setErrorMessage('No biometric credentials are enrolled on this device');
        setAuthStatus('error');
        setIsAvailable(false);
        return;
      }

      // Determine biometric type
      if (supportedTypes.includes(ExpoBiometricAuth.AuthenticationType.FINGERPRINT)) {
        setBiometricType('fingerprint');
      } else if (supportedTypes.includes(ExpoBiometricAuth.AuthenticationType.FACIAL_RECOGNITION)) {
        setBiometricType('face');
      } else if (supportedTypes.includes(ExpoBiometricAuth.AuthenticationType.IRIS)) {
        setBiometricType('iris');
      } else {
        setBiometricType('unknown');
      }

      setIsAvailable(true);
      setAuthStatus('idle');
    } catch (error) {
      console.error('Biometric availability check error:', error);
      setErrorMessage('Failed to check biometric availability');
      setAuthStatus('error');
      setIsAvailable(false);
    }
  };

  const authenticate = async () => {
    try {
      setIsAuthenticating(true);
      setAuthStatus('authenticating');
      setErrorMessage('');

      const result = await ExpoBiometricAuth.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setAuthStatus('success');
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        let errorMsg = 'Authentication failed';
        
        if (result.error === 'UserCancel') {
          errorMsg = 'Authentication cancelled by user';
        } else if (result.error === 'UserFallback') {
          errorMsg = 'User chose to use fallback authentication';
        } else if (result.error === 'SystemCancel') {
          errorMsg = 'Authentication was cancelled by the system';
        } else if (result.error === 'AuthenticationFailed') {
          errorMsg = 'Authentication failed. Please try again.';
        } else if (result.error === 'PasscodeNotSet') {
          errorMsg = 'No passcode is set on this device';
        } else if (result.error === 'NotAvailable') {
          errorMsg = 'Biometric authentication is not available';
        } else if (result.error === 'NotEnrolled') {
          errorMsg = 'No biometric credentials are enrolled';
        } else if (result.error === 'Lockout') {
          errorMsg = 'Too many failed attempts. Try again later.';
        }

        setErrorMessage(errorMsg);
        setAuthStatus('error');
        onError(errorMsg);
      }
    } catch (error: any) {
      console.error('Biometric authentication error:', error);
      setErrorMessage(error.message || 'Authentication failed');
      setAuthStatus('error');
      onError(error.message || 'Authentication failed');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleClose = () => {
    setAuthStatus('idle');
    setErrorMessage('');
    onClose();
  };

  const getStatusIcon = () => {
    switch (authStatus) {
      case 'authenticating':
        return <ActivityIndicator size="large" color="#2196F3" />;
      case 'success':
        return <CheckCircle size={48} color="#4CAF50" />;
      case 'error':
        return <XCircle size={48} color="#F44336" />;
      default:
        return <Lock size={48} color="#666" />;
    }
  };

  const getStatusText = () => {
    switch (authStatus) {
      case 'authenticating':
        return 'Authenticating...';
      case 'success':
        return 'Authentication successful!';
      case 'error':
        return errorMessage || 'Authentication failed';
      default:
        return 'Ready to authenticate';
    }
  };

  const getStatusColor = () => {
    switch (authStatus) {
      case 'authenticating':
        return '#2196F3';
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getBiometricIcon = () => {
    switch (biometricType) {
      case 'fingerprint':
        return <Fingerprint size={32} color="#2196F3" />;
      case 'face':
        return <Eye size={32} color="#2196F3" />;
      case 'iris':
        return <Eye size={32} color="#2196F3" />;
      default:
        return <Lock size={32} color="#666" />;
    }
  };

  const getBiometricText = () => {
    switch (biometricType) {
      case 'fingerprint':
        return 'Fingerprint';
      case 'face':
        return 'Face Recognition';
      case 'iris':
        return 'Iris Recognition';
      default:
        return 'Biometric';
    }
  };

  const getInstructions = () => {
    switch (biometricType) {
      case 'fingerprint':
        return 'Place your finger on the fingerprint sensor';
      case 'face':
        return 'Look at the camera for face recognition';
      case 'iris':
        return 'Look at the iris scanner';
      default:
        return 'Use your biometric credentials to authenticate';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleClose}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Status Display */}
          <View style={styles.statusContainer}>
            <View style={styles.statusIcon}>
              {getStatusIcon()}
            </View>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>

          {/* Biometric Type Display */}
          {isAvailable && authStatus === 'idle' && (
            <View style={styles.biometricTypeContainer}>
              <View style={styles.biometricIcon}>
                {getBiometricIcon()}
              </View>
              <Text style={styles.biometricTypeText}>
                {getBiometricText()}
              </Text>
            </View>
          )}

          {/* Instructions */}
          {authStatus === 'idle' && (
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>Authentication Required</Text>
              <Text style={styles.instructionsText}>
                {description}{'\n\n'}
                {getInstructions()}{'\n\n'}
                • Ensure your biometric credentials are properly set up{'\n'}
                • Keep your device steady during authentication{'\n'}
                • Follow the on-screen prompts
              </Text>
            </View>
          )}

          {/* Error Display */}
          {authStatus === 'error' && (
            <View style={styles.errorContainer}>
              <AlertCircle size={24} color="#F44336" />
              <Text style={styles.errorText}>{errorMessage}</Text>
              
              {!isAvailable && (
                <Text style={styles.errorSubtext}>
                  Please set up biometric authentication in your device settings.
                </Text>
              )}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {authStatus === 'idle' && isAvailable && (
              <TouchableOpacity
                style={styles.authenticateButton}
                onPress={authenticate}
                disabled={isAuthenticating}
              >
                <Text style={styles.authenticateButtonText}>
                  Authenticate with {getBiometricText()}
                </Text>
              </TouchableOpacity>
            )}

            {authStatus === 'success' && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleClose}
              >
                <Text style={styles.confirmButtonText}>Continue</Text>
              </TouchableOpacity>
            )}

            {authStatus === 'error' && isAvailable && (
              <TouchableOpacity
                style={styles.retryButton}
                onPress={authenticate}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  statusIcon: {
    marginBottom: 15,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  biometricTypeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  biometricIcon: {
    marginBottom: 10,
  },
  biometricTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
  },
  errorText: {
    fontSize: 14,
    color: '#c62828',
    marginBottom: 5,
  },
  errorSubtext: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  buttonContainer: {
    gap: 12,
  },
  authenticateButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  authenticateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BiometricAuth; 