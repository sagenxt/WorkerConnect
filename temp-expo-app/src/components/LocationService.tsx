import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, AlertCircle, CheckCircle, XCircle, Settings } from 'lucide-react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  address?: string;
  timestamp: number;
}

interface LocationServiceProps {
  onLocationCaptured: (locationData: LocationData) => void;
  onError: (error: string) => void;
  onClose: () => void;
  visible: boolean;
  required?: boolean;
}

const LocationService: React.FC<LocationServiceProps> = ({
  onLocationCaptured,
  onError,
  onClose,
  visible,
  required = true,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'capturing' | 'success' | 'error'>('idle');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [permissionStatus, setPermissionStatus] = useState<'unknown' | 'granted' | 'denied' | 'blocked'>('unknown');

  useEffect(() => {
    if (visible) {
      checkLocationPermission();
    }
  }, [visible]);

  const checkLocationPermission = async () => {
    try {
      const permission = Platform.OS === 'ios' 
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await check(permission);
      setPermissionStatus(result);

      if (result === RESULTS.DENIED) {
        // Permission not yet requested
        return true;
      } else if (result === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
        setErrorMessage('Location permission is blocked. Please enable it in settings.');
        setCaptureStatus('error');
        return false;
      } else if (result === RESULTS.GRANTED) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Permission check error:', error);
      setErrorMessage('Failed to check location permission');
      setCaptureStatus('error');
      return false;
    }
  };

  const requestLocationPermission = async () => {
    try {
      const permission = Platform.OS === 'ios' 
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);
      setPermissionStatus(result);

      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        setErrorMessage('Location permission denied. Location capture is required.');
        setCaptureStatus('error');
        onError('Location permission denied. Location capture is required.');
        return false;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      setErrorMessage('Failed to request location permission');
      setCaptureStatus('error');
      return false;
    }
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const captureLocation = async () => {
    try {
      setIsCapturing(true);
      setCaptureStatus('capturing');
      setErrorMessage('');

      // Check and request permission if needed
      let hasPermission = await checkLocationPermission();
      if (!hasPermission) {
        hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          return;
        }
      }

      // Get current position
      const position = await new Promise<Geolocation.GeoPosition>((resolve, reject) => {
        Geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      };

      // Try to get address from coordinates
      try {
        const address = await getAddressFromCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
        locationData.address = address;
      } catch (error) {
        console.log('Failed to get address:', error);
      }

      setLocationData(locationData);
      setCaptureStatus('success');
      onLocationCaptured(locationData);

    } catch (error: any) {
      console.error('Location capture error:', error);
      
      let errorMsg = 'Failed to capture location';
      if (error.code === 1) {
        errorMsg = 'Location permission denied';
      } else if (error.code === 2) {
        errorMsg = 'Location service unavailable';
      } else if (error.code === 3) {
        errorMsg = 'Location request timed out';
      } else if (error.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
      setCaptureStatus('error');
      onError(errorMsg);
    } finally {
      setIsCapturing(false);
    }
  };

  const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    } catch (error) {
      console.error('Geocoding error:', error);
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
  };

  const handleClose = () => {
    setCaptureStatus('idle');
    setLocationData(null);
    setErrorMessage('');
    onClose();
  };

  const getStatusIcon = () => {
    switch (captureStatus) {
      case 'capturing':
        return <ActivityIndicator size="large" color="#2196F3" />;
      case 'success':
        return <CheckCircle size={48} color="#4CAF50" />;
      case 'error':
        return <XCircle size={48} color="#F44336" />;
      default:
        return <MapPin size={48} color="#666" />;
    }
  };

  const getStatusText = () => {
    switch (captureStatus) {
      case 'capturing':
        return 'Capturing your location...';
      case 'success':
        return 'Location captured successfully!';
      case 'error':
        return errorMessage || 'Failed to capture location';
      default:
        return 'Ready to capture location';
    }
  };

  const getStatusColor = () => {
    switch (captureStatus) {
      case 'capturing':
        return '#2196F3';
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const formatCoordinate = (coord: number) => {
    return coord.toFixed(6);
  };

  const formatAccuracy = (accuracy: number) => {
    return `${accuracy.toFixed(1)} meters`;
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
          <Text style={styles.headerTitle}>Location Capture</Text>
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

          {/* Instructions */}
          {captureStatus === 'idle' && (
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>Location Capture Required</Text>
              <Text style={styles.instructionsText}>
                This app needs to capture your current location for attendance tracking. 
                Please ensure that:{'\n\n'}
                • Location services are enabled{'\n'}
                • You are in a location with good GPS signal{'\n'}
                • You grant location permission when prompted{'\n'}
                • You remain stationary during capture
              </Text>
            </View>
          )}

          {/* Location Data Display */}
          {locationData && captureStatus === 'success' && (
            <View style={styles.locationDataContainer}>
              <Text style={styles.locationDataTitle}>Location Information</Text>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Latitude:</Text>
                <Text style={styles.dataValue}>{formatCoordinate(locationData.latitude)}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Longitude:</Text>
                <Text style={styles.dataValue}>{formatCoordinate(locationData.longitude)}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Accuracy:</Text>
                <Text style={styles.dataValue}>{formatAccuracy(locationData.accuracy)}</Text>
              </View>
              
              {locationData.address && (
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Address:</Text>
                  <Text style={styles.dataValue} numberOfLines={2}>
                    {locationData.address}
                  </Text>
                </View>
              )}
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Timestamp:</Text>
                <Text style={styles.dataValue}>
                  {new Date(locationData.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          )}

          {/* Error Display */}
          {captureStatus === 'error' && (
            <View style={styles.errorContainer}>
              <AlertCircle size={24} color="#F44336" />
              <Text style={styles.errorText}>{errorMessage}</Text>
              
              {permissionStatus === 'blocked' && (
                <TouchableOpacity
                  style={styles.settingsButton}
                  onPress={openSettings}
                >
                  <Settings size={16} color="#2196F3" />
                  <Text style={styles.settingsButtonText}>Open Settings</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {captureStatus === 'idle' && (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={captureLocation}
                disabled={isCapturing}
              >
                <Text style={styles.captureButtonText}>Capture Location</Text>
              </TouchableOpacity>
            )}

            {captureStatus === 'success' && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleClose}
              >
                <Text style={styles.confirmButtonText}>Confirm & Close</Text>
              </TouchableOpacity>
            )}

            {captureStatus === 'error' && (
              <TouchableOpacity
                style={styles.retryButton}
                onPress={captureLocation}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            )}

            {!required && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={handleClose}
              >
                <Text style={styles.skipButtonText}>Skip Location</Text>
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
  locationDataContainer: {
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
  locationDataTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  dataValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
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
    marginBottom: 10,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  settingsButtonText: {
    fontSize: 14,
    color: '#2196F3',
    marginLeft: 5,
    fontWeight: '500',
  },
  buttonContainer: {
    gap: 12,
  },
  captureButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  captureButtonText: {
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
  skipButton: {
    backgroundColor: '#9E9E9E',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  skipButtonText: {
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

export default LocationService;
export type { LocationData }; 