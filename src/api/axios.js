import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://www.task-manager.api.mvn-training.com'
})

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance;
