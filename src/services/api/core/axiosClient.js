import axios from "axios"
import { api as apiConfig } from "@/config"

const axiosClient = axios.create(apiConfig.coreAxiosClientConfig)

// axiosClient.interceptors.request.use(
//     async (config) => {
//         const token = authStorageService.accessToken.get()
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`,
//         }
//         return config
//     },
//     async (error) => Promise.reject(new Error(error)),
// )

axiosClient.interceptors.response.use(
    async (response) => {
        if (response && response.data) {
            return response.data
        }
    },
    async (error) => {
        const errorData = error.response?.data || "Error!"

        return Promise.reject(errorData)
    },
)

export default axiosClient
