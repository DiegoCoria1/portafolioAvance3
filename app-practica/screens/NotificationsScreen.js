import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainLayout from '../components/MainLayout';

export default function NotificationsScreen({ navigation }) {
  return (
    <MainLayout navigation={navigation} currentRoute="Notifications">
      <View style={styles.container}>
        <Text style={styles.text}>Aquí están tus notificaciones</Text>
        {/* Agrega una lista de notificaciones aquí */}
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
