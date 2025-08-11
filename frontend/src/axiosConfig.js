// src/axiosConfig.js
import axios from 'axios';

const baseURL = window?.BackendConfig?.NodeUrl ;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
