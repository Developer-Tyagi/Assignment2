import axios from 'axios';
import { getToken, removeToken, removeCurrentUser } from '@utils/auth';

const baseURL = `${process.env.API}/v1`;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
  },
  error => {
    alert('interceptor request has error');
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const err = { error };
    if (err.error.response.status === 401) {
      removeToken();
      removeCurrentUser();
      window.location.href = '/login';
    }
  }
);

const request = {
  get: (url, params) => axiosInstance.get(url, { params }),
  post: (url, body) => axiosInstance.post(url, body),
  put: (url, body) => axiosInstance.put(url, body),
  patch: (url, body) => axiosInstance.patch(url, body),
  del: url => axiosInstance.delete(url),
  delWithData: (url, data) => axiosInstance.delete(url, { data })
};

export default request;
