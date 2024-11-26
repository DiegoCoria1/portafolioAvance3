import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NotificationContext } from '../contexts/NotificationContext';

const PrincipalScreen = () => {
  const navigation = useNavigation();
  const { hasNewNotifications } = useContext(NotificationContext);

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <ImageBackground
        source={require('../assets/Fondo-logo.jpeg')}
        style={styles.background}
        resizeMode="contain"
      >
        {/* Título y Subtítulo */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Bienvenido/a</Text>
          <Text style={styles.subtitle}>¡Estamos encantados de tenerte aqui!</Text>
        </View>

        {/* Contenido Principal */}
        <View style={styles.content}>
          <View style={styles.bellContainer}>
            <Feather
              name="bell"
              size={28}
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

          {/* Tercer tarjeta con Noticias Quinchao */}
          <Card style={styles.card}>
            <Card.Title
              title="Noticias Quinchao"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="newspaper"
                  style={{ backgroundColor: '#388E3C' }}
                />
              )}
            />
            <Card.Content>
              <Paragraph>Últimas noticias y eventos de la comuna de Quinchao.</Paragraph>
              <ImageBackground
                source={{ uri: 'https://c.files.bbci.co.uk/F54F/production/_131099726_breaking_news_mundo-002.png?mrf-size=m' }} // Cambiar por la URL de la imagen real
                style={styles.newsImage}
                resizeMode="cover"
              />
            </Card.Content>
          </Card>

        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc', // Color de fondo para cubrir los bordes
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  headerContainer: {
    position: 'absolute', // Fija la posición arriba
    top: 40,
    left: 20,
    right: 0,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C', // Verde oscuro
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14.5,
    color: '#388E3C', // Verde oscuro
    textAlign: 'center',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  bellContainer: {
    position: 'absolute',
    top: 45,
    right: 20,
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
  card: {
    width: '90%',
    marginVertical: 10,
    elevation: 4,
    backgroundColor: '#fff',
  },
  newsImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default PrincipalScreen;