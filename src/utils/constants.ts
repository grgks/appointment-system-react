export const API_BASE_URL = 'http://localhost:8080';

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/authenticate',
        REGISTER: '/api/auth/signup'
    },
    CLIENTS: {
        LIST: '/api/clients',
        BY_ID: '/api/clients',
        CREATE: '/api/clients/save',
        UPDATE: '/api/clients',
        DELETE: '/api/clients',
        SEARCH: '/api/clients/search'
    },
    APPOINTMENTS: {
        LIST: '/api/appointments',
        BY_ID: '/api/appointments',
        CREATE: '/api/appointments/save',
        UPDATE: '/api/appointments/update',
        DELETE: '/api/appointments',
        UPCOMING: '/api/appointments/upcoming',
        REMINDER: '/api/appointments/reminder'
    }
};

export const STORAGE_KEYS = {
    TOKEN: 'authToken',
    USER: 'userData'
};

// Appointment status colors for badges/components
export const APPOINTMENT_STATUS_COLORS = {
    pending: 'warning',
    confirmed: 'info',
    completed: 'success',
    cancelled: 'danger'
};

// Client status colors
export const CLIENT_STATUS_COLORS = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800'
};

// Common status options
export const STATUS_OPTIONS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
};

// Gender options
export const GENDER_OPTIONS = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER'
};

// Role options
export const ROLE_OPTIONS = {
    CLIENT: 'CLIENT',
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE'
};

// Appointment status options
export const APPOINTMENT_STATUSES = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};