import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import LibraryPage from './LibraryPage';

export default function Menu() {
  const [showLibrary, setShowLibrary] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const handleLibraryPress = () => {
    setShowLibrary(true);
  };

  const handleAccountPress = () => {
    setShowAccount(true);
  };

  return (
    <>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleLibraryPress}>
          <Text style={styles.menuText}>My Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleAccountPress}>
          <Text style={styles.menuText}>My Account</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showLibrary}
        animationType="slide"
        onRequestClose={() => setShowLibrary(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowLibrary(false)}
          >
            <Text style={styles.backButtonText}>← Back to Map</Text>
          </TouchableOpacity>
          <LibraryPage />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 10,
    left: Platform.OS === 'web' ? 20 : 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
    minWidth: 150,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#2c3e50',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 