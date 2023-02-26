import axios from "axios";
import { ElNotification } from 'element-plus'

const baseUrl = `${process.env.VUE_APP_BACKEND_URL}`;
const instance = axios.create({
    baseURL: baseUrl,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    ElNotification({
        title: "Ha ocurrido un error",
        message: error.response?.data?.message,
        type: 'error',
    })
    return Promise.reject(error)
})

export default instance;
