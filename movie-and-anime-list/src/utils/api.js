import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

function isTokenExpired(token) {
    if (!token) return true
    try {
        const decoded = jwtDecode(token)
        return decoded.exp < Date.now() / 1000 + 60  
    } catch {
        return true
    }
}


function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        
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


api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            logout()
        }
        return Promise.reject(error)
    }
)

export default api
