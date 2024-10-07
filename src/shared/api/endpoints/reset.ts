import axios from 'axios';

export const resetPasswordAPI = (email: string) => {
  return axios.post('/api/auth/reset-password', { email });
};