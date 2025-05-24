import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import SimpleMap from './components/SimpleMap';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';
import Menu from './components/Menu';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import CSS for web
if (Platform.OS === 'web') {
  require('leaflet/dist/leaflet.css');
  require('./web/map.css');
}

// Add global styles for web
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.textContent = `
    html, body, #root {
      height: 100vh;
      margin: 0;
      padding: 0;
    }
  `;
  document.head.appendChild(style);
}

function MainApp() {
  const { isAuthenticated, loading, user } = useAuth();

  console.log('MainApp render:', { isAuthenticated, loading, user });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.mapContainer}>
          <SimpleMap />
        </View>
        <View style={styles.menuContainer}>
          <Menu />
        </View>
      </View>
      <Footer />
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: Platform.OS === 'web' ? 'flex' : undefined,
    flexDirection: 'column',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1000,
  },
});
