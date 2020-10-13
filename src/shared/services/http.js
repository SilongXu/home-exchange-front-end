import axios from 'axios';

const BASE_URL = '/api/v1';

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
});

http.interceptors.request.use((data) => {
  return data;
});

http.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default http;