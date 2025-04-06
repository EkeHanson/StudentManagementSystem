// src/services/auth.service.js
import API from './api';
import { decodeToken } from '../utils/helpers';

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  const decoded = decodeToken(response.data.token);
  return { ...decoded, token: response.data.token };
};

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  const decoded = decodeToken(response.data.token);
  return { ...decoded, token: response.data.token };
};

export const logout = async () => {
  await API.post('/auth/logout');
};

export const resetPassword = async (email) => {
  await API.post('/auth/reset-password', { email });
};

export const verifyToken = async (token) => {
  const response = await API.get('/auth/verify', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};