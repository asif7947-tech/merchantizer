import axios from 'axios';
import { BASE_URL } from '../config/constant';

export let authToken: any = null;

export const setAuthToken = (token:string) => {
  authToken = token;
};

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: `Request is timed out.`,
});

// INTERCEPTORS
axiosClient.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['Authorization'] = `Bearer ${authToken}`;
    return config;
  },
  error => {    
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);
