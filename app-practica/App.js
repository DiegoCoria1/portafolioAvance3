// App.js

import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

// Importar pantallas
import CamaraScreen from './screens/CamaraScreen';
import MapaScreen from './screens/MapaScreen';
import PrincipalScreen from './screens/PrincipalScreen';
import RetiroScreen from './screens/RetiroScreen';
import PerfilScreen from './screens/PerfilScreen';
import ConfiguracionScreen from './screens/ConfiguracionScreen';
import CargaScreen from './screens/CargaScreen';
import NotificacionScreen from './screens/NotificacionScreen'; 
import DetalleNotificacion from './screens/DetalleNotificacion';
import DenunciaScreen from './screens/DenunciaScreen'; 

// Importar Contextos
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext'; 
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Principal"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Denuncia') {
            iconName = 'alert-circle';
          } else if (route.name === 'Mapa') {
            iconName = 'map-pin';
          } else if (route.name === 'Principal') {
            iconName = 'home';
          } else if (route.name === 'Retiro') {
            iconName = 'trash-2';
          } else if (route.name === 'Perfil') {
            iconName = 'user';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#228B22',
        tabBarInactiveTintColor: '#D2B48C',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Denuncia"
        component={DenunciaScreen}
        options={{ tabBarLabel: 'Denuncia' }}
      />
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Principal" component={PrincipalScreen} />
      <Tab.Screen name="Retiro" component={RetiroScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

function MainApp() {
  const { theme } = useContext(ThemeContext); 

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Configuracion"
            component={ConfiguracionScreen}
            options={{ title: 'Configuración' }}
          />
          <Stack.Screen
            name="Notificaciones"
            component={NotificacionScreen}
            options={{ title: 'Notificaciones' }}
          />
          <Stack.Screen
            name="DetalleNotificacion"
            component={DetalleNotificacion}
            options={{ title: 'Detalle de Notificación' }}
          />
          <Stack.Screen
            name="Denuncia"
            component={DenunciaScreen}
            options={{ title: 'Denuncia de Basura' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos un tiempo de carga de 5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Mientras isLoading sea true, mostramos la pantalla de carga
    return <CargaScreen />;
  }

  return (
    <AuthProvider>
      <AppProvider>
        <NotificationProvider>
          <ThemeProvider>
            <MainApp />
          </ThemeProvider>
        </NotificationProvider>
      </AppProvider>
    </AuthProvider>
  );
}
