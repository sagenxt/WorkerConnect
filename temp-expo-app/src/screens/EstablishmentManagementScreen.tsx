import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const workers = [
  { id: '1', name: 'Ravi Kumar Sharma', status: 'active', category: 'Construction Worker' },
  { id: '2', name: 'Priya Patel', status: 'pending', category: 'Electrician' },
  { id: '3', name: 'Amit Singh', status: 'inactive', category: 'Plumber' }
];

const EstablishmentManagementScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Establishment Management</Text>
        </View>
        {/* Workers List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workers</Text>
          {workers.map(worker => (
            <View key={worker.id} style={styles.workerCard}>
              <Text style={styles.workerName}>{worker.name}</Text>
              <Text style={styles.workerCategory}>{worker.category}</Text>
              <Text style={styles.workerStatus}>{worker.status}</Text>
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionButton}><Text style={styles.actionButtonText}>View</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}><Text style={styles.actionButtonText}>Edit</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}><Text style={styles.actionButtonText}>Remove</Text></TouchableOpacity>
              </View>
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
  workerCard: { backgroundColor: '#f3f4f6', borderRadius: 8, padding: 16, marginBottom: 12 },
  workerName: { fontSize: 16, fontWeight: 'bold', color: '#374151' },
  workerCategory: { fontSize: 14, color: '#3b82f6' },
  workerStatus: { fontSize: 12, color: '#6b7280', marginBottom: 8 },
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionButton: { backgroundColor: '#3b82f6', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 16, marginRight: 8 },
  actionButtonText: { color: '#fff', fontWeight: '600' },
});
export default EstablishmentManagementScreen; 