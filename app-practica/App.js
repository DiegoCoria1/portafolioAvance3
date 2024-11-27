// App.js

import React, { useEffect, useState } from 'react';
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
import NotificacionScreen from './screens/NotificacionScreen'; // Nueva pantalla de notificaciones
import DetalleNotificacion from './screens/DetalleNotificacion'; // Nueva pantalla de detalle de notificación
import DenunciaScreen from './screens/DenunciaScreen'; // Asegúrate de importar DenunciaScreen

// Importar los Contextos
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext'; // Importar AppProvider

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Componente para la navegación de las pestañas
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Principal"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Camara') {
            iconName = 'alert-circle'; // Ícono más relacionado con denuncias
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
      {/* Cambiar la etiqueta de "Camara" a "Denuncia" y actualizar el ícono */}
      <Tab.Screen
        name="Camara"
        component={CamaraScreen}
        options={{ tabBarLabel: 'Denuncia' }} // Etiqueta personalizada
      />
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Principal" component={PrincipalScreen} />
      <Tab.Screen name="Retiro" component={RetiroScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// Componente principal de la aplicación
function MainApp() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Mostrar la pantalla de carga durante 5 segundos

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CargaScreen />;
  }

  return (
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
          name="Notificaciones" // Nueva pantalla registrada
          component={NotificacionScreen}
          options={{ title: 'Notificaciones' }}
        />
        <Stack.Screen
          name="DetalleNotificacion" // Registrar la nueva pantalla
          component={DetalleNotificacion}
          options={{ title: 'Detalle de Notificación' }}
        />
        <Stack.Screen
          name="Retiro"
          component={RetiroScreen}
          options={{ title: 'Solicitar Retiro de Basura' }}
        />
        <Stack.Screen
          name="Denuncia" // Registrar DenunciaScreen
          component={DenunciaScreen}
          options={{ title: 'Denuncia de Basura' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider> 
        <ThemeProvider>
          <NotificationProvider>
            <PaperProvider>
              <MainApp />
            </PaperProvider>
          </NotificationProvider>
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
}
