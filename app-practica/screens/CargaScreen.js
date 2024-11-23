import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const CargaScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color="#228B22" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  logo: {
    width: 180, // Ajustar para que la imagen se vea mejor
    height: 250, // Ajuste para la proporción de la imagen subida
    tintColor: '#228B22', // Logo de color verde
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default CargaScreen;
