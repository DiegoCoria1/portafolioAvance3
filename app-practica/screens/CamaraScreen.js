// ./screens/CamaraScreen.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const CamaraScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // Imagen capturada (simulada)

  // Función para simular la captura de una foto
  const handleCapture = () => {
    // Aquí, en una implementación real, usarías la cámara para capturar una imagen
    // Por ahora, simplemente simularemos capturando una imagen de marcador de posición
    setCapturedImage('https://via.placeholder.com/300'); // URL de imagen simulada
    setModalVisible(true);
  };

  // Función para descartar la foto capturada
  const handleDiscard = () => {
    setCapturedImage(null);
    setModalVisible(false);
  };

  // Función para agregar la denuncia y navegar a DenunciaScreen
  const handleAdd = () => {
    setModalVisible(false);
    navigation.navigate('Denuncia', { capturedImage });
  };

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=1080&q=80' }}
        style={styles.backgroundImage}
      >
        {/* Botón circular para simular la captura de foto */}
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapture}
        >
          <View style={styles.innerCircle} />
        </TouchableOpacity>
      </ImageBackground>

      {/* Modal para mostrar la foto capturada */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Imagen capturada */}
            <Image
              source={{ uri: capturedImage || 'https://via.placeholder.com/300' }}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>¿Deseas descartar o agregar esta foto?</Text>

            {/* Botones de descartar y agregar */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.discardButton}
                onPress={handleDiscard}
              >
                <Text style={styles.buttonText}>Descartar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAdd}
              >
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 5,
    borderColor: '#388E3C',
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#388E3C',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  modalText: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  discardButton: {
    flex: 1,
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CamaraScreen;
