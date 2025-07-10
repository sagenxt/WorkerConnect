import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Edit, User, Phone, Mail, MapPin, Calendar, IdCard } from 'lucide-react-native';

const WorkerProfileScreen = ({ navigation }: any) => {
  const workerData = {
    id: 'WRK001',
    name: 'Ravi Kumar Sharma',
    photo: null, // URL to profile photo
    phone: '+91 98765 43210',
    email: 'ravi.sharma@email.com',
    address: '123, Gandhi Nagar, Hyderabad, Telangana - 500001',
    dateOfBirth: '15-03-1985',
    aadharNumber: '1234 5678 9012',
    category: 'Skilled Worker',
    experience: '8 years',
    currentProject: 'Site A - Building 1',
    emergencyContact: {
      name: 'Priya Sharma',
      relation: 'Wife',
      phone: '+91 98765 43211'
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Worker Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            {workerData.photo ? (
              <Image source={{ uri: workerData.photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <User size={60} color="#ccc" />
              </View>
            )}
          </View>
          <Text style={styles.workerName}>{workerData.name}</Text>
          <Text style={styles.workerId}>ID: {workerData.id}</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Phone size={16} color="#666" />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{workerData.phone}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Mail size={16} color="#666" />
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{workerData.email}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Calendar size={16} color="#666" />
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>{workerData.dateOfBirth}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <IdCard size={16} color="#666" />
              <Text style={styles.infoLabel}>Aadhar Number</Text>
              <Text style={styles.infoValue}>{workerData.aadharNumber}</Text>
            </View>
          </View>
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <MapPin size={16} color="#666" />
              <Text style={styles.infoLabel}>Current Address</Text>
            </View>
            <Text style={styles.addressText}>{workerData.address}</Text>
          </View>
        </View>

        {/* Work Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{workerData.category}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{workerData.experience}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Current Project</Text>
              <Text style={styles.infoValue}>{workerData.currentProject}</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <User size={16} color="#666" />
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{workerData.emergencyContact.name}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Relation</Text>
              <Text style={styles.infoValue}>{workerData.emergencyContact.relation}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Phone size={16} color="#666" />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{workerData.emergencyContact.phone}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Update Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>View Documents</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoContainer: {
    marginBottom: 15,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#e0e0e0',
  },
  workerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  workerId: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginLeft: 24,
  },
  actionSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkerProfileScreen; 