import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthBackground from '../components/common/AuthBackround';
import AuthCard from '../components/common/AuthCard';
import SignUpForm from '../components/forms/SignUpForm/SignUpForm';
import type { SignUpRequest } from '../types/auth';
import {usePageTitle} from "../hooks/usePageTitle.ts";

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    usePageTitle("WorkApp Δημιουργία Λογαριασμού");

    const handleSignUp = async (formData: SignUpRequest): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            // Registration API call
            const response = await fetch('http://localhost:8080/api/clients/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    isActive: true,
                    user: {
                        isActive: true,
                        username: formData.username,
                        password: formData.password,
                        email: formData.email,
                        role: 'CLIENT'
                    },
                    personalInfo: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone || null,
                        address: formData.address || null,
                        cityId: formData.cityId || null,
                        dateOfBirth: null,
                        gender: null
                    },
                    vat: formData.vat || null,
                    notes: null
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.description || 'Η εγγραφή απέτυχε');
            }

            // Auto-login and redirect to dashboard
            await login({ username: formData.username, password: formData.password });
            navigate('/dashboard');

        } catch (err: any) {
            if (err.message?.includes('Login failed')) {
                alert('Εγγραφή επιτυχής! Παρακαλώ συνδέσου.');
                navigate('/login');
            } else {
                setError(err.message || 'Εγγραφή απέτυχε. Παρακαλώ δοκίμασε ξανά.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthBackground>
            <AuthCard
                title="Δημιουργία λογαριασμού"
                subtitle="Join us to manage your appointments"
                showBackButton={true}
                backTo="/login"
            >
                <SignUpForm
                    onSubmit={handleSignUp}
                    loading={loading}
                    error={error}
                />

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Έχεις ήδη λογαριασμό?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                            Σύνδεση
                        </Link>
                    </p>
                </div>
            </AuthCard>
        </AuthBackground>
    );
};

export default SignUpPage;