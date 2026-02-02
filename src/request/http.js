import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';
import { setupInterceptors } from './interceptors';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

setupInterceptors(service);

const http = (url, options = {}) => {
  return service({
    url,
    ...options,
  });
};

export default http;
