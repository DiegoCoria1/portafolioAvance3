import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './contexts/ThemeContext';
import { Provider as PaperProvider } from 'react-native-paper';

//Importamos 
import HomeSplash from './screens/HomeSplash';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen from './screens/CameraScreen';
import LocationScreen from './screens/LocationScreen';
import TrashScreen from './screens/TrashScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
//Diferentes screens
export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeSplash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeSplash" component={HomeSplash} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Trash" component={TrashScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}
