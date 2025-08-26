import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useAppointments } from '../hooks/useAppointments';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Button from '../components/ui/Button/Button';
import AppointmentsList from '../components/appointments/AppointmentsList';
import type { Appointment } from '../types/appointment';
import {usePageTitle} from "../hooks/usePageTitle.ts";

const AppointmentsListPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const appointmentsListRef = useRef<HTMLDivElement>(null);

    usePageTitle("WorkApp Λίστα Ραντεβού");

    const {
        appointments,
        loading,
        error,
        totalElements,
        totalPages,
        currentPage,
        pageSize,
        changePage,
        deleteAppointment
    } = useAppointments();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleView = (appointment: Appointment) => {
        navigate(`/appointments/${appointment.id}/view`);
    };

    const handleEdit = (appointment: Appointment) => {
        navigate(`/appointments/${appointment.id}/edit`);
    };

    const handleDelete = async (appointment: Appointment) => {
        const appointmentInfo = `${appointment.clientName} για ${appointment.date} στις ${appointment.time}`;

        if (window.confirm(`Είσαι σίγουρος οτι θέλεις να διαγράψεις το ραντεβού με ${appointmentInfo}? Αυτή η κίνηση δε μπορεί να αναιρεθεί.`)) {
            try {
                await deleteAppointment(appointment.id);
                alert(`Ραντεβού διαγράφηκε επιτυχώς.`);
            } catch (err: any) {
                alert(`Αποτυχία διαγραφής ραντεβού: ${err.message}`);
            }
        }
    };

    const handleCreateNew = () => {
        navigate('/appointments/create');
    };

    const handleGoBack = () => {
        navigate('/dashboard');
    };

    const handlePageChange = async (page: number) => {
        try {
            if (appointmentsListRef.current) {
                appointmentsListRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            await changePage(page);
        } catch (err) {
            console.error('Page change error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onLogout={handleLogout} />

            {/* Main Content */}
            <main className="flex-1">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                        <h1 className="text-2xl font-bold text-gray-900">Ραντεβού</h1>
                                        <p className="text-gray-500">{totalElements} Συνολικά Ραντεβού</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Appointments List with Pagination */}
                        <div ref={appointmentsListRef}>
                            <AppointmentsList
                                appointments={appointments}
                                loading={loading}
                                totalElements={totalElements}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onCreateNew={handleCreateNew}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AppointmentsListPage;
