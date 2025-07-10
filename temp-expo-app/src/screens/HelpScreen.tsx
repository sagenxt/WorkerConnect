import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: 'all', label: 'All Topics' },
  { id: 'registration', label: 'Registration' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'documents', label: 'Documents' },
  { id: 'profile', label: 'Profile Management' },
  { id: 'technical', label: 'Technical Issues' }
];

const faqs = [
  { id: '1', category: 'registration', question: 'How do I register as a construction worker?', answer: 'To register as a construction worker, click on "Register as Worker" on the homepage, fill out the multi-step registration form with your personal details, workplace information, address, bank details, and upload required documents. After submission, your application will be reviewed by the department.' },
  { id: '2', category: 'registration', question: 'What documents are required for worker registration?', answer: 'Required documents include: Passport size photo, Aadhar card, Bank passbook or cancelled cheque, and NRES document (if applicable). All documents should be clear, readable, and in PDF or JPG format with maximum size of 5MB each.' },
  { id: '3', category: 'attendance', question: 'How does the location-based attendance system work?', answer: 'The attendance system uses your device\'s GPS to verify you are at the designated work location before allowing check-in. You must be within the specified radius (usually 100 meters) of the work site to successfully check in or out.' }
];

const HelpScreen = ({ navigation }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFaqs = faqs.filter(faq =>
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
        </View>
        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}><Text style={styles.quickActionText}>Start Live Chat</Text></TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}><Text style={styles.quickActionText}>Call Support</Text></TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}><Text style={styles.quickActionText}>Email Support</Text></TouchableOpacity>
          </View>
        </View>
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <TouchableOpacity key={category.id} style={[styles.categoryButton, selectedCategory === category.id && styles.selectedCategoryButton]} onPress={() => setSelectedCategory(category.id)}>
                <Text style={[styles.categoryButtonText, selectedCategory === category.id && styles.selectedCategoryButtonText]}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* FAQ */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {filteredFaqs.map(faq => (
            <View key={faq.id} style={styles.faqCard}>
              <TouchableOpacity onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
              </TouchableOpacity>
              {expandedFaq === faq.id && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollView: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  backButton: { padding: 8, marginRight: 12 },
  backButtonText: { fontSize: 24, color: '#1f2937' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  quickActionsSection: { padding: 24, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  quickActionsGrid: { flexDirection: 'row', gap: 12 },
  quickActionCard: { backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8, minWidth: '30%', alignItems: 'center', marginBottom: 12 },
  quickActionText: { fontSize: 14, color: '#374151', fontWeight: '600' },
  categoriesSection: { padding: 24, backgroundColor: '#fff' },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryButton: { backgroundColor: '#f3f4f6', padding: 10, borderRadius: 8, marginRight: 8, marginBottom: 8 },
  selectedCategoryButton: { backgroundColor: '#3b82f6' },
  categoryButtonText: { color: '#374151', fontWeight: '600' },
  selectedCategoryButtonText: { color: '#fff' },
  faqSection: { padding: 24, backgroundColor: '#fff' },
  searchInput: { backgroundColor: '#f3f4f6', borderRadius: 8, padding: 10, marginBottom: 12 },
  faqCard: { backgroundColor: '#f8fafc', borderRadius: 8, padding: 16, marginBottom: 8 },
  faqQuestion: { fontSize: 15, fontWeight: 'bold', color: '#1f2937' },
  faqAnswer: { fontSize: 14, color: '#374151', marginTop: 8 },
});
export default HelpScreen; 