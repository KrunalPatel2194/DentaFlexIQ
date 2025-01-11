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
export default SubtopicContent;