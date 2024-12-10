// ./screens/NotificacionScreen.js
import React, { useState, useMemo, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { NotificationContext } from '../contexts/NotificationContext';

const NotificacionScreen = ({ navigation }) => {
  const { setHasNewNotifications } = useContext(NotificationContext);

  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Nueva campaña ecológica', type: 'campaña', read: false },
    { id: '2', title: 'Retiro de residuos completado', type: 'retiro', read: false },
    { id: '3', title: 'Aviso a la comunidad: reunión', type: 'comunidad', read: false },
    { id: '4', title: 'Nueva campaña de reciclaje', type: 'campaña', read: false },
    { id: '5', title: 'Actualización del programa de residuos', type: 'retiro', read: false },
  ]);

  const [activeFilters, setActiveFilters] = useState({
    campaña: false,
    retiro: false,
    comunidad: false,
  });

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

  const deleteNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteNotification(id)}
    >
      <MaterialCommunityIcons name="trash-can" size={28} color="#FFF" />
    </TouchableOpacity>
  );

  const renderNotification = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      overshootRight={false}
    >
      <View style={[styles.notificationItem, styles[item.type], item.read && styles.readItem]}>
        <TouchableOpacity
          style={styles.notificationContent}
          onPress={() => {
            if (!item.read) {
              setNotifications(prev =>
                prev.map(notification =>
                  notification.id === item.id ? { ...notification, read: true } : notification
                )
              );
            }
            navigation.navigate('DetalleNotificacion', { notification: item });
          }}
        >
          <View style={styles.notificationHeader}>
            <Text style={[styles.notificationTitle, item.read && styles.readNotification]}>
              {item.title}
            </Text>
            {!item.read && <View style={styles.unreadIndicator} />}
          </View>
          <Text style={styles.notificationType}>{item.type.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setHasNewNotifications(false);
    });

    return unsubscribe;
  }, [navigation, setHasNewNotifications]);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['campaña', 'retiro', 'comunidad'].map((type) => (
          <Chip
            key={type}
            mode="outlined"
            selected={activeFilters[type]}
            onPress={() => toggleFilter(type)}
            selectedColor="#FFF" // Color del tick y texto cuando está seleccionado
            style={[
              styles.chip,
              activeFilters[type] && styles.chipSelected,
              styles[`chip${type.charAt(0).toUpperCase() + type.slice(1)}`],
            ]}
            textStyle={{ color: '#FFF', fontSize: 16 }} // Texto más grande y blanco
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Chip>
        ))}
      </View>
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay notificaciones disponibles.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  chip: {
    margin: 4,
    borderWidth: 0,
    height: 40, // Aumenta la altura
    justifyContent: 'center', // Centra el contenido verticalmente
    paddingHorizontal: 12, // Más espacio horizontal
    borderRadius: 20, // Bordes más redondeados
  },
  chipSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  chipCampaña: {
    backgroundColor: '#1370cd',
  },
  chipRetiro: {
    backgroundColor: '#388E3C',
  },
  chipComunidad: {
    backgroundColor: '#ec7802',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  campaña: {
    borderLeftColor: '#1370cd',
  },
  retiro: {
    borderLeftColor: '#388E3C',
  },
  comunidad: {
    borderLeftColor: '#F57C00',
  },
  notificationContent: {
    flex: 1,
    padding: 15,
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
  deleteButton: {
    backgroundColor: '#DD2C00',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: '88%',
    borderRadius: 10,
    margin: 5,
  },
  readItem: {
    opacity: 0.6,
  },
});

export default NotificacionScreen;
