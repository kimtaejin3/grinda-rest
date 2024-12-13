import axios from 'axios';

const api = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 1000,
});

export default api;
