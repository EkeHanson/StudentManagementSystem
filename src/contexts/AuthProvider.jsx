// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, logout, resetPassword } from '../services/auth.service';

// Create the context
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    error,
    login: async (email, password) => {
      try {
        const user = await login(email, password);
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setError('');
        return user;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    register: async (userData) => {
      try {
        const user = await register(userData);
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setError('');
        return user;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    logout: () => {
      logout();
      setCurrentUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    },
    resetPassword: async (email) => {
      try {
        await resetPassword(email);
        setError('');
        return true;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// useAuth hook
export function useAuth() {
  return useContext(AuthContext);
}