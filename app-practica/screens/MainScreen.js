// screens/MainScreen.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import MainLayout from '../components/MainLayout';

export default function MainScreen({ navigation }) {
  return (
    <MainLayout navigation={navigation} currentRoute="MainScreen">
      <View style={styles.container}>
        {/* Primera tarjeta con Avatar.Icon */}
        <Card style={styles.card}>
          <Card.Title
            title="Consejos Diarios"
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="lightbulb"
                style={{ backgroundColor: '#ffcb18' }}
              />
            )}
          />
          <Card.Content>
            <Paragraph>Este es el contenido de la primera tarjeta.</Paragraph>
          </Card.Content>
        </Card>

        {/* Segunda tarjeta con Avatar.Icon */}
        <Card style={styles.card}>
          <Card.Title
            title="Campañas"
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="bullhorn"
                style={{ backgroundColor: '#1e8c65' }}
              />
            )}
          />
          <Card.Content>
            <Paragraph>Este es el contenido de la segunda tarjeta.</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Ajusta según el header
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5DC',
  },
  card: {
    width: '90%',
    marginVertical: 10,
    elevation: 4,
    backgroundColor: '#fff',
  },
});
