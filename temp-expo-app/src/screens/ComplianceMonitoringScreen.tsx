import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const violations = [
  { id: '1', type: 'Safety', description: 'No safety helmets on site', date: '2024-01-10', status: 'open' },
  { id: '2', type: 'Attendance', description: 'Late check-in', date: '2024-01-12', status: 'resolved' },
  { id: '3', type: 'Documentation', description: 'Missing compliance certificate', date: '2024-01-15', status: 'open' }
];

const ComplianceMonitoringScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Compliance Monitoring</Text>
        </View>
        {/* Compliance Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compliance Status</Text>
          <View style={styles.statusCard}>
            <Text style={styles.statusText}>Overall Compliance: 92%</Text>
            <Text style={styles.statusSubText}>Last audit: 2024-01-15</Text>
          </View>
        </View>
        {/* Violations List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Violations</Text>
          {violations.map(v => (
            <View key={v.id} style={styles.violationCard}>
              <Text style={styles.violationType}>{v.type}</Text>
              <Text style={styles.violationDesc}>{v.description}</Text>
              <Text style={styles.violationDate}>{v.date}</Text>
              <Text style={[styles.violationStatus, v.status === 'open' ? styles.statusOpen : styles.statusResolved]}>{v.status}</Text>
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
  statusCard: { backgroundColor: '#f3f4f6', borderRadius: 8, padding: 16, marginBottom: 12 },
  statusText: { fontSize: 16, fontWeight: 'bold', color: '#10b981' },
  statusSubText: { fontSize: 12, color: '#6b7280' },
  violationCard: { backgroundColor: '#fee2e2', borderRadius: 8, padding: 16, marginBottom: 12 },
  violationType: { fontSize: 14, fontWeight: 'bold', color: '#ef4444' },
  violationDesc: { fontSize: 12, color: '#374151', marginBottom: 4 },
  violationDate: { fontSize: 12, color: '#6b7280' },
  violationStatus: { fontSize: 12, fontWeight: 'bold', marginTop: 4 },
  statusOpen: { color: '#ef4444' },
  statusResolved: { color: '#10b981' },
});
export default ComplianceMonitoringScreen; 