
 //Security Event (SecurityEventDTO)
export interface SecurityEvent {
    id: number;
    eventType: string;
    username: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    success: boolean;
    timestamp: string; // ISO format from backend
    details: Record<string, any>;
}


 // Security Metrics (SecurityMetricsDTO)

export interface SecurityMetrics {
    totalEvents: number;
    failedLoginsLast24h: number;
    successfulLoginsLast24h: number;
    tokenErrorsLast24h: number;
    authorizationFailuresLast24h: number;
    successRate: number;
    suspiciousIPs: string[];
    recentFailures: SecurityFailure[];
}


 //Recent Failure (recentFailures του metrics)

export interface SecurityFailure {
    username: string;
    ipAddress: string;
    eventType: string;
    timestamp: string;
}


 //Event Type Constants (για filters k display)
export const EVENT_TYPES = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    TOKEN_INVALID: 'TOKEN_INVALID',
    AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED',

    // CRUD Operations
    USER_CREATED: 'USER_CREATED',
    USER_UPDATED: 'USER_UPDATED',
    USER_DELETED: 'USER_DELETED',

    CLIENT_CREATED: 'CLIENT_CREATED',
    CLIENT_UPDATED: 'CLIENT_UPDATED',
    CLIENT_DELETED: 'CLIENT_DELETED',

    APPOINTMENT_CREATED: 'APPOINTMENT_CREATED',
    APPOINTMENT_UPDATED: 'APPOINTMENT_UPDATED',
    APPOINTMENT_DELETED: 'APPOINTMENT_DELETED'
} as const;

export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];


 // Event Type Display Names (Greek + English)

export const EVENT_TYPE_LABELS: Record<EventType, { el: string; en: string }> = {
    LOGIN_SUCCESS: { el: 'Επιτυχής Σύνδεση', en: 'Login Success' },
    LOGIN_FAILED: { el: 'Αποτυχημένη Σύνδεση', en: 'Login Failed' },
    TOKEN_EXPIRED: { el: 'Token Έληξε', en: 'Token Expired' },
    TOKEN_INVALID: { el: 'Μη Έγκυρο Token', en: 'Invalid Token' },
    AUTHORIZATION_FAILED: { el: 'Απαγορευμένη Πρόσβαση', en: 'Access Denied' },

    //User CRUD
    USER_CREATED: { el: 'Δημιουργία Χρήστη', en: 'User Created' },
    USER_UPDATED: { el: 'Ενημέρωση Χρήστη', en: 'User Updated' },
    USER_DELETED: { el: 'Διαγραφή Χρήστη', en: 'User Deleted' },

    //Client CRUD
    CLIENT_CREATED: { el: 'Δημιουργία Πελάτη', en: 'Client Created' },
    CLIENT_UPDATED: { el: 'Ενημέρωση Πελάτη', en: 'Client Updated' },
    CLIENT_DELETED: { el: 'Διαγραφή Πελάτη', en: 'Client Deleted' },

    //Appointment CRUD
    APPOINTMENT_CREATED: { el: 'Δημιουργία Ραντεβού', en: 'Appointment Created' },
    APPOINTMENT_UPDATED: { el: 'Ενημέρωση Ραντεβού', en: 'Appointment Updated' },
    APPOINTMENT_DELETED: { el: 'Διαγραφή Ραντεβού', en: 'Appointment Deleted' }
};


 // Event Type Colors (badges)

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
    LOGIN_SUCCESS: 'success',
    LOGIN_FAILED: 'danger',
    TOKEN_EXPIRED: 'warning',
    TOKEN_INVALID: 'danger',
    AUTHORIZATION_FAILED: 'warning',

    //User CRUD
    USER_CREATED: 'info',
    USER_UPDATED: 'info',
    USER_DELETED: 'warning',

    //Client CRUD
    CLIENT_CREATED: 'success',
    CLIENT_UPDATED: 'info',
    CLIENT_DELETED: 'warning',

    //Appointment CRUD
    APPOINTMENT_CREATED: 'success',
    APPOINTMENT_UPDATED: 'info',
    APPOINTMENT_DELETED: 'warning'
};


 // Filter Options για Events List

export interface SecurityEventFilters {
    eventType?: EventType | 'ALL';
    success?: boolean | 'ALL';
    username?: string;
    dateFrom?: string;
    dateTo?: string;
}


 //Response types  API calls

export interface SecurityEventsResponse {
    events: SecurityEvent[];
    total: number;
}