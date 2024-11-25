// MapaScreen.js
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper'; // Importar Switch de react-native-paper

// Puntos verdes extraídos del archivo JSON (actualizados con 'types' y 'schedule')
const waypoints = [
  {
    latitude: -42.466292120161597,
    longitude: -73.506642400457693,
    title: "Punto verde mirador",
    schedule: "09:00 - 17:00",
    types: ["Orgánico", "Plástico", "Vidrio"],
  },
  {
    latitude: -42.4723554943876,
    longitude: -73.486943873391695,
    title: "Nº3 Punto Verde Predio municipal",
    schedule: "09:00 - 18:00",
    types: ["Papel/Cartón", "Plástico"],
  },
  {
    latitude: -42.476024060602299,
    longitude: -73.490452577314102,
    title: "Nº 1 Punto Verde VBV",
    schedule: "08:00 - 16:00",
    types: ["Orgánico", "Baterías"],
  },
  // ... Continúa actualizando todos los puntos de manera similar
  {
    latitude: -42.433128552154201,
    longitude: -73.452863174123706,
    title: "Nº25 Punto verde Vecinal",
    schedule: "10:00 - 19:00",
    types: ["Orgánico", "Papel/Cartón"],
  },
  // Añade más puntos según sea necesario
];

const wasteTypesInfo = {
  "Orgánico": "Residuos de origen vegetal o animal, como restos de comida.",
  "Papel/Cartón": "Residuos de papel o cartón como cajas, cuadernos, etc.",
  "Plástico": "Botellas, bolsas, y otros plásticos reciclables.",
  "Vidrio": "Frascos y botellas de vidrio.",
  "Baterías": "Pilas AA, AAA, baterías de celular, etc.",
  "Químicos": "Residuos químicos como pinturas o solventes.",
  "Electrónicos": "Aparatos electrónicos como celulares o computadores viejos.",
  "Residuos Sanitarios": "Desechos como mascarillas o pañales.",
};

const MapaScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedWasteType, setSelectedWasteType] = useState(null);

  // Estados para el filtro
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    "Orgánico": false,
    "Papel/Cartón": false,
    "Plástico": false,
    "Vidrio": false,
    "Baterías": false,
    "Químicos": false,
    "Electrónicos": false,
    "Residuos Sanitarios": false,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      setLoading(false);
    };

    requestLocationPermission();
  }, []);

  const wasteTypes = Object.keys(wasteTypesInfo);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#228B22" />
      ) : location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={"Mi ubicación actual"}
            />
            {waypoints
              .filter(point => {
                const activeTypes = Object.keys(activeFilters).filter(type => activeFilters[type]);
                if (activeTypes.length === 0) return true; // Sin filtros, mostrar todos
                // Mostrar puntos que tengan al menos uno de los tipos activos
                return point.types.some(type => activeTypes.includes(type));
              })
              .map((point, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  title={point.title}
                  onPress={() => setSelectedPoint(point)}
                />
              ))}
          </MapView>

          {/* Mostrar los filtros activos */}
          {Object.keys(activeFilters).some(type => activeFilters[type]) && (
            <View style={styles.currentFilterContainer}>
              <Text style={styles.currentFilterText}>
                Filtros Activos: {Object.keys(activeFilters).filter(type => activeFilters[type]).join(', ')}
              </Text>
              <TouchableOpacity onPress={() => {
                const clearedFilters = {};
                Object.keys(activeFilters).forEach(type => {
                  clearedFilters[type] = false;
                });
                setActiveFilters(clearedFilters);
              }}>
                <Feather name="x-circle" size={20} color="#ff6347" />
              </TouchableOpacity>
            </View>
          )}

          {/* Botón de Filtro con Ícono */}
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Feather name="filter" size={20} color="#fff" style={styles.filterIcon} />
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>

          {/* Modal para filtrar */}
          <Modal
            transparent={true}
            animationType="slide"
            visible={filterModalVisible}
            onRequestClose={() => setFilterModalVisible(false)}
          >
            <View style={styles.filterModalContainer}>
              <View style={styles.filterModalContent}>
                <Text style={styles.filterModalTitle}>Selecciona Tipos de Residuos</Text>

                <ScrollView>
                  {Object.keys(activeFilters).map((type, index) => (
                    <View key={index} style={styles.switchContainer}>
                      <Text style={styles.switchLabel}>{type}</Text>
                      <Switch
                        value={activeFilters[type]}
                        onValueChange={(value) => {
                          setActiveFilters(prevFilters => ({
                            ...prevFilters,
                            [type]: value,
                          }));
                        }}
                        color="#228B22"
                      />
                    </View>
                  ))}
                </ScrollView>

                {/* Botón para aplicar filtros */}
                <TouchableOpacity
                  style={styles.applyFilterButton}
                  onPress={() => setFilterModalVisible(false)}
                >
                  <Text style={styles.applyFilterButtonText}>Aplicar Filtros</Text>
                </TouchableOpacity>

                {/* Botón para limpiar todos los filtros */}
                <TouchableOpacity
                  style={styles.clearFilterButton}
                  onPress={() => {
                    const clearedFilters = {};
                    Object.keys(activeFilters).forEach(type => {
                      clearedFilters[type] = false;
                    });
                    setActiveFilters(clearedFilters);
                    setFilterModalVisible(false);
                  }}
                >
                  <Text style={styles.clearFilterButtonText}>Limpiar Filtros</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal para mostrar información del punto seleccionado */}
          {selectedPoint && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={!!selectedPoint}
              onRequestClose={() => setSelectedPoint(null)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedPoint(null)}
                  >
                    <Feather name="x" size={28} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{selectedPoint.title}</Text>
                  <Text style={styles.modalSchedule}>{selectedPoint.schedule}</Text>
                  <View style={styles.iconsContainer}>
                    {selectedPoint.types.map((type, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.iconButton}
                        onPress={() => setSelectedWasteType(type)}
                      >
                        <MaterialCommunityIcons
                          name={
                            type === "Orgánico"
                              ? "leaf"
                              : type === "Papel/Cartón"
                              ? "file-document"
                              : type === "Plástico"
                              ? "bottle-soda"
                              : type === "Vidrio"
                              ? "glass-wine"
                              : type === "Baterías"
                              ? "battery"
                              : type === "Químicos"
                              ? "flask"
                              : type === "Electrónicos"
                              ? "cellphone"
                              : "biohazard"
                          }
                          size={32}
                          color={
                            type === "Orgánico"
                              ? "#228B22"
                              : type === "Papel/Cartón"
                              ? "#1e90ff"
                              : type === "Plástico"
                              ? "#ffd700"
                              : type === "Vidrio"
                              ? "#808080"
                              : type === "Baterías"
                              ? "#ff6347"
                              : type === "Químicos"
                              ? "#ff4500"
                              : type === "Electrónicos"
                              ? "#ff8c00"
                              : "#808080"
                          }
                        />
                        <Text style={styles.iconLabel}>{type}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {/* Modal para mostrar información del tipo de residuo seleccionado */}
          {selectedWasteType && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={!!selectedWasteType}
              onRequestClose={() => setSelectedWasteType(null)}
            >
              <View style={styles.centeredModalContainer}>
                <View style={styles.modalContentSmallCentered}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedWasteType(null)}
                  >
                    <Feather name="x" size={28} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{selectedWasteType}</Text>
                  <Text style={styles.modalInfo}>
                    {wasteTypesInfo[selectedWasteType]}
                  </Text>
                </View>
              </View>
            </Modal>
          )}
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text>No se pudo obtener la ubicación</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', // Removido para permitir que el MapView ocupe toda la pantalla
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilos para el botón de filtro con ícono
  filterButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#228B22',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  filterIcon: {
    marginRight: 8, // Espacio entre el ícono y el texto
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos para el modal de filtro
  filterModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterModalContent: {
    backgroundColor: '#F5F5DC',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    maxHeight: '80%',
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#228B22',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#228B22',
  },
  applyFilterButton: {
    marginTop: 10,
    backgroundColor: '#228B22',
    paddingVertical: 10,
    borderRadius: 10,
  },
  applyFilterButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  clearFilterButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    borderRadius: 10,
  },
  clearFilterButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // Estilos para mostrar los filtros activos
  currentFilterContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  currentFilterText: {
    fontSize: 16,
    color: '#228B22',
    marginRight: 10,
  },

  // Estilos para el modal de información del punto seleccionado
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F5F5DC',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '40%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#228B22',
    textAlign: 'center',
  },
  modalSchedule: {
    fontSize: 16, // Tamaño ajustable según preferencia
    color: '#228B22',
    textAlign: 'center',
    marginTop: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center',
  },
  iconButton: {
    alignItems: 'center',
    margin: 10,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#228B22',
  },

  // Estilos para el modal de información del tipo de residuo seleccionado
  centeredModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentSmallCentered: {
    backgroundColor: '#F5F5DC',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  modalInfo: {
    fontSize: 16,
    color: '#228B22',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MapaScreen;
