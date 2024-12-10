import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ImageBackground } from 'react-native';

const CargaScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fondo-logo.jpeg')}
        style={styles.background}
        resizeMode="contain" // La imagen mantiene su proporción
      >
        <View style={styles.overlay}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
          <ActivityIndicator size="large" color="#228B22" style={styles.loader} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Color beige como fondo
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Tamaño reducido del logo
    height: 200, // Ajuste proporcional
    tintColor: '#228B22', // Aplica un tinte verde al logo
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default CargaScreen;
