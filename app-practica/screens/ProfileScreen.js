import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainLayout from '../components/MainLayout';

export default function ProfileScreen({ navigation }) {
  return (
    <MainLayout navigation={navigation} currentRoute="Profile">
      <View style={styles.container}>
        {/* Título de perfil */}
        <Text style={styles.title}>Perfil</Text>

        {/* Botón de configuración */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Configuración</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5DC', // Color de fondo beige claro
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde oscuro
    marginBottom: 20,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32', // Verde oscuro
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

