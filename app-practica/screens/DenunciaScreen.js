// ./screens/DenunciaScreen.js

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Button,
  Checkbox,
  Text,
  HelperText,
  Card,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import CustomTextInput from '../components/CustomTextInput'; // Ajusta la ruta según tu estructura de carpetas

const DenunciaScreen = ({ route, navigation }) => {
  const { capturedImage } = route.params || {};
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [address, setAddress] = useState('');
  const [rut, setRut] = useState('');
  const [comentario, setComentario] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal de Términos y Condiciones
  const [successModalVisible, setSuccessModalVisible] = useState(false); // Modal de Confirmación
  const [image, setImage] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  // Función para calcular el dígito verificador del RUT
  const calcularDV = (rutNumerico) => {
    let suma = 0;
    let multiplicador = 2;

    for (let i = rutNumerico.length - 1; i >= 0; i--) {
      const digit = parseInt(rutNumerico.charAt(i));
      if (isNaN(digit)) {
        return null;
      }
      suma += digit * multiplicador;
      multiplicador = (multiplicador === 7) ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const dv = 11 - resto;

    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return dv.toString();
  };

  // Validación básica del RUT con rango actualizado
  const validateRut = (rutCompleto) => {
    const rutRegex = /^\d{7,8}-[0-9Kk]$/;
    if (!rutRegex.test(rutCompleto)) {
      console.log(`Formato inválido: ${rutCompleto}`);
      return false;
    }

    const [rutNumerico, dv] = rutCompleto.split('-');
    const rutNumber = parseInt(rutNumerico, 10);

    // Validar rango entre 1.000.000 y 99.999.999
    if (rutNumber < 1000000 || rutNumber > 99999999) {
      console.log(`RUT fuera de rango: ${rutNumber}`);
      return false;
    }

    const dvCalculado = calcularDV(rutNumerico);
    console.log(`DV calculado: ${dvCalculado}, DV ingresado: ${dv.toUpperCase()}`);

    if (dvCalculado === null) {
      console.log(`Error en cálculo del DV para: ${rutCompleto}`);
      return false;
    }

    return dvCalculado === dv.toUpperCase();
  };

  // Validación de dirección
  const validateAddress = (addr) => {
    return addr.trim().length >= 5;
  };

  // Validación de nombre
  const validateNombre = (name) => {
    return name.trim().length >= 3;
  };

  // Validación de correo
  const validateCorreo = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Validación de teléfono
  const validateTelefono = (phone) => {
    const phoneRegex = /^\d{9}$/; // Asumiendo 9 dígitos
    return phoneRegex.test(phone.trim());
  };

  // Validación de comentario adicional (opcional)
  const validateComentario = (comment) => {
    return comment.trim().length <= 500;
  };

  const hasErrors = () => {
    return (
      !validateRut(rut.trim()) ||
      !validateAddress(address) ||
      !validateNombre(nombre.trim()) ||
      !validateCorreo(correo.trim()) ||
      !validateTelefono(telefono.trim()) ||
      (comentario.trim().length > 0 && !validateComentario(comentario)) ||
      !aceptaTerminos ||
      isSubmitting
    );
  };

  const handleSubmit = async () => {
    if (!validateNombre(nombre)) {
      Alert.alert('Error', 'Por favor, ingresa un nombre válido (mínimo 3 caracteres).');
      return;
    }

    if (!validateCorreo(correo)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!validateTelefono(telefono)) {
      Alert.alert('Error', 'Por favor, ingresa un teléfono válido (9 dígitos).');
      return;
    }

    if (!validateAddress(address)) {
      Alert.alert('Error', 'Por favor, ingresa una dirección válida.');
      return;
    }

    if (!validateRut(rut)) {
      Alert.alert('Error', 'Por favor, ingresa un RUT válido.');
      return;
    }

    if (comentario.trim().length > 0 && !validateComentario(comentario)) {
      Alert.alert('Error', 'El comentario adicional no debe exceder los 500 caracteres.');
      return;
    }

    if (!aceptaTerminos) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones para continuar.');
      return;
    }

    if (!image) {
      Alert.alert('Error', 'Por favor, adjunta una imagen a tu denuncia.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulación de envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular retraso

      // Mostrar el modal de éxito
      setSuccessModalVisible(true);

      // Resetear el formulario
      setNombre('');
      setCorreo('');
      setTelefono('');
      setAddress('');
      setRut('');
      setComentario('');
      setAceptaTerminos(false);
      setImage(null);
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar la denuncia. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función de formateo del RUT
  const formatRut = (input) => {
    let cleaned = input.toUpperCase().replace(/[^0-9K]/g, '');

    if (cleaned.length === 0) return '';

    if (cleaned.length > 1) {
      cleaned = cleaned.slice(0, -1) + '-' + cleaned.slice(-1);
    }

    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    return cleaned;
  };

  // Función para solicitar permisos y abrir la cámara
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a la cámara para tomar fotos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  // Función para solicitar permisos y abrir la galería
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a tu galería para seleccionar fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  // Función para obtener la ubicación actual del usuario
  const obtenerUbicacion = async () => {
    setIsFetchingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a tu ubicación para agregarla automáticamente.');
      setIsFetchingLocation(false);
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (geocode.length > 0) {
        const direccion = `${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}, ${geocode[0].country}`;
        setAddress(direccion);
        Alert.alert('Ubicación Agregada', 'Tu ubicación ha sido agregada automáticamente.');
      } else {
        Alert.alert('Error', 'No se pudo obtener la dirección a partir de tu ubicación.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al obtener tu ubicación.');
    } finally {
      setIsFetchingLocation(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Encabezado con imagen de fondo */}
        <ImageBackground
          source={{
            uri: 'https://st.depositphotos.com/12328584/54450/v/450/depositphotos_544507094-stock-illustration-elegant-seamless-pattern-delicate-leaves.jpg',
          }}
          style={styles.header}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.overlay} />
          <Text style={styles.headerTitle}>Denuncia Micro-Basural</Text>
        </ImageBackground>

        <Card style={styles.card}>
          <Card.Content>
            {/* Sección de Información Personal */}
            <View style={styles.section}>
              <CustomTextInput
                label={
                  <>
                    Nombre <Text style={styles.required}>*</Text>
                  </>
                }
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingresa tu nombre"
                error={nombre.trim().length > 0 && !validateNombre(nombre)}
                helperText="El nombre debe tener al menos 3 caracteres."
                style={styles.input}
              />

              <CustomTextInput
                label={
                  <>
                    Correo Electrónico <Text style={styles.required}>*</Text>
                  </>
                }
                value={correo}
                onChangeText={setCorreo}
                placeholder="ejemplo@correo.com"
                keyboardType="email-address"
                error={correo.trim().length > 0 && !validateCorreo(correo)}
                helperText="Ingresa un correo electrónico válido."
                style={styles.input}
              />

              <CustomTextInput
                label={
                  <>
                    Teléfono <Text style={styles.required}>*</Text>
                  </>
                }
                value={telefono}
                onChangeText={(text) => setTelefono(text.replace(/[^0-9]/g, ''))}
                placeholder="123456789"
                keyboardType="phone-pad"
                maxLength={9}
                error={telefono.trim().length > 0 && !validateTelefono(telefono)}
                helperText="Ingresa un teléfono válido de 9 dígitos."
                style={styles.input}
              />

              <CustomTextInput
                label={
                  <>
                    RUT <Text style={styles.required}>*</Text>
                  </>
                }
                value={rut}
                onChangeText={(text) => setRut(formatRut(text))}
                placeholder="12345678-9"
                keyboardType="default"
                maxLength={10}
                error={rut.trim().length > 0 && !validateRut(rut)}
                helperText="RUT inválido. Formatos permitidos: 1234567-8 o 12345678-9."
                style={styles.input}
              />
            </View>

            {/* Sección de Ubicación */}
            <View style={styles.section}>
              <CustomTextInput
                label={
                  <>
                    Dirección <Text style={styles.required}>*</Text>
                  </>
                }
                value={address}
                onChangeText={setAddress}
                placeholder="Ingresa la dirección"
                error={address.trim().length > 0 && !validateAddress(address)}
                helperText="La dirección debe tener al menos 5 caracteres."
                style={styles.input}
              />

              <Button
                mode="outlined"
                icon="map-marker"
                onPress={obtenerUbicacion}
                style={styles.geoButton}
                labelStyle={styles.geoButtonLabel}
                loading={isFetchingLocation}
              >
                Geolocalización
              </Button>
            </View>

            {/* Sección de Adjuntar Evidencias */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Adjuntar Evidencias</Text>
              <View style={styles.imageButtonsContainer}>
                <Button
                  mode="outlined"
                  icon="camera"
                  onPress={openCamera}
                  style={styles.imageButton}
                  labelStyle={styles.imageButtonLabel}
                >
                  Tomar Foto
                </Button>
                <Button
                  mode="outlined"
                  icon="image"
                  onPress={openGallery}
                  style={styles.imageButton}
                  labelStyle={styles.imageButtonLabel}
                >
                  Seleccionar de la Galería
                </Button>
              </View>

              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={styles.imagePreview}
                />
              )}
            </View>

            {/* Sección de Comentario Adicional */}
            <View style={styles.section}>
              <CustomTextInput
                label="Comentario Adicional"
                value={comentario}
                onChangeText={setComentario}
                placeholder="Ingresa un comentario adicional (opcional)"
                multiline
                numberOfLines={4}
                error={comentario.trim().length > 0 && !validateComentario(comentario)}
                helperText="El comentario adicional no debe exceder los 500 caracteres."
                style={styles.input}
              />
            </View>

            {/* Sección de Términos y Condiciones */}
            <View style={styles.section}>
              <View style={styles.termsContainer}>
                <Checkbox
                  status={aceptaTerminos ? 'checked' : 'unchecked'}
                  onPress={() => setAceptaTerminos(!aceptaTerminos)}
                  color="#228B22"
                />
                <Text style={styles.termsText}>Acepto los términos y condiciones.</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Icon name="help-circle-outline" size={24} color="#228B22" style={styles.helpIcon} />
                </TouchableOpacity>
              </View>
              <HelperText type="error" visible={!aceptaTerminos}>
                Debes aceptar los términos y condiciones para continuar.
              </HelperText>
            </View>

            {/* Botón de Envío */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={hasErrors()}
              style={styles.submitButton}
              loading={isSubmitting}
              labelStyle={styles.buttonLabel}
            >
              Enviar Denuncia
            </Button>
          </Card.Content>
        </Card>

        {/* Modal de Términos y Condiciones */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Términos y Condiciones</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalContent}>
                <Text style={styles.modalText}>
                  **Términos y Condiciones de Denuncia**

                  1. **Aceptación de Términos:** Al enviar una denuncia, aceptas cumplir y estar obligado por estos términos y condiciones.

                  2. **Uso del Servicio:** La denuncia de basura se gestiona a través de nuestra plataforma y está sujeta a verificación.

                  3. **Responsabilidad:** La empresa no se hace responsable por cualquier daño o pérdida que pueda surgir del uso de este servicio.

                  4. **Privacidad:** Toda la información proporcionada será utilizada exclusivamente para la gestión de denuncias y no será compartida con terceros sin consentimiento.

                  5. **Modificaciones:** Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas al ser publicadas en esta sección.

                  6. **Contacto:** Para cualquier duda o consulta, puedes contactarnos a través de nuestro correo electrónico soporte@tuapp.com.
                </Text>
              </ScrollView>
              <Button
                mode="contained"
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}
                contentStyle={styles.modalButtonContent}
                labelStyle={styles.modalButtonLabel}
              >
                Cerrar
              </Button>
            </View>
          </View>
        </Modal>

        {/* Modal de Confirmación de Envío */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={() => {
            setSuccessModalVisible(!successModalVisible);
          }}
        >
          <View style={styles.successModalOverlay}>
            <View style={styles.successModalView}>
              <Image
                source={require('../assets/visto.gif')} // Asegúrate de que 'visto.gif' esté en la carpeta 'assets'
                style={styles.successGif}
              />
              <Text style={styles.successText}>¡Denuncia enviada!</Text>
              <Button
                mode="contained"
                onPress={() => setSuccessModalVisible(false)}
                style={styles.successModalButton}
                contentStyle={styles.successModalButtonContent}
                labelStyle={styles.successModalButtonLabel}
              >
                Cerrar
              </Button>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  content: {
    paddingBottom: 60,
  },
  header: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    zIndex: 1,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#228B22',
    marginBottom: 10,
  },
  geoButton: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#228B22',
    borderWidth: 1,
  },
  geoButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#228B22',
  },
  imageButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  imageButton: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#228B22',
    borderWidth: 1,
  },
  imageButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#228B22',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  termsText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  helpIcon: {
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: '#228B22',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22',
  },
  modalContent: {
    marginTop: 10,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#228B22',
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonContent: {
    paddingVertical: 5,
  },
  modalButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  successGif: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 20,
    textAlign: 'center',
  },
  successModalButton: {
    backgroundColor: '#228B22',
    borderRadius: 10,
    paddingVertical: 10,
    width: '60%',
  },
  successModalButtonContent: {
    paddingVertical: 5,
  },
  successModalButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#F0FFF4',
  },
  inputError: {
    borderColor: 'red',
  },
  required: {
    color: 'red',
  },
});

export default DenunciaScreen;
