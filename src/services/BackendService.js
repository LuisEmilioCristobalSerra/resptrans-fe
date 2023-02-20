import axios from "axios";

const baseUrl = `${process.env.VUE_APP_BACKEND_URL}`;
const instance = axios.create({
    baseURL: baseUrl,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
