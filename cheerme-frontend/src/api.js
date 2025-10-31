import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// リクエストでトークンあれば付与する例
api.interceptors.request.use(cfg => {
    const token = localStorage.getItem('cheerme_token')
    if (token) cfg.headers.Authorization = `Bearer ${token}`
    return cfg
})

export default api