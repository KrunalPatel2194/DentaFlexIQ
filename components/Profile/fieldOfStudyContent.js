import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const FieldOfStudyContent = () => {
  const [selectedField, setSelectedField] = useState(null);

  return (
    <View style={styles.container}>
      {!selectedField ? (
        // Main field selection view
        <View style={styles.fieldsGrid}>
          <TouchableOpacity 
            style={[styles.fieldCard, styles.fieldCardInteractive]}
            onPress={() => setSelectedField('DENTAL')}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.fieldCardText}>DENTAL</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.fieldCard, styles.fieldCardInteractive]}
            onPress={() => setSelectedField('AI')}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.fieldCardText}>AI</Text>
            </View>
          </TouchableOpacity>
          
          {/* Add more empty cards for visual layout */}
          {[1, 2, 3, 4].map((_, index) => (
            <View 
              key={index} 
              style={[styles.fieldCard, styles.placeholderCard]} 
            />
          ))}
        </View>
      ) : (
        // Subfield selection view
        <View style={styles.subfieldContainer}>
          <View style={styles.subfieldHeader}>
            <TouchableOpacity 
              onPress={() => setSelectedField(null)}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back to Fields</Text>
            </TouchableOpacity>
            <Text style={styles.selectedFieldTitle}>{selectedField}</Text>
          </View>
          
          <View style={styles.fieldsGrid}>
            {['AFK', 'ACJ', 'XYZ'].map((subfield) => (
              <TouchableOpacity 
                key={subfield}
                style={[styles.fieldCard, styles.fieldCardInteractive]}
                onPress={() => console.log(`Selected ${subfield}`)}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.fieldCardText}>{subfield}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fieldsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'flex-start',
  },
  fieldCard: {
    width: '30%',
    aspectRatio: 2/1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fieldCardInteractive: {
    // Additional styles for interactive cards
  },
  placeholderCard: {
    backgroundColor: '#f5f5f5',
  },
  cardHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  subfieldContainer: {
    flex: 1,
  },
  subfieldHeader: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginRight: 16,
  },
  backButtonText: {
    color: '#003366',
    fontWeight: '500',
  },
  selectedFieldTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#003366',
  },
});

export default FieldOfStudyContent;