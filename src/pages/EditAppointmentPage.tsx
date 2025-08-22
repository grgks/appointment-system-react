import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { appointmentService } from '../services/appointmentService';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Button from '../components/ui/Button/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AppointmentForm from '../components/forms/AppointmentForm/AppointmentForm';
import type { Appointment, UpdateAppointmentRequest } from '../types/appointment';

const EditAppointmentPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const fetchAppointment = async () => {
            if (!id) {
                setError('ID ραντεβού δε δόθηκε');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const appointmentData = await appointmentService.getAppointmentById(parseInt(id));
                setAppointment(appointmentData);
            } catch (err: any) {
                setError(err.message || 'Αποτυχία φόρτωσης ραντεβού');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);

    const handleSubmit = async (formData: UpdateAppointmentRequest): Promise<void> => {
        if (!appointment || !id) return;

        try {
            setSaving(true);
            setError(null);

            const updatedAppointment = await appointmentService.updateAppointment(parseInt(id), formData);

            console.log('Appointment updated successfully:', updatedAppointment);

            // Navigate back to appointment details
            navigate(`/appointments/${id}/view`);
        } catch (err: any) {
            console.error('Update appointment error:', err);
            setError(err.message || 'Αποτυχία ενημέρωσης ραντεβού');
            throw err;
        } finally {
            setSaving(false);
        }
    };

    const handleGoBack = () => {
        navigate(`/appointments/${id}/view`);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !appointment) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header onLogout={handleLogout} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-red-600 mb-4">Λάθος στη φόρτωση ραντεβού</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={() => navigate('/appointments')}>Πίσω</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const appointmentInfo = `${appointment.clientName} on ${appointment.date} at ${appointment.time}`;

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
                                    Πίσω
                                </Button>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">Ενημέρωση Ραντεβού</h1>
                                        <p className="text-gray-500">Ενημέρωση ραντεβού για {appointmentInfo}</p>
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
                            mode="edit"
                            appointment={appointment}
                            onSubmit={handleSubmit}
                            loading={saving}
                            error={error}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EditAppointmentPage;