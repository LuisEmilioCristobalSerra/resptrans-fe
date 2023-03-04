import axios from "axios";
import { ElNotification } from 'element-plus'
import store from '@/store'
import TokenService from '@/services/TokenService';

const baseUrl = `${process.env.VUE_APP_BACKEND_URL}`;
const instance = axios.create({
    baseURL: baseUrl,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
    (config) => {
        if (store.state.token) {
            config.headers['Authorization'] = 'Bearer ' + store.state.token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response?.status === 401) {
        store.dispatch('removeToken')
    }
    ElNotification({
        title: "Ha ocurrido un error",
        message: error.response?.data?.message,
        type: 'error',
        duration: 0,
    })
    return Promise.reject(error)
})

export default instance;
