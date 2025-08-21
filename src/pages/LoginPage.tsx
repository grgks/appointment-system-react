import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthBackground from '../components/common/AuthBackround';
import AuthCard from '../components/common/AuthCard';
import LoginForm from '../components/forms/LoginForm/LoginForm';
import type { LoginRequest } from '../types/auth';

const LoginPage: React.FC = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (credentials: LoginRequest): Promise<void> => {
        try {
            setError(null);
            await login(credentials);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Αποτυχία Σύνδεσης.Παρακαλώ δοκιμάστε ξανά.');
        }
    };

    return (
        <AuthBackground>
            <AuthCard
                title="Καλώς Ήρθατε"
                subtitle="Sign in to your account to continue"
            >
                <LoginForm
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                />

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Δεν έχεις λογαριασμό?{' '}
                        <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                            Εγγραφή
                        </Link>
                    </p>
                </div>
            </AuthCard>
        </AuthBackground>
    );
};

export default LoginPage;