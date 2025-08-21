export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    username: string;
    role: string;
    expiresIn: number;
}

export interface User {
    username: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<LoginResponse>;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    cityId?: number;
    vat?: string;
}