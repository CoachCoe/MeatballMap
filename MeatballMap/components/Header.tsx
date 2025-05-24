import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { DEV_MODE } from '../config/firebase';

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>MeatballMap</Text>
      <View style={styles.rightSection}>
        {DEV_MODE && (
          <Text style={styles.devMode}>DEV MODE</Text>
        )}
        <Text style={styles.userEmail}>{user?.email}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'web' ? 60 : 80,
    paddingTop: Platform.OS === 'web' ? 0 : 20,
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  devMode: {
    color: '#e74c3c',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    padding: 4,
    borderRadius: 4,
  },
  userEmail: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
}); 