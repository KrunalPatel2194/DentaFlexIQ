import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Animated, StyleSheet, Platform } from 'react-native';
import { Menu, ChevronRight, ChevronDown, BookOpen, Image as ImageIcon } from 'lucide-react';

// Sample data structure with subtopics
const sidebarData = [
  {
    title: 'Self Assessment',
    id: 'self-assessment',
    expandable: false,
  },
  {
    title: 'Topics',
    id: 'topics',
    expandable: true,
    items: [
      {
        title: 'Topic 1',
        id: 'topic-1',
        subtopics: [
          {
            title: 'Cardiovascular System',
            id: 'cardiovascular',
            content: {
              learn: {
                description: "The cardiovascular system consists of the heart, blood vessels, and blood. This system is responsible for transporting oxygen, nutrients, hormones, and cellular waste products throughout the body. The heart acts as the pump that moves blood through the vessels.",
                keyPoints: [
                  "The heart is a muscular organ that pumps blood",
                  "Blood vessels include arteries, veins, and capillaries",
                  "Blood carries oxygen and nutrients to cells",
                  "The system maintains blood pressure and flow"
                ]
              },
              diagram: {
                image: "/api/placeholder/600/400",
                caption: "Diagram showing the structure of the human heart and major blood vessels"
              }
            }
          },
          {
            title: 'Respiratory System',
            id: 'respiratory',
            content: {
              learn: {
                description: "The respiratory system is responsible for gas exchange between the body and the external environment. It enables the intake of oxygen and the release of carbon dioxide.",
                keyPoints: [
                  "Main organs include the lungs and airways",
                  "Enables gas exchange through alveoli",
                  "Works closely with the cardiovascular system"
                ]
              },
              diagram: {
                image: "/api/placeholder/600/400",
                caption: "Diagram of the human respiratory system"
              }
            }
          }
        ]
      },
      {
        title: 'Topic 2',
        id: 'topic-2',
        subtopics: []
      },
      {
        title: 'Topic 3',
        id: 'topic-3',
        subtopics: []
      },
      {
        title: 'Quiz',
        id: 'quiz'
      }
    ]
  },
  {
    title: 'Odotology',
    id: 'odotology',
    expandable: true,
    items: [
      {
        title: 'Topic 1',
        id: 'odotology-1',
        subtopics: []
      },
      {
        title: 'Topic 2',
        id: 'odotology-2',
        subtopics: []
      }
    ]
  },
  {
    title: 'Mock Tests',
    id: 'mock-tests',
    expandable: false,
  }
];

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

// Main Sidebar Component
const Sidebar = ({ onSectionChange, currentSection, currentSubItem }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [expandedSections, setExpandedSections] = useState({});
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [activeView, setActiveView] = useState('self-assessment');
    const sidebarWidth = useRef(new Animated.Value(250)).current;
    const sidebarOpacity = useRef(new Animated.Value(1)).current;
  
 // Updated toggle section function
 const toggleSection = (section) => {
    if (section.expandable) {
      // For expandable sections, toggle only the clicked section
      setExpandedSections(prev => {
        const newState = {};
        // Close all other sections
        Object.keys(prev).forEach(key => {
          newState[key] = false;
        });
        // Toggle the clicked section
        newState[section.title] = !prev[section.title];
        return newState;
      });
    } else {
      // For non-expandable sections like Self Assessment
      onSectionChange(section.id);
      setSelectedSubtopic(null);
      setExpandedSections({}); // Close all expanded sections
      setActiveView(section.id);
      setCurrentSubItem(null); // Reset subitem selection
    }
  };
  // Updated subitem click handler
  const handleSubItemClick = (section, item) => {
    if (item.subtopics && item.subtopics.length > 0) {
      onSectionChange(section.id, item.title);
      setSelectedSubtopic(item.subtopics[0]);
      setActiveView('subtopic');
      // Keep only the parent section expanded
      setExpandedSections(prev => ({
        ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
        [section.title]: true
      }));
    } else {
      onSectionChange(section.id, item.title);
      setSelectedSubtopic(null);
      setActiveView(section.id);
    }
  };
// Updated subtopic click handler
const handleSubtopicClick = (section, subtopic) => {
    setSelectedSubtopic(subtopic);
    setActiveView('subtopic');
    // Ensure only the parent section stays expanded
    setExpandedSections(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [section.title]: true
    }));
  };

  const animateSidebar = (open) => {
    Animated.parallel([
      Animated.timing(sidebarWidth, {
        toValue: open ? 250 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(sidebarOpacity, {
        toValue: open ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    animateSidebar(newState);
  };

  const renderSubtopics = (item) => {
    if (!item.subtopics) return null;
    return item.subtopics.map((subtopic, index) => (
      <Pressable
        key={subtopic.id}
        style={[
          styles.subtopicItem,
          selectedSubtopic?.id === subtopic.id && styles.activeSubtopicItem
        ]}
        onPress={() => setSelectedSubtopic(subtopic)}
      >
        <Text style={[
          styles.subtopicItemText,
          selectedSubtopic?.id === subtopic.id && styles.activeSubtopicItemText
        ]}>
          {subtopic.title}
        </Text>
      </Pressable>
    ));
  };

   // Updated render method for the content
   const renderExpandedContent = (section) => {
    if (!section.expandable || !expandedSections[section.title]) return null;

    return (
      <View style={styles.sectionContent}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {section.items.map((item, itemIndex) => (
            <View key={itemIndex}>
              <Pressable 
                style={[
                  styles.sectionItem,
                  currentSection === section.id && 
                  currentSubItem === item.title && 
                  styles.activeItem
                ]}
                onPress={() => handleSubItemClick(section, item)}
              >
                <Text style={[
                  styles.itemText,
                  currentSection === section.id && 
                  currentSubItem === item.title && 
                  styles.activeItemText
                ]}>
                  {item.title}
                </Text>
              </Pressable>
              {item.subtopics?.map((subtopic) => (
                <Pressable
                  key={subtopic.id}
                  style={[
                    styles.subtopicItem,
                    selectedSubtopic?.id === subtopic.id && styles.activeSubtopicItem
                  ]}
                  onPress={() => handleSubtopicClick(section, subtopic)}
                >
                  <Text style={[
                    styles.subtopicItemText,
                    selectedSubtopic?.id === subtopic.id && styles.activeSubtopicItemText
                  ]}>
                    {subtopic.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.wrapper}>
        <Pressable 
          style={[
            styles.toggleButton,
            !isOpen && styles.toggleButtonClosed
          ]}
          onPress={toggleSidebar}
        >
          <Menu size={24} color="#666" />
        </Pressable>

        {isOpen && (
          <Animated.View style={[
            styles.container,
            {
              width: sidebarWidth,
              opacity: sidebarOpacity,
            }
          ]}>
            <View style={styles.contentWrapper}>
              {sidebarData.map((section, index) => (
                <View key={index} style={styles.section}>
                  <Pressable 
                    style={[
                      styles.sectionHeader,
                      currentSection === section.id && !currentSubItem && styles.activeSection
                    ]}
                    onPress={() => toggleSection(section)}
                  >
                    <Text style={[
                      styles.sectionTitle,
                      currentSection === section.id && !currentSubItem && styles.activeSectionTitle
                    ]}>
                      {section.title}
                    </Text>
                    {section.expandable && (
                      expandedSections[section.title] ? 
                        <ChevronDown size={20} color="#666" /> :
                        <ChevronRight size={20} color="#666" />
                    )}
                  </Pressable>
                  {renderExpandedContent(section)}
                </View>
              ))}
            </View>
          </Animated.View>
        )}
      </View>
      
      <SubtopicContent 
        subtopicData={selectedSubtopic}
        isVisible={isOpen}
      />
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

export default Sidebar;