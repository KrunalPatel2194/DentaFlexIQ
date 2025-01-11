// components/auth/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Calculate card width based on screen size
  const cardWidth = width > 1024 ? '40%' : width > 768 ? '60%' : '90%';

  const handleLogin = () => {
    if (username && password) {
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.cardContainer, { width: cardWidth }]}>
        <View style={styles.card}>
          <Text style={styles.logo}>ENAMELIQ</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Create Account</Text>
            </TouchableOpacity>
            <Text style={styles.linkDivider}>•</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyright}>COPYRIGHT</Text>

          {__DEV__ && (
            <TouchableOpacity 
              style={styles.devBypass}
              onPress={() => navigation.replace('Home')}
            >
              <Text style={styles.devBypassText}>Developer Bypass</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const Register = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Calculate card width based on screen size
  const cardWidth = width > 1024 ? '40%' : width > 768 ? '60%' : '90%';

  const handleRegister = () => {
    if (username && password && confirmPassword) {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.cardContainer, { width: cardWidth }]}>
        <View style={styles.card}>
          <Text style={styles.logo}>ENAMELIQ</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginButtonText}>REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backButtonText}>Back to Login</Text>
          </TouchableOpacity>

          <Text style={styles.copyright}>COPYRIGHT</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    // Width is set dynamically
    maxWidth: 500, // Maximum width for very large screens
    minWidth: 280, // Minimum width for small screens
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003B5C',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#003B5C',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  backButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#003B5C',
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  link: {
    color: '#003B5C',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  linkDivider: {
    color: '#666',
    marginHorizontal: 8,
    fontSize: 12,
  },
  copyright: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
  devBypass: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#ff9800',
    borderRadius: 4,
    alignSelf: 'center',
  },
  devBypassText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export { Login, Register };