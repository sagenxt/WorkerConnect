import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DepartmentProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Department Profile</Text>
        </View>
        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Dashboard</Text>
              <Text style={styles.quickActionDesc}>View statistics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Establishments</Text>
              <Text style={styles.quickActionDesc}>Manage establishments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Workers</Text>
              <Text style={styles.quickActionDesc}>Worker management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Reports</Text>
              <Text style={styles.quickActionDesc}>Generate reports</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>26</Text>
              <Text style={styles.statLabel}>Districts Covered</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1200+</Text>
              <Text style={styles.statLabel}>Establishments</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>15000+</Text>
              <Text style={styles.statLabel}>Workers</Text>
            </View>
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
  quickActionsSection: { padding: 24, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickActionCard: { backgroundColor: '#f3f4f6', padding: 16, borderRadius: 8, minWidth: '45%', alignItems: 'center', marginBottom: 12 },
  quickActionTitle: { fontSize: 14, fontWeight: '600', color: '#374151' },
  quickActionDesc: { fontSize: 12, color: '#6b7280' },
  statsSection: { padding: 24, backgroundColor: '#fff' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: { backgroundColor: '#f8fafc', padding: 16, borderRadius: 8, alignItems: 'center', minWidth: '30%', borderWidth: 1, borderColor: '#e5e7eb' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#3b82f6', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6b7280', textAlign: 'center' },
});
export default DepartmentProfileScreen; 