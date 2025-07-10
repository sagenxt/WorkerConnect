import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotFoundScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.big404}>404</Text>
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.desc}>Sorry, the page you are looking for does not exist.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Landing')}> 
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  big404: { fontSize: 96, fontWeight: 'bold', color: '#d1d5db', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
  desc: { fontSize: 16, color: '#6b7280', marginBottom: 24, textAlign: 'center' },
  button: { backgroundColor: '#3b82f6', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { borderColor: '#d1d5db', borderWidth: 1, paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8 },
  secondaryButtonText: { color: '#374151', fontWeight: 'bold', fontSize: 16 },
});
export default NotFoundScreen; 