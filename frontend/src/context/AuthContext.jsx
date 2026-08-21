import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('resumeiq_user');
    return saved ? JSON.parse(saved) : { id: 'guest-user', name: 'Alex Morgan (Guest)', email: 'alex.morgan@email.com' };
  });

  const [token, setToken] = useState(() => localStorage.getItem('resumeiq_token') || null);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('resumeiq_user', JSON.stringify(userData));
    localStorage.setItem('resumeiq_token', authToken);
  };

  const logout = () => {
    setUser({ id: 'guest-user', name: 'Guest User', email: 'guest@resumeiq.ai' });
    setToken(null);
    localStorage.removeItem('resumeiq_user');
    localStorage.removeItem('resumeiq_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
