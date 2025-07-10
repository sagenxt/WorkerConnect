import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const reportTypes = [
  { id: 'worker_summary', title: 'Worker Summary Report', description: 'Overview of all registered workers' },
  { id: 'establishment_summary', title: 'Establishment Summary Report', description: 'Overview of all registered establishments' },
  { id: 'attendance_report', title: 'Attendance Report', description: 'Attendance statistics' },
  { id: 'compliance_report', title: 'Compliance Report', description: 'Compliance status and violations' },
  { id: 'registration_trends', title: 'Registration Trends', description: 'Monthly registration trends' },
  { id: 'document_verification', title: 'Document Verification Report', description: 'Document verification status' }
];

const ReportsScreen = ({ navigation }: any) => {
  const [selectedReport, setSelectedReport] = useState('worker_summary');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reports & Analytics</Text>
        </View>
        {/* Report Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Report</Text>
          <View style={styles.reportTypesGrid}>
            {reportTypes.map(report => (
              <TouchableOpacity key={report.id} style={[styles.reportTypeCard, selectedReport === report.id && styles.selectedReportTypeCard]} onPress={() => setSelectedReport(report.id)}>
                <Text style={styles.reportTypeTitle}>{report.title}</Text>
                <Text style={styles.reportTypeDesc}>{report.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Report Preview */}
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewCard}>
            <Text style={styles.previewText}>Preview for: {reportTypes.find(r => r.id === selectedReport)?.title}</Text>
            <Text style={styles.previewDesc}>This is a placeholder for the report preview. Implement PDF export and filters as needed.</Text>
          </View>
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
  reportTypesGrid: { gap: 12 },
  reportTypeCard: { backgroundColor: '#f3f4f6', borderRadius: 8, padding: 16, marginBottom: 8 },
  selectedReportTypeCard: { borderWidth: 2, borderColor: '#3b82f6' },
  reportTypeTitle: { fontSize: 14, fontWeight: '600', color: '#374151' },
  reportTypeDesc: { fontSize: 12, color: '#6b7280' },
  previewSection: { padding: 24, backgroundColor: '#fff' },
  previewCard: { backgroundColor: '#f8fafc', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  previewText: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
  previewDesc: { fontSize: 12, color: '#6b7280' },
});
export default ReportsScreen; 