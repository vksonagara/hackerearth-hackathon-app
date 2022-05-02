import { getAsyncStorage } from '@utils';
import axios from 'axios';

// Sending Authorization header for every request
axios.interceptors.request.use(async config => {
  const token = await getAsyncStorage('token');
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
