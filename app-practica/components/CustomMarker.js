// components/CustomMarker.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'; // Importar PropTypes para validación de props

const CustomMarker = ({ outerColor = '#228B22', innerColor = '#228B22' }) => (
  <View style={[styles.markerOuter, { borderColor: outerColor }]}>
    <View style={[styles.markerInner, { backgroundColor: innerColor }]} />
  </View>
);

const styles = StyleSheet.create({
  markerOuter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Sombra para Android
  },
  markerInner: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
});

// Definir los tipos de props para mayor seguridad
CustomMarker.propTypes = {
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
};

export default CustomMarker;
