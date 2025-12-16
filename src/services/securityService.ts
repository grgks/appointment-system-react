import api from './api';
import { ENDPOINTS } from '../utils/constants';
import { AxiosError } from 'axios';
import type { SecurityEvent, SecurityMetrics } from '../types/security';
import type { ApiError } from '../types/common';

export const securityService = {
    /**
     * Get recent security events
     * @param limit - Number of events to retrieve (default: 50)
     */
    async getEvents(limit: number = 50): Promise<SecurityEvent[]> {
        try {
            console.log('SecurityService: Fetching security events...');

            const response = await api.get<SecurityEvent[]>(ENDPOINTS.SECURITY.EVENTS, {
                params: { limit }
            });

            console.log('SecurityService: Events fetched successfully:', response.data.length);
            return response.data;
        } catch (error) {
            console.error('SecurityService: Get events error:', error);

            let errorMessage = 'Failed to fetch security events';

            if (error instanceof Error) {
                if ('response' in error) {
                    const axiosError = error as AxiosError<ApiError>;

                    if (axiosError.response?.status === 403) {
                        errorMessage = 'Access denied. Admin privileges required.';
                    } else if (axiosError.response?.status === 401) {
                        errorMessage = 'Authentication required';
                    } else {
                        errorMessage = axiosError.response?.data?.description ||
                            'Failed to fetch security events';
                    }
                } else {
                    errorMessage = error.message;
                }
            }

            throw new Error(errorMessage);
        }
    },

    /**
     * Get security metrics (24h statistics)
     */
    async getMetrics(): Promise<SecurityMetrics> {
        try {
            console.log('SecurityService: Fetching security metrics...');

            const response = await api.get<SecurityMetrics>(ENDPOINTS.SECURITY.METRICS);

            console.log('SecurityService: Metrics fetched successfully');
            console.log('SecurityService: Total events:', response.data.totalEvents);
            console.log('SecurityService: Success rate:', response.data.successRate + '%');

            return response.data;
        } catch (error) {
            console.error('SecurityService: Get metrics error:', error);

            let errorMessage = 'Failed to fetch security metrics';

            if (error instanceof Error) {
                if ('response' in error) {
                    const axiosError = error as AxiosError<ApiError>;

                    if (axiosError.response?.status === 403) {
                        errorMessage = 'Access denied. Admin privileges required.';
                    } else if (axiosError.response?.status === 401) {
                        errorMessage = 'Authentication required';
                    } else {
                        errorMessage = axiosError.response?.data?.description ||
                            'Failed to fetch security metrics';
                    }
                } else {
                    errorMessage = error.message;
                }
            }

            throw new Error(errorMessage);
        }
    },

    /**
     * Get filtered events (for future use)
     * @param filters - Event filters (eventType, success, username, etc.)
     */
    async getFilteredEvents(filters: {
        eventType?: string;
        success?: boolean;
        username?: string;
        limit?: number;
    }): Promise<SecurityEvent[]> {
        try {
            console.log('SecurityService: Fetching filtered events...', filters);

            const response = await api.get<SecurityEvent[]>(ENDPOINTS.SECURITY.EVENTS, {
                params: {
                    limit: filters.limit || 50,
                    // Backend doesn't support filters yet, but ready for future
                    ...filters
                }
            });

            // Client-side filtering until backend supports it
            let events = response.data;

            if (filters.eventType) {
                events = events.filter(e => e.eventType === filters.eventType);
            }

            if (filters.success !== undefined) {
                events = events.filter(e => e.success === filters.success);
            }

            if (filters.username) {
                events = events.filter(e =>
                    e.username?.toLowerCase().includes(filters.username!.toLowerCase())
                );
            }

            console.log('SecurityService: Filtered events:', events.length);
            return events;
        } catch (error) {
            console.error('SecurityService: Get filtered events error:', error);
            throw new Error('Failed to fetch filtered events');
        }
    }
};