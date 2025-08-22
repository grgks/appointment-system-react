import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { appointmentService } from '../services/appointmentService';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Button from '../components/ui/Button/Button';
import AppointmentForm from '../components/forms/AppointmentForm/AppointmentForm';
import type { CreateAppointmentRequest } from '../types/appointment';

const CreateAppointmentPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSubmit = async (appointmentData: CreateAppointmentRequest): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const newAppointment = await appointmentService.createAppointment(appointmentData);

            console.log('Appointment created successfully:', newAppointment);

            // Navigate to appointment details
            navigate(`/appointments/${newAppointment.id}/view`);
        } catch (err: any) {
            console.error('Create appointment error:', err);
            setError(err.message || 'Αποτυχία δημιουργίας ραντεβού');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate('/appointments');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onLogout={handleLogout} />

            {/* Main Content */}
            <main className="flex-1">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-6">
                            <div className="flex items-center space-x-4">
                                <Button
                                    onClick={handleGoBack}
                                    variant="outline"
                                    className="flex items-center"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Πίσω στα Ραντεβού
                                </Button>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">Προγραμμάτισε ραντεβού</h1>
                                        <p className="text-gray-500">Create a new appointment for a client</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                        <AppointmentForm
                            mode="create"
                            onSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CreateAppointmentPage;