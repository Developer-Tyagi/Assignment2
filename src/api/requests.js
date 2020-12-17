import axios from 'axios';
// import qs from 'qs';
// import authRefreshInterceptor from 'axios-auth-refresh';
// import { setToken, getToken } from '@utils/auth';

// const Authorization = getToken();
const baseURL = `https://api.claimguru.cilalabs.dev/v1`;
//for mock apis
// const baseURL = `https://56564994-ccad-41d5-989e-839ceca5232d.mock.pstmn.io/v1`;


const axiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },


    transformResponse: [
        apiData => {
            if (apiData && apiData !== '') {
                const { data } = JSON.parse(apiData);
                return data;
            }
            return apiData;
        }
    ]
});

const request = {
    get: (url, params) => axiosInstance.get(url, { params }),
    post: (url, body) => axiosInstance.post(url, body),
    put: (url, body) => axiosInstance.put(url, body),
    patch: (url, body) => axiosInstance.patch(url, body),
    del: url => axiosInstance.delete(url),
    delWithData: (url, data) => axiosInstance.delete(url, { data })
};

export default request;