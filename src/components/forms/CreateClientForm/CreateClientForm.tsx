import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import type { CreateClientFormData, CreateClientRequest } from '../../../types/client';

interface CreateClientFormProps {
    onSubmit: (data: CreateClientRequest) => Promise<void>;
    loading?: boolean;
    error?: string | null;
}

// έξω από το main component για να αποφύγουμε re-renders
interface PasswordInputProps {
    field: 'password' | 'confirmPassword';
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    showPassword: boolean;
    onToggleShow: () => void;
    required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
                                                         field,
                                                         label,
                                                         placeholder,
                                                         value,
                                                         onChange,
                                                         showPassword,
                                                         onToggleShow,
                                                         required = false
                                                     }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    required={required}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={placeholder}
                    autoComplete={field === 'password' ? 'new-password' : 'new-password'}
                />
                <button
                    type="button"
                    onClick={onToggleShow}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

const CreateClientForm: React.FC<CreateClientFormProps> = ({ onSubmit, loading = false, error = null }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [cities] = useState([
        { id: 1, name: 'ΑΤΤΙΚΗ', postalCode: '10431' },
        { id: 2, name: 'ΠΕΡΙΣΤΕΡΙ', postalCode: '12131' },
        { id: 3, name: 'ΘΕΣΣΑΛΟΝΙΚΗ', postalCode: '54622' },
        { id: 4, name: 'ΤΡΙΠΟΛΗ', postalCode: '22100' },
        { id: 5, name: 'ΠΑΤΡΑ', postalCode: '26331' },
        { id: 6, name: 'ΠΥΡΓΟΣ', postalCode: '27100' },
        { id: 7, name: 'ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ', postalCode: '68100' },
        { id: 8, name: 'ΔΡΑΜΑ', postalCode: '66100' },
        { id: 9, name: 'ΓΙΑΝΝΕΝΑ', postalCode: '45110' },
        { id: 10, name: 'ΚΡΗΤΗ', postalCode: '70013' },
        { id: 11, name: 'ΑΙΓΑΙΟΥ', postalCode: '81100' },
        { id: 12, name: 'ΠΡΕΒΕΖΑ', postalCode: '48100' },
        { id: 13, name: 'ΣΠΑΡΤΗ', postalCode: '23100' }
    ]);

    const [formData, setFormData] = useState<CreateClientFormData>({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        cityId: undefined,
        dateOfBirth: '',
        gender: undefined,
        vat: '',
        notes: ''
    });

    const handleChange = (field: keyof CreateClientFormData, value: string | number | undefined) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = (): string | null => {
        // Required fields validation
        if (!formData.username || !formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            return 'Παρακαλώ συμπληρώστε τα απαιτούμενα πεδία (Όνομα χρήστη, email, κωδικό, όνομα, επώνυμο)';
        }

        // Password validation
        if (formData.password !== formData.confirmPassword) {
            return 'Οι κωδικοί δε ταιριάζουν';
        }

        if (formData.password.length < 8) {
            return 'Ο κωδικός πρέπει να περιέχει 8 χαρακτήρες';
        }

        const passwordPattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@#$%!^&*]).{8,}$/;
        if (!passwordPattern.test(formData.password)) {
            return 'Ο κωδικός πρέπει να περιέχει τουλάχιστον: 1 πεζό, 1 κεφαλαίο, 1 αριθμός, 1 ειδικός χαρακτήρας (@#$%!^&*), και να είναι 8+ χαρακτήρες';
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            return 'Παρακαλώ εισάγεται έγκυρο email';
        }

        // Optional field validations
        if (formData.vat && !/^[0-9]{10}$/.test(formData.vat)) {
            return 'Το ΑΦΜ πρέπει να είναι 10 ψηφία';
        }

        if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
            return 'Το τηλέφωνο πρέπει να είναι 10 ψηφία';
        }

        return null;
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            alert(validationError);
            return;
        }

        // form data to API request format
        const clientRequest: CreateClientRequest = {
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
                email: formData.email, // Same email as user
                phone: formData.phone || undefined,
                dateOfBirth: formData.dateOfBirth || undefined,
                gender: formData.gender || undefined,
                address: formData.address || undefined,
                cityId: formData.cityId || undefined
            },
            vat: formData.vat || undefined,
            notes: formData.notes || undefined
        };

        await onSubmit(clientRequest);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* User Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Πληροφορίες Λογαριασμού</h3>
                <div className="space-y-4">
                    <Input
                        label="Όνομα χρήστη"
                        value={formData.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        placeholder="Επέλεξε όνομα χρήστη"
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="email@aueb.com"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <PasswordInput
                            field="password"
                            label="Κωδικός"
                            placeholder="Τουλάχιστον 8 χαρακτήρες"
                            value={formData.password}
                            onChange={(value) => handleChange('password', value)}
                            showPassword={showPassword}
                            onToggleShow={() => setShowPassword(!showPassword)}
                            required
                        />

                        <PasswordInput
                            field="confirmPassword"
                            label="Επιβεβαίωση κωδικού"
                            placeholder="Εισάγεται κωδικό"
                            value={formData.confirmPassword}
                            onChange={(value) => handleChange('confirmPassword', value)}
                            showPassword={showConfirmPassword}
                            onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Προσωπικά στοιχεία</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Όνομα"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            placeholder="Εισάγεται όνομα"
                            required
                        />
                        <Input
                            label="Επώνυμο"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            placeholder="Εισάγεται επώνυμο"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Αρ. τηλεφώνου"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="2101234567"
                            maxLength={10}
                        />
                        <Input
                            label="Ημερομηνία γεννήσεως"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Φύλο</label>
                            <select
                                value={formData.gender || ''}
                                onChange={(e) => handleChange('gender', e.target.value as 'MALE' | 'FEMALE' | 'OTHER' | undefined)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            >
                                <option value="">Επιλογή φύλου</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Πόλη</label>
                            <select
                                value={formData.cityId || ''}
                                onChange={(e) => handleChange('cityId', e.target.value ? parseInt(e.target.value) : undefined)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            >
                                <option value="">Διάλεξε Πόλη</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name} ({city.postalCode})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Input
                        label="Οδός"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="Αριθμός, Περιοχή"
                    />
                </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Επιπλέον Πληροφορίες</h3>
                <div className="space-y-4">
                    <Input
                        label="ΑΦΜ"
                        value={formData.vat}
                        onChange={(e) => handleChange('vat', e.target.value)}
                        placeholder="1234567890"
                        maxLength={10}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Σημειώσεις</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Επιπλέον σημειώσεις για τον πελάτη..."
                            rows={3}
                            maxLength={2000}
                        />
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                size="lg"
                loading={loading}
                disabled={loading}
                className="w-full"
            >
                Δημιουργία Πελάτη
            </Button>
        </form>
    );
};

export default CreateClientForm;