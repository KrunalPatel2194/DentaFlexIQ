// components/auth/ForgotPassword.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPassword = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');

  // Calculate card width based on screen size
  const cardWidth = width > 1024 ? '40%' : width > 768 ? '60%' : '90%';

  const handleResetPassword = () => {
    if (email) {
      // Implement your password reset logic here
      Alert.alert(
        'Reset Link Sent',
        'If an account exists with this email, you will receive password reset instructions.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert('Error', 'Please enter your email address');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.cardContainer, { width: cardWidth }]}>
        <View style={styles.card}>
          <Text style={styles.logo}>ENAMELIQ</Text>
          
          <Text style={styles.subtitle}>Reset Password</Text>
          <Text style={styles.description}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>SEND RESET LINK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>Back to Login</Text>
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
    maxWidth: 500,
    minWidth: 280,
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
  subtitle: {
    fontSize: 20,
    color: '#003B5C',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 20,
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
  resetButton: {
    backgroundColor: '#003B5C',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  backButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#003B5C',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  copyright: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default ForgotPassword;