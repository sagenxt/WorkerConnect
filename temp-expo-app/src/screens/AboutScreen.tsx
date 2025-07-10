import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Target, Award, Shield, Globe, Heart } from 'lucide-react-native';

const AboutScreen = ({ navigation }: any) => {
  const features = [
    {
      icon: Users,
      title: 'Worker Empowerment',
      description: 'Providing construction workers with digital identity, benefits access, and career development opportunities.'
    },
    {
      icon: Shield,
      title: 'Compliance & Safety',
      description: 'Ensuring workplace safety standards and regulatory compliance across all construction sites.'
    },
    {
      icon: Globe,
      title: 'Digital Transformation',
      description: 'Modernizing the construction industry through technology and digital solutions.'
    },
    {
      icon: Heart,
      title: 'Social Welfare',
      description: 'Connecting workers to government schemes, healthcare, and social security benefits.'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Registered Workers' },
    { number: '1,200+', label: 'Establishments' },
    { number: '26', label: 'Districts Covered' },
    { number: '95%', label: 'User Satisfaction' }
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
            <ArrowLeft size={24} stroke="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>About WorkerConnect</Text>
          <Text style={styles.heroSubtitle}>
            Empowering the construction workforce through digital innovation
          </Text>
          <Text style={styles.heroDescription}>
            WorkerConnect is a comprehensive digital platform designed to streamline 
            workforce management in the construction industry. We connect workers, 
            establishments, and government departments to create a more efficient, 
            transparent, and compliant ecosystem.
          </Text>
        </View>

        {/* Mission & Vision */}
        <View style={styles.missionSection}>
          <View style={styles.missionCard}>
            <Target size={32} stroke="#3b82f6" />
            <Text style={styles.missionTitle}>Our Mission</Text>
            <Text style={styles.missionText}>
              To digitize and streamline the construction workforce management system, 
              ensuring transparency, compliance, and improved working conditions for all stakeholders.
            </Text>
          </View>
          
          <View style={styles.missionCard}>
            <Award size={32} stroke="#10b981" />
            <Text style={styles.missionTitle}>Our Vision</Text>
            <Text style={styles.missionText}>
              To become the leading digital platform for construction workforce management, 
              setting industry standards for safety, compliance, and worker welfare.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                                 <View key={index} style={styles.featureCard}>
                   <View style={styles.featureIcon}>
                     <Icon size={24} stroke="#3b82f6" />
                   </View>
                   <Text style={styles.featureTitle}>{feature.title}</Text>
                   <Text style={styles.featureDescription}>{feature.description}</Text>
                 </View>
              );
            })}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Our Impact in Numbers</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statNumber}>{stat.number}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Technology Section */}
        <View style={styles.techSection}>
          <Text style={styles.sectionTitle}>Technology & Innovation</Text>
          <View style={styles.techGrid}>
            <View style={styles.techCard}>
              <Text style={styles.techTitle}>Modern Web Technologies</Text>
              <View style={styles.techList}>
                <Text style={styles.techItem}>• React & TypeScript</Text>
                <Text style={styles.techItem}>• Progressive Web App (PWA)</Text>
                <Text style={styles.techItem}>• Responsive Design</Text>
                <Text style={styles.techItem}>• Real-time Updates</Text>
              </View>
            </View>
            
            <View style={styles.techCard}>
              <Text style={styles.techTitle}>Security & Compliance</Text>
              <View style={styles.techList}>
                <Text style={styles.techItem}>• End-to-end Encryption</Text>
                <Text style={styles.techItem}>• Secure Authentication</Text>
                <Text style={styles.techItem}>• Data Privacy Protection</Text>
                <Text style={styles.techItem}>• Government Standards</Text>
              </View>
            </View>
            
            <View style={styles.techCard}>
              <Text style={styles.techTitle}>Mobile Features</Text>
              <View style={styles.techList}>
                <Text style={styles.techItem}>• GPS-based Attendance</Text>
                <Text style={styles.techItem}>• Offline Capability</Text>
                <Text style={styles.techItem}>• Push Notifications</Text>
                <Text style={styles.techItem}>• Multi-language Support</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Government Partnership */}
        <View style={styles.partnershipSection}>
          <Text style={styles.sectionTitle}>Government Partnership</Text>
          <Text style={styles.partnershipText}>
            WorkerConnect is developed in collaboration with government departments 
            to ensure compliance with all regulatory requirements and to provide 
            seamless integration with existing government systems and databases.
          </Text>
          <View style={styles.partnershipFeatures}>
            <Text style={styles.partnershipFeature}>• Official Government Platform</Text>
            <Text style={styles.partnershipFeature}>• Regulatory Compliance</Text>
            <Text style={styles.partnershipFeature}>• Data Security Standards</Text>
            <Text style={styles.partnershipFeature}>• Integration with Government Systems</Text>
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
  missionSection: {
    padding: 24,
    backgroundColor: '#ffffff',
    gap: 16,
  },
  missionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 8,
  },
  missionText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresSection: {
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
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
  statsSection: {
    backgroundColor: '#3b82f6',
    padding: 24,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#bfdbfe',
    textAlign: 'center',
  },
  techSection: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  techGrid: {
    gap: 16,
  },
  techCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  techTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  techList: {
    gap: 4,
  },
  techItem: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  partnershipSection: {
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  partnershipText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  partnershipFeatures: {
    gap: 8,
  },
  partnershipFeature: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});

export default AboutScreen; 