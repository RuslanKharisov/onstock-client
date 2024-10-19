import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL, // Базовый URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;