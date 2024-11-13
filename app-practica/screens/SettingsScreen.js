import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainLayout from '../components/MainLayout';

export default function SettingsScreen({ navigation }) {
  return (
    <MainLayout navigation={navigation} currentRoute="Settings">
      <View style={styles.container}>
        <Text style={styles.text}>Configuraciones</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
});

