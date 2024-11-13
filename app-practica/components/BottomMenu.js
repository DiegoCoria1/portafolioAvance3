import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BottomMenu({ navigation, currentRoute }) {
  const menuItems = [
    { name: 'Camera', icon: 'camera-outline' },
    { name: 'Location', icon: 'location-outline' },
    { name: 'MainScreen', icon: 'home-outline' },
    { name: 'Trash', icon: 'trash-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.button}
          onPress={() => navigation.navigate(item.name)}
        >
          <Ionicons
            name={item.icon}
            size={28}
            color={currentRoute === item.name ? '#2E7D32' : 'gray'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

