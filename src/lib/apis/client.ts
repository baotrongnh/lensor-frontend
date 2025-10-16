import axios from "axios"
const TOKEN_TEST = 'test123'

export const apiClient = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
     withCredentials: true
})

apiClient.interceptors.request.use(
     (config) => {
          config.headers.Authorization = `Bearer ${TOKEN_TEST}`
          return config
     },
     (error) => {
          return Promise.reject(error)
     }
)

apiClient.interceptors.response.use(undefined, async (error) => {
     if (error.response?.status === 401) {
          return apiClient(error.config)
     }

     throw error
})