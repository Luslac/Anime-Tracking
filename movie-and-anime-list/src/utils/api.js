import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
    baseURL: '/api/v1'
})

// Helper: Check if token expired
function isTokenExpired(token) {
    if (!token) return true
    try {
        const decoded = jwtDecode(token)
        return decoded.exp < Date.now() / 1000 + 60  // 60s buffer
    } catch {
        return true
    }
}

// Helper: Logout
function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
}

// ❗ Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        
        // ❗ Check expiration BEFORE request
        if (isTokenExpired(token)) {
            logout()
            return Promise.reject(new Error('Token expired'))
        }
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        
        return config
    },
    (error) => Promise.reject(error)
)

// ❗ Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // ❗ Handle 401 from backend
        if (error.response?.status === 401) {
            logout()
        }
        return Promise.reject(error)
    }
)

export default api
