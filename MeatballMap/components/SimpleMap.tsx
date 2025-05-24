import React, { useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';

declare global {
  interface Window {
    L: any;
  }
}

const SimpleMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || Platform.OS !== 'web') {
      return;
    }

    // Create map container
    const mapDiv = document.createElement('div');
    mapDiv.style.width = '100%';
    mapDiv.style.height = '100%';
    mapContainerRef.current.innerHTML = '';
    mapContainerRef.current.appendChild(mapDiv);

    // Initialize map
    const map = window.L.map(mapDiv).setView([51.505, -0.09], 13);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <div
        ref={mapContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#eee',
        }}
      />
    </View>
  );
};

export default SimpleMap; 