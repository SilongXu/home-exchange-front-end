import axios from 'axios';

const develop_environment = 'http://192.168.0.167:8888/';

const BASE_URL = `${develop_environment}api/v1`;

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
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  return error;
});

export default http;