// ./contexts/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // Agrega aquí la lógica para limpiar tokens o datos persistentes
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
