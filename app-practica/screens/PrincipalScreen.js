// ./screens/PrincipalScreen.js
import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NotificationContext } from '../contexts/NotificationContext';

const PrincipalScreen = () => {
  const navigation = useNavigation();
  const { hasNewNotifications } = useContext(NotificationContext);

  return (
    <View style={styles.container}>
      <View style={styles.bellContainer}>
        <Feather
          name="bell"
          size={24}
          color="#228B22"
          onPress={() => navigation.navigate('Notificaciones')}
        />
        {hasNewNotifications && <View style={styles.redDot} />}
      </View>

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
  bellContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000', // Rojo
  },
  card: {
    width: '90%',
    marginVertical: 10,
    elevation: 4,
    backgroundColor: '#fff',
  },
});

export default PrincipalScreen;
