import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

const EstablishmentDashboardScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardStats = {
    totalWorkers: 45,
    activeWorkers: 38,
    pendingApprovals: 7,
    complianceScore: 92,
    recentActivities: 12,
  };

  const recentActivities = [
    { id: 1, type: 'worker_registration', message: 'New worker registration: John Doe', time: '2 hours ago' },
    { id: 2, type: 'attendance', message: 'Attendance marked for 35 workers', time: '4 hours ago' },
    { id: 3, type: 'compliance', message: 'Compliance check completed', time: '1 day ago' },
    { id: 4, type: 'payment', message: 'Salary disbursed to 38 workers', time: '2 days ago' },
  ];

  const quickActions = [
    { id: 'add_worker', title: 'Add Worker', icon: '👷', color: '#2563eb', screen: 'WorkerRegistration' },
    { id: 'attendance', title: 'Mark Attendance', icon: '📅', color: '#059669', screen: 'AttendanceHistory' },
    { id: 'payments', title: 'Process Payments', icon: '💰', color: '#dc2626', screen: 'Reports' },
    { id: 'reports', title: 'Generate Reports', icon: '📊', color: '#7c3aed', screen: 'Reports' },
    { id: 'compliance', title: 'Compliance Check', icon: '✅', color: '#ea580c', screen: 'ComplianceMonitoring' },
    { id: 'documents', title: 'Manage Documents', icon: '📄', color: '#0891b2', screen: 'DocumentVerification' },
  ];

  const handleQuickAction = (action: any) => {
    navigation.navigate(action.screen);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.navigate('Landing'),
        },
      ]
    );
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>👥</Text>
          <Text style={styles.statNumber}>{dashboardStats.totalWorkers}</Text>
          <Text style={styles.statLabel}>Total Workers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>✅</Text>
          <Text style={styles.statNumber}>{dashboardStats.activeWorkers}</Text>
          <Text style={styles.statLabel}>Active Workers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⏳</Text>
          <Text style={styles.statNumber}>{dashboardStats.pendingApprovals}</Text>
          <Text style={styles.statLabel}>Pending Approvals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📊</Text>
          <Text style={styles.statNumber}>{dashboardStats.complianceScore}%</Text>
          <Text style={styles.statLabel}>Compliance Score</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { borderColor: action.color }]}
              onPress={() => handleQuickAction(action)}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.activitiesList}>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>
                  {activity.type === 'worker_registration' ? '👷' :
                   activity.type === 'attendance' ? '📅' :
                   activity.type === 'compliance' ? '✅' : '💰'}
                </Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>{activity.message}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderWorkers = () => (
    <View style={styles.tabContent}>
      <View style={styles.workersHeader}>
        <Text style={styles.workersCount}>Total Workers: {dashboardStats.totalWorkers}</Text>
        <TouchableOpacity
          style={styles.addWorkerButton}
          onPress={() => navigation.navigate('WorkerRegistration')}
        >
          <Text style={styles.addWorkerButtonText}>+ Add Worker</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.workersList}>
        <View style={styles.workerCard}>
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>John Doe</Text>
            <Text style={styles.workerRole}>Construction Worker</Text>
            <Text style={styles.workerStatus}>Active</Text>
          </View>
          <TouchableOpacity style={styles.workerAction}>
            <Text style={styles.workerActionText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.workerCard}>
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>Jane Smith</Text>
            <Text style={styles.workerRole}>Electrician</Text>
            <Text style={styles.workerStatus}>Active</Text>
          </View>
          <TouchableOpacity style={styles.workerAction}>
            <Text style={styles.workerActionText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.workerCard}>
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>Mike Johnson</Text>
            <Text style={styles.workerRole}>Plumber</Text>
            <Text style={styles.workerStatus}>Pending</Text>
          </View>
          <TouchableOpacity style={styles.workerAction}>
            <Text style={styles.workerActionText}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCompliance = () => (
    <View style={styles.tabContent}>
      <View style={styles.complianceCard}>
        <Text style={styles.complianceScore}>{dashboardStats.complianceScore}%</Text>
        <Text style={styles.complianceLabel}>Overall Compliance Score</Text>
        <View style={styles.complianceBar}>
          <View style={[styles.complianceProgress, { width: `${dashboardStats.complianceScore}%` }]} />
        </View>
      </View>

      <View style={styles.complianceItems}>
        <View style={styles.complianceItem}>
          <Text style={styles.complianceItemTitle}>Worker Documentation</Text>
          <Text style={styles.complianceItemStatus}>✅ Complete</Text>
        </View>
        <View style={styles.complianceItem}>
          <Text style={styles.complianceItemTitle}>Safety Training</Text>
          <Text style={styles.complianceItemStatus}>⚠️ Pending</Text>
        </View>
        <View style={styles.complianceItem}>
          <Text style={styles.complianceItemTitle}>Insurance Coverage</Text>
          <Text style={styles.complianceItemStatus}>✅ Complete</Text>
        </View>
        <View style={styles.complianceItem}>
          <Text style={styles.complianceItemTitle}>Regular Inspections</Text>
          <Text style={styles.complianceItemStatus}>✅ Complete</Text>
        </View>
      </View>
    </View>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'workers':
        return renderWorkers();
      case 'compliance':
        return renderCompliance();
      default:
        return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Establishment Dashboard</Text>
          <Text style={styles.headerSubtitle}>Manage your workers and compliance</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'overview' && styles.tabButtonActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'overview' && styles.tabButtonTextActive]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'workers' && styles.tabButtonActive]}
          onPress={() => setActiveTab('workers')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'workers' && styles.tabButtonTextActive]}>
            Workers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'compliance' && styles.tabButtonActive]}
          onPress={() => setActiveTab('compliance')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'compliance' && styles.tabButtonTextActive]}>
            Compliance
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#059669',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#d1fae5',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#059669',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#059669',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  activitiesList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  workersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  workersCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  addWorkerButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addWorkerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  workersList: {
    gap: 12,
  },
  workerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  workerRole: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  workerStatus: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  workerAction: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  workerActionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  complianceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  complianceScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  complianceLabel: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
  },
  complianceBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  complianceProgress: {
    height: '100%',
    backgroundColor: '#059669',
  },
  complianceItems: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  complianceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  complianceItemTitle: {
    fontSize: 14,
    color: '#374151',
  },
  complianceItemStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default EstablishmentDashboardScreen; 