import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Calendar from '../components/calendar/Calendar.tsx';
import Button from '../components/ui/Button/Button';
import type { Appointment } from '../types/appointment';

const CalendarPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAppointmentClick = (appointment: Appointment) => {
        navigate(`/appointments/${appointment.id}/view`);
    };

    const handleCreateAppointment = (date?: Date) => {
        if (date) {
            // Navigate to create appointment with pre-selected date
            const dateParam = date.toISOString().split('T')[0]; // YYYY-MM-DD format
            navigate(`/appointments/create?date=${dateParam}`);
        } else {
            navigate('/appointments/create');
        }
    };

    const handleDateSelect = (date: Date) => {
        console.log('Selected date:', date);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onLogout={handleLogout} />


            <main className="flex-1">

                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-6">
                            <div className="flex items-center space-x-3">
                                <CalendarIcon className="w-8 h-8 text-blue-600" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Ημερολόγιο</h1>
                                    <p className="text-gray-500">
                                        Προβολή και διαχείριση ραντεβού
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Button
                                    onClick={() => navigate('/appointments')}
                                    variant="outline"
                                >
                                    Λίστα Ραντεβού
                                </Button>
                                <Button
                                    onClick={() => handleCreateAppointment()}
                                    className="flex items-center space-x-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Νέο Ραντεβού</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Calendar
                        onAppointmentClick={handleAppointmentClick}
                        onCreateAppointment={handleCreateAppointment}
                        onDateSelect={handleDateSelect}
                    />
                </div>

                {/* Quick Actions */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Γρήγορες Ενέργειες</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => handleCreateAppointment()}
                                className="p-4 text-left rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Plus className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Νέο Ραντεβού</h4>
                                        <p className="text-sm text-gray-500">Δημιουργία νέου ραντεβού</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => navigate('/appointments')}
                                className="p-4 text-left rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CalendarIcon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Όλα τα Ραντεβού</h4>
                                        <p className="text-sm text-gray-500">Προβολή λίστας ραντεβού</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => navigate('/clients')}
                                className="p-4 text-left rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <CalendarIcon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Πελάτες</h4>
                                        <p className="text-sm text-gray-500">Διαχείριση πελατών</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CalendarPage;