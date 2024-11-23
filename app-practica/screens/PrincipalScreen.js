import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PrincipalScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Feather
        name="bell"
        size={24}
        color="#228B22"
        style={{ position: 'absolute', top: 40, right: 20 }}
        onPress={() => navigation.navigate('Notificaciones')} // Cambiado a "Notificaciones"
      />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
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

export default PrincipalScreen;
