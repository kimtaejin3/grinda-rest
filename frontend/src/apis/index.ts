import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://port-0-grinda-rest-m4jhu7695910b72b.sel4.cloudtype.app',
  baseURL: 'http://localhost:8000',
  // timeout: 1000,
});

export default api;
