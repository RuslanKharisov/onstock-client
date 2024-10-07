import axios from 'axios';
import { UserLoginData } from 'entities/user/types';

export const loginUserAPI = (data: UserLoginData) => {
  return axios.post('/api/auth/login', data);
};