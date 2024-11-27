// ./screens/CamaraScreen.js

import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../contexts/AppContext'; // Asegúrate de importar el contexto correcto

const CamaraScreen = () => {
  const navigation = useNavigation();
  const { language, addNotification } = useContext(AppContext);

  const texts = {
    es: {
      title: 'Denuncia Microbasural',
      fullName: 'Nombre y Apellidos',
      enterFullName: 'Ingrese su nombre completo',
      rut: 'RUT',
      enterRut: 'Ingrese su RUT',
      email: 'Correo Electrónico',
      enterEmail: 'Ingrese su correo electrónico',
      phone: 'Teléfono',
      enterPhone: 'Ingrese su teléfono',
      address: 'Dirección del Microbasural',
      enterAddress: 'Ingrese la dirección del microbasural',
      uploadImage: 'Subir Imagen',
      takePhoto: 'Tomar Foto',
      selectImage: 'Seleccionar Imagen',
      send: 'Enviar',
      successTitle: 'Microbasural denunciado',
      successMessage:
        'El microbasural ha sido ingresado a nuestros registros. Se hará un seguimiento. ¡Muchas gracias por contribuir a la comunidad!',
      accept: 'Aceptar',
      galleryPermission: 'Permiso para acceder a la galería es necesario.',
      cameraPermission: 'Permiso para acceder a la cámara es necesario.',
      terms: 'Acepto los términos y condiciones',
      termsInfo:
        'Al enviar este formulario, usted acepta que los datos proporcionados serán conocidos y utilizados exclusivamente por la Municipalidad de Quinchao para la gestión y resolución de su solicitud.',
      enterRutInvalid:
        'RUT inválido. Por favor, ingrese un RUT válido.',
    },
    en: {
      title: 'Microtrash Complaint',
      fullName: 'Full Name',
      enterFullName: 'Enter your full name',
      rut: 'RUT',
      enterRut: 'Enter your RUT',
      email: 'Email',
      enterEmail: 'Enter your email',
      phone: 'Phone',
      enterPhone: 'Enter your phone number',
      address: 'Direction of Microtrash',
      enterAddress: 'Enter the address of the illegal dump',
      uploadImage: 'Upload Image',
      takePhoto: 'Take Photo',
      selectImage: 'Select Image',
      send: 'Send',
      successTitle: 'Microtrash Reported',
      successMessage:
        'The microtrash has been entered into our records. A follow-up will be conducted. Thank you very much for contributing to the community!',
      accept: 'Accept',
      galleryPermission:
        'Permission to access the gallery is required.',
      cameraPermission:
        'Permission to access the camera is required.',
      terms: 'I accept the terms and conditions',
      termsInfo:
        'By submitting this form, you agree that the data provided will be known and used exclusively by the Municipality of Quinchao for the management and resolution of your request.',
      enterRutInvalid:
        'Invalid RUT. Please enter a valid RUT.',
    },
  };

  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);

  useEffect(() => {
    // Verificar si los campos obligatorios están llenos y términos aceptados
    if (
      nombre.trim() !== '' &&
      rut.trim() !== '' &&
      direccion.trim() !== '' &&
      isTermsAccepted
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [nombre, rut, direccion, isTermsAccepted]);

  const showCustomAlert = (title, message) => {
    setModalVisible(true);
  };

  const isValidRut = (rut) => {
    // Implementar una validación básica del RUT
    rut = rut.replace(/[^0-9kK]/g, '');
    if (rut.length < 8) return false;
    const body = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      suma += parseInt(body.charAt(i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let res = 11 - (suma % 11);
    let dvCalc = res === 11 ? '0' : res === 10 ? 'K' : res.toString();

    return dv === dvCalc;
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showCustomAlert('', texts[language].galleryPermission);
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const permission = await requestPermission();
    if (!permission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7, // Reducir calidad para optimizar el tamaño
    });

    if (!result.cancelled) {
      setArchivo(result.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      showCustomAlert('', texts[language].cameraPermission);
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7, // Reducir calidad para optimizar el tamaño
    });

    if (!result.cancelled) {
      setArchivo(result.uri);
    }
  };

  const handleSubmit = () => {
    let valid = true;
    let tempErrors = { nombre: '', rut: '', direccion: '' };

    if (!nombre.trim()) {
      tempErrors.nombre = texts[language].enterFullName;
      valid = false;
    }
    if (!rut.trim()) {
      tempErrors.rut = texts[language].enterRut;
      valid = false;
    } else if (!isValidRut(rut.trim())) {
      tempErrors.rut = texts[language].enterRutInvalid;
      valid = false;
    }
    if (!direccion.trim()) {
      tempErrors.direccion = texts[language].enterAddress;
      valid = false;
    }

    setErrors(tempErrors);

    if (valid) {
      const now = new Date();
      const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

      // Agregar notificación según el idioma
      addNotification(
        language === 'es'
          ? `Nueva denuncia en: ${direccion}`
          : `New complaint at: ${direccion}`
      );

      // Resetear el formulario
      setNombre('');
      setRut('');
      setEmail('');
      setTelefono('');
      setDireccion('');
      setArchivo(null);
      setIsTermsAccepted(false);

      // Mostrar mensaje de éxito en modal
      showCustomAlert(texts[language].successTitle, texts[language].successMessage);
    }
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Título de la Pantalla */}
          <Text style={styles.title}>{texts[language].title}</Text>

          {/* Espacio adicional entre el título y el formulario */}
          <View style={{ height: 20 }} />

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Nombre y Apellidos */}
            <Text style={styles.label}>
              {texts[language].fullName} <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterFullName}
              value={nombre}
              onChangeText={setNombre}
            />
            {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}

            {/* RUT */}
            <Text style={styles.label}>
              {texts[language].rut} <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterRut}
              value={rut}
              onChangeText={setRut}
              keyboardType="numeric"
            />
            {errors.rut ? <Text style={styles.errorText}>{errors.rut}</Text> : null}

            {/* Correo Electrónico */}
            <Text style={styles.label}>{texts[language].email}</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterEmail}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Teléfono */}
            <Text style={styles.label}>{texts[language].phone}</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterPhone}
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            {/* Dirección del Microbasural */}
            <Text style={styles.label}>
              {texts[language].address} <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterAddress}
              value={direccion}
              onChangeText={setDireccion}
            />
            {errors.direccion ? <Text style={styles.errorText}>{errors.direccion}</Text> : null}

            {/* Subir Imagen */}
            <Text style={styles.label}>{texts[language].uploadImage}</Text>

            {/* Botón "Tomar Foto" */}
            <TouchableOpacity
              style={[
                styles.fullWidthButton,
                isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled,
              ]}
              onPress={takePhoto}
              disabled={!isButtonEnabled}
              accessible={true}
              accessibilityLabel={texts[language].takePhoto}
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color={isButtonEnabled ? '#fff' : '#000'}
              />
              <Text
                style={[
                  styles.buttonText,
                  isButtonEnabled ? styles.buttonTextEnabled : styles.buttonTextDisabled,
                ]}
              >
                {texts[language].takePhoto}
              </Text>
            </TouchableOpacity>

            {/* Botón "Seleccionar Imagen" */}
            <TouchableOpacity
              style={[
                styles.fullWidthButton,
                isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled,
              ]}
              onPress={pickImage}
              disabled={!isButtonEnabled}
              accessible={true}
              accessibilityLabel={texts[language].selectImage}
            >
              <Ionicons
                name="image-outline"
                size={24}
                color={isButtonEnabled ? '#fff' : '#000'}
              />
              <Text
                style={[
                  styles.buttonText,
                  isButtonEnabled ? styles.buttonTextEnabled : styles.buttonTextDisabled,
                ]}
              >
                {texts[language].selectImage}
              </Text>
            </TouchableOpacity>

            {/* Vista Previa Pequeña de la Imagen */}
            {archivo && (
              <Image source={{ uri: archivo }} style={styles.smallImagePreview} />
            )}

            {/* Aceptar Términos y Condiciones */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  isTermsAccepted ? styles.checkboxSelected : styles.checkboxUnselected,
                ]}
                onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                accessible={true}
                accessibilityLabel={texts[language].terms}
              >
                {isTermsAccepted ? (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                ) : null}
              </TouchableOpacity>
              <Text style={styles.termsText}>{texts[language].terms}</Text>
              <TouchableOpacity
                onPress={() => setTermsModalVisible(true)}
                style={styles.infoIcon}
                accessible={true}
                accessibilityLabel="Información de Términos y Condiciones"
              >
                <Ionicons name="help-circle-outline" size={20} color="#228B22" />
              </TouchableOpacity>
            </View>

            {/* Botón de Enviar */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isButtonEnabled ? styles.submitButtonEnabled : styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!isButtonEnabled}
              accessible={true}
              accessibilityLabel={texts[language].send}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  isButtonEnabled ? styles.submitButtonTextEnabled : styles.submitButtonTextDisabled,
                ]}
              >
                {texts[language].send}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      {/* Modal de Confirmación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{texts[language].successTitle}</Text>
            <Text style={styles.modalMessage}>{texts[language].successMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>{texts[language].accept}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Términos y Condiciones */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={termsModalVisible}
        onRequestClose={() => {
          setTermsModalVisible(!termsModalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setTermsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.termsModalContainer}>
                <Text style={styles.termsModalTitle}>Términos y Condiciones</Text>
                <ScrollView style={styles.termsModalContent}>
                  <Text style={styles.termsModalText}>
                    {texts[language].termsInfo}
                  </Text>
                </ScrollView>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setTermsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>{texts[language].accept}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#F5F5DC' }, // Color de fondo solicitado
  scrollContent: { paddingBottom: 40 },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#228B22',
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8, // Aumentado de 6 a 8
    color: '#333',
    fontWeight: '600',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#228B22',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15, // Aumentado de 5 a 15
    backgroundColor: '#F5FFF5',
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  fullWidthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#228B22', // Mismo verde que "Tomar Foto"
  },
  buttonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  buttonTextEnabled: {
    color: '#fff',
  },
  buttonTextDisabled: {
    color: '#000',
  },
  smallImagePreview: {
    width: 100, // Tamaño reducido para una miniatura
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 15, // Espacio después de la imagen
    borderWidth: 1,
    borderColor: '#228B22',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#228B22',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Fondo blanco por defecto
  },
  checkboxSelected: {
    backgroundColor: '#228B22', // Verde cuando está seleccionado
  },
  checkboxUnselected: {
    backgroundColor: '#fff', // Blanco cuando no está seleccionado
  },
  termsText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  infoIcon: {
    marginLeft: 5,
  },
  dataUsageContainer: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginBottom: 20,
  },
  dataUsageText: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#2E7D32',
    fontStyle: 'italic',
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  submitButtonEnabled: {
    backgroundColor: '#228B22', // Mismo verde que los otros botones
  },
  submitButtonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  submitButtonTextEnabled: {
    color: '#fff',
  },
  submitButtonTextDisabled: {
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#228B22',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  termsModalContainer: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  termsModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 10,
    textAlign: 'center',
  },
  termsModalContent: {
    width: '100%',
    marginBottom: 20,
  },
  termsModalText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
  },
});

export default CamaraScreen;
