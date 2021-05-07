import axios from 'axios';
import { getToken } from '@utils/auth';
import { refreshToken } from '@utils/firebase';
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
    if (error.response.status === 401) {
      refreshToken();
      return axiosInstance.request({
        method: err.error.config.method,
        url: err.error.config.url,
        params: err.error.config.params
      });
    } else if (error.response.status === 403) {
      window.location.href = '/access-denied';
    } else {
      if (typeof error.response === 'object') {
        throw {
          response: error.response.data.errors,
          status: error.response.status,
          type: 'multiple'
        };
      } else {
        throw {
          response: error.response.data,
          status: error.response.status,
          type: 'single'
        };
      }
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
