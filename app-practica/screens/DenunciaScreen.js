// ./screens/DenunciaScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const DenunciaScreen = ({ route, navigation }) => {
  const { capturedImage } = route.params || {};
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (address.trim() === '') {
      Alert.alert('Error', 'Por favor, ingresa una dirección.');
      return;
    }

    // Aquí iría la lógica para enviar la denuncia al backend

    Alert.alert('Denuncia Enviada', 'Tu denuncia ha sido enviada correctamente.', [
      {
        text: 'OK',
        onPress: () => navigation.popToTop(), // Navega de regreso a PrincipalScreen
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Denuncia de Basura</Text>
        
        {/* Imagen tomada */}
        <Image
          source={{ uri: capturedImage || 'https://cdn-icons-png.flaticon.com/512/8810/8810110.png' }}
          style={styles.image}
        />

        {/* Dirección */}
        <TextInput
          label="Dirección"
          placeholder="Ingresa la dirección"
          mode="outlined"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />

        {/* Botón para agregar ubicación */}
        <Button
          mode="outlined"
          icon="map-marker"
          onPress={() => Alert.alert('Ubicación', 'Funcionalidad por implementar')}
          style={styles.button}
        >
          Agregar mi Ubicación
        </Button>

        {/* Botón para enviar denuncia */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Enviar Denuncia
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#228B22', // Verde Bosque
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    borderColor: '#228B22', // Verde Bosque
    borderWidth: 1,
    marginBottom: 15,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#228B22', // Verde Bosque
  },
});

export default DenunciaScreen;
