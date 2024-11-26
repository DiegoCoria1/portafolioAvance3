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

const RetiroScreen = () => {
  const { setHasNewNotifications } = useContext(NotificationContext);

  const [nombre, setNombre] = useState('');
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
      nombre.trim().length < 3 ||
      !validateRut(rut.trim()) ||
      !/^\d{9}$/.test(telefono.trim()) ||
      !/\S+@\S+\.\S+/.test(email.trim()) ||
      direccion.trim().length === 0 ||
      tipoBasura.length === 0 ||
      !aceptaTerminos ||
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
          label="Nombre Completo"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
          style={styles.input}
          mode="outlined"
        />
        <HelperText type="error" visible={nombre.length > 0 && nombre.length < 3}>
          El nombre debe tener al menos 3 caracteres.
        </HelperText>

        {/* RUT */}
        <TextInput
          label="RUT"
          value={rut}
          onChangeText={(text) => {
            // Permitir solo números y 'K' o 'k'
            const formattedText = text
              .toUpperCase()
              .replace(/[^0-9K]/g, '')
              .replace(/(\d{1,8})([0-9K])$/, '$1-$2');
            setRut(formattedText);
          }}
          style={styles.input}
          mode="outlined"
          placeholder="20010440-4"
          keyboardType="numeric"
          maxLength={10} // 8 dígitos + guion + dígito verificador
        />
        <HelperText type="error" visible={rut.length > 0 && !validateRut(rut)}>
          RUT inválido. Asegúrate de ingresar el formato correcto (e.g., 20010440-4).
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
          label="Correo Electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          placeholder="ejemplo@correo.com"
        />
        <HelperText type="error" visible={email.length > 0 && !/\S+@\S+\.\S+/.test(email)}>
          Correo electrónico inválido.
        </HelperText>

        {/* Dirección */}
        <TextInput
          label="Dirección"
          value={direccion}
          onChangeText={(text) => setDireccion(text)}
          style={styles.input}
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
        <Text style={styles.label}>Tipo de Basura</Text>
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
                tipoBasura.includes(tipo) && styles.tipoBasuraButtonSelected,
              ]}
              onPress={() => toggleTipoBasura(tipo)}
            >
              <Text
                style={[
                  styles.tipoBasuraText,
                  tipoBasura.includes(tipo) && styles.tipoBasuraTextSelected,
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
  input: {
    marginBottom: 10,
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
    borderColor: '#000',
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
    color: '#000',
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
  button: {
    marginTop: 10,
    backgroundColor: '#2E7D32',
    paddingVertical: 5,
  },
});

export default RetiroScreen;
