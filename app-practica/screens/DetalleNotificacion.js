// ./screens/DetalleNotificacion.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalleNotificacion = ({ route }) => {
  const { notification } = route.params;

  return (
    <View style={styles.container}>
      {/* Detalles de la notificación */}
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.type}>
          Tipo: {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
        </Text>
        {/* Aquí puedes agregar más detalles si los tienes */}
        <Text style={styles.description}>
          {/* Descripción o contenido adicional de la notificación */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Integer nec odio. Praesent libero. Sed cursus ante dapibus
          diam.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Fondo beige claro
    padding: 20,
  },
  content: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  type: {
    fontSize: 18,
    color: '#388E3C',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});

export default DetalleNotificacion;
