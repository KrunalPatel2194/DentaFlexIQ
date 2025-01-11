// App.js
import 'react-native-gesture-handler';  // This must be the first import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLayout from './Layout';
import TabbedProfile from './components/Profile';
// import HomeScreen from './components/Home/homeScreen';
import { Login,Register } from './components/layout/Auth/login';
// import { Register } from './components/layout/auth/Register';
import ForgotPassword from './components/layout/Auth/resetpassword';
import AdminDashboard from './components/Admin/Dashboard/adminDashboard';
// import AdminDashboard from './components/Admin/Dashboard';
// import AdminHome from './components/Admin/Dashboard/homeScreen';

const Stack = createStackNavigator();

// Home Screen Component
const AdminDashboardScreen = ({ navigation }) => (
  <AppLayout>
    <AdminDashboard navigation={navigation} />
  </AppLayout>
);

// Profile Screen Component
const ProfileScreen = ({ navigation }) => (
  <AppLayout>
    <TabbedProfile navigation={navigation} />
  </AppLayout>
);

const App = () => {
  // You can add authentication state here
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#f5f5f5' },
            // You can add more global screen options here
          }}
        >
          {/* Auth Screens */}
          <Stack.Group>
            <Stack.Screen 
              name="Login" 
              component={Login}
              options={{
                gestureEnabled: false,
                animationTypeForReplace: 'pop',
              }}
            />
            <Stack.Screen 
              name="Register" 
              component={Register}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPassword}
              options={{
                gestureEnabled: false,
              }}
            />
          </Stack.Group>

          {/* App Screens */}
          <Stack.Group>
            <Stack.Screen 
              name="Home" 
              component={AdminDashboardScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{
                gestureEnabled: true,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

/*
File Structure:
/components
  /auth
    /Login.js
    /Register.js
    /ForgotPassword.js
  /Home.js
  /Profile.js
/Layout.js
App.js
*/