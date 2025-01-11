// Header.js
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const avatarImage = require('../../../assets/profile.png');

const Header = () => {
  const navigation = useNavigation();
  
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>DENTA<Text style={styles.logoIQ}>FLEX</Text></Text>
          <Text style={styles.subText}>STUDY PREP AND MOCKS</Text>
        </View>

        <View style={styles.nav}>
          <Pressable onPress={() => navigateTo('Home')} style={styles.navItem}>
            <Text style={styles.navLink}>Home</Text>
          </Pressable>
          <Pressable onPress={() => navigateTo('Profile')} style={styles.navItem}>
            <Text style={styles.navLink}>Profile</Text>
          </Pressable>
        </View>

        <View style={styles.avatarContainer}>
        {/* <Pressable onPress={() => navigateTo('Profile')} style={styles.navItem}> */}
          <Image source={avatarImage} style={styles.avatar} onPress={() => navigateTo('Profile')}/>
          {/* </Pressable> */}
        </View>
      </View>
      <View style={styles.shadowLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#033F6A',
  },
  logoIQ: {
    fontWeight: 'normal',
  },
  subText: {
    fontSize: 12,
    color: '#033F6A',
    marginTop: 2,
  },
  nav: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  navLink: {
    color: '#033F6A',
    fontSize: 16,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  shadowLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
});

export default Header;