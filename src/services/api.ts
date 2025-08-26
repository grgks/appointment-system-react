import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants.ts';

// Create axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add token to requests
api.interceptors.request.use(
    (config) => {
        //Read from sessionStorage instead of localStorage
        const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('API: Token added to request headers');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log('API: 401 Unauthorized - received');
            //check constraint errors - no logout
            if (error.isConstraintError || error.isDeleteError) {
                console.log('API: Constraint violation error - not logging out');
                return Promise.reject(error);
            }

            // check DELETE request  client endpoint
            const url = error.config?.url || '';
            const method = error.config?.method?.toLowerCase() || '';

            if (method === 'delete' && url.includes('/clients/')) {
                console.log('API: Delete client constraint error - not logging out');
                return Promise.reject(error);
            }

            // 401 errors (auth issues)
            console.log('API: Authentication error - clearing session');
            sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
            sessionStorage.removeItem(STORAGE_KEYS.USER);

            // delayed Redirect to login page
            setTimeout(() => {
                window.location.href = '/login';
            }, 800);
        }
        return Promise.reject(error);
    }
);

export default api;