// ./screens/PerfilScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback, // Importado correctamente
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const PerfilScreen = ({ navigation }) => {
  const [username, setUsername] = useState('Nombre Usuario');
  const [jobTitle, setJobTitle] = useState('Puesto de trabajo (opcional)');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [profileImage, setProfileImage] = useState(
    'https://cdn-icons-png.flaticon.com/512/8810/8810110.png'
  );

  // Estados para el inicio de sesión
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (response.didCancel) {
          console.log('Selección de imagen cancelada.');
        } else if (response.errorCode) {
          Alert.alert('Error', 'No se pudo acceder a la galería.');
        } else if (response.assets?.length > 0) {
          setProfileImage(response.assets[0].uri);
        }
      }
    );
  };

  const handleEditUsername = () => {
    setNewUsername(username);
    setIsEditing(true);
  };

  const saveUsername = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setIsEditing(false);
    } else {
      Alert.alert('Error', 'El nombre no puede estar vacío.');
    }
  };

  // Funciones para manejar el inicio de sesión
  const openLoginModal = () => {
    setEmail('');
    setPassword('');
    setIsLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalVisible(false);
  };

  const handleLogin = () => {
    // Validación simple de correo y contraseña
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }
  
    // Validación alfanumérica para la contraseña
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Al menos 6 caracteres, una letra y un número
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Error',
        'La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.'
      );
      return;
    }
  

    // Aquí deberías implementar la lógica de autenticación real
    // Por ejemplo, llamar a una API para verificar las credenciales
    // Para este ejemplo, asumiremos que las credenciales son válidas

    // Si las credenciales son válidas:
    setIsLoggedIn(true);
    setIsLoginModalVisible(false);
    Alert.alert('Éxito', 'Has iniciado sesión correctamente.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado con imagen de fondo */}
      <ImageBackground
        source={{
          uri: 'https://st.depositphotos.com/12328584/54450/v/450/depositphotos_544507094-stock-illustration-elegant-seamless-pattern-delicate-leaves.jpg',
        }}
        style={styles.header}
        imageStyle={styles.backgroundImage}
      >
        {/* Sombra sobre la imagen de fondo */}
        <View style={styles.overlay} />

        {/* Botón de configuración */}
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('Configuracion')}
        >
          <Icon name="cog" size={32} color="#ffffff" />
        </TouchableOpacity>

        {/* Avatar y botón de cámara */}
        <View style={styles.avatarContainer}>
          <Avatar.Image size={135} source={{ uri: profileImage }} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraButton} onPress={handleImagePick}>
            <Icon name="camera" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Nombre del usuario y ocupación */}
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity onPress={handleEditUsername}>
            <Icon name="pencil" size={20} color="#ffffff" style={styles.usernameIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </ImageBackground>

      {/* Modal para edición del nombre */}
      <Modal
        transparent
        visible={isEditing}
        animationType="fade"
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Nombre</Text>
            <TextInput
              style={styles.input}
              value={newUsername}
              onChangeText={setNewUsername}
              placeholder="Nuevo nombre"
              placeholderTextColor="#999"
            />
            <Button
              mode="contained"
              style={styles.saveButton}
              onPress={saveUsername}
            >
              Guardar
            </Button>
            <Button
              mode="text"
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>

      {/* Modal para inicio de sesión */}
      <Modal
        transparent
        visible={isLoginModalVisible}
        animationType="slide"
        onRequestClose={closeLoginModal}
      >
        <TouchableWithoutFeedback onPress={closeLoginModal}>
          <View style={styles.loginModalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.loginModalContainer}>
                <Text style={styles.loginModalTitle}>Inicio de Sesión</Text>
                <TextInput
                  style={styles.loginInput}
                  placeholder="Correo Electrónico"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.loginInput}
                  placeholder="Contraseña"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <View style={styles.loginButtonContainer}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    accessible={true}
                    accessibilityLabel="Ingresar"
                  >
                    <Text style={styles.loginButtonText}>Ingresar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.loginCancelButton}
                    onPress={closeLoginModal}
                    accessible={true}
                    accessibilityLabel="Cancelar"
                  >
                    <Text style={styles.loginCancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Sección de datos de contacto */}
      <ContactInfo />

      {/* Botón de Inicio de Sesión / Cerrar Sesión */}
      <View style={styles.authButtonContainer}>
        {!isLoggedIn ? (
          <Button
            mode="contained"
            onPress={openLoginModal}
            style={styles.authButton}
            accessible={true}
            accessibilityLabel="Iniciar Sesión"
          >
            Iniciar Sesión
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => {
              setIsLoggedIn(false);
              Alert.alert('Sesión Cerrada', 'Has cerrado sesión exitosamente.');
            }}
            style={styles.authButton}
            accessible={true}
            accessibilityLabel="Cerrar Sesión"
          >
            Cerrar Sesión
          </Button>
        )}
      </View>

      {/* Estadísticas personales (Solo visible si está autenticado) */}
      {isLoggedIn && <StatsSection />}

      {/* Historial de actividad (Solo visible si está autenticado) */}
      {isLoggedIn && <ActivityLog />}
    </ScrollView>
  );
};

/**
 * Componente reutilizable para la sección de datos de contacto
 */
const ContactInfo = () => (
  <Card style={styles.card}>
    <Card.Title
      title="Datos de Contacto"
      titleStyle={styles.cardTitle}
      left={(props) => <Icon {...props} name="account-box" size={24} color="#388E3C" />}
    />
    <Card.Content>
      <ContactItem icon="email" text="correousuario@gmail.com" />
      <ContactItem icon="facebook" text="@Facebook" />
      <ContactItem icon="instagram" text="@Instagram" />
    </Card.Content>
  </Card>
);

/**
 * Componente reutilizable para un ítem de contacto
 */
const ContactItem = ({ icon, text }) => (
  <View style={styles.contactItem}>
    <Icon name={icon} size={24} color="#388E3C" />
    <Text style={styles.contactText}>{text}</Text>
  </View>
);

/**
 * Componente para la sección de estadísticas personales
 */
const StatsSection = () => (
  <Card style={styles.card}>
    <Card.Title
      title="Estadísticas Personales"
      titleStyle={styles.cardTitle}
      left={(props) => <Icon {...props} name="chart-bar" size={24} color="#388E3C" />}
    />
    <Card.Content style={styles.cardContent}>
      <StatItem icon="map-marker" number={5} label="Microbasurales Reportados" />
      <StatItem icon="handshake" number={3} label="Campañas Participadas" />
    </Card.Content>
  </Card>
);

/**
 * Componente reutilizable para un ítem de estadística
 */
const StatItem = ({ icon, number, label }) => (
  <View style={styles.stat}>
    <Icon name={icon} size={30} color="#388E3C" />
    <Text style={styles.statNumber}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

/**
 * Componente para el historial de actividad
 */
const ActivityLog = () => (
  <Card style={styles.card}>
    <Card.Title
      title="Historial de Actividad"
      titleStyle={styles.cardTitle}
      left={(props) => <Icon {...props} name="history" size={24} color="#388E3C" />}
    />
    <Card.Content>
      <ActivityItem
        icon="map-marker"
        text="Reportó un microbasural en Av. Siempreviva"
      />
      <ActivityItem
        icon="leaf"
        text="Participó en la campaña 'Limpieza de Playa'"
      />
      <ActivityItem
        icon="star"
        text="Ganó 10 puntos por actividad ecológica"
      />
    </Card.Content>
  </Card>
);

/**
 * Componente reutilizable para un ítem de actividad
 */
const ActivityItem = ({ icon, text }) => (
  <View style={styles.activity}>
    <Icon name={icon} size={24} color="#388E3C" />
    <Text style={styles.activityText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 70,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  settingsIcon: {
    position: 'absolute',
    top: 50,
    right: 18,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#C8E6C9',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  usernameIcon: {
    marginLeft: 10,
  },
  jobTitle: {
    fontSize: 16,
    color: '#E8F5E9',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  stat: {
    alignItems: 'center',
    width: '45%', // Ajuste de ancho para mejor distribución
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24, // Aumentado para mayor prominencia
    fontWeight: 'bold',
    color: '#388E3C',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#388E3C',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#388E3C',
    marginBottom: 10,
    width: '100%',
  },
  cancelButton: {
    color: '#388E3C',
    fontSize: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  authButtonContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  authButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#388E3C',
  },
  authButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loginModalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  loginModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 15,
  },
  loginInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  loginButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginCancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  loginCancelButtonText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PerfilScreen;
