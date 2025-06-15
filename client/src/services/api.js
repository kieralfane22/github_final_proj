import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Auth API
export const login = (email, password) => {
  return axios.post(`${API_BASE}/auth/login`, { email, password });
};

export const changePassword = (token, currentPass, newPass) => {
  return axios.post(
    `${API_BASE}/auth/change-password`,
    { currentPassword: currentPass, newPassword: newPass },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Grades API (Microservice)
export const fetchGrades = (token) => {
  return axios.get('http://localhost:3001/api/grades', {
    headers: { Authorization: `Bearer ${token}` }
  });
};