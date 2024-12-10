// ./screens/PrincipalScreen.js

import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Image,
  Linking,
} from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header'; // Importar el componente Header
import { NotificationContext } from '../contexts/NotificationContext';
import { Feather } from '@expo/vector-icons'; // Asegúrate de tener instalado react-native-vector-icons o expo/vector-icons

const PrincipalScreen = () => {
  const navigation = useNavigation();
  const { hasNewNotifications } = useContext(NotificationContext);

  // Estado para controlar la visibilidad del modal y la campaña o noticia seleccionada
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Puede ser campaña o noticia

  // Estado para el índice actual del consejo
  const [adviceIndex, setAdviceIndex] = useState(0);

  // Estado para el índice actual de la noticia
  const [newsIndex, setNewsIndex] = useState(0);

  // Lista de consejos diarios
  const advices = [
    {
      text: 'Recuerda siempre separar tus residuos reciclables y orgánicos para contribuir a un planeta más limpio.',
      image: require('../assets/consejo1.png'), 
    },
    {
      text: 'Apaga las luces cuando salgas de una habitación para ahorrar energía.',
      image: require('../assets/consejo2.png'),
    },
    {
      text: 'Reduce el uso de plásticos desechables llevando tus propios envases reutilizables.',
      image: require('../assets/consejo3.png'),
    },
    {
      text: 'Asegúrate de apagar y desenchufar electrodomésticos que no estás utilizando.',
      image: require('../assets/consejo4.png'),
    },
    {
      text: 'Regala ropa que ya no uses a quienes la necesiten o recíclala.',
      image: require('../assets/consejo5.png'),
    },
    {
      text: 'Haz compost en casa con tus residuos orgánicos y úsalo para nutrir tus plantas.',
      image: require('../assets/consejo6.png'),
    },
  ];

  // Lista de campañas
  const campaigns = [
    {
      id: 1,
      title: 'Nueva Campaña Ecológica',
      days: 13,
      date: '13 de diciembre',
      month: 'Dic',
      description:
        'Participa en nuestra nueva campaña ecológica para el retiro de residuos orgánicos a tu domicilio.',
    },
    {
      id: 2,
      title: 'Campaña de Compostaje',
      days: 10,
      date: '10 de enero',
      month: 'Ene',
      description:
        'Únete a la campaña de compostaje y aprende a reciclar residuos orgánicos en tu hogar con tu propia compostera.',
    },
    {
      id: 3,
      title: 'Campaña de Reciclaje',
      days: 2,
      date: '2 de febrero',
      month: 'Feb',
      description:
        'Forma parte de la campaña de reciclaje y contribuye a un planeta más limpio.',
    },
  ];

  // Lista de noticias
  const news = [
    {
      id: 1,
      title: 'Quinchao Innova con Nueva App de Reciclaje',
      description:
        'La Municipalidad de Quinchao ha lanzado una nueva aplicación móvil que facilita a los ciudadanos la ubicación de puntos de reciclaje y el seguimiento de sus esfuerzos ecológicos.',
      image: require('../assets/news1.jpg'),
      details:
        'La nueva app permite a los usuarios escanear códigos QR en los contenedores de reciclaje para registrar sus acciones y recibir recompensas virtuales. Además, ofrece consejos diarios para mejorar prácticas sostenibles en el hogar.',
    },
    {
      id: 2,
      title: 'Evento de Limpieza Comunitaria este Sábado',
      description:
        'Únete a la próxima limpieza comunitaria en las playas de Quinchao y ayuda a mantener nuestro entorno limpio y saludable.',
      image: require('../assets/news2.jpg'),
      details:
        'El evento iniciará a las 8:00 AM en la Playa Principal y finalizará a las 12:00 PM. Se proporcionará todo el material necesario y habrá refrigerios para los participantes. ¡Tu participación es crucial para el éxito de esta iniciativa!',
    },
    {
      id: 3,
      title: 'Inauguración del Nuevo Centro de Compostaje',
      description:
        'La comuna de Quinchao celebra la inauguración de su nuevo centro de compostaje, una herramienta clave para la gestión de residuos orgánicos.',
      image: require('../assets/news3.jpg'),
      details:
        'Este centro permitirá a los residentes compostar sus residuos orgánicos de manera eficiente, reduciendo la cantidad de basura que va a los vertederos y mejorando la calidad del suelo en nuestras áreas verdes.',
    },
  ];

  // Lista de redes sociales
  const socialMedia = [
    {
      id: 1,
      name: 'Facebook',
      icon: 'facebook',
      url: 'https://www.facebook.com/MuniQuinchao/?locale=es_LA',
    },
    {
      id: 2,
      name: 'Instagram',
      icon: 'instagram',
      url: 'https://www.instagram.com/muniquinchao/?hl=es',
    },
    {
      id: 3,
      name: 'Página Web',
      icon: 'globe',
      url: 'https://www.municipalidadquinchao.cl/cquinchao/',
    },
  ];

  // Función para manejar la apertura del modal
  const handleItemPress = (item, type) => {
    setSelectedItem({ ...item, type });
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  // Función para manejar la participación en una campaña
  const handleParticipate = () => {
    closeModal();
    Alert.alert('', '¡Has participado exitosamente!');
  };

  // Función para manejar la acción en una noticia
  const handleNewsAction = () => {
    closeModal();
    Alert.alert('', '¡Gracias por leer nuestras noticias!');
  };

  // Función para cambiar el índice del consejo
  const handleNextAdvice = () => {
    setAdviceIndex((prevIndex) => (prevIndex + 1) % advices.length);
  };

  const handlePrevAdvice = () => {
    setAdviceIndex((prevIndex) => (prevIndex - 1 + advices.length) % advices.length);
  };

  // Función para abrir una URL
  const openSocialMedia = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `No se puede abrir la URL: ${url}`);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la URL.');
      console.error('Error al abrir la URL:', error);
    }
  };

  // Función para obtener el color según la red social
  const getSocialMediaColor = (name) => {
    switch (name) {
      case 'Facebook':
        return '#3b5998';
      case 'Instagram':
        return '#C13584';
      case 'Página Web':
        return '#0077B5';
      default:
        return '#000';
    }
  };

  // Obtener la fecha actual en formato DD/MM/YYYY
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Funciones para navegar entre noticias
  const handleNextNews = () => {
    setNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const handlePrevNews = () => {
    setNewsIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  // Cambiar noticia automáticamente cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <View style={styles.container}>
      {/* Imagen de fondo principal */}
      <ImageBackground
        source={require('../assets/Fondo-logo.jpeg')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Header Reutilizable */}
        <Header title="Bienvenido/a" subtitle="¡Estamos encantados de tenerte aquí!" />

        {/* Contenido Principal */}
        <ScrollView contentContainerStyle={styles.content}>
          {/* Tarjeta de Consejos Diarios */}
          <Card style={styles.card}>
            <Card.Title
              title="Consejos Diarios"
              titleStyle={styles.cardTitle}
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
              <Paragraph style={styles.adviceText}>{advices[adviceIndex].text}</Paragraph>
              {/* Imagen del Consejo */}
              <Image
                source={advices[adviceIndex].image}
                style={styles.adviceImage}
                resizeMode="cover"
              />
              {/* Botones de Navegación */}
              <View style={styles.adviceNavigation}>
                <TouchableOpacity onPress={handlePrevAdvice} style={styles.navButton}>
                  <Feather name="chevron-left" size={30} color="#289a20" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextAdvice} style={styles.navButton}>
                  <Feather name="chevron-right" size={30} color="#289a20" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          {/* Tarjeta de Campañas */}
          <Card style={styles.card}>
            <Card.Title
              title="Campañas"
              titleStyle={styles.cardTitle}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="bullhorn"
                  style={{ backgroundColor: '#1e8c65' }}
                />
              )}
            />
            <View style={styles.subtitleContainer}>
              <Text style={styles.cardSubtitle}>¡Súmate a nuestro proyecto ambiental!</Text>
            </View>
            <Card.Content>
              {campaigns.map((campaign) => (
                <TouchableOpacity
                  key={campaign.id}
                  style={styles.campaignItem}
                  onPress={() => handleItemPress(campaign, 'campaña')}
                  accessible={true}
                  accessibilityLabel={`Campaña ${campaign.title}, ${campaign.date}`}
                >
                  {/* Círculo verde al lado del título */}
                  <View style={styles.campaignIndicator} />
                  <Text style={styles.campaignTitle}>{campaign.title}</Text>
                  {/* Círculo verde con número en blanco */}
                  <View style={styles.campaignDaysContainer}>
                    <Text style={styles.campaignDays}>{campaign.days}</Text>
                    <Text style={styles.campaignMonth}>{campaign.month}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          {/* Tarjeta de Noticias Quinchao */}
          <Card style={styles.card}>
            <Card.Title
              title="Noticias Quinchao"
              titleStyle={styles.cardTitle}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="newspaper"
                  style={{ backgroundColor: '#388E3C' }}
                />
              )}
            />
            <Card.Content>
              {/* Noticia Actual */}
              <TouchableOpacity
                style={styles.newsItemSingle}
                onPress={() => handleItemPress(news[newsIndex], 'noticia')}
                accessible={true}
                accessibilityLabel={`Noticia ${news[newsIndex].title}`}
              >
                {/* Imagen de la Noticia */}
                <Image
                  source={news[newsIndex].image}
                  style={styles.newsImageSingle}
                  resizeMode="cover"
                />
                {/* Título de la Noticia */}
                <Text style={styles.newsTitleSingle}>{news[newsIndex].title}</Text>
                {/* Descripción de la Noticia */}
                <Paragraph style={styles.newsDescriptionSingle}>
                  {news[newsIndex].description}
                </Paragraph>
              </TouchableOpacity>

              {/* Botones de Navegación de Noticias */}
              <View style={styles.newsNavigation}>
                <TouchableOpacity
                  onPress={handlePrevNews}
                  style={styles.navButton}
                  accessible={true}
                  accessibilityLabel="Noticia Anterior"
                >
                  <Feather name="chevron-left" size={30} color="#289a20" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextNews}
                  style={styles.navButton}
                  accessible={true}
                  accessibilityLabel="Siguiente Noticia"
                >
                  <Feather name="chevron-right" size={30} color="#289a20" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          {/* Tarjeta de Redes Sociales */}
          <Card style={styles.card}>
            <Card.Title
              title="Conéctate con la Municipalidad"
              titleStyle={styles.cardTitle}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="share-variant"
                  style={{ backgroundColor: '#3b5998' }}
                />
              )}
            />
            <Card.Content>
              <View style={styles.socialMediaContainer}>
                {socialMedia.map((platform) => (
                  <TouchableOpacity
                    key={platform.id}
                    style={styles.socialMediaButton}
                    onPress={() => openSocialMedia(platform.url)}
                    accessible={true}
                    accessibilityLabel={`Abrir ${platform.name}`}
                  >
                    <Feather
                      name={platform.icon}
                      size={32}
                      color={getSocialMediaColor(platform.name)}
                    />
                    <Text style={styles.socialMediaText}>{platform.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </ImageBackground>

      {/* Modal para Detalles de Campaña o Noticia */}
      {selectedItem && (
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
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                    accessible={true}
                    accessibilityLabel="Cerrar Modal"
                  >
                    <Feather name="x" size={24} color="#555" />
                  </TouchableOpacity>

                  {/* Título del Elemento Seleccionado */}
                  <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                  {/* Fecha del Elemento Seleccionado (para campañas) */}
                  {selectedItem.date && (
                    <Text style={styles.modalDate}>{selectedItem.date}</Text>
                  )}
                  {/* Descripción/Detalle según el tipo */}
                  <Text style={styles.modalDescription}>
                    {selectedItem.type === 'campaña' ? selectedItem.description : selectedItem.details}
                  </Text>

                  {/* Botón de Acción según el Tipo */}
                  {selectedItem.type === 'campaña' ? (
                    <TouchableOpacity
                      style={styles.participateButton}
                      onPress={handleParticipate}
                      accessible={true}
                      accessibilityLabel="Participar en la Campaña"
                    >
                      <Text style={styles.participateButtonText}>Participar</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.participateButton}
                      onPress={handleNewsAction}
                      accessible={true}
                      accessibilityLabel="Acción en la Noticia"
                    >
                      <Text style={styles.participateButtonText}>Leer Más</Text>
                    </TouchableOpacity>
                  )}
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
    backgroundColor: '#f5f5dc',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  content: {
    flexGrow: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    paddingBottom: 20,
  },
  card: {
    width: '94%',
    marginVertical: 10,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 17.5,
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  adviceText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  adviceImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 8,
  },
  adviceNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  newsNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  navButton: {
    padding: 10,
  },
  subtitleContainer: {
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardSubtitle: {
    fontSize: 17,
    color: '#2E7D32',
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
    backgroundColor: '#2E7D32',
    marginRight: 10,
  },
  campaignTitle: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  campaignDaysContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  campaignDays: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  campaignMonth: {
    fontSize: 7.9,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  newsItemSingle: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  newsImageSingle: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  newsTitleSingle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2E7D32',
    textAlign: 'center',
  },
  newsDescriptionSingle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'justify',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  socialMediaButton: {
    alignItems: 'center',
    marginVertical: 10,
    width: 80,
  },
  socialMediaText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: '#1e8c65',
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
