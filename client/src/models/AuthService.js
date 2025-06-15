import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/auth';

export default {
  async login(email, password) {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  },

  async changePassword(token, currentPassword, newPassword) {
    const response = await axios.post(
      `${API_BASE_URL}/change-password`,
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};