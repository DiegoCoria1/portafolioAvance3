// ./screens/ConfiguracionScreen.js

import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  List,
  Switch,
  Divider,
  Button,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../contexts/ThemeContext'; // Contexto para el tema
import { AuthContext } from '../contexts/AuthContext'; // Contexto para autenticación

const ConfiguracionScreen = ({ navigation }) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: () => logout(), style: 'destructive' },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => {/* Lógica para eliminar cuenta */}, style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        {/* Tema de la Aplicación */}
        <List.Item
          title="Tema Oscuro"
          left={() => <Icon name="theme-light-dark" size={24} color="#388E3C" style={styles.listIcon} />}
          right={() => (
            <Switch
              value={isDarkTheme}
              onValueChange={toggleTheme}
              color="#388E3C"
            />
          )}
        />
        <Divider />

        {/* Configuración de Notificaciones */}
        <List.Item
          title="Notificaciones"
          description="Activar o desactivar notificaciones"
          left={() => <Icon name="bell" size={24} color="#388E3C" style={styles.listIcon} />}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
              color="#388E3C"
            />
          )}
        />
        <Divider />

        {/* Preferencias de Idioma */}
        <List.Accordion
          title="Idioma"
          left={() => <Icon name="translate" size={24} color="#388E3C" style={styles.listIcon} />}
        >
          <List.Item
            title="Español"
            onPress={() => Alert.alert('Idioma', 'Español seleccionado')}
          />
          <List.Item
            title="Inglés"
            onPress={() => Alert.alert('Idioma', 'Inglés seleccionado')}
          />
          {/* Agrega más idiomas según sea necesario */}
        </List.Accordion>
        <Divider />

        {/* Gestión de Cuenta */}
        <List.Accordion
          title="Cuenta"
          left={() => <Icon name="account" size={24} color="#388E3C" style={styles.listIcon} />}
        >
          <List.Item
            title="Cambiar Contraseña"
            onPress={() => navigation.navigate('CambiarContrasena')} // Navega a la nueva pantalla
          />
          <List.Item
            title="Eliminar Cuenta"
            onPress={handleDeleteAccount}
            titleStyle={{ color: 'red' }}
            left={() => <Icon name="delete" size={24} color="red" style={styles.listIcon} />} // Ícono adicional
          />
        </List.Accordion>
        <Divider />

        {/* Sobre la Aplicación */}
        <List.Accordion
          title="Sobre la Aplicación"
          left={() => <Icon name="information" size={24} color="#388E3C" style={styles.listIcon} />}
        >
          <List.Item
            title="Versión"
            description="1.0.0"
            left={() => <Icon name="source-branch" size={24} color="#388E3C" style={styles.listIcon} />}
          />
          <List.Item
            title="Términos y Condiciones"
            onPress={() => Alert.alert('Términos y Condiciones', 'Funcionalidad por implementar')}
            left={() => <Icon name="file-document" size={24} color="#388E3C" style={styles.listIcon} />}
          />
          <List.Item
            title="Política de Privacidad"
            onPress={() => Alert.alert('Política de Privacidad', 'Funcionalidad por implementar')}
            left={() => <Icon name="shield-lock" size={24} color="#388E3C" style={styles.listIcon} />}
          />
        </List.Accordion>
        <Divider />

        {/* Cerrar Sesión */}
        <View style={styles.logoutButtonContainer}>
          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.logoutButton}
            icon="logout"
          >
            Cerrar Sesión
          </Button>
        </View>
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  logoutButtonContainer: {
    margin: 15,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
  },
  listIcon: { // Nuevo estilo para los íconos de la lista
    marginLeft: 10, // Ajusta este valor según tus preferencias
  },
});

export default ConfiguracionScreen;
