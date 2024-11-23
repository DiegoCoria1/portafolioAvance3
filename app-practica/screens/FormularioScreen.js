import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';

const FormularioScreen = ({ route, navigation }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <TextInput style={styles.input} placeholder="Ingrese un título..." />
      <TextInput
        style={styles.input}
        placeholder="Descripción..."
        multiline
        numberOfLines={4}
      />
      <Button title="Guardar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  photo: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default FormularioScreen;
