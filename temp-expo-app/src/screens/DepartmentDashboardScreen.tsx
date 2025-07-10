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

const DepartmentDashboardScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardStats = {
    totalEstablishments: 156,
    totalWorkers: 2847,
    activeEstablishments: 142,
    complianceRate: 89,
    pendingApprovals: 23,
    recentInspections: 8,
  };

  const recentActivities = [
    { id: 1, type: 'inspection', message: 'Compliance inspection completed for ABC Construction', time: '1 hour ago' },
    { id: 2, type: 'registration', message: 'New establishment registered: XYZ Industries', time: '3 hours ago' },
    { id: 3, type: 'violation', message: 'Violation reported for Safety Standards', time: '1 day ago' },
    { id: 4, type: 'approval', message: 'Worker registration approved: 45 workers', time: '2 days ago' },
  ];

  const quickActions = [
    { id: 'inspections', title: 'Schedule Inspection', icon: '🔍', color: '#dc2626', screen: 'ComplianceMonitoring' },
    { id: 'reports', title: 'Generate Reports', icon: '📊', color: '#2563eb', screen: 'Reports' },
    { id: 'approvals', title: 'Review Approvals', icon: '✅', color: '#059669', screen: 'ApplicationReview' },
    { id: 'violations', title: 'Violation Management', icon: '⚠️', color: '#ea580c', screen: 'ComplianceMonitoring' },
    { id: 'analytics', title: 'Analytics Dashboard', icon: '📈', color: '#7c3aed', screen: 'Reports' },
    { id: 'settings', title: 'System Settings', icon: '⚙️', color: '#6b7280', screen: 'Settings' },
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
          <Text style={styles.statIcon}>🏢</Text>
          <Text style={styles.statNumber}>{dashboardStats.totalEstablishments}</Text>
          <Text style={styles.statLabel}>Total Establishments</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>👥</Text>
          <Text style={styles.statNumber}>{dashboardStats.totalWorkers}</Text>
          <Text style={styles.statLabel}>Total Workers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>✅</Text>
          <Text style={styles.statNumber}>{dashboardStats.activeEstablishments}</Text>
          <Text style={styles.statLabel}>Active Establishments</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📊</Text>
          <Text style={styles.statNumber}>{dashboardStats.complianceRate}%</Text>
          <Text style={styles.statLabel}>Compliance Rate</Text>
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
                  {activity.type === 'inspection' ? '🔍' :
                   activity.type === 'registration' ? '🏢' :
                   activity.type === 'violation' ? '⚠️' : '✅'}
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

  const renderEstablishments = () => (
    <View style={styles.tabContent}>
      <View style={styles.establishmentsHeader}>
        <Text style={styles.establishmentsCount}>Total Establishments: {dashboardStats.totalEstablishments}</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => Alert.alert('Filter', 'Filter options will be implemented')}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.establishmentsList}>
        <View style={styles.establishmentCard}>
          <View style={styles.establishmentInfo}>
            <Text style={styles.establishmentName}>ABC Construction Ltd</Text>
            <Text style={styles.establishmentType}>Construction</Text>
            <Text style={styles.establishmentStatus}>Active</Text>
          </View>
          <View style={styles.establishmentStats}>
            <Text style={styles.establishmentWorkers}>45 Workers</Text>
            <Text style={styles.establishmentCompliance}>95% Compliance</Text>
          </View>
          <TouchableOpacity style={styles.establishmentAction}>
            <Text style={styles.establishmentActionText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.establishmentCard}>
          <View style={styles.establishmentInfo}>
            <Text style={styles.establishmentName}>XYZ Industries</Text>
            <Text style={styles.establishmentType}>Manufacturing</Text>
            <Text style={styles.establishmentStatus}>Active</Text>
          </View>
          <View style={styles.establishmentStats}>
            <Text style={styles.establishmentWorkers}>78 Workers</Text>
            <Text style={styles.establishmentCompliance}>87% Compliance</Text>
          </View>
          <TouchableOpacity style={styles.establishmentAction}>
            <Text style={styles.establishmentActionText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.establishmentCard}>
          <View style={styles.establishmentInfo}>
            <Text style={styles.establishmentName}>DEF Services</Text>
            <Text style={styles.establishmentType}>Service</Text>
            <Text style={styles.establishmentStatus}>Pending Review</Text>
          </View>
          <View style={styles.establishmentStats}>
            <Text style={styles.establishmentWorkers}>23 Workers</Text>
            <Text style={styles.establishmentCompliance}>Pending</Text>
          </View>
          <TouchableOpacity style={styles.establishmentAction}>
            <Text style={styles.establishmentActionText}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCompliance = () => (
    <View style={styles.tabContent}>
      <View style={styles.complianceOverview}>
        <View style={styles.complianceCard}>
          <Text style={styles.complianceScore}>{dashboardStats.complianceRate}%</Text>
          <Text style={styles.complianceLabel}>Overall Compliance Rate</Text>
          <View style={styles.complianceBar}>
            <View style={[styles.complianceProgress, { width: `${dashboardStats.complianceRate}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.complianceMetrics}>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Safety Standards</Text>
          <Text style={styles.metricValue}>92%</Text>
          <Text style={styles.metricStatus}>Good</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Documentation</Text>
          <Text style={styles.metricValue}>88%</Text>
          <Text style={styles.metricStatus}>Good</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Training Compliance</Text>
          <Text style={styles.metricValue}>85%</Text>
          <Text style={styles.metricStatus}>Needs Attention</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Insurance Coverage</Text>
          <Text style={styles.metricValue}>95%</Text>
          <Text style={styles.metricStatus}>Excellent</Text>
        </View>
      </View>

      <View style={styles.violationsSection}>
        <Text style={styles.sectionTitle}>Recent Violations</Text>
        <View style={styles.violationsList}>
          <View style={styles.violationItem}>
            <Text style={styles.violationType}>Safety Violation</Text>
            <Text style={styles.violationEstablishment}>ABC Construction</Text>
            <Text style={styles.violationDate}>2 days ago</Text>
          </View>
          <View style={styles.violationItem}>
            <Text style={styles.violationType}>Documentation Missing</Text>
            <Text style={styles.violationEstablishment}>XYZ Industries</Text>
            <Text style={styles.violationDate}>1 week ago</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'establishments':
        return renderEstablishments();
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
          <Text style={styles.headerTitle}>Department Dashboard</Text>
          <Text style={styles.headerSubtitle}>Government oversight and monitoring</Text>
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
          style={[styles.tabButton, activeTab === 'establishments' && styles.tabButtonActive]}
          onPress={() => setActiveTab('establishments')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'establishments' && styles.tabButtonTextActive]}>
            Establishments
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
    backgroundColor: '#dc2626',
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
    color: '#fecaca',
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
    borderBottomColor: '#dc2626',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#dc2626',
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
  establishmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  establishmentsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  filterButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  establishmentsList: {
    gap: 12,
  },
  establishmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  establishmentInfo: {
    marginBottom: 12,
  },
  establishmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  establishmentType: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  establishmentStatus: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  establishmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  establishmentWorkers: {
    fontSize: 14,
    color: '#374151',
  },
  establishmentCompliance: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  establishmentAction: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  establishmentActionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  complianceOverview: {
    marginBottom: 24,
  },
  complianceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
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
  complianceScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#dc2626',
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
    backgroundColor: '#dc2626',
  },
  complianceMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
  metricTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  metricStatus: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  violationsSection: {
    marginBottom: 24,
  },
  violationsList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  violationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  violationType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4,
  },
  violationEstablishment: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  violationDate: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default DepartmentDashboardScreen; 