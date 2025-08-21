import api from './api';
import { ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import { AxiosError } from 'axios';
import type { LoginResponse, User } from '../types/auth';
import type { ApiError } from '../types/common';

export const authService = {
    async login(username: string, password: string): Promise<LoginResponse> {
        try {
            console.log('AuthService: Attempting login...');

            const response = await api.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
                username,
                password
            });

            console.log('AuthService: Login response received');

            const { token, username: user, role, expiresIn } = response.data;

            const expirationTime = Date.now() + (expiresIn * 1000);

            // Store in sessionStorage (clears when window/tab closes)
            sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
            sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({
                username: user,
                role,
                expiresIn: expirationTime
            }));

            console.log('AuthService: Data stored in session (will clear on window close)');

            return response.data;
        } catch (error) {
            console.error('AuthService: Login error:', error);

            let errorMessage = 'Login failed';

            if (error instanceof Error) {
                if ('response' in error) {
                    const axiosError = error as AxiosError<ApiError>;
                    errorMessage = axiosError.response?.data?.description ||
                        'Invalid credentials';
                } else {
                    errorMessage = error.message;
                }
            }

            throw new Error(errorMessage);
        }
    },

    logout(): void {
        console.log('AuthService: Logging out...');
        sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.USER);
        console.log('AuthService: Session storage cleared');
    },

    getCurrentUser(): User | null {
        try {
            const userData = sessionStorage.getItem(STORAGE_KEYS.USER);
            if (!userData) {
                console.log('AuthService: No user data found in session');
                return null;
            }

            const user = JSON.parse(userData);

            // Check if token is expired
            if (user.expiresIn && Date.now() > user.expiresIn) {
                console.log('AuthService: Token expired');
                this.logout();
                return null;
            }

            console.log('AuthService: User found in session:', user.username);
            return {
                username: user.username,
                role: user.role
            };
        } catch (error) {
            console.error('AuthService: Error parsing user data:', error);
            this.logout(); // Clear corrupted data
            return null;
        }
    },

    getToken(): string | null {
        const user = this.getCurrentUser();
        if (!user) {
            console.log('AuthService: No valid user, no token');
            return null;
        }

        const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
        console.log('AuthService: Token retrieved from session:', token ? 'Found' : 'Not found');
        return token;
    },

    isAuthenticated(): boolean {
        const token = this.getToken();
        const user = this.getCurrentUser();
        const authenticated = !!(token && user);

        console.log('AuthService: Authentication check:', {
            hasToken: !!token,
            hasUser: !!user,
            authenticated
        });

        return authenticated;
    },


    hasActiveSession(): boolean {
        return !!sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    },

    initializeSession(): void {
        // No need to do anything - sessionStorage handles this automatically
        console.log('AuthService: Session initialized (using sessionStorage)');
    },

    // Clean method to refresh auth state
    refreshAuthState(): { user: User | null; isAuthenticated: boolean } {
        const user = this.getCurrentUser();
        const isAuthenticated = this.isAuthenticated();
        console.log('AuthService: Auth state refreshed:', { user: user?.username, isAuthenticated });
        return { user, isAuthenticated };
    }
};