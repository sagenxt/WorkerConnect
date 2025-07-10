import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const LandingScreen = ({ navigation }: any) => {
  const features = [
    {
      title: 'Worker Registration',
      description: 'Streamlined registration process for workers with document upload and verification.',
    },
    {
      title: 'Establishment Management',
      description: 'Complete establishment management with worker tracking and compliance monitoring.',
    },
    {
      title: 'Department Oversight',
      description: 'Government department oversight with real-time monitoring and reporting.',
    },
  ];

  const benefits = [
    'Secure and compliant',
    'Multi-language support',
    'Real-time updates',
    'Advanced reporting',
    'Mobile-first design',
    'Regulatory compliance'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>WorkerConnect</Text>
          <Text style={styles.heroSubtitle}>Connecting Workers & Establishments</Text>
          <Text style={styles.heroDescription}>
            A comprehensive platform for worker registration, establishment management, and government oversight.
          </Text>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('RegistrationChoice')}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <Text style={styles.sectionSubtitle}>
            Everything you need for efficient worker and establishment management
          </Text>
          
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📋</Text>
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>

        {/* Quick Access Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <Text style={styles.sectionSubtitle}>
            Choose your role to get started
          </Text>

          <View style={styles.quickAccessGrid}>
            {/* Worker Registration */}
            <TouchableOpacity 
              style={styles.quickAccessCard}
              onPress={() => navigation.navigate('WorkerRegistration')}
            >
              <Text style={styles.quickAccessIcon}>👷</Text>
              <Text style={styles.quickAccessTitle}>Register as Worker</Text>
              <Text style={styles.quickAccessDescription}>
                Complete your worker registration with document upload
              </Text>
            </TouchableOpacity>

            {/* Establishment Registration */}
            <TouchableOpacity 
              style={styles.quickAccessCard}
              onPress={() => navigation.navigate('EstablishmentRegistration')}
            >
              <Text style={styles.quickAccessIcon}>🏢</Text>
              <Text style={styles.quickAccessTitle}>Register Establishment</Text>
              <Text style={styles.quickAccessDescription}>
                Register your establishment and manage workers
              </Text>
            </TouchableOpacity>

            {/* Login Options */}
            <View style={styles.loginOptionsCard}>
              <Text style={styles.quickAccessIcon}>🔐</Text>
              <Text style={styles.quickAccessTitle}>Login Options</Text>
              
              <TouchableOpacity 
                style={[styles.loginButton, styles.workerLoginButton]}
                onPress={() => navigation.navigate('WorkerLogin')}
              >
                <Text style={styles.loginButtonText}>Login as Worker</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.loginButton, styles.establishmentLoginButton]}
                onPress={() => navigation.navigate('EstablishmentLogin')}
              >
                <Text style={styles.loginButtonText}>Login as Establishment</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.loginButton, styles.departmentLoginButton]}
                onPress={() => navigation.navigate('DepartmentLogin')}
              >
                <Text style={styles.loginButtonText}>Login as Department</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose WorkerConnect?</Text>
          <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>✓</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  heroSection: {
    backgroundColor: '#2563eb',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#dbeafe',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  getStartedButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingVertical: 32,
    paddingHorizontal: 20,
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
    lineHeight: 24,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  quickAccessGrid: {
    gap: 16,
  },
  quickAccessCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginOptionsCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAccessIcon: {
    fontSize: 32,
    marginBottom: 12,
    textAlign: 'center',
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  quickAccessDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  loginButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  workerLoginButton: {
    backgroundColor: '#dcfce7',
  },
  establishmentLoginButton: {
    backgroundColor: '#fed7aa',
  },
  departmentLoginButton: {
    backgroundColor: '#dbeafe',
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  benefitIcon: {
    fontSize: 18,
    color: '#10b981',
    marginRight: 12,
    fontWeight: 'bold',
  },
  benefitText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
});

export default LandingScreen; 