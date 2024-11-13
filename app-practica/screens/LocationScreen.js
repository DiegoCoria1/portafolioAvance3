import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainLayout from '../components/MainLayout';

export default function LocationScreen({ navigation }) {
  return (
    <MainLayout navigation={navigation} currentRoute="Location">
      <View style={styles.container}>
        {/* Imagen que ocupa toda la pantalla */}
        <Image
          source={require('../assets/Quin.png')} 
          style={styles.image}
          resizeMode="cover"
        />

        {/* Contenedor inferior */}
        <View style={styles.bottomContainer}>
          {/* Título */}
          <Text style={styles.title}>Puntos Verdes</Text>

          {/* Iconos en fila */}
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="eye-outline" size={28} color="#2E7D32" />
              <Text style={styles.iconText}>Mostrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={28} color="#2E7D32" />
              <Text style={styles.iconText}>Buscar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="filter-outline" size={28} color="#2E7D32" />
              <Text style={styles.iconText}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1, // La imagen ocupa todo el espacio restante
    width: '100%',
  },
  bottomContainer: {
    height: 100, 
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde oscuro
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    color: '#2E7D32', // Verde oscuro
    marginTop: 5,
  },
});
