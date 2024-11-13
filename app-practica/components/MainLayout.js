import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomMenu from './BottomMenu';
import { ThemeContext } from '../contexts/ThemeContext';

export default function MainLayout({ children, navigation, currentRoute }) {
  const theme = useContext(ThemeContext);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  const handleNotificationPress = () => {
    setHasNewNotifications(false);
    navigation.navigate('Notifications');
  };

  // Estilo dinámico para el contenido
  const dynamicContentStyle = currentRoute === 'Location'
    ? styles.contentNoPadding // Sin márgenes para LocationScreen
    : styles.content;        // Con márgenes para otras pantallas

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header con notificaciones */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleNotificationPress}
        >
          <Ionicons name="notifications-outline" size={30} color="#2E7D32" />
          {hasNewNotifications && <View style={styles.notificationDot} />}
        </TouchableOpacity>
      </View>

      {/* Contenido principal con estilo dinámico */}
      <View style={dynamicContentStyle}>{children}</View>

      {/* Menú inferior */}
      <BottomMenu navigation={navigation} currentRoute={currentRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationDot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
    top: -5,
    right: -5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20, // Márgenes horizontales
    paddingBottom: 60,     // Espacio para el BottomMenu
  },
  contentNoPadding: {
    flex: 1,
    paddingHorizontal: 0, // Sin márgenes horizontales
    paddingBottom: 0,     // Sin espacio adicional
  },
});
