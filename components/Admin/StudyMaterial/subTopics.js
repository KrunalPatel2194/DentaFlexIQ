import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Animated, StyleSheet, Platform } from 'react-native';
import { Menu, ChevronRight, ChevronDown, BookOpen, Image as ImageIcon } from 'lucide-react';

// SubtopicContent Component
const SubtopicContent = ({ subtopicData, isVisible }) => {
    const [activeTab, setActiveTab] = useState('learn');
  
    if (!subtopicData || !isVisible) return null;
  
    return (
      <View style={[styles.subtopicContainer, Platform.OS === 'web' && styles.subtopicContainerWeb]}>
        <View style={styles.subtopicHeader}>
          <Text style={styles.subtopicTitle}>{subtopicData.title}</Text>
        </View>
  
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'learn' && styles.activeTab]}
            onPress={() => setActiveTab('learn')}
          >
            <BookOpen size={20} color={activeTab === 'learn' ? '#003366' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'learn' && styles.activeTabText]}>Learn</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'diagram' && styles.activeTab]}
            onPress={() => setActiveTab('diagram')}
          >
            <ImageIcon size={20} color={activeTab === 'diagram' ? '#003366' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'diagram' && styles.activeTabText]}>Diagram</Text>
          </Pressable>
        </View>
  
        {/* Single ScrollView that switches content based on activeTab */}
        <ScrollView 
          style={styles.contentScroll}
          contentContainerStyle={styles.contentScrollContainer}
        >
          {/* Only render the active tab's content */}
          <View style={[styles.tabContent, { display: activeTab === 'learn' ? 'flex' : 'none' }]}>
            <Text style={styles.description}>
              {subtopicData.content.learn.description}
            </Text>
            <Text style={styles.keyPointsTitle}>Key Points:</Text>
            {subtopicData.content.learn.keyPoints.map((point, index) => (
              <View key={index} style={styles.keyPoint}>
                <Text style={styles.keyPointDot}>•</Text>
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
  
          <View style={[styles.tabContent, { display: activeTab === 'diagram' ? 'flex' : 'none' }]}>
            <View style={styles.diagramContent}>
              {Platform.OS === 'web' ? (
                <img
                  src={subtopicData.content.diagram.image}
                  alt={subtopicData.content.diagram.caption}
                  style={styles.diagramImage}
                />
              ) : (
                <View style={styles.diagramPlaceholder} />
              )}
              <Text style={styles.diagramCaption}>
                {subtopicData.content.diagram.caption}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  wrapper: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    zIndex: 1000,
  },
  toggleButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1001,
  },
  toggleButtonClosed: {
    left: 8,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Platform.OS === 'web' ? '100vh' : '100%',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentWrapper: {
    marginTop: 70,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  activeSection: {
    backgroundColor: '#f0f7ff',
  },
  sectionTitle: {
    fontSize: 15,
    color: '#333',
  },
  activeSectionTitle: {
    color: '#003366',
    fontWeight: '500',
  },
  sectionContent: {
    backgroundColor: '#f9fafb',
    maxHeight: 200,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  sectionItem: {
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  activeItem: {
    backgroundColor: '#e6f3ff',
  },
  itemText: {
    fontSize: 14,
    color: '#666',
  },
  activeItemText: {
    color: '#003366',
    fontWeight: '500',
  },
  subtopicItem: {
    paddingVertical: 10,
    paddingHorizontal: 48,
    backgroundColor: '#f0f0f0',
  },
  activeSubtopicItem: {
    backgroundColor: '#e6f3ff',
  },
  subtopicItemText: {
    fontSize: 13,
    color: '#666',
  },
  activeSubtopicItemText: {
    color: '#003366',
    fontWeight: '500',
  },
  
  // SubtopicContent Styles
  subtopicContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  subtopicContainerWeb: {
    marginLeft: 250,
  },
  // Continue from the previous styles...

  subtopicHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  subtopicTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  tabContent: {
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#003366',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#003366',
    fontWeight: '500',
  },
  contentScroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentScrollContainer: {
    padding: 20,
  },
  learnContent: {
    gap: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  keyPointsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingRight: 20,
  },
  keyPointDot: {
    color: '#003366',
    marginRight: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  keyPointText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  diagramContent: {
    alignItems: 'center',
    padding: 20,
  },
  diagramImageContainer: {
    width: '100%',
    aspectRatio: 4/3,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  diagramImage: {
    width: '100%',
    maxWidth: 600,
    height: 'auto',
    aspectRatio: 4/3,
    objectFit: 'contain',
    borderRadius: 8,
  },
  diagramCaption: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 20,
  },
  // Additional responsive styles for web
  ...(Platform.OS === 'web' && {
    contentScroll: {
      '::-webkit-scrollbar': {
        width: '6px',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '3px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
      },
    },
    tab: {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#f5f5f5',
      },
    },
  }),
});
export default SubtopicContent;