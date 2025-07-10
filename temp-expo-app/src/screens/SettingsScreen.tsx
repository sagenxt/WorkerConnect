import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = [
  { id: 'profile', label: 'Profile Settings' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy & Security' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'data', label: 'Data Management' }
];

const SettingsScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: { email: true, sms: true, push: true, updates: false },
    privacy: { profileVisibility: 'public', dataSharing: false, analytics: true },
    appearance: { theme: 'light', fontSize: 'medium', language: 'English' }
  });

  const renderProfileSettings = () => (
    <View style={styles.tabContent}><Text style={styles.tabTitle}>Profile Settings</Text><Text>Name: John Doe</Text><Text>Email: john@example.com</Text></View>
  );
  const renderNotificationSettings = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Notifications</Text>
      {Object.entries(settings.notifications).map(([key, value]) => (
        <View key={key} style={styles.settingRow}>
          <Text style={styles.settingLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <Switch value={value} onValueChange={v => setSettings(s => ({ ...s, notifications: { ...s.notifications, [key]: v } }))} />
        </View>
      ))}
    </View>
  );
  const renderPrivacySettings = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Privacy & Security</Text>
      <View style={styles.settingRow}><Text style={styles.settingLabel}>Profile Visibility</Text><Text>{settings.privacy.profileVisibility}</Text></View>
      <View style={styles.settingRow}><Text style={styles.settingLabel}>Data Sharing</Text><Switch value={settings.privacy.dataSharing} onValueChange={v => setSettings(s => ({ ...s, privacy: { ...s.privacy, dataSharing: v } }))} /></View>
      <View style={styles.settingRow}><Text style={styles.settingLabel}>Analytics</Text><Switch value={settings.privacy.analytics} onValueChange={v => setSettings(s => ({ ...s, privacy: { ...s.privacy, analytics: v } }))} /></View>
    </View>
  );
  const renderAppearanceSettings = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Appearance</Text>
      <View style={styles.settingRow}><Text style={styles.settingLabel}>Theme</Text><Text>{settings.appearance.theme}</Text></View>
      <View style={styles.settingRow}><Text style={styles.settingLabel}>Font Size</Text><Text>{settings.appearance.fontSize}</Text></View>
      <View style={styles.settingRow}><Text style={styles.settingLabel}>Language</Text><Text>{settings.appearance.language}</Text></View>
    </View>
  );
  const renderDataSettings = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Data Management</Text>
      <TouchableOpacity style={styles.dataButton}><Text style={styles.dataButtonText}>Export Data</Text></TouchableOpacity>
      <TouchableOpacity style={styles.dataButton}><Text style={styles.dataButtonText}>Clear Cache</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.dataButton, { backgroundColor: '#fee2e2' }]}><Text style={[styles.dataButtonText, { color: '#ef4444' }]}>Delete All Data</Text></TouchableOpacity>
    </View>
  );
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      case 'appearance': return renderAppearanceSettings();
      case 'data': return renderDataSettings();
      default: return renderProfileSettings();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        {/* Tabs */}
        <View style={styles.tabsRow}>
          {tabs.map(tab => (
            <TouchableOpacity key={tab.id} style={[styles.tabButton, activeTab === tab.id && styles.activeTabButton]} onPress={() => setActiveTab(tab.id)}>
              <Text style={[styles.tabButtonText, activeTab === tab.id && styles.activeTabButtonText]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Tab Content */}
        {renderTabContent()}
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
  tabsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 16, paddingHorizontal: 8 },
  tabButton: { backgroundColor: '#f3f4f6', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, marginRight: 8, marginBottom: 8 },
  activeTabButton: { backgroundColor: '#3b82f6' },
  tabButtonText: { color: '#374151', fontWeight: '600' },
  activeTabButtonText: { color: '#fff' },
  tabContent: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginHorizontal: 8, marginBottom: 16 },
  tabTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  settingLabel: { fontSize: 14, color: '#374151' },
  dataButton: { backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  dataButtonText: { color: '#374151', fontWeight: '600' },
});
export default SettingsScreen; 