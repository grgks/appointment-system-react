import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { dashboardService } from '../services/dashboardService';
import type { DashboardData } from '../types/dashboard';

interface UseDashboardReturn {
    data: DashboardData | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
    const { isAuthenticated, user } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = useCallback(async (): Promise<void> => {
        // Don't fetch if not authenticated
        if (!isAuthenticated || !user) {
            console.log('Dashboard: User not authenticated, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            console.log('Dashboard: Starting data fetch...');
            setLoading(true);
            setError(null);

            const dashboardData = await dashboardService.getDashboardData();

            console.log('Dashboard: Data fetched successfully');
            setData(dashboardData);
        } catch (err: any) {
            console.error('Dashboard: Fetch error:', err);
            setError(err.message || 'Failed to load dashboard data');

            // If it's an auth error, the data might be stale
            if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
                console.log('Dashboard: Auth error detected, clearing data');
                setData(null);
            }
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // Clear data when user logs out
    useEffect(() => {
        if (!isAuthenticated) {
            console.log('Dashboard: User logged out, clearing data');
            setData(null);
            setError(null);
        }
    }, [isAuthenticated]);

    return {
        data,
        loading,
        error,
        refetch: fetchDashboardData
    };
};