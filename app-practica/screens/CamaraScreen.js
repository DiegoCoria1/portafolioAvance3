// screens/CamaraScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CamaraScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Aquí irá la cámara</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC', // Fondo beige
  },
  message: {
    fontSize: 18,
    color: '#333',
  },
});

export default CamaraScreen;
