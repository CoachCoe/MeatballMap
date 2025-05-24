import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import L from 'leaflet';

// Import Leaflet CSS only on web
if (Platform.OS === 'web') {
  require('leaflet/dist/leaflet.css');
}

export default function WebMapComponent() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || !mapContainerRef.current || mapRef.current) {
      return;
    }

    console.log('Initializing map...');

    // Initialize the map
    const map = L.map(mapContainerRef.current, {
      center: [0, 0],
      zoom: 2,
      zoomControl: true,
      attributionControl: true
    });

    // Add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Store the map instance
    mapRef.current = map;

    console.log('Map initialized');

    // Cleanup function
    return () => {
      console.log('Cleaning up map...');
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.container}>
      <div
        ref={mapContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f0f0f0'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative'
  }
}); 