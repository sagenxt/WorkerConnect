import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const RegistrationChoiceScreen = ({ navigation }: any) => {
  const registrationOptions = [
    {
      id: 'worker',
      title: 'Worker Registration',
      description: 'Register as a worker to access job opportunities and manage your profile',
      icon: '👷',
      color: '#2563eb',
      features: [
        'Document upload and verification',
        'Profile management',
        'Job search and applications',
        'Attendance tracking',
        'Payment history'
      ]
    },
    {
      id: 'establishment',
      title: 'Establishment Registration',
      description: 'Register your establishment to manage workers and compliance',
      icon: '🏢',
      color: '#059669',
      features: [
        'Worker management',
        'Compliance monitoring',
        'Reporting and analytics',
        'Document management',
        'Payment processing'
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Choose Registration Type</Text>
          <Text style={styles.headerSubtitle}>
            Select the type of account you want to create
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {registrationOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, { borderColor: option.color }]}
              onPress={() => navigation.navigate(
                option.id === 'worker' ? 'WorkerRegistration' : 'EstablishmentRegistration'
              )}
            >
              <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
                <Text style={styles.icon}>{option.icon}</Text>
              </View>
              
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
              
              <View style={styles.featuresList}>
                {option.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.featureIcon}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity
                style={[styles.selectButton, { backgroundColor: option.color }]}
                onPress={() => navigation.navigate(
                  option.id === 'worker' ? 'WorkerRegistration' : 'EstablishmentRegistration'
                )}
              >
                <Text style={styles.selectButtonText}>Select {option.title}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('WorkerLogin')}>
            <Text style={styles.loginLink}>Login here</Text>
          </TouchableOpacity>
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
  header: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  featuresList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    color: '#059669',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  selectButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  loginLink: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default RegistrationChoiceScreen; 