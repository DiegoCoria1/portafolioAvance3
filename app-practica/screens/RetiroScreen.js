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
} from 'react-native';
import {
  TextInput,
  Button,
  Checkbox,
  Text,
  HelperText,
  RadioButton,
} from 'react-native-paper';
import { NotificationContext } from '../contexts/NotificationContext';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    '2024-11-10': { marked: true, dotColor: '#388E3C' },
    '2024-11-15': { marked: true, dotColor: '#388E3C' },
    '2024-11-20': { marked: true, dotColor: '#388E3C' },
    '2024-11-21': { marked: true, dotColor: '#388E3C' },
    '2024-11-22': { marked: true, dotColor: '#388E3C' },
    '2024-11-23': { marked: true, dotColor: '#388E3C' },
    '2024-11-24': { marked: true, dotColor: '#388E3C' },
    '2024-11-25': { marked: true, dotColor: '#388E3C' },
    '2024-11-26': { marked: true, dotColor: '#388E3C' },
    '2024-11-27': { marked: true, dotColor: '#388E3C' },
    '2024-12-10': { marked: true, dotColor: '#388E3C' },
    '2024-12-15': { marked: true, dotColor: '#388E3C' },
    '2024-12-20': { marked: true, dotColor: '#388E3C' },
    '2024-12-21': { marked: true, dotColor: '#388E3C' },
    '2024-12-22': { marked: true, dotColor: '#388E3C' },
    '2024-12-23': { marked: true, dotColor: '#388E3C' },
    '2024-12-24': { marked: true, dotColor: '#388E3C' },
    '2024-12-25': { marked: true, dotColor: '#388E3C' },
    '2024-12-26': { marked: true, dotColor: '#388E3C' },
    '2024-12-27': { marked: true, dotColor: '#388E3C' },
    // Añade más fechas según tu disponibilidad
  };

  // Función para calcular el dígito verificador del RUT
  const calcularDV = (rutNumerico) => {
    let suma = 0;
    let multiplicador = 2;

    for (let i = rutNumerico.length - 1; i >= 0; i--) {
      suma += parseInt(rutNumerico.charAt(i)) * multiplicador;
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
      // Por ejemplo:
      // const response = await fetch('https://api.tuapp.com/retiro', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     nombre,
      //     rut,
      //     telefono,
      //     email,
      //     direccion,
      //     sector,
      //     tipoBasura,
      //     frecuencia,
      //     comentarios,
      //     fechaRetiro: selectedDate,
      //   }),
      // });

      // Simulación de envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular retraso

      Alert.alert('Éxito', 'Solicitud de retiro de basura enviada correctamente.');
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
          selectedColor: '#388E3C',
          dotColor: '#ffffff',
          marked: true,
        },
      });
    } else {
      Alert.alert('No Disponible', 'Este día no está disponible para retiro.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Retiro de Basura</Text>
        </View>

        {/* Nombre Completo */}
        <TextInput
          label="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
          style={styles.input}
          mode="outlined"
          placeholder="Juan Pérez"
        />
        {/* Si decides hacerlo obligatorio, descomenta las siguientes líneas */}
        {/*
        <HelperText type="error" visible={nombre.trim().length === 0}>
          Por favor, ingresa tu nombre completo.
        </HelperText>
        */}

        {/* RUT */}
        <TextInput
          label={
            <>
              RUT <Text style={styles.required}>*</Text>
            </>
          }
          value={rut}
          onChangeText={(text) => {
            // Permitir solo números y 'K' o 'k', y formatear con guion
            let formattedText = text
              .toUpperCase()
              .replace(/[^0-9K]/g, '');

            if (formattedText.length > 1) {
              formattedText = formattedText.slice(0, -1) + '-' + formattedText.slice(-1);
            }

            setRut(formattedText);
          }}
          style={[
            styles.input,
            rut.trim().length > 0 && !validateRut(rut) ? styles.inputError : null,
          ]}
          mode="outlined"
          placeholder="1234567-8 o 12345678-9"
          keyboardType="default"
          maxLength={10} // 8 dígitos + guion + dígito verificador
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
        />

        {/* Tipo de Basura */}
        <Text style={styles.label}>
          Tipo de Basura <Text style={styles.required}>*</Text>
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
            <TouchableOpacity
              key={index}
              style={[
                styles.tipoBasuraButton,
                tipoBasura.includes(tipo) ? styles.tipoBasuraButtonSelected : null,
              ]}
              onPress={() => toggleTipoBasura(tipo)}
            >
              <Text
                style={[
                  styles.tipoBasuraText,
                  tipoBasura.includes(tipo) ? styles.tipoBasuraTextSelected : null,
                ]}
              >
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <HelperText type="error" visible={tipoBasura.length === 0}>
          Por favor, selecciona al menos un tipo de basura.
        </HelperText>

        {/* Frecuencia del Servicio */}
        <Text style={styles.label}>Frecuencia del Servicio</Text>
        <RadioButton.Group
          onValueChange={(value) => setFrecuencia(value)}
          value={frecuencia}
        >
          <View style={styles.radioItem}>
            <RadioButton value="puntual" />
            <Text>Puntual</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="semanal" />
            <Text>Semanal</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="quincenal" />
            <Text>Quincenal</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="mensual" />
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
            selectedDayBackgroundColor: '#388E3C',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#388E3C',
            arrowColor: '#388E3C',
            monthTextColor: '#388E3C',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
            dotColor: '#388E3C',
            selectedDotColor: '#ffffff',
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
          placeholder="Por ejemplo, 'Dejar la basura detrás de la puerta'."
        />

        {/* Aceptación de Términos y Condiciones */}
        <View style={styles.termsContainer}>
          <Checkbox
            status={aceptaTerminos ? 'checked' : 'unchecked'}
            onPress={() => setAceptaTerminos(!aceptaTerminos)}
          />
          <Text>Acepto los términos y condiciones.</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="help-circle-outline" size={24} color="#388E3C" style={styles.helpIcon} />
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
        >
          Enviar Solicitud
        </Button>

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
                  **Términos y Condiciones de Servicio**

                  1. **Aceptación de Términos:** Al utilizar esta aplicación, aceptas cumplir y estar obligado por estos términos y condiciones.

                  2. **Uso del Servicio:** El servicio de retiro de basura está sujeto a disponibilidad y a las fechas seleccionadas por el usuario a través del calendario.

                  3. **Responsabilidad:** La empresa no se hace responsable por cualquier daño o pérdida que pueda surgir del uso de este servicio.

                  4. **Privacidad:** Toda la información proporcionada será utilizada exclusivamente para la gestión de solicitudes de retiro de basura y no será compartida con terceros sin consentimiento.

                  5. **Modificaciones:** Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas al ser publicadas en esta sección.

                  6. **Contacto:** Para cualquier duda o consulta, puedes contactarnos a través de nuestro correo electrónico soporte@tuapp.com.
                </Text>
              </ScrollView>
              <Button
                mode="contained"
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}
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

/**
 * Componente reutilizable para un ítem de tipo de basura
 */
const TipoBasuraItem = ({ tipo, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.tipoBasuraButton,
      isSelected ? styles.tipoBasuraButtonSelected : null,
    ]}
    onPress={onPress}
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5DC',
    paddingBottom: 60, // Asegura espacio para el botón al final
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  required: {
    color: 'red',
  },
  input: {
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: '#2E7D32',
  },
  tipoBasuraContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipoBasuraButton: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  tipoBasuraButtonSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  tipoBasuraText: {
    color: '#2E7D32',
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
    marginBottom: 10,
    height: 100, // Hacer el cuadro de comentarios más grande
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  helpIcon: {
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2E7D32',
    paddingVertical: 5,
  },
  calendar: {
    marginTop: 10,
    marginBottom: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
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
    color: '#2E7D32',
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
    backgroundColor: '#2E7D32',
    paddingVertical: 5,
  },
});

export default RetiroScreen;
