import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApplicationReviewScreen = ({ navigation }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const applications = [
    {
      id: '1',
      type: 'worker',
      applicantName: 'Ravi Kumar Sharma',
      registrationId: 'WK2024001234',
      submissionDate: '2024-01-15',
      status: 'pending',
      priority: 'high',
      documents: {
        total: 4,
        verified: 2,
        pending: 2,
        rejected: 0
      },
      contactInfo: {
        mobile: '9876543210',
        email: 'ravi.sharma@email.com'
      },
      location: {
        district: 'Hyderabad',
        mandal: 'Secunderabad'
      }
    },
    {
      id: '2',
      type: 'establishment',
      applicantName: 'ABC Construction Ltd',
      registrationId: 'EST2024001235',
      submissionDate: '2024-01-20',
      status: 'under_review',
      priority: 'medium',
      reviewedBy: 'John Doe',
      reviewDate: '2024-01-22',
      documents: {
        total: 6,
        verified: 4,
        pending: 1,
        rejected: 1
      },
      contactInfo: {
        mobile: '9876543211',
        email: 'contact@abcconstruction.com'
      },
      location: {
        district: 'Visakhapatnam',
        mandal: 'Gajuwaka'
      },
      notes: 'Safety compliance documents need verification'
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.registrationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'under_review': return '#3b82f6';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case 'pending': return '#fef3c7';
      case 'under_review': return '#dbeafe';
      case 'approved': return '#d1fae5';
      case 'rejected': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
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
          <Text style={styles.headerTitle}>Application Review</Text>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search applications by name or ID..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          
          <View style={styles.filterRow}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Status</Text>
              <View style={styles.filterButtons}>
                {['all', 'pending', 'under_review', 'approved', 'rejected'].map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.filterButton,
                      statusFilter === status && styles.activeFilterButton
                    ]}
                    onPress={() => setStatusFilter(status)}
                  >
                    <Text style={[
                      styles.filterButtonText,
                      statusFilter === status && styles.activeFilterButtonText
                    ]}>
                      {status.replace('_', ' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Type</Text>
              <View style={styles.filterButtons}>
                {['all', 'worker', 'establishment'].map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.filterButton,
                      typeFilter === type && styles.activeFilterButton
                    ]}
                    onPress={() => setTypeFilter(type)}
                  >
                    <Text style={[
                      styles.filterButtonText,
                      typeFilter === type && styles.activeFilterButtonText
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{applications.length}</Text>
            <Text style={styles.statLabel}>Total Applications</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {applications.filter(a => a.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {applications.filter(a => a.status === 'under_review').length}
            </Text>
            <Text style={styles.statLabel}>Under Review</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {applications.filter(a => a.status === 'approved').length}
            </Text>
            <Text style={styles.statLabel}>Approved</Text>
          </View>
        </View>

        {/* Applications List */}
        <View style={styles.applicationsSection}>
          <Text style={styles.sectionTitle}>Applications ({filteredApplications.length})</Text>
          
          {filteredApplications.map(application => (
            <TouchableOpacity 
              key={application.id} 
              style={styles.applicationCard}
              onPress={() => {
                // Navigate to application details
                console.log('View application:', application.id);
              }}
            >
              <View style={styles.applicationHeader}>
                <View style={styles.applicantInfo}>
                  <Text style={styles.applicantName}>{application.applicantName}</Text>
                  <Text style={styles.registrationId}>{application.registrationId}</Text>
                  <Text style={styles.applicationType}>
                    {application.type.charAt(0).toUpperCase() + application.type.slice(1)} Application
                  </Text>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusBackground(application.status) }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(application.status) }
                    ]}>
                      {application.status.replace('_', ' ')}
                    </Text>
                  </View>
                  <View style={[
                    styles.priorityBadge,
                    { backgroundColor: getPriorityColor(application.priority) }
                  ]}>
                    <Text style={styles.priorityText}>{application.priority}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.applicationDetails}>
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Submission Date</Text>
                    <Text style={styles.detailValue}>{application.submissionDate}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>District</Text>
                    <Text style={styles.detailValue}>{application.location.district}</Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Contact</Text>
                    <Text style={styles.detailValue}>{application.contactInfo.mobile}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Documents</Text>
                    <Text style={styles.detailValue}>
                      {application.documents.verified}/{application.documents.total}
                    </Text>
                  </View>
                </View>

                {application.reviewedBy && (
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewLabel}>Reviewed by {application.reviewedBy}</Text>
                    <Text style={styles.reviewDate}>on {application.reviewDate}</Text>
                  </View>
                )}

                {application.notes && (
                  <View style={styles.notesSection}>
                    <Text style={styles.notesLabel}>Notes:</Text>
                    <Text style={styles.notesText}>{application.notes}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.applicationActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
                  <Text style={styles.secondaryActionText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bulk Actions */}
        <View style={styles.bulkActionsSection}>
          <Text style={styles.sectionTitle}>Bulk Actions</Text>
          <View style={styles.bulkActions}>
            <TouchableOpacity style={styles.bulkActionButton}>
              <Text style={styles.bulkActionText}>Approve Selected</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bulkActionButton, styles.rejectButton]}>
              <Text style={styles.bulkActionText}>Reject Selected</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bulkActionButton, styles.exportButton]}>
              <Text style={styles.bulkActionText}>Export Report</Text>
            </TouchableOpacity>
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
  filterRow: {
    gap: 16,
  },
  filterGroup: {
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  activeFilterButton: {
    backgroundColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 12,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  applicationsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  applicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  registrationId: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  applicationType: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'flex-end',
    gap: 4,
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
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  applicationDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  reviewInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  reviewLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  notesSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  applicationActions: {
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
  bulkActionsSection: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  bulkActions: {
    flexDirection: 'row',
    gap: 8,
  },
  bulkActionButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bulkActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  rejectButton: {
    backgroundColor: '#ef4444',
  },
  exportButton: {
    backgroundColor: '#3b82f6',
  },
});

export default ApplicationReviewScreen; 