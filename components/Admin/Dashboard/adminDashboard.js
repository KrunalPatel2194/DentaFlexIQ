// Home.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BookOpen, Award, Clock } from 'lucide-react';
import Sidebar from '../../layout/Sidebar';
import TestModule from '../../layout/TestCards';

const AdminDashboard = ({ navigation }) => {
  const [currentSection, setCurrentSection] = useState('self-assessment');
  const [currentSubItem, setCurrentSubItem] = useState(null);

  const handleNavigation = (section, subItem = null) => {
    setCurrentSection(section);
    setCurrentSubItem(subItem);
  };

  const renderContent = () => {
    // If it's a sub-item, show placeholder content
    if (currentSubItem) {
      return (
        <View style={styles.placeholderContent}>
          <Text style={styles.placeholderText}>
            {currentSection} - {currentSubItem}
          </Text>
        </View>
      );
    }

    // Main sections
    switch (currentSection) {
      case 'self-assessment':
        return <TestModule />;
      case 'topics':
      case 'odotology':
      case 'operative-dentistry':
      case 'mock-tests':
        return (
          <View style={styles.placeholderContent}>
            <Text style={styles.placeholderText}>
              {currentSection} Content
            </Text>
          </View>
        );
      default:
        return <TestModule />;
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar 
        onSectionChange={handleNavigation} 
        currentSection={currentSection}
        currentSubItem={currentSubItem}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    flexDirection: 'row',
  },
  placeholderContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    color: '#333',
    textTransform: 'capitalize',
  },
});

export default AdminDashboard;