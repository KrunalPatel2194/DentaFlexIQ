import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Camera } from 'lucide-react';
import {additionalStyles,FieldOfStudyContent} from './fieldOfStudyContent';

const TabbedProfile = () => {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('PROFILE');
  const [formData, setFormData] = useState({
    profile: {
      fullName: '',
      address: '',
      country: ''
    },
    fieldOfStudy: {
      fullName: '',
      address: '',
      country: ''
    },
    image: null
  });

  const isMobile = width < 768;
  const renderContent = () => {
    switch (activeTab) {
      case 'PROFILE':
        return <ProfileContent />;
      case 'FIELD OF STUDY':
        return <FieldOfStudyContent/>;
      case 'PROGRESS':
        return <Text style={styles.placeholderText}>Progress Content Coming Soon</Text>;
      default:
        return <ProfileContent />;
    }
  };
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleImageUpload = () => {
    console.log('Image upload triggered');
  };

  const ProfileContent = () => (
    <View style={styles.formContainer}>
      <View style={[styles.formWrapper, isMobile && styles.formWrapperMobile]}>
        {/* Form Sections */}
        <View style={[styles.formSections, isMobile && styles.formSectionsMobile]}>
          {/* Left Section */}
          <View style={[styles.inputSection, isMobile && styles.inputSectionMobile]}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={formData.profile.fullName}
                onChangeText={(value) => handleInputChange('profile', 'fullName', value)}
                placeholder="Enter your full name"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value={formData.profile.address}
                onChangeText={(value) => handleInputChange('profile', 'address', value)}
                placeholder="Enter your address"
                multiline
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                value={formData.profile.country}
                onChangeText={(value) => handleInputChange('profile', 'country', value)}
                placeholder="Enter your country"
              />
            </View>
          </View>

          {/* Right Section */}
          <View style={[styles.inputSection, isMobile && styles.inputSectionMobile]}>
            <Text style={styles.sectionTitle}>Academic Information</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Institution Name</Text>
              <TextInput
                style={styles.input}
                value={formData.fieldOfStudy.fullName}
                onChangeText={(value) => handleInputChange('fieldOfStudy', 'fullName', value)}
                placeholder="Enter institution name"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Campus Address</Text>
              <TextInput
                style={styles.input}
                value={formData.fieldOfStudy.address}
                onChangeText={(value) => handleInputChange('fieldOfStudy', 'address', value)}
                placeholder="Enter campus address"
                multiline
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Institution Country</Text>
              <TextInput
                style={styles.input}
                value={formData.fieldOfStudy.country}
                onChangeText={(value) => handleInputChange('fieldOfStudy', 'country', value)}
                placeholder="Enter institution country"
              />
            </View>
          </View>
        </View>

        {/* Image Section */}
        <View style={[styles.imageSection, isMobile && styles.imageSectionMobile]}>
          <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadContainer}>
            {formData.image ? (
              <Image source={{ uri: formData.image }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Camera size={isMobile ? 30 : 40} color="#666" />
              </View>
            )}
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tab Header */}
      <View style={[styles.tabHeader, isMobile && styles.tabHeaderMobile]}>
        {['PROFILE', 'FIELD OF STUDY', 'PROGRESS'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
              isMobile && styles.tabMobile
            ]}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
              isMobile && styles.tabTextMobile
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Box */}
      <View style={[styles.borderBox, isMobile && styles.borderBoxMobile]}>
        {renderContent()}
        
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({...additionalStyles,
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  tabHeader: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabHeaderMobile: {
    flexDirection: 'column',
    gap: 10,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 20,
  },
  tabMobile: {
    marginRight: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#003366',
  },
  tabText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  tabTextMobile: {
    fontSize: 14,
  },
  activeTabText: {
    color: '#003366',
    fontWeight: '600',
  },
  borderBox: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 24,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  borderBoxMobile: {
    padding: 16,
  },
  formContainer: {
    flex: 1,
  },
  formWrapper: {
    flexDirection: 'row',
    gap: 24,
  },
  formWrapperMobile: {
    flexDirection: 'column',
  },
  formSections: {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
  },
  formSectionsMobile: {
    flexDirection: 'column',
  },
  inputSection: {
    flex: 1,
  },
  inputSectionMobile: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#444',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  imageSection: {
    width: 200,
    alignItems: 'center',
  },
  imageSectionMobile: {
    width: '100%',
    marginTop: 20,
  },
  imageUploadContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  uploadText: {
    marginTop: 12,
    color: '#003366',
    fontSize: 14,
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: '#003366',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 200,
    boxShadow: '0 2px 4px rgba(0,51,102,0.2)',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TabbedProfile;