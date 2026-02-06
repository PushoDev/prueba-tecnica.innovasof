import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario desde localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUser({
        userId: storedUserId,
        username: storedUsername,
      });
    }
    setLoading(false);
  }, []);

  // Login
  const login = (userData, rememberMe = false) => {
    const { token, userId, username } = userData;

    setToken(token);
    setUser({ userId, username });

    // Guardar en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username || '');

    // Si "Recuérdame" está activo, también guardar en sessionStorage
    if (rememberMe) {
      sessionStorage.setItem('rememberMe', 'true');
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);

    // Limpiar localStorage y sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    sessionStorage.removeItem('rememberMe');
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!token;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
