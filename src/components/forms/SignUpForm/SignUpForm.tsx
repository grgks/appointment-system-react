import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';

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

interface SignUpFormProps {
    onSubmit: (data: SignUpRequest) => Promise<void>;
    loading?: boolean;
    error?: string | null;
}

const cities = [
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
];

interface PasswordInputProps {
    field: 'password' | 'confirmPassword';
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    showPassword: boolean;
    onToggleShow: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
                                                         field,
                                                         label,
                                                         placeholder,
                                                         value,
                                                         onChange,
                                                         showPassword,
                                                         onToggleShow
                                                     }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    required
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

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, loading = false, error = null }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<SignUpRequest>({
        username: '', email: '', password: '', confirmPassword: '',
        firstName: '', lastName: '', phone: '', address: '', cityId: undefined, vat: ''
    });

    const handleChange = (field: keyof SignUpRequest, value: string | number | undefined) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = (): string | null => {
        if (formData.password !== formData.confirmPassword) return 'Οι κωδικοί δεν ταιριάζουν';
        if (formData.password.length < 8) return 'Ο κωδικός πρέπει να έχει 8 χαρακτήρες';
        if (!formData.username || !formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            return 'Παρακαλώ συμπλήρωσε ολα τα απαιτούμενα πεδία';
        }
        const passwordPattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@#$%!^&*]).{8,}$/;
        if (!passwordPattern.test(formData.password)) {
            return 'Ο κωδικός πρέπει να περιέχει τουλάχιστον: 1 πεζό, 1 κεφαλαίο, 1 αριθμό, 1 ειδικό χαρακτήρα (@#$%!^&*), και να είναι 8+ χαρακτήρες';
        }
        if (formData.vat && !/^[0-9]{10}$/.test(formData.vat)) return 'Το ΑΦΜ πρέπει να είναι 10 ψηφία';
        if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) return 'Ο αριθμός τηλεφώνου πρέπει να είναι 10 ψηφία';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> =>  {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            alert(validationError);
            return;
        }
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <Input label="Όνομα" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} placeholder="Όνομα" required />
                <Input label="Επώνυμο" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} placeholder="Επώνυμο" required />
            </div>

            <Input label="Όνομα χρήστη" value={formData.username} onChange={(e) => handleChange('username', e.target.value)} placeholder="Επιλέξτε όνομα χρήστη" required />
            <Input label="Email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="email@aueb.gr" required />

            <div className="grid grid-cols-2 gap-4">
                <Input label="Τηλέφωνο" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="2101234567" maxLength={10} />
                <Input label="ΑΦΜ" value={formData.vat} onChange={(e) => handleChange('vat', e.target.value)} placeholder="1234567890" maxLength={10} />
            </div>

            <Input label="Διεύθυνση" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="Οδός Αριθμός, Περιοχή" />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Πόλη</label>
                <select
                    value={formData.cityId || ''}
                    onChange={(e) => handleChange('cityId', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                    <option value="">Επιλέξτε πόλη</option>
                    {cities.map((city) => <option key={city.id} value={city.id}>{city.name} ({city.postalCode})</option>)}
                </select>
            </div>

            <PasswordInput
                field="password"
                label="Κωδικός"
                placeholder="Τουλάχιστον 8 χαρακτήρες"
                value={formData.password}
                onChange={(value) => handleChange('password', value)}
                showPassword={showPassword}
                onToggleShow={() => setShowPassword(!showPassword)}
            />

            <PasswordInput
                field="confirmPassword"
                label="Επιβεβαίωση κωδικού"
                placeholder="Επιβεβαιώστε τον κωδικό"
                value={formData.confirmPassword}
                onChange={(value) => handleChange('confirmPassword', value)}
                showPassword={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <Button type="submit" size="lg" loading={loading} disabled={loading} className="w-full">
                Δημιουργία λογαριασμού
            </Button>
        </form>
    );
};

export default SignUpForm;