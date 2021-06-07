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
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    {
      if (error.response.status === 401) {
        await refreshToken();
        return axiosInstance.request({
          method: error.config.method,
          url: error.config.url,
          params: error.config.params
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
