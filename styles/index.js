// styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...(Platform.OS === 'web' ? { minHeight: windowHeight } : {}),
  },
  header: {
    backgroundColor: '#333',
    padding: 20,
    width: '100%',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    marginTop: 10,
  },
  navLink: {
    color: '#fff',
    marginRight: 20,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
  content: {
    flex: 1,
    padding: 20,
  },
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    backgroundColor: '#033F6A',
    padding: 20,
    width: '100%',
    backgroundColor: 'yellow'
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default styles;