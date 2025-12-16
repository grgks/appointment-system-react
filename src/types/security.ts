/**
 * Security Event (SecurityEventDTO)
 */
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

/**
 * Security Metrics (SecurityMetricsDTO)
 */
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

/**
 * Recent Failure (recentFailures του metrics)
 */
export interface SecurityFailure {
    username: string;
    ipAddress: string;
    eventType: string;
    timestamp: string;
}

/**
 * Event Type Constants (για filters k display)
 */
export const EVENT_TYPES = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    TOKEN_INVALID: 'TOKEN_INVALID',
    AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED'
} as const;

export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];

/**
 * Event Type Display Names (Greek + English)
 */
export const EVENT_TYPE_LABELS: Record<EventType, { el: string; en: string }> = {
    LOGIN_SUCCESS: { el: 'Επιτυχής Σύνδεση', en: 'Login Success' },
    LOGIN_FAILED: { el: 'Αποτυχημένη Σύνδεση', en: 'Login Failed' },
    TOKEN_EXPIRED: { el: 'Token Έληξε', en: 'Token Expired' },
    TOKEN_INVALID: { el: 'Μη Έγκυρο Token', en: 'Invalid Token' },
    AUTHORIZATION_FAILED: { el: 'Απαγορευμένη Πρόσβαση', en: 'Access Denied' }
};

/**
 * Event Type Colors (badges)
 */
export const EVENT_TYPE_COLORS: Record<EventType, string> = {
    LOGIN_SUCCESS: 'success',
    LOGIN_FAILED: 'danger',
    TOKEN_EXPIRED: 'warning',
    TOKEN_INVALID: 'danger',
    AUTHORIZATION_FAILED: 'warning'
};

/**
 * Filter Options για Events List
 */
export interface SecurityEventFilters {
    eventType?: EventType | 'ALL';
    success?: boolean | 'ALL';
    username?: string;
    dateFrom?: string;
    dateTo?: string;
}

/**
 * Response types  API calls
 */
export interface SecurityEventsResponse {
    events: SecurityEvent[];
    total: number;
}