import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import type { User, LoginRequest, LoginResponse } from '../types/auth';

interface UseAuthReturn {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<LoginResponse>;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuth = (): UseAuthReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    //  initialization function once
    useEffect(() => {
        let isMounted = true; // Cleanup flag
        let timeoutId: NodeJS.Timeout;

        const initAuth = (): void => {
            if (timeoutId) clearTimeout(timeoutId);

            // Debounce the auth check
            timeoutId = setTimeout(() => {
                if (!isMounted) return;
                try {
                console.log('Initializing auth...');

            // Use only authService methods - no direct localStorage access
            const currentUser = authService.getCurrentUser();
            const authenticated = authService.isAuthenticated();

            console.log('Auth check:', { currentUser, authenticated });

            if (isMounted) {
                if (currentUser && authenticated) {
                    setUser(currentUser);
                    setIsAuthenticated(true);
                    console.log(' User authenticated:', currentUser.username);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                    console.log('User not authenticated');
                }
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
            if (isMounted) {

                setUser(null);
                setIsAuthenticated(false);
                // Clear corrupted data
                authService.logout();
            }
        } finally {
                    if (isMounted) {
                        setLoading(false);
                    }
                }
            },100);
    };

        initAuth();

            // Cleanup function
            return () => {
                isMounted = false;
                if (timeoutId) clearTimeout(timeoutId);
            };
        }, []);


    const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
        try {
            setLoading(true);
            console.log('Attempting login for:', credentials.username);

            // Use authService.login - it handles all storage
            const response = await authService.login(credentials.username, credentials.password);

            // Get user data from authService after successful login
            const userData = authService.getCurrentUser();

            if (userData) {
                setUser(userData);
                setIsAuthenticated(true);
                console.log('Login successful for:', userData.username);
            }

            return response;
        } catch (error) {
            console.error('Login failed:', error);
            // Reset state on login failure
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback((): void => {
        console.log('Logging out...');
        // Use authService.logout - it handles all storage cleanup
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        console.log('Logout complete');
    }, []);

    return {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        setLoading
    };
};