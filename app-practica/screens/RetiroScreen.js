// ./screens/RetiroScreen.js

import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ImageBackground,
  SafeAreaView, // Importar SafeAreaView
} from 'react-native';
import {
  TextInput,
  Button,
  Checkbox,
  Text,
  HelperText,
  RadioButton,
  Card,
} from 'react-native-paper';
import { NotificationContext } from '../contexts/NotificationContext';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Componente reutilizable para un ítem de tipo de residuos
 */
const TipoBasuraItem = ({ tipo, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.tipoBasuraButton,
      isSelected ? styles.tipoBasuraButtonSelected : null,
    ]}
    onPress={onPress}
    accessibilityLabel={`Seleccionar tipo de residuo ${tipo}`}
  >
    <Text
      style={[
        styles.tipoBasuraText,
        isSelected ? styles.tipoBasuraTextSelected : null,
      ]}
    >
      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
    </Text>
  </TouchableOpacity>
);

const RetiroScreen = () => {
  const { setHasNewNotifications } = useContext(NotificationContext);

  const [nombre, setNombre] = useState(''); // Campo Nombre
  const [rut, setRut] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [sector, setSector] = useState('');
  const [tipoBasura, setTipoBasura] = useState([]);
  const [frecuencia, setFrecuencia] = useState('puntual');
  const [comentarios, setComentarios] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal

  // Definir días disponibles para retiro (ejemplo)
  const availableDates = {
    '2024-11-10': { marked: true, dotColor: '#228B22' },
    '2024-11-15': { marked: true, dotColor: '#228B22' },
    '2024-11-20': { marked: true, dotColor: '#228B22' },
    '2024-11-21': { marked: true, dotColor: '#228B22' },
    '2024-11-22': { marked: true, dotColor: '#228B22' },
    '2024-11-23': { marked: true, dotColor: '#228B22' },
    '2024-11-24': { marked: true, dotColor: '#228B22' },
    '2024-11-25': { marked: true, dotColor: '#228B22' },
    '2024-11-26': { marked: true, dotColor: '#228B22' },
    '2024-11-27': { marked: true, dotColor: '#228B22' },
    '2024-12-10': { marked: true, dotColor: '#228B22' },
    '2024-12-15': { marked: true, dotColor: '#228B22' },
    '2024-12-20': { marked: true, dotColor: '#228B22' },
    '2024-12-21': { marked: true, dotColor: '#228B22' },
    '2024-12-22': { marked: true, dotColor: '#228B22' },
    '2024-12-23': { marked: true, dotColor: '#228B22' },
    '2024-12-24': { marked: true, dotColor: '#228B22' },
    '2024-12-25': { marked: true, dotColor: '#228B22' },
    '2024-12-26': { marked: true, dotColor: '#228B22' },
    '2024-12-27': { marked: true, dotColor: '#228B22' },
    // Añade más fechas según tu disponibilidad
  };

  // Función para calcular el dígito verificador del RUT
  const calcularDV = (rutNumerico) => {
    // Asegurar que el RUT numérico tenga 8 dígitos agregando ceros a la izquierda
    const rutPadded = rutNumerico.padStart(8, '0');
    let suma = 0;
    let multiplicador = 2;

    for (let i = rutPadded.length - 1; i >= 0; i--) {
      const digit = parseInt(rutPadded.charAt(i));
      if (isNaN(digit)) {
        // Si no es un dígito, retorna un valor inválido
        return null;
      }
      suma += digit * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const dv = 11 - resto;

    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return dv.toString();
  };

  // Validaciones básicas
  const validateRut = (rutCompleto) => {
    const rutRegex = /^\d{7,8}-[0-9Kk]$/;
    if (!rutRegex.test(rutCompleto)) {
      return false;
    }

    const [rutNumerico, dv] = rutCompleto.split('-');
    const dvCalculado = calcularDV(rutNumerico);

    if (dvCalculado === null) {
      return false;
    }

    return dv.toUpperCase() === dvCalculado;
  };

  const hasErrors = () => {
    return (
      !validateRut(rut.trim()) ||
      !/\S+@\S+\.\S+/.test(email.trim()) ||
      direccion.trim().length === 0 ||
      tipoBasura.length === 0 ||
      !aceptaTerminos ||
      !selectedDate ||
      isSubmitting
    );
  };

  const handleSubmit = async () => {
    if (hasErrors()) {
      Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Lógica para enviar los datos al backend
      // Simulación de envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular retraso

      Alert.alert('Éxito', 'Solicitud de retiro de residuos enviada correctamente.');
      setHasNewNotifications(true); // Indicar que hay nuevas notificaciones

      // Resetear el formulario
      setNombre('');
      setRut('');
      setTelefono('');
      setEmail('');
      setDireccion('');
      setSector('');
      setTipoBasura([]);
      setFrecuencia('puntual');
      setComentarios('');
      setAceptaTerminos(false);
      setSelectedDate('');
      setMarkedDates({});
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTipoBasura = (tipo) => {
    if (tipoBasura.includes(tipo)) {
      setTipoBasura(tipoBasura.filter((item) => item !== tipo));
    } else {
      setTipoBasura([...tipoBasura, tipo]);
    }
  };

  const onDayPress = (day) => {
    if (availableDates[day.dateString]) {
      setSelectedDate(day.dateString);
      setMarkedDates({
        [day.dateString]: {
          selected: true,
          selectedColor: '#228B22',
          dotColor: '#ffffff',
          marked: true,
        },
      });
    } else {
      Alert.alert('No Disponible', 'Este día no está disponible para retiro.');
    }
  };

  // Función de formateo del RUT
  const formatRut = (input) => {
    // Remover todos los caracteres que no sean dígitos o 'K'
    let cleaned = input.toUpperCase().replace(/[^0-9K]/g, '');

    // Si la longitud es 0, retornar vacío
    if (cleaned.length === 0) return '';

    // Insertar guion antes del último carácter si la longitud es mayor a 1
    if (cleaned.length > 1) {
      cleaned = cleaned.slice(0, -1) + '-' + cleaned.slice(-1);
    }

    // Limitar a 10 caracteres (8 dígitos + guion + DV)
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    return cleaned;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5DC' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false} // Opcional: Ocultar el indicador de scroll
        >
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

            {/* Título dentro del encabezado */}
            <Text style={styles.headerTitle}>Retiro de Residuos</Text>
          </ImageBackground>

          {/* Contenedor del Formulario con Padding */}
          <View style={styles.formContainer}>
            {/* Card de Fondo */}
            <Card style={styles.card}>
              <Card.Content>
                {/* Nombre Completo */}
                <TextInput
                  label={
                    <>
                      Nombre <Text style={styles.required}>*</Text>
                    </>
                  }
                  value={nombre}
                  onChangeText={(text) => setNombre(text)}
                  style={styles.input}
                  mode="outlined"
                  placeholder="Juan Pérez"
                  theme={{
                    colors: { primary: '#228B22', underlineColor: 'transparent' },
                  }}
                  accessibilityLabel="Campo de texto para ingresar el nombre completo"
                />
                <HelperText type="error" visible={nombre.trim().length === 0}>
                  Por favor, ingresa tu nombre completo.
                </HelperText>

                {/* RUT */}
                <TextInput
                  label={
                    <>
                      RUT <Text style={styles.required}>*</Text>
                    </>
                  }
                  value={rut}
                  onChangeText={(text) => {
                    const formatted = formatRut(text);
                    setRut(formatted);
                  }}
                  style={[
                    styles.input,
                    rut.trim().length > 0 && !validateRut(rut) ? styles.inputError : null,
                  ]}
                  mode="outlined"
                  placeholder="12345678-9"
                  keyboardType="default"
                  maxLength={10} // 8 dígitos + guion + dígito verificador
                  theme={{
                    colors: { primary: '#228B22', underlineColor: 'transparent' },
                  }}
                  accessibilityLabel="Campo de texto para ingresar el RUT"
                />
                <HelperText type="error" visible={rut.trim().length > 0 && !validateRut(rut)}>
                  RUT inválido. Formatos permitidos: 1234567-8 o 12345678-9.
                </HelperText>

                {/* Teléfono */}
                <TextInput
                  label="Teléfono"
                  value={telefono}
                  onChangeText={(text) => setTelefono(text)}
                  style={styles.input}
                  mode="outlined"
                  keyboardType="numeric"
                  placeholder="123456789"
                  maxLength={9}
                  theme={{
                    colors: { primary: '#228B22', underlineColor: 'transparent' },
                  }}
                  accessibilityLabel="Campo de texto para ingresar el teléfono"
                />
                <HelperText type="error" visible={telefono.length > 0 && !/^\d{9}$/.test(telefono)}>
                  El teléfono debe tener 9 dígitos.
                </HelperText>

                {/* Correo Electrónico */}
                <TextInput
                  label={
                    <>
                      Correo Electrónico <Text style={styles.required}>*</Text>
                    </>
                  }
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={[
                    styles.input,
                    email.trim().length > 0 && !/\S+@\S+\.\S+/.test(email) ? styles.inputError : null,
                  ]}
                  mode="outlined"
                  keyboardType="email-address"
                  placeholder="ejemplo@correo.com"
                  theme={{
                    colors: { primary: '#228B22', underlineColor: 'transparent' },
                  }}
                  accessibilityLabel="Campo de texto para ingresar el correo electrónico"
                />
                <HelperText type="error" visible={email.trim().length > 0 && !/\S+@\S+\.\S+/.test(email)}>
                  Correo electrónico inválido.
                </HelperText>

                {/* Dirección */}
                <TextInput
                  label={
                    <>
                      Dirección <Text style={styles.required}>*</Text>
                    </>
                  }
                  value={direccion}
                  onChangeText={(text) => setDireccion(text)}
                  style={[
                    styles.input,
                    direccion.trim().length === 0 ? styles.inputError : null,
                  ]}
                  mode="outlined"
                  placeholder="Calle Falsa 123"
                  theme={{
                    colors: { primary: '#228B22', underlineColor: 'transparent' },
                  }}
                  accessibilityLabel="Campo de texto para ingresar la dirección"
                />
                <HelperText type="error" visible={direccion.trim().length === 0}>
                  Por favor, ingresa una dirección válida.
                </HelperText>

                {/* Sector/Barrio */}
                <TextInput
                  label="Sector/Barrio"
                  value={sector}
                  onChangeText={(text) => setSector(text)}
                  style={styles.input}
                  mode="outlined"
                  placeholder="Providencia"
                  theme={{
                    colors: { primary: '#228B22', underlineColor: 'transparent' },
                  }}
                  accessibilityLabel="Campo de texto para ingresar el sector o barrio"
                />

                {/* Tipo de Residuos */}
                <Text style={styles.label}>
                  Tipo de Residuos <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.tipoBasuraContainer}>
                  {[
                    'orgánico',
                    'papel/cartón',
                    'plástico',
                    'vidrio',
                    'metales',
                    'electrónicos',
                    'químicos',
                    'baterías',
                    'residuos sanitarios',
                  ].map((tipo, index) => (
                    <TipoBasuraItem
                      key={index}
                      tipo={tipo}
                      isSelected={tipoBasura.includes(tipo)}
                      onPress={() => toggleTipoBasura(tipo)}
                    />
                  ))}
                </View>
                <HelperText type="error" visible={tipoBasura.length === 0}>
                  Por favor, selecciona al menos un tipo de residuo.
                </HelperText>

                {/* Frecuencia del Servicio */}
                <Text style={styles.label}>Frecuencia del Servicio</Text>
                <RadioButton.Group
                  onValueChange={(value) => setFrecuencia(value)}
                  value={frecuencia}
                >
                  <View style={styles.radioItem}>
                    <RadioButton value="puntual" color="#228B22" />
                    <Text>Puntual</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="semanal" color="#228B22" />
                    <Text>Semanal</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="quincenal" color="#228B22" />
                    <Text>Quincenal</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="mensual" color="#228B22" />
                    <Text>Mensual</Text>
                  </View>
                </RadioButton.Group>

                {/* Calendario para Selección de Fecha */}
                <Text style={styles.label}>
                  Selecciona una Fecha para Retiro <Text style={styles.required}>*</Text>
                </Text>
                <Calendar
                  onDayPress={onDayPress}
                  markedDates={{
                    ...availableDates,
                    ...markedDates,
                    ...Object.keys(availableDates).reduce((acc, date) => {
                      if (!markedDates[date] && !selectedDate) {
                        acc[date] = { ...availableDates[date], textColor: '#FF0000' }; // Días no disponibles en rojo
                      }
                      return acc;
                    }, {}),
                  }}
                  markingType={'custom'}
                  theme={{
                    selectedDayBackgroundColor: '#228B22',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#228B22',
                    arrowColor: '#228B22',
                    monthTextColor: '#228B22',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 14,
                    dotColor: '#228B22',
                    selectedDotColor: '#ffffff',
                    backgroundColor: '#F5F5DC', // Fondo del calendario
                    calendarBackground: '#F5F5DC',
                    textSectionTitleColor: '#228B22',
                    textSectionTitleDisabledColor: '#228B22',
                  }}
                  style={styles.calendar}
                  disableAllTouchEventsForDisabledDays={true}
                />
                {!selectedDate && (
                  <HelperText type="error" visible={true}>
                    Por favor, selecciona una fecha para el retiro.
                  </HelperText>
                )}

                {/* Comentarios o Instrucciones Especiales */}
                <TextInput
                  label="Comentarios o Instrucciones Especiales"
                  value={comentarios}
                  onChangeText={(text) => setComentarios(text)}
                  style={styles.comentariosInput}
                  mode="outlined"
                  multiline
                  numberOfLines={5}
                  placeholder="Por ejemplo, 'Dejar los residuos en el área designada'."
                  theme={{
                    colors: { primary: '#228B22', underlineColor: 'transparent' },
                  }}
                  accessibilityLabel="Campo de texto para comentarios o instrucciones especiales"
                />

                {/* Aceptación de Términos y Condiciones */}
                <View style={styles.termsContainer}>
                  <Checkbox
                    status={aceptaTerminos ? 'checked' : 'unchecked'}
                    onPress={() => setAceptaTerminos(!aceptaTerminos)}
                    color="#228B22"
                    accessibilityLabel="Checkbox para aceptar términos y condiciones"
                  />
                  <Text style={styles.termsText}>Acepto los términos y condiciones.</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    accessibilityLabel="Botón para ver términos y condiciones"
                  >
                    <Icon
                      name="help-circle-outline"
                      size={24}
                      color="#228B22"
                      style={styles.helpIcon}
                    />
                  </TouchableOpacity>
                </View>
                <HelperText type="error" visible={!aceptaTerminos}>
                  Debes aceptar los términos y condiciones para continuar.
                </HelperText>

                {/* Botón de Envío */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={hasErrors()}
                  style={styles.button}
                  loading={isSubmitting}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  accessibilityLabel="Botón para enviar solicitud de retiro de residuos"
                >
                  Enviar Solicitud
                </Button>
              </Card.Content>
            </Card>
          </View>

          {/* Modal de Términos y Condiciones */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
            accessible={true}
            accessibilityViewIsModal={true}
            accessibilityLabel="Modal de términos y condiciones"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Términos y Condiciones</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    accessibilityLabel="Botón para cerrar el modal"
                  >
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.modalContent}>
                  <Text style={styles.modalText}>
                    **Términos y Condiciones de Servicio**

                    1. **Aceptación de Términos:** Al utilizar esta aplicación, aceptas cumplir y estar obligado por estos términos y condiciones.

                    2. **Uso del Servicio:** El servicio de retiro de residuos está sujeto a disponibilidad y a las fechas seleccionadas por el usuario a través del calendario.

                    3. **Responsabilidad:** La empresa no se hace responsable por cualquier daño o pérdida que pueda surgir del uso de este servicio.

                    4. **Privacidad:** Toda la información proporcionada será utilizada exclusivamente para la gestión de solicitudes de retiro de residuos y no será compartida con terceros sin consentimiento.

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
                  accessibilityLabel="Botón para cerrar el modal de términos y condiciones"
                >
                  Cerrar
                </Button>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Eliminamos el padding para que la imagen se extienda hasta los bordes
    backgroundColor: '#F5F5DC', // Color de fondo
  },
  header: {
    width: '100%',
    height: 250, // Altura del encabezado
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25, // Bordes redondeados inferiores
    borderBottomRightRadius: 25,
    overflow: 'hidden', // Asegura que los bordes redondeados se apliquen correctamente
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sombra para mejorar la legibilidad del texto
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    zIndex: 1, // Asegura que el texto esté sobre el overlay
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    padding: 20, // Padding solo para el formulario
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15, // Bordes más redondeados
    padding: 10,
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.25, // Sombra para iOS
    shadowRadius: 3.84, // Sombra para iOS
  },
  input: {
    marginBottom: 15, // Uniformizado a 15 para todos los TextInput
    borderRadius: 10, // Bordes más redondeados para TextInput
    backgroundColor: '#F0FFF4', // Fondo suave para los TextInput
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: '#228B22',
    fontWeight: '600',
  },
  tipoBasuraContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15, // Uniformiza el espacio debajo de los botones
  },
  tipoBasuraButton: {
    borderWidth: 1,
    borderColor: '#228B22', // Verde Bosque
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    marginRight: 10, // Espaciado horizontal
  },
  tipoBasuraButtonSelected: {
    backgroundColor: '#228B22', // Verde Bosque
    borderColor: '#228B22',
  },
  tipoBasuraText: {
    color: '#228B22', // Verde Bosque
    fontSize: 14,
  },
  tipoBasuraTextSelected: {
    color: '#FFF',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  comentariosInput: {
    marginTop: 10,
    marginBottom: 15, // Uniformizado a 15
    height: 100, // Tamaño del cuadro de comentarios
    borderRadius: 10, // Bordes más redondeados
    backgroundColor: '#F0FFF4', // Fondo suave para los TextInput
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15, // Uniformizado a 15
  },
  termsText: {
    marginLeft: 8,
    flex: 1, // Ocupa el espacio restante
    fontSize: 14,
    color: '#333',
  },
  helpIcon: {
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#228B22', // Verde Bosque
    paddingVertical: 12, // Mayor tamaño
    borderRadius: 10, // Bordes más redondeados
  },
  buttonContent: {
    paddingVertical: 5,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // Texto legible
  },
  calendar: {
    marginTop: 10,
    marginBottom: 15, // Uniformizado a 15
    borderRadius: 10, // Bordes más redondeados
    overflow: 'hidden', // Para aplicar el borderRadius correctamente
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15, // Bordes más redondeados
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
    color: '#228B22', // Verde Bosque
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
    backgroundColor: '#228B22', // Verde Bosque
    paddingVertical: 10, // Mayor tamaño
    borderRadius: 10,
  },
  modalButtonContent: {
    paddingVertical: 5,
  },
  modalButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // Texto legible
  },
  required: {
    color: 'red',
  },
});

export default RetiroScreen;
