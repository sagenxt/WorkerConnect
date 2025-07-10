import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Download, Smartphone, Tablet, Wifi, Shield, Bell } from 'lucide-react-native';

const MobileDownloadScreen = ({ navigation }: any) => {
  const handleDownload = async (platform: 'android' | 'ios') => {
    if (platform === 'android') {
      // In a real app, this would link to Google Play Store or direct APK download
      const url = 'https://play.google.com/store/apps/details?id=com.workerconnect.app';
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert('Could not open download link');
      }
    } else {
      // In a real app, this would link to App Store
      const url = 'https://apps.apple.com/app/workerconnect/id123456789';
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert('iOS app will be available on the App Store soon!');
      }
    }
  };

  const features = [
    {
      icon: Download,
      title: 'Attendance Tracking',
      description: 'Clock in/out with GPS verification and biometric authentication'
    },
    {
      icon: Shield,
      title: 'Document Upload',
      description: 'Scan and upload documents directly from your phone camera'
    },
    {
      icon: Bell,
      title: 'Real-time Reports',
      description: 'View attendance reports and compliance status on the go'
    },
    {
      icon: Wifi,
      title: 'Offline Support',
      description: 'Work without internet - data syncs when connection is restored'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Download Mobile App</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Download WorkerConnect Mobile App</Text>
          <Text style={styles.heroSubtitle}>
            Access all features on the go with our mobile application
          </Text>
          <Text style={styles.heroDescription}>
            Manage your workforce, track attendance, submit documents, and monitor compliance 
            from anywhere with our powerful mobile app.
          </Text>
        </View>

        {/* Download Section */}
        <View style={styles.downloadSection}>
          <Text style={styles.sectionTitle}>Download for Your Platform</Text>
          
          <View style={styles.platformCards}>
            {/* Android Card */}
            <View style={styles.platformCard}>
              <View style={styles.platformIcon}>
                <Smartphone size={40} color="#ffffff" />
              </View>
              <Text style={styles.platformTitle}>Android App</Text>
              <Text style={styles.platformDescription}>
                Available on Google Play Store for Android devices
              </Text>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => handleDownload('android')}
              >
                <Download size={20} color="#ffffff" />
                <Text style={styles.downloadButtonText}>Google Play Store</Text>
              </TouchableOpacity>
              <View style={styles.platformInfo}>
                <Text style={styles.platformInfoText}>Version: 1.0.0</Text>
                <Text style={styles.platformInfoText}>Size: ~20 MB</Text>
                <Text style={styles.platformInfoText}>Requires: Android 6.0+</Text>
              </View>
            </View>

            {/* iOS Card */}
            <View style={styles.platformCard}>
              <View style={styles.platformIcon}>
                <Tablet size={40} color="#ffffff" />
              </View>
              <Text style={styles.platformTitle}>iOS App</Text>
              <Text style={styles.platformDescription}>
                Available on the App Store for iPhone and iPad
              </Text>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => handleDownload('ios')}
              >
                <Download size={20} color="#ffffff" />
                <Text style={styles.downloadButtonText}>App Store</Text>
              </TouchableOpacity>
              <View style={styles.platformInfo}>
                <Text style={styles.platformInfoText}>Version: Coming Soon</Text>
                <Text style={styles.platformInfoText}>Size: ~20 MB</Text>
                <Text style={styles.platformInfoText}>Requires: iOS 12.0+</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Mobile App Features</Text>
          <Text style={styles.sectionSubtitle}>Everything you need, optimized for mobile</Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <View key={index} style={styles.featureCard}>
                  <View style={styles.featureIcon}>
                    <Icon size={24} color="#3b82f6" />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Installation Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Installation Instructions</Text>
          <Text style={styles.sectionSubtitle}>Follow these steps to install the mobile app</Text>
          
          <View style={styles.instructionsGrid}>
            {/* Android Instructions */}
            <View style={styles.instructionCard}>
              <Text style={styles.instructionTitle}>Android Installation</Text>
              <View style={styles.instructionSteps}>
                <View style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>Download the APK file from the link above</Text>
                </View>
                <View style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>Enable "Install from Unknown Sources" in your device settings</Text>
                </View>
                <View style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>Open the downloaded APK file and tap "Install"</Text>
                </View>
                <View style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>4</Text>
                  </View>
                  <Text style={styles.stepText}>Launch the app and sign in with your credentials</Text>
                </View>
              </View>
            </View>

            {/* iOS Instructions */}
            <View style={styles.instructionCard}>
              <Text style={styles.instructionTitle}>iOS Installation</Text>
              <View style={styles.instructionSteps}>
                <View style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>Open the App Store on your iPhone or iPad</Text>
                </View>
                <View style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>Search for "WorkerConnect" in the App Store</Text>
                </View>
                <View style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>Tap "Get" or "Install" to download the app</Text>
                </View>
                <View style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>4</Text>
                  </View>
                  <Text style={styles.stepText}>Launch the app and sign in with your credentials</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  heroSection: {
    backgroundColor: '#3b82f6',
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#dbeafe',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
    lineHeight: 24,
  },
  downloadSection: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  platformCards: {
    gap: 16,
  },
  platformCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  platformIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#3b82f6',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  platformTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  platformDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  downloadButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  platformInfo: {
    alignItems: 'center',
  },
  platformInfoText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  featuresSection: {
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  instructionsSection: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  instructionsGrid: {
    gap: 16,
  },
  instructionCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  instructionSteps: {
    gap: 12,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#10b981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});

export default MobileDownloadScreen; 