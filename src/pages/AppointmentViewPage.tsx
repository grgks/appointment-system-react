import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { appointmentService } from '../services/appointmentService';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Button from '../components/ui/Button/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AppointmentDetails from '../components/appointments/AppointmentDetails';
import type { Appointment } from '../types/appointment';

const AppointmentViewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
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

    const handleEdit = () => {
        navigate(`/appointments/${id}/edit`);
    };

    const handleDelete = async () => {
        if (!appointment) return;

        const appointmentInfo = `${appointment.clientName} on ${appointment.date} at ${appointment.time}`;

        if (window.confirm(`Είσαι σίγουρος ότι θέλεις να διαγράψεις το ραντεβού με ${appointmentInfo}? Αυτή η κίνηση δε μπορεί να αναιρεθεί.`)) {
            try {
                await appointmentService.deleteAppointment(appointment.id);
                alert(`Επιτυχής διαγραφή ραντεβού.`);
                navigate('/appointments');
            } catch (err: any) {
                alert(`Αποτυχία στη διαγραφή ραντεβού: ${err.message}`);
            }
        }
    };

    const handleGoBack = () => {
        navigate('/appointments');
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
                        <h2 className="text-xl font-semibold text-red-600 mb-4">Αποτυχία φόρτωσης ραντεβού</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={handleGoBack}>Πίσω</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onLogout={handleLogout} />

            {/* Main Content */}
            <main className="flex-1">
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
                                        <h1 className="text-2xl font-bold text-gray-900">Λεπτομέρειες ραντεβού</h1>
                                        <p className="text-gray-500">Δες και διαχειρίσου τις πληροφορίες ραντεβού</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <AppointmentDetails
                        appointment={appointment}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AppointmentViewPage;