import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EstablishmentProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Establishment Profile</Text>
        </View>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Text style={styles.profileName}>ABC Construction Ltd</Text>
          <Text style={styles.profileId}>EST2024001235</Text>
          <Text style={styles.profileDetail}>Hyderabad, Telangana</Text>
          <Text style={styles.profileDetail}>Registered: 2024-01-20</Text>
        </View>
        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Worker Management</Text>
              <Text style={styles.quickActionDesc}>Manage registered workers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Documents</Text>
              <Text style={styles.quickActionDesc}>View and update documents</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Reports</Text>
              <Text style={styles.quickActionDesc}>Generate compliance reports</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Total Workers</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>92%</Text>
              <Text style={styles.statLabel}>Compliance Score</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Pending Registrations</Text>
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
  profileSection: { alignItems: 'center', padding: 24, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 },
  profileId: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  profileDetail: { fontSize: 14, color: '#6b7280' },
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
export default EstablishmentProfileScreen; 