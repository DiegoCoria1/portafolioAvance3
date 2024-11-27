// ./contexts/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // 'es' o 'en'

  const addNotification = (message) => {
    // Implementa la lógica para agregar una notificación
    console.log('Notificación agregada:', message);
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, addNotification }}>
      {children}
    </AppContext.Provider>
  );
};
