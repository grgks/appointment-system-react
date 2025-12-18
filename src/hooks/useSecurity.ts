import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { securityService } from '../services/securityService';
import type { SecurityEvent, SecurityMetrics } from '../types/security';

interface UseSecurityReturn {
    events: SecurityEvent[];
    metrics: SecurityMetrics | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useSecurity = (limit: number = 50): UseSecurityReturn => {
    const { isAuthenticated, user } = useAuth();
    const [events, setEvents] = useState<SecurityEvent[]>([]);
    const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSecurityData = useCallback(async (): Promise<void> => {
        // Don't fetch if not authenticated
        if (!isAuthenticated || !user) {
            console.log('Security: User not authenticated, skipping fetch');
            setLoading(false);
            return;
        }

        // Check if user has admin role
        if (user.role !== 'ROLE_ADMIN' && user.role !== 'ADMIN' &&
            user.role !== 'SUPER_ADMIN' && user.role !== 'ROLE_SUPER_ADMIN') {
            console.log('Security: User does not have admin privileges');
            setError('Access denied. Admin privileges required.');
            setLoading(false);
            return;
        }

        try {
            console.log('Security: Starting data fetch...');
            setLoading(true);
            setError(null);

            // Fetch events and metrics
            const [eventsData, metricsData] = await Promise.all([
                securityService.getEvents(limit),
                securityService.getMetrics()
            ]);

            console.log('Security: Data fetched successfully');
            console.log('Security: Events count:', eventsData.length);
            console.log('Security: Metrics loaded:', metricsData.totalEvents, 'total events');

            setEvents(eventsData);
            setMetrics(metricsData);
        } catch (err: any) {
            console.error('Security: Fetch error:', err);
            setError(err.message || 'Failed to load security data');

            // If auth error, clear the data
            if (err.message?.includes('401') || err.message?.includes('403')) {
                console.log('Security: Auth error detected, clearing data');
                setEvents([]);
                setMetrics(null);
            }
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user, limit]);

    // Fetch data on mount and when dependencies change
    useEffect(() => {
        fetchSecurityData();
    }, [fetchSecurityData]);

    // Clear data when user logs out
    useEffect(() => {
        if (!isAuthenticated) {
            console.log('Security: User logged out, clearing data');
            setEvents([]);
            setMetrics(null);
            setError(null);
        }
    }, [isAuthenticated]);

    return {
        events,
        metrics,
        loading,
        error,
        refetch: fetchSecurityData
    };
};