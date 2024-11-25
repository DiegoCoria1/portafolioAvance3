// ./contexts/NotificationContext.js
import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // Inicialmente hay nuevas notificaciones

  return (
    <NotificationContext.Provider value={{ hasNewNotifications, setHasNewNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
