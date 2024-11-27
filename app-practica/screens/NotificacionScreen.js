// ./screens/NotificacionScreen.js

import React, { useState, useMemo, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Utilizamos MaterialCommunityIcons para el ícono de eliminar
import { NotificationContext } from '../contexts/NotificationContext';

const NotificacionScreen = ({ navigation }) => {
  const { setHasNewNotifications } = useContext(NotificationContext);

  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Nueva campaña ecológica', type: 'campaña', read: false },
    { id: '2', title: 'Retiro de residuos completado', type: 'retiro', read: false },
    { id: '3', title: 'Aviso a la comunidad: reunión', type: 'comunidad', read: false },
    { id: '4', title: 'Nueva campaña de reciclaje', type: 'campaña', read: false },
    { id: '5', title: 'Actualización del programa de residuos', type: 'retiro', read: false },
    // Puedes agregar más notificaciones según sea necesario
  ]);

  const [activeFilters, setActiveFilters] = useState({
    campaña: false,
    retiro: false,
    comunidad: false,
  });

  // Filtrar las notificaciones según los filtros activos
  const filteredNotifications = useMemo(() => {
    const activeTypes = Object.keys(activeFilters).filter(type => activeFilters[type]);
    if (activeTypes.length === 0) return notifications;
    return notifications.filter(notification => activeTypes.includes(notification.type));
  }, [activeFilters, notifications]);

  const toggleFilter = (type) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));
  };

  // Función para eliminar una notificación por su ID
  const deleteNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  const renderItem = (data) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        styles[data.item.type], // Aplica estilos según el tipo de notificación
        data.item.read ? styles.readItem : null, // Estilo adicional si está leída
      ]}
      onPress={() => {
        // Marcar como leída
        setNotifications(prevNotifications =>
          prevNotifications.map(notification =>
            notification.id === data.item.id ? { ...notification, read: true } : notification
          )
        );
        // Navegar a la pantalla de detalle
        navigation.navigate('DetalleNotificacion', { notification: data.item });
      }}
      accessible={true}
      accessibilityLabel={`Notificación de tipo ${data.item.type}`}
    >
      <View style={styles.notificationHeader}>
        <Text style={[styles.notificationTitle, data.item.read && styles.readNotification]}>
          {data.item.title}
        </Text>
        {!data.item.read && <View style={styles.unreadIndicator} />}
      </View>
      <Text style={styles.notificationType}>{data.item.type.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(data.item.id)} // Eliminación directa sin confirmación
      >
        <MaterialCommunityIcons name="trash-can" size={24} color="#FFF" />
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  // Cuando la pantalla se enfoca, marcamos que ya no hay nuevas notificaciones
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setHasNewNotifications(false);
    });

    return unsubscribe;
  }, [navigation, setHasNewNotifications]);

  return (
    <View style={styles.container}>
      {/* Botones de filtro organizados en una fila */}
      <View style={styles.filterContainer}>
        <Chip
          mode="outlined"
          selected={activeFilters['campaña']}
          onPress={() => toggleFilter('campaña')}
          style={[
            styles.chip,
            activeFilters['campaña'] ? styles.chipSelected : styles.chipUnselected,
          ]}
        >
          Campañas
        </Chip>
        <Chip
          mode="outlined"
          selected={activeFilters['retiro']}
          onPress={() => toggleFilter('retiro')}
          style={[
            styles.chip,
            activeFilters['retiro'] ? styles.chipSelected : styles.chipUnselected,
          ]}
        >
          Retiros
        </Chip>
        <Chip
          mode="outlined"
          selected={activeFilters['comunidad']}
          onPress={() => toggleFilter('comunidad')}
          style={[
            styles.chip,
            activeFilters['comunidad'] ? styles.chipSelected : styles.chipUnselected,
          ]}
        >
          Comunidad
        </Chip>
      </View>

      {/* Lista de notificaciones filtradas con SwipeListView */}
      <SwipeListView
        data={filteredNotifications}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item) => item.id}
        rightOpenValue={-150} // Define la distancia de swipe para revelar el botón
        disableRightSwipe // Deshabilita el swipe hacia la derecha
        previewRowKey={'1'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay notificaciones disponibles.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC', // Fondo beige claro
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  chip: {
    margin: 4,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  chipUnselected: {
    backgroundColor: '#EEE',
    borderColor: '#CCC',
  },
  notificationItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#FFF',
    // Sombra para Android
    elevation: 2,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  campaña: {
    borderLeftWidth: 5,
    borderLeftColor: '#1976D2',
  },
  retiro: {
    borderLeftWidth: 5,
    borderLeftColor: '#388E3C',
  },
  comunidad: {
    borderLeftWidth: 5,
    borderLeftColor: '#F57C00',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 16,
    color: '#333',
  },
  readNotification: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E7D32',
  },
  notificationType: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginVertical: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DD2C00', // Color de fondo para la acción de eliminar
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
    justifyContent: 'center',
    height: '100%',
  },
  deleteText: {
    color: '#FFF',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  readItem: {
    opacity: 0.6,
  },
});

export default NotificacionScreen;
