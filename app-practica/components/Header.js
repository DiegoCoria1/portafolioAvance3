// ./components/Header.js

import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const Header = ({ title, subtitle }) => {
  const navigation = useNavigation();
  const { hasNewNotifications } = useContext(NotificationContext);

  return (
    <ImageBackground
      source={require('../assets/header-background.jpg')} // Ruta a la imagen del header
      style={styles.headerImage}
      resizeMode="cover"
    >
      {/* Superposición oscura */}
      <View style={styles.overlay} />

      {/* Contenido del Header */}
      <View style={styles.headerContent}>
        {/* Contenedor del Título y Subtítulo */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {/* Ícono de Notificaciones */}
        <TouchableOpacity
          style={styles.bellContainer}
          onPress={() => navigation.navigate('Notificaciones')}
          accessible={true}
          accessibilityLabel="Ir a las notificaciones"
        >
          <Feather name="bell" size={28} color="#fff" />
          {hasNewNotifications && <View style={styles.redDot} />}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 120, // Altura del header; ajusta según necesidad
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Para posicionar el ícono de notificaciones
    borderBottomLeftRadius: 20, // Redondear borde inferior izquierdo
    borderBottomRightRadius: 20, // Redondear borde inferior derecho
    overflow: 'hidden', // Asegurar que los bordes redondeados se apliquen correctamente
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Superposición oscura con 50% de opacidad
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24, // Tamaño del título
    fontWeight: 'bold',
    color: '#fff', // Blanco para mejor visibilidad sobre la superposición oscura
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16, // Tamaño del subtítulo
    color: '#fff', // Blanco
    textAlign: 'left',
    marginTop: 4,
  },
  bellContainer: {
    marginLeft: 10, // Espacio entre el título y el ícono
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
});

export default Header;
