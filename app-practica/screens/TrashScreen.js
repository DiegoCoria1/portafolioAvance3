import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainLayout from '../components/MainLayout';

export default function TrashScreen({ navigation }) {
  return (
    <MainLayout navigation={navigation} currentRoute="Trash">
      <View style={styles.container}>
        <Text style={styles.text}>Pantalla de Retiro de Basura</Text>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
