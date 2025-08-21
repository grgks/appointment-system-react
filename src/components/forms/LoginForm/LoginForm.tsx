import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';

// Use interface name
interface LoginRequest {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (data: LoginRequest) => Promise<void>;
    loading?: boolean;
    error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
                                                 onSubmit,
                                                 loading = false,
                                                 error = null
                                             }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<LoginRequest>({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: {[key: string]: string} = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Απαιτείται Όνομα χρήστη';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Απαιτείται κωδικός';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) return;

        await onSubmit(formData);
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Όνομα χρήστη"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                placeholder="Εισάγεται όνομα χρήστη"
                required
            />

            {/* Password  με visibility toggle */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Κωδικός
                    <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Εισάγεται κωδικό"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                            errors.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.password}
                    </p>
                )}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
                style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                    border: 'none'
                }}
            >
                Σύνδεση
            </Button>
        </form>
    );
};


export default LoginForm;