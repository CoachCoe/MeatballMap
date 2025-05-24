import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';

declare global {
  interface Window {
    L: any;
  }
}

const TestMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || !mapContainerRef.current || !window.L) {
      return;
    }

    // Initialize map
    const map = window.L.map(mapContainerRef.current).setView([0, 0], 2);
    mapRef.current = map;

    // Add tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (Platform.OS !== 'web') {
    return <Text>Map is only available on web</Text>;
  }

  return (
    <View style={styles.container}>
      <div 
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export default TestMap; 