// AppLayout.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AppLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        {children}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    overflow: 'auto', // This enables scrolling
    WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
  },
});

export default AppLayout;