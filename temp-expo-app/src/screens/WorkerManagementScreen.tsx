import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WorkerManagementScreen = ({ navigation }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const workers = [
    {
      id: '1',
      name: 'Ravi Kumar Sharma',
      registrationId: 'WK2024001234',
      status: 'active',
      category: 'Construction Worker',
      district: 'Hyderabad',
      lastActive: '2024-01-15',
      attendance: 95,
      documents: { verified: 3, total: 4 }
    },
    {
      id: '2',
      name: 'Priya Patel',
      registrationId: 'WK2024001235',
      status: 'pending',
      category: 'Electrician',
      district: 'Visakhapatnam',
      lastActive: '2024-01-14',
      attendance: 88,
      documents: { verified: 2, total: 4 }
    },
    {
      id: '3',
      name: 'Amit Singh',
      registrationId: 'WK2024001236',
      status: 'inactive',
      category: 'Plumber',
      district: 'Warangal',
      lastActive: '2024-01-10',
      attendance: 72,
      documents: { verified: 4, total: 4 }
    }
  ];

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.registrationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || worker.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'inactive': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case 'active': return '#d1fae5';
      case 'pending': return '#fef3c7';
      case 'inactive': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Worker Management</Text>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search workers by name or ID..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          
          <View style={styles.filterButtons}>
            {['all', 'active', 'pending', 'inactive'].map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  filterStatus === status && styles.activeFilterButton
                ]}
                onPress={() => setFilterStatus(status)}
              >
                <Text style={[
                  styles.filterButtonText,
                  filterStatus === status && styles.activeFilterButtonText
                ]}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{workers.length}</Text>
            <Text style={styles.statLabel}>Total Workers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {workers.filter(w => w.status === 'active').length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {workers.filter(w => w.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {workers.filter(w => w.status === 'inactive').length}
            </Text>
            <Text style={styles.statLabel}>Inactive</Text>
          </View>
        </View>

        {/* Workers List */}
        <View style={styles.workersSection}>
          <Text style={styles.sectionTitle}>Workers ({filteredWorkers.length})</Text>
          
          {filteredWorkers.map(worker => (
            <TouchableOpacity 
              key={worker.id} 
              style={styles.workerCard}
              onPress={() => {
                // Navigate to worker details
                console.log('View worker:', worker.id);
              }}
            >
              <View style={styles.workerHeader}>
                <View style={styles.workerInfo}>
                  <Text style={styles.workerName}>{worker.name}</Text>
                  <Text style={styles.workerId}>{worker.registrationId}</Text>
                  <Text style={styles.workerCategory}>{worker.category}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBackground(worker.status) }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(worker.status) }
                  ]}>
                    {worker.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.workerDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>District:</Text>
                  <Text style={styles.detailValue}>{worker.district}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Attendance:</Text>
                  <Text style={styles.detailValue}>{worker.attendance}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Documents:</Text>
                  <Text style={styles.detailValue}>
                    {worker.documents.verified}/{worker.documents.total}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Last Active:</Text>
                  <Text style={styles.detailValue}>{worker.lastActive}</Text>
                </View>
              </View>
              
              <View style={styles.workerActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
                  <Text style={styles.secondaryActionText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Worker Button */}
        <View style={styles.addWorkerSection}>
          <TouchableOpacity style={styles.addWorkerButton}>
            <Text style={styles.addWorkerButtonText}>+ Add New Worker</Text>
          </TouchableOpacity>
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
  backButtonText: {
    fontSize: 24,
    color: '#1f2937',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  searchSection: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  activeFilterButton: {
    backgroundColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeFilterButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  workersSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  workerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  workerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  workerId: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  workerCategory: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  workerDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  workerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryAction: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  secondaryActionText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  addWorkerSection: {
    padding: 16,
  },
  addWorkerButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addWorkerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkerManagementScreen; 