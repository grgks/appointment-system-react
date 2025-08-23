import React, { useState, useEffect } from 'react';
import { Calendar, User, Bell, FileText } from 'lucide-react';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import { clientService } from '../../../services/clientService';
import type { CreateAppointmentRequest, UpdateAppointmentRequest } from '../../../types/appointment';
import type { Client } from '../../../types/client';
import type { AppointmentFormProps } from '../../../types/appointmentForm';
import { isCreateMode, isEditMode } from '../../../types/appointmentForm';

interface AppointmentFormData {
    clientId: number | '';
    appointmentDate: string;
    appointmentTime: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'CONFIRMED';
    emailReminder: boolean;
    reminderDate: string;
    reminderTime: string;
    notes: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = (props) => {
    const { mode, loading = false, error = null } = props;
    const [clients, setClients] = useState<Client[]>([]);
    const [loadingClients, setLoadingClients] = useState(true);
    const [formData, setFormData] = useState<AppointmentFormData>({
        clientId: '',
        appointmentDate: '',
        appointmentTime: '',
        status: 'PENDING',
        emailReminder: true,
        reminderDate: '',
        reminderTime: '',
        notes: ''
    });

    // Load clients
    useEffect(() => {
        const loadClients = async () => {
            try {
                setLoadingClients(true);
                const response = await clientService.getClients(0, 100);
                setClients(response.content);
            } catch (err) {
                console.error('Αποτυχία φόρτωσης Πελατών:', err);
            } finally {
                setLoadingClients(false);
            }
        };

        loadClients();
    }, []);

    // Initializing form with appointment data
    useEffect(() => {
        if (isEditMode(props) && props.appointment) {
            const appointmentDateTime = new Date(props.appointment.dateTime);
            const appointmentDate = appointmentDateTime.toISOString().split('T')[0];
            const appointmentTime = appointmentDateTime.toTimeString().slice(0, 5);

            let reminderDate = '';
            let reminderTime = '';
            if (props.appointment.reminderDateTime) {
                const reminderDateTime = new Date(props.appointment.reminderDateTime);
                reminderDate = reminderDateTime.toISOString().split('T')[0];
                reminderTime = reminderDateTime.toTimeString().slice(0, 5);
            }

            setFormData({
                clientId: props.appointment.clientId || '',
                appointmentDate,
                appointmentTime,
                status: props.appointment.status.toUpperCase() as 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED',
                emailReminder: props.appointment.emailReminder || false,
                reminderDate,
                reminderTime,
                notes: props.appointment.notes || ''
            });
        }
    }, [props]);

    const handleChange = (field: keyof AppointmentFormData, value: string | number | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = (): string | null => {
        //Fixed: Only validate client selection for create
        if (mode === 'create' && !formData.clientId) {
            return 'Παρακαλώ επέλεξε πελάτη';
        }

        if (!formData.appointmentDate || !formData.appointmentTime) {
            return 'Παρακαλώ επέλεξε ραντεβού, ώρα, ημερομηνία';
        }

        const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`);
        const now = new Date();

        if (mode === 'create' && appointmentDateTime <= now) {
            return 'Το ραντεβού πρέπει να είναι σε μελλοντική ημερομηνία';
        }

        if (formData.emailReminder && (!formData.reminderDate || !formData.reminderTime)) {
            return 'Παρακαλώ βάλτε υπενθύμιση όταν η υπενθύμιση email είναι ενεργοποιημένη';
        }

        if (formData.emailReminder && formData.reminderDate && formData.reminderTime) {
            const reminderDateTime = new Date(`${formData.reminderDate}T${formData.reminderTime}`);
            if (reminderDateTime >= appointmentDateTime) {
                return 'Η υπενθύμιση πρέπει να οριστεί πριν την ώρα του ραντεβού';
            }
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

        // Combine date and time
        const appointmentDateTime = `${formData.appointmentDate}T${formData.appointmentTime}:00`;

        let reminderDateTime: string | undefined;
        if (formData.emailReminder && formData.reminderDate && formData.reminderTime) {
            reminderDateTime = `${formData.reminderDate}T${formData.reminderTime}:00`;
        }

        if (isCreateMode(props)) {
            const createRequest: CreateAppointmentRequest = {
                userId: 1, // TODO: Get from auth context
                clientId: formData.clientId as number,
                appointmentDateTime,
                status: formData.status,
                emailReminder: formData.emailReminder,
                reminderDateTime,
                notes: formData.notes || undefined
            };
            await props.onSubmit(createRequest);
        } else if (isEditMode(props)) {
            const updateRequest: UpdateAppointmentRequest = {
                appointmentDateTime,
                status: formData.status,
                emailReminder: formData.emailReminder,
                reminderDateTime,
                notes: formData.notes || undefined
            };
            await props.onSubmit(updateRequest);
        }
    };

    const isEditMode_local = mode === 'edit';

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {isEditMode_local ? 'Ενημέρωση ραντεβού' : 'Προγραμμάτισε νέο ραντεβού'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Client Selection */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Λεπτομέρειες πελάτη
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {mode === 'create' ? 'Επιλογή Πελάτη' : 'Client'} {mode === 'create' && <span className="text-red-500">*</span>}
                            </label>
                            {mode === 'edit' && isEditMode(props) ? (
                                //Show client name as readonly
                                <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                                    {props.appointment.clientName || 'Άγνωστος πελάτης'}
                                </div>
                            ) : (
                                <select
                                    value={formData.clientId}
                                    onChange={(e) => handleChange('clientId', e.target.value ? parseInt(e.target.value) : '')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    required={mode === 'create'} //Only required for create
                                    disabled={loadingClients}
                                >
                                    <option value="">
                                        {loadingClients ? 'Φόρτωση πελατών...' : 'Επέλεξε πελάτη'}
                                    </option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.personalInfo?.firstName} {client.personalInfo?.lastName}
                                            {client.personalInfo?.phone && ` - ${client.personalInfo.phone}`}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {isEditMode_local && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Ο πελάτης δε μπορεί να αλλαχθεί όταν ενημερώνεις ραντεβού
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Date & Time */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Ραντεβού Ημερομηνία & Ώρα
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Ημερομηνία"
                                type="date"
                                value={formData.appointmentDate}
                                onChange={(e) => handleChange('appointmentDate', e.target.value)}
                                required
                                min={mode === 'create' ? new Date().toISOString().split('T')[0] : undefined}
                            />
                            <Input
                                label="Ώρα"
                                type="time"
                                value={formData.appointmentTime}
                                onChange={(e) => handleChange('appointmentTime', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                required
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reminder Settings */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        Λεπτομέρειες ειδοποίησης
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="emailReminder"
                                checked={formData.emailReminder}
                                onChange={(e) => handleChange('emailReminder', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="emailReminder" className="ml-2 block text-sm text-gray-900">
                                Στείλε ειδοποίηση email
                            </label>
                        </div>

                        {formData.emailReminder && (
                            <div className="grid grid-cols-2 gap-4 ml-6">
                                <Input
                                    label="Ειδοποιήση ημερομηνίας "
                                    type="date"
                                    value={formData.reminderDate}
                                    onChange={(e) => handleChange('reminderDate', e.target.value)}
                                    required={formData.emailReminder}
                                    max={formData.appointmentDate}
                                />
                                <Input
                                    label="Ειδοποιήση ώρας"
                                    type="time"
                                    value={formData.reminderTime}
                                    onChange={(e) => handleChange('reminderTime', e.target.value)}
                                    required={formData.emailReminder}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Επιπλέον πληροφορίες
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Σημειώσεις</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Επιπλέον σημειώσεις για το ραντεβού..."
                            rows={4}
                            maxLength={2000}
                        />
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
                        disabled={loading || loadingClients}
                        className="px-8"
                    >
                        {isEditMode_local ? 'Σώσε τις αλλαγές' : 'Προγραμμάτισε ραντεβού'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;