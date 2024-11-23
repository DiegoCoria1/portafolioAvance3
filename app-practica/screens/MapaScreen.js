import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Puntos verdes extraídos del archivo JSON
const waypoints = [
  { latitude: -42.466292120161597, longitude: -73.506642400457693, title: "Punto verde mirador" },
  { latitude: -42.4723554943876, longitude: -73.486943873391695, title: "Nº3 Punto Verde Predio municipal" },
  { latitude: -42.476024060602299, longitude: -73.490452577314102, title: "Nº 1 punto verde VBV" },
  { latitude: -42.475864281718898, longitude: -73.491828770279, title: "Nº2 Punto Verde VBV" },
  { latitude: -42.471970818427103, longitude: -73.488173430784997, title: "Nº4 Punto verde LRF" },
  { latitude: -42.4725920340085, longitude: -73.490243285827603, title: "Nº5 Punto Verde Mini mercado TAMY" },
  { latitude: -42.471533354024302, longitude: -73.489504286711295, title: "Nº6 Punto verde C.E.A.C" },
  { latitude: -42.471533354024302, longitude: -73.489504286711295, title: "Nº7 Punto Verde L.B.I" },
  { latitude: -42.470470334440499, longitude: -73.487450337264804, title: "Nº8 Punto verde Municipal" },
  { latitude: -42.470973389880399, longitude: -73.488417727002201, title: "Nº9 Punto Verde Municipalidad" },
  { latitude: -42.472572623056401, longitude: -73.488213700706396, title: "Nº10 punto verde gimnasio fiscal" },
  { latitude: -42.471386969321401, longitude: -73.492053995810906, title: "Nº11 Punto Verde Biblioteca" },
  { latitude: -42.4701902334293, longitude: -73.495270704195306, title: "Nº12 punto verde L.B.I.M" },
  { latitude: -42.469378277508497, longitude: -73.498351470876301, title: "Nº13 Punto verde Minimercado el rinconcito" },
  { latitude: -42.471145114420402, longitude: -73.494877019148205, title: "Nº14 Punto verde minimercado" },
  { latitude: -42.471514330116698, longitude: -73.496597111680998, title: "Nº15 Punto Verde JJVV Esfuerzo unido" },
  { latitude: -42.468408486911599, longitude: -73.4956061182952, title: "Nº16 Punto verde Familia Aguila Levicoy" },
  { latitude: -42.468770309883503, longitude: -73.493719984037199, title: "Nº17 Punto Verde Glorieta" },
  { latitude: -42.476758115217102, longitude: -73.479433306539306, title: "Nº18 Punto verde J.Mercado" },
  { latitude: -42.474720056269803, longitude: -73.496706321929295, title: "Nº20 Punto Verde P. Nazareno" },
  { latitude: -42.473861325739499, longitude: -73.496701596127807, title: "Nº20 Punto verde Andrea Levicoy" },
  { latitude: -42.473186710403198, longitude: -73.497072766391398, title: "Nº21 Punto Verde Barrio Alto" },
  { latitude: -42.473416236018799, longitude: -73.487435736156996, title: "Nº22 Punto Verde DESAM" },
  { latitude: -42.473063092469502, longitude: -73.487407592565404, title: "Nº23 Punto verde PRODESAL" },
  { latitude: -42.433044593703897, longitude: -73.453058463439604, title: "Nº24 Punto verde Escuela" },
  { latitude: -42.433128552154201, longitude: -73.452863174123706, title: "Nº25 Punto verde Vecinal" },
  { latitude: -42.432674080610703, longitude: -73.452750850516907, title: "Nº26 Punto verde posta" },
  { latitude: -42.4334579320778, longitude: -73.432840703867001, title: "Nº27 Punto Verde Mauten" },
  { latitude: -42.386539901858399, longitude: -73.449411917074698, title: "Nº28 Punto verde comunitario" },
  { latitude: -42.388115649219898, longitude: -73.432769666140004, title: "Nº29 Punto verde escuela Los Pinos" },
  { latitude: -42.406503934382002, longitude: -73.436833410836201, title: "Nº30 Punto verde Punta Tane" },
  { latitude: -42.416198191622499, longitude: -73.299637087954693, title: "Nº31 Punto verde Cescof" },
  { latitude: -42.420356105150802, longitude: -73.305394929214003, title: "Nº32 Punto verde Escuela San Francisco" },
  { latitude: -42.420886250925101, longitude: -73.305854904641606, title: "Nº33 Punto verde comunitario" },
  { latitude: -42.416277630343401, longitude: -73.307872029730603, title: "Nº34 Punto Verde comunitario" },
  { latitude: -42.457146120301999, longitude: -73.330384060252996, title: "Nº35 Punto verde comunitario" },
  { latitude: -42.4581232002853, longitude: -73.331175230969905, title: "Nº36 Punto Verde posta" },
  { latitude: -42.457710527288498, longitude: -73.327683103806706, title: "Nº37 Punto verde  Escuela" },
  { latitude: -42.510750033443301, longitude: -73.266257207799399, title: "Nº38 Punto verde comunitario" },
  { latitude: -42.509828353995701, longitude: -73.266257697164207, title: "Nº39 Punto verde Posta" },
  { latitude: -42.512028371793697, longitude: -73.263091086120596, title: "Nº41 Punto Verde Escuela" },
  { latitude: -42.510665491203298, longitude: -73.265098508267798, title: "Nº40 Punto verde delegación municipal" },
  { latitude: -42.600664435745898, longitude: -73.299215944531298, title: "Nº42 Punto verde escuela" },
  { latitude: -42.600927759393699, longitude: -73.298907782945506, title: "Nº43 Punto verde Posta" },
  { latitude: -42.600662991870003, longitude: -73.298373217731395, title: "Nº44 Punto Verde comunitario" },
  { latitude: -42.608712160835204, longitude: -73.268963201938007, title: "Nº45 Punto Verde Apao" },
  { latitude: -42.602299270806, longitude: -73.209676553914804, title: "Nº46 Punto Verde escuela" },
  { latitude: -42.596715649955399, longitude: -73.2235096820216, title: "Nº47 Punto verde escuela" },
  { latitude: -42.591123410421098, longitude: -73.225745123316699, title: "Nº48 Punto verde comunitario" },
  { latitude: -42.626355257840999, longitude: -73.2986886196299, title: "Nº49 Punto Verde comunitario" },
  { latitude: -42.577802775818398, longitude: -73.402842090473897, title: "Nº50 Punto Verde Chequian" },
  { latitude: -42.569493288761102, longitude: -73.417723255508406, title: "Nº51 Punto verde escuela Eliana Triviño" },
  { latitude: -42.539123399905101, longitude: -73.424375879065593, title: "Nº52 Punto verde escuela" },
  { latitude: -42.427084389501402, longitude: -73.341038665584094, title: "Nº53 Punto Verde el Trànsito" },
];

const MapaScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#228B22" />
      ) : location ? (
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
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={"Mi ubicación actual"}
          />
          {waypoints.map((point, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: point.latitude, longitude: point.longitude }}
              title={point.title}
            />
          ))}
        </MapView>
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
    justifyContent: 'center',
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
});

export default MapaScreen;
