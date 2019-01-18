import axios from 'axios'

const axiosInstance = axios.create();
axiosInstance.defaults.headers = {
    'Access-Control-Allow-Credentials': true,
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
};


axiosInstance.interceptors.response.use(
    response => response,
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance;
