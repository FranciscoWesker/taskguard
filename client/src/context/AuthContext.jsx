import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  // No necesitamos configurar headers, la cookie se envía automáticamente

  const login = ({ user }) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // ignorar errores
    }
    setUser(null);
    localStorage.removeItem('user');
    // Opcional: llamar endpoint logout para limpiar cookie en servidor
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 