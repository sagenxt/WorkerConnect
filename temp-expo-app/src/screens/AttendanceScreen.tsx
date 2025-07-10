import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Clock, MapPin, CreditCard, Fingerprint, CheckCircle, XCircle } from 'lucide-react-native';
import { useLanguage } from '../contexts/LanguageContext';
import NFCReader, { NFCCardData } from '../components/NFCReader';
import LocationService, { LocationData } from '../components/LocationService';
import BiometricAuth from '../components/BiometricAuth';

interface AttendanceRecord {
  id: string;
  type: 'checkIn' | 'checkOut';
  timestamp: Date;
  location: LocationData;
  cardData?: NFCCardData;
  status: 'success' | 'failed' | 'pending';
  errorMessage?: string;
}

const AttendanceScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [showNFCReader, setShowNFCReader] = useState(false);
  const [showLocationService, setShowLocationService] = useState(false);
  const [showBiometricAuth, setShowBiometricAuth] = useState(false);
  const [currentAction, setCurrentAction] = useState<'checkIn' | 'checkOut' | null>(null);
  const [currentCardData, setCurrentCardData] = useState<NFCCardData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Info', message);
    }
  };

  const handleAttendanceAction = async (action: 'checkIn' | 'checkOut') => {
    setCurrentAction(action);
    setIsLoading(true);

    try {
      // Step 1: Start NFC card reading
      setShowNFCReader(true);
    } catch (error) {
      console.error('Error starting attendance process:', error);
      showToast(t('messages.operationFailed'));
      setIsLoading(false);
    }
  };

  const handleNFCCardRead = (cardData: NFCCardData) => {
    setCurrentCardData(cardData);
    setShowNFCReader(false);
    
    // Step 2: Start location capture
    setShowLocationService(true);
  };

  const handleNFCCardError = (error: string) => {
    setShowNFCReader(false);
    setIsLoading(false);
    showToast(error);
  };

  const handleLocationCaptured = (locationData: LocationData) => {
    setCurrentLocation(locationData);
    setShowLocationService(false);
    
    // Step 3: Start biometric authentication
    setShowBiometricAuth(true);
  };

  const handleLocationError = (error: string) => {
    setShowLocationService(false);
    setIsLoading(false);
    showToast(error);
  };

  const handleBiometricSuccess = async () => {
    setShowBiometricAuth(false);
    
    if (!currentAction || !currentLocation || !currentCardData) {
      setIsLoading(false);
      showToast(t('messages.operationFailed'));
      return;
    }

    try {
      // Create attendance record
      const record: AttendanceRecord = {
        id: Date.now().toString(),
        type: currentAction,
        timestamp: new Date(),
        location: currentLocation,
        cardData: currentCardData,
        status: 'success',
      };

      // Add to records
      setAttendanceRecords(prev => [record, ...prev]);

      // Show success message
      const successMessage = currentAction === 'checkIn' 
        ? t('attendance.checkInSuccess') 
        : t('attendance.checkOutSuccess');
      showToast(successMessage);

      // Reset state
      setCurrentAction(null);
      setCurrentCardData(null);
      setCurrentLocation(null);
      setIsLoading(false);

    } catch (error) {
      console.error('Error saving attendance:', error);
      showToast(t('messages.operationFailed'));
      setIsLoading(false);
    }
  };

  const handleBiometricError = (error: string) => {
    setShowBiometricAuth(false);
    setIsLoading(false);
    showToast(error);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} color="#4CAF50" />;
      case 'failed':
        return <XCircle size={16} color="#F44336" />;
      default:
        return <Clock size={16} color="#FF9800" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return t('common.success');
      case 'failed':
        return t('common.error');
      default:
        return t('common.pending');
    }
  };

  const getActionText = (type: string) => {
    return type === 'checkIn' ? t('attendance.checkIn') : t('attendance.checkOut');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('attendance.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Time */}
        <View style={styles.timeContainer}>
          <Clock size={24} color="#2196F3" />
          <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
          <Text style={styles.currentDate}>{formatDate(currentTime)}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.checkInButton]}
            onPress={() => handleAttendanceAction('checkIn')}
            disabled={isLoading}
          >
            <Text style={styles.actionButtonText}>{t('attendance.checkIn')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.checkOutButton]}
            onPress={() => handleAttendanceAction('checkOut')}
            disabled={isLoading}
          >
            <Text style={styles.actionButtonText}>{t('attendance.checkOut')}</Text>
          </TouchableOpacity>
        </View>

        {/* Process Steps */}
        {isLoading && (
          <View style={styles.processContainer}>
            <Text style={styles.processTitle}>{t('attendance.processing')}</Text>
            <View style={styles.stepsContainer}>
              <View style={styles.step}>
                <CreditCard size={20} color={currentCardData ? '#4CAF50' : '#ccc'} />
                <Text style={[styles.stepText, currentCardData && styles.stepCompleted]}>
                  {t('nfc.title')}
                </Text>
              </View>
              <View style={styles.step}>
                <MapPin size={20} color={currentLocation ? '#4CAF50' : '#ccc'} />
                <Text style={[styles.stepText, currentLocation && styles.stepCompleted]}>
                  {t('location.title')}
                </Text>
              </View>
              <View style={styles.step}>
                <Fingerprint size={20} color={showBiometricAuth ? '#2196F3' : '#ccc'} />
                <Text style={[styles.stepText, showBiometricAuth && styles.stepActive]}>
                  {t('auth.biometricAuth')}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Attendance History */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>{t('attendance.attendanceHistory')}</Text>
          
          {attendanceRecords.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {t('attendance.noRecords')}
              </Text>
            </View>
          ) : (
            attendanceRecords.map((record) => (
              <View key={record.id} style={styles.recordItem}>
                <View style={styles.recordHeader}>
                  <View style={styles.recordInfo}>
                    <Text style={styles.recordType}>
                      {getActionText(record.type)}
                    </Text>
                    <Text style={styles.recordTime}>
                      {formatTime(record.timestamp)}
                    </Text>
                    <Text style={styles.recordDate}>
                      {formatDate(record.timestamp)}
                    </Text>
                  </View>
                  <View style={styles.recordStatus}>
                    {getStatusIcon(record.status)}
                    <Text style={styles.statusText}>
                      {getStatusText(record.status)}
                    </Text>
                  </View>
                </View>
                
                {record.location && (
                  <View style={styles.recordLocation}>
                    <MapPin size={16} color="#666" />
                    <Text style={styles.locationText}>
                      {record.location.address || 
                       `${record.location.latitude.toFixed(6)}, ${record.location.longitude.toFixed(6)}`}
                    </Text>
                  </View>
                )}
                
                {record.cardData && (
                  <View style={styles.recordCard}>
                    <CreditCard size={16} color="#666" />
                    <Text style={styles.cardText}>
                      {record.cardData.cardNumber} - {record.cardData.cardType}
                    </Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* NFC Reader Modal */}
      <NFCReader
        visible={showNFCReader}
        onCardRead={handleNFCCardRead}
        onError={handleNFCCardError}
        onClose={() => {
          setShowNFCReader(false);
          setIsLoading(false);
        }}
      />

      {/* Location Service Modal */}
      <LocationService
        visible={showLocationService}
        onLocationCaptured={handleLocationCaptured}
        onError={handleLocationError}
        onClose={() => {
          setShowLocationService(false);
          setIsLoading(false);
        }}
        required={true}
      />

      {/* Biometric Auth Modal */}
      <BiometricAuth
        visible={showBiometricAuth}
        onSuccess={handleBiometricSuccess}
        onError={handleBiometricError}
        onClose={() => {
          setShowBiometricAuth(false);
          setIsLoading(false);
        }}
        title={t('auth.biometricAuth')}
        description={t('attendance.biometricRequired')}
      />
    </SafeAreaView>
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
  },
  timeContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentTime: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2196F3',
    marginTop: 10,
  },
  currentDate: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkInButton: {
    backgroundColor: '#4CAF50',
  },
  checkOutButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  processContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  processTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepsContainer: {
    gap: 15,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
  },
  stepCompleted: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  stepActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  historyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  recordItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 15,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  recordInfo: {
    flex: 1,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  recordTime: {
    fontSize: 14,
    color: '#666',
  },
  recordDate: {
    fontSize: 12,
    color: '#999',
  },
  recordStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  recordLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
});

export default AttendanceScreen; 