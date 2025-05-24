import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function MapComponent() {
  console.log('Rendering MapComponent for platform:', Platform.OS);

  if (Platform.OS === 'web') {
    const WebMapComponent = require('./WebMapComponent').default;
    return <WebMapComponent />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
}); 