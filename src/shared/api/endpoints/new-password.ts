import axios from 'axios';
import { NewPasswordData } from 'entities/user/types';

export const updatePasswordAPI = (data: NewPasswordData) => {
  return axios.post('/api/auth/new-password', data);
};