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