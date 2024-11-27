// ./screens/PrincipalScreen.js

import React, { useContext, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NotificationContext } from '../contexts/NotificationContext';

const PrincipalScreen = () => {
  const navigation = useNavigation();
  const { hasNewNotifications } = useContext(NotificationContext);

  // Estado para controlar la visibilidad del modal y la campaña seleccionada
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Obtener la fecha actual en formato DD/MM/YYYY
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Datos de campañas con días y fechas específicas
  const campaigns = [
    {
      id: 1,
      title: 'Nueva Campaña Ecológica',
      days: 15,
      date: '15 de noviembre',
      description: 'Participa en nuestra nueva campaña ecológica para preservar el medio ambiente.',
    },
    {
      id: 2,
      title: 'Campaña de Compostaje',
      days: 10,
      date: '10 de noviembre',
      description: 'Únete a la campaña de compostaje y aprende a reciclar residuos orgánicos.',
    },
    {
      id: 3,
      title: 'Campaña de Reciclaje',
      days: 2,
      date: '2 de noviembre',
      description: 'Forma parte de la campaña de reciclaje y contribuye a un planeta más limpio.',
    },
  ];

  // Función para manejar la apertura del modal con la campaña seleccionada
  const handleCampaignPress = (campaign) => {
    setSelectedCampaign(campaign);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedCampaign(null);
  };

  // Función para manejar la participación en una campaña
  const handleParticipate = () => {
    // Aquí puedes implementar la lógica para participar en la campaña
    // Por ejemplo, enviar una solicitud al backend, actualizar el estado, etc.
    // Por ahora, simplemente cerraremos el modal
    closeModal();
    alert('¡Has participado en la campaña exitosamente!');
  };

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
          <Text style={styles.subtitle}>¡Estamos encantados de tenerte aquí!</Text>
        </View>

        {/* Contenido Principal */}
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.bellContainer}>
            <Feather
              name="bell"
              size={28}
              color="#228B22"
              onPress={() => navigation.navigate('Notificaciones')}
            />
            {hasNewNotifications && <View style={styles.redDot} />}
          </View>

          {/* Tarjeta de Consejos Diarios */}
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
              {/* Fecha Actual */}
              <Text style={styles.dateText}>{getCurrentDate()}</Text>
              {/* Consejo Medioambiental */}
              <Paragraph style={styles.adviceText}>
                Recuerda siempre separar tus residuos reciclables y orgánicos para contribuir a un planeta más limpio.
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Tarjeta de Campañas */}
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
              {campaigns.map((campaign) => (
                <TouchableOpacity
                  key={campaign.id}
                  style={styles.campaignItem}
                  onPress={() => handleCampaignPress(campaign)}
                  accessible={true}
                  accessibilityLabel={`Campaña ${campaign.title}, ${campaign.date}`}
                >
                  {/* Círculo verde al lado del título */}
                  <View style={styles.campaignIndicator} />
                  <Text style={styles.campaignTitle}>{campaign.title}</Text>
                  {/* Círculo verde con número en blanco */}
                  <View style={styles.campaignDaysContainer}>
                    <Text style={styles.campaignDays}>{campaign.days}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          {/* Tarjeta de Noticias Quinchao */}
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

        </ScrollView>
      </ImageBackground>

      {/* Modal para Detalles de Campaña */}
      {selectedCampaign && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  {/* Botón de Cerrar (X) */}
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal} accessible={true} accessibilityLabel="Cerrar Modal">
                    <Feather name="x" size={24} color="#555" />
                  </TouchableOpacity>

                  {/* Título de la Campaña */}
                  <Text style={styles.modalTitle}>{selectedCampaign.title}</Text>
                  {/* Fecha de la Campaña */}
                  <Text style={styles.modalDate}>{selectedCampaign.date}</Text>
                  {/* Descripción de la Campaña */}
                  <Text style={styles.modalDescription}>{selectedCampaign.description}</Text>

                  {/* Botón de Participar */}
                  <TouchableOpacity style={styles.participateButton} onPress={handleParticipate} accessible={true} accessibilityLabel="Participar en la Campaña">
                    <Text style={styles.participateButtonText}>Participar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
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
    flexGrow: 1,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    paddingBottom: 20,
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
    borderRadius: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  adviceText: {
    fontSize: 14,
    color: '#333', // Cambiado de verde a negro
  },
  campaignItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  campaignIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E7D32', // Verde para el círculo
    marginRight: 10,
  },
  campaignTitle: {
    flex: 1,
    fontSize: 16,
    color: '#000', // Cambiado de verde a negro
  },
  campaignDaysContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E7D32', // Verde para el círculo
    justifyContent: 'center',
    alignItems: 'center',
  },
  campaignDays: {
    color: '#fff', // Número en blanco
    fontSize: 14,
    fontWeight: 'bold',
  },
  newsImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 8,
  },
  // Estilos para el Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalDate: {
    fontSize: 16,
    color: '#388E3C',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  participateButton: {
    backgroundColor: '#1e8c65', // Verde más oscuro para el botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  participateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrincipalScreen;
