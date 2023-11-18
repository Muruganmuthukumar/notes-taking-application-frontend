import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = (authenticatedUserId, authToken) => {
    setIsAuthenticated(true);
    setUserId(authenticatedUserId);
    setToken(authToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
