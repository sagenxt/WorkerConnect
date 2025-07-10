import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from 'lucide-react-native';

const ContactScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // In a real app, this would send the form data to a server
    Alert.alert('Success', 'Your message has been sent successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@workerconnect.gov.in',
      description: 'Get help via email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '+91-1800-123-4567',
      description: 'Call us for immediate assistance'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      value: 'Government Complex, Hyderabad',
      description: 'Visit our office'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon-Fri: 9:00 AM - 6:00 PM',
      description: 'IST (Indian Standard Time)'
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
            <ArrowLeft size={24} stroke="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Us</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Get in Touch</Text>
          <Text style={styles.heroSubtitle}>
            We're here to help and answer any questions you might have
          </Text>
          <Text style={styles.heroDescription}>
            Whether you need technical support, have questions about registration, 
            or want to provide feedback, our team is ready to assist you.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactGrid}>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <View key={index} style={styles.contactCard}>
                  <View style={styles.contactIcon}>
                    <Icon size={24} stroke="#3b82f6" />
                  </View>
                  <Text style={styles.contactTitle}>{info.title}</Text>
                  <Text style={styles.contactValue}>{info.value}</Text>
                  <Text style={styles.contactDescription}>{info.description}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          <Text style={styles.sectionSubtitle}>
            Fill out the form below and we'll get back to you as soon as possible
          </Text>

          <View style={styles.form}>
            <View style={styles.formRow}>
              <View style={styles.formField}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                  placeholder="Enter your full name"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formField}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={(text) => setFormData({...formData, phone: text})}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>Subject</Text>
                <TextInput
                  style={styles.input}
                  value={formData.subject}
                  onChangeText={(text) => setFormData({...formData, subject: text})}
                  placeholder="Enter subject"
                />
              </View>
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.message}
                onChangeText={(text) => setFormData({...formData, message: text})}
                placeholder="Enter your message"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Send size={20} stroke="#ffffff" />
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqGrid}>
            <View style={styles.faqCard}>
              <Text style={styles.faqQuestion}>How do I register as a worker?</Text>
              <Text style={styles.faqAnswer}>
                Click on "Register as Worker" on the homepage and follow the step-by-step registration process.
              </Text>
            </View>
            
            <View style={styles.faqCard}>
              <Text style={styles.faqQuestion}>What documents are required?</Text>
              <Text style={styles.faqAnswer}>
                You'll need Aadhar card, passport size photo, bank details, and other relevant documents.
              </Text>
            </View>
            
            <View style={styles.faqCard}>
              <Text style={styles.faqQuestion}>How long does approval take?</Text>
              <Text style={styles.faqAnswer}>
                Registration approval typically takes 3-5 business days after document verification.
              </Text>
            </View>
            
            <View style={styles.faqCard}>
              <Text style={styles.faqQuestion}>Can I update my information?</Text>
              <Text style={styles.faqAnswer}>
                Yes, you can update your profile information anytime through your dashboard.
              </Text>
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
  contactInfoSection: {
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
  contactGrid: {
    gap: 16,
  },
  contactCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  contactIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  formSection: {
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  form: {
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formField: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  faqSection: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  faqGrid: {
    gap: 16,
  },
  faqCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});

export default ContactScreen; 