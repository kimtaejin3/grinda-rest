import axios from 'axios';

const api = axios.create({
  // baseURL: "https://port-0-grinda-rest-m4jhu7695910b72b.sel4.cloudtype.app",
  baseURL: "http://localhost:8000",
  timeout: 5000,  // 5초로 증가
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
