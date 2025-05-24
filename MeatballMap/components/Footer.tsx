import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2024 MeatballMap. All rights reserved.</Text>
      {Platform.OS === 'web' && (
        <View style={styles.links}>
          <Text style={styles.link}>Privacy Policy</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.link}>Terms of Service</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.link}>Contact Us</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: '#2c3e50',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#34495e',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  link: {
    color: '#3498db',
    fontSize: 12,
    marginHorizontal: 5,
    textDecorationLine: 'underline',
  },
  separator: {
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 5,
  },
}); 