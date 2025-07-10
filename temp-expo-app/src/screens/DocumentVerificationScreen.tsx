import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const documents = [
  { id: '1', name: 'Aadhar Card', status: 'verified' },
  { id: '2', name: 'Passport Photo', status: 'pending' },
  { id: '3', name: 'Bank Details', status: 'verified' },
  { id: '4', name: 'NRES Document', status: 'not required' }
];

const DocumentVerificationScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Document Verification</Text>
        </View>
        {/* Documents List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          {documents.map(doc => (
            <View key={doc.id} style={styles.docCard}>
              <Text style={styles.docName}>{doc.name}</Text>
              <Text style={[styles.docStatus, doc.status === 'verified' ? styles.statusVerified : doc.status === 'pending' ? styles.statusPending : styles.statusNeutral]}>{doc.status}</Text>
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
  section: { padding: 24, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  docCard: { backgroundColor: '#f3f4f6', borderRadius: 8, padding: 16, marginBottom: 12 },
  docName: { fontSize: 14, fontWeight: '600', color: '#374151' },
  docStatus: { fontSize: 12, fontWeight: 'bold', marginTop: 4 },
  statusVerified: { color: '#10b981' },
  statusPending: { color: '#f59e0b' },
  statusNeutral: { color: '#6b7280' },
});
export default DocumentVerificationScreen; 