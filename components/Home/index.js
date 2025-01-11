// Home.js
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BookOpen, Award, Clock } from 'lucide-react';

const Home = ({ navigation }) => {
  return (
    <>
      <View style={styles.heroSection}>
        <Text style={styles.mainTitle}>Welcome to ExamPrep Pro</Text>
        <Text style={styles.subtitle}>Your Personal Exam Preparation Journey</Text>
      </View>

      <View style={styles.featuresContainer}>
        <View style={styles.featureCard}>
          <BookOpen size={32} color="#003366" />
          <Text style={styles.featureTitle}>Personalized Learning</Text>
          <Text style={styles.featureText}>
            Track your progress and get customized study plans tailored to your exam schedule
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Award size={32} color="#003366" />
          <Text style={styles.featureTitle}>Expert Guidance</Text>
          <Text style={styles.featureText}>
            Access study materials and tips from experienced educators and top performers
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Clock size={32} color="#003366" />
          <Text style={styles.featureTitle}>Time Management</Text>
          <Text style={styles.featureText}>
            Learn effective strategies to manage your study time and exam preparation
          </Text>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaText}>Ready to start your preparation?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Setup Your Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          Join thousands of students who have improved their exam performance using our structured approach
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingVertical: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 20,
  },
  featureCard: {
    width: '30%',
    minWidth: 250,
    backgroundColor: '#f5f8ff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 20,
    backgroundColor: '#e8f0ff',
    padding: 24,
    borderRadius: 12,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#003366',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Home;