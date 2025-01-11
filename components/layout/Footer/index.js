// Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2025 ENAMELIQ. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#033F6A',
    padding: 15,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Footer;