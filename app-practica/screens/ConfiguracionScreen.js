import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfiguracionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Configuración</Text>
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
});

export default ConfiguracionScreen;
