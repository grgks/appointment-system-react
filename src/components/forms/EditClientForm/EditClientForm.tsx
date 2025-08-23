import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import type { Client, UpdateClientRequest } from '../../../types/client';

interface EditClientFormData {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    cityName?: string;
    dateOfBirth?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    vat?: string;
    notes?: string;
}

interface EditClientFormProps {
    client: Client;
    onSubmit: (data: UpdateClientRequest) => Promise<void>;
    loading?: boolean;
    error?: string | null;
}

const EditClientForm: React.FC<EditClientFormProps> = ({
                                                           client,
                                                           onSubmit,
                                                           loading = false,
                                                           error = null
                                                       }) => {
    const [formData, setFormData] = useState<EditClientFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        cityName: '',
        dateOfBirth: '',
        gender: undefined,
        vat: '',
        notes: ''
    });

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

    // Initialize form with client data
    useEffect(() => {
        if (client) {
            setFormData({
                firstName: client.personalInfo?.firstName || '',
                lastName: client.personalInfo?.lastName || '',
                email: client.personalInfo?.email || '',
                phone: client.personalInfo?.phone || '',
                address: client.personalInfo?.address || '',
                cityName: client.personalInfo?.cityName || client.personalInfo?.city?.name || '',
                dateOfBirth: client.personalInfo?.dateOfBirth || '',
                gender: client.personalInfo?.gender || undefined,
                vat: client.vat || '',
                notes: client.notes || ''
            });
        }
    }, [client]);

    const handleChange = (field: keyof EditClientFormData, value: string | undefined) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = (): string | null => {
        // Required fields validation
        if (!formData.firstName || !formData.lastName) {
            return 'Είναι υποχρεωτικό το Όνομα & Επώνυμο ';
        }

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return 'Παρακαλώ εισάγεται έγκυρη διεύθυνση email';
        }

        // VAT validation
        if (formData.vat && !/^[0-9]{10}$/.test(formData.vat)) {
            return 'Το ΑΦΜ πρέπει να έχει 10 ψηφία';
        }

        // Phone validation
        if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
            return 'Ο Αρ.τηλεφώνου πρέπει να έχει 10 ψηφία';
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

        //form data to API request format
        const updateRequest: UpdateClientRequest = {
            id: client.id,
            personalInfo: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email || undefined,
                phone: formData.phone || undefined,
                address: formData.address || undefined,
                cityName: formData.cityName || undefined,
                dateOfBirth: formData.dateOfBirth || undefined,
                gender: formData.gender || undefined
            },
            vat: formData.vat || undefined,
            notes: formData.notes || undefined
        };

        await onSubmit(updateRequest);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Πληροφορίες Πελάτη</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Προσωπικές Πληροφορίες</h3>
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

                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="email@example.com"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Αρ.τηλεφώνου"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                placeholder="2101234567"
                                maxLength={10}
                            />
                            <Input
                                label="Ημερομηνία Γέννησης"
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
                                    <option value="">Επιλογή Φύλου</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Πόλη</label>
                                <select
                                    value={formData.cityName || ''}
                                    onChange={(e) => handleChange('cityName', e.target.value || undefined)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                >
                                    <option value="">Επιλογή Πόλης</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.name}>
                                            {city.name} ({city.postalCode})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Input
                            label="Διεύθυνση"
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="Αριθμός, Περιοχή"
                        />
                    </div>
                </div>

                {/* Business Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Επαγγελματικές Πληροφορίες</h3>
                    <div className="space-y-4">
                        <Input
                            label="ΑΦΜ"
                            value={formData.vat}
                            onChange={(e) => handleChange('vat', e.target.value)}
                            placeholder="1234567890"
                            maxLength={10}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Σημειώσεις:</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => handleChange('notes', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="Επιπλέον σημειώσεις για τον πελάτη..."
                                rows={4}
                                maxLength={2000}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        disabled={loading}
                    >
                        Ακύρωση
                    </Button>
                    <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        className="px-8"
                    >
                       Αποθήκευση
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditClientForm;