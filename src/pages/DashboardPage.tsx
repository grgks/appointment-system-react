import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard.ts';
import { useAuth } from '../hooks/useAuth';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentAppointments from '../components/dashboard/RecentAppointments';
import QuickActions from '../components/dashboard/QuickActions';
import UpcomingAppointments from '../components/dashboard/UpcomingAppointments';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const DashboardPage: React.FC = () => {
    const { data: dashboardData, loading, error, refetch } = useDashboard();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCreateClient = () => {
        navigate('/clients/create');
    };

    //Navigation  for appointments
    const handleAppointmentClick = (appointmentId: number) => {
        navigate(`/appointments/${appointmentId}/view`); // Added /view to match route
    };

    const handleEditAppointment = (appointmentId: number) => {
        navigate(`/appointments/${appointmentId}/edit`);
    };

    const handleViewRecentAppointments = () => {
        // Redirect to appointments list with filter for recent appointments
        navigate('/appointments?filter=recent');
    };

    const handleViewUpcomingAppointments = () => {
        // Redirect to appointments list with filter for upcoming appointments
        navigate('/appointments?filter=upcoming');
    };

    const handleViewAllAppointments = () => {
        navigate('/appointments');
    };

    const handleCreateAppointment = () => {
        navigate('/appointments/create');
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header onLogout={handleLogout} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Dashboard</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={refetch}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
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
                {/* Welcome Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Καλώς ήρθες, {user?.username}!
                                </h1>
                                <p className="text-gray-500">
                                    Δές τι συμβαίνει σήμερα...
                                </p>
                            </div>
                            <button
                                onClick={handleCreateClient}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
                                }}
                            >
                                <Plus className="w-5 h-5" />
                                Δημιουργία Πελάτη
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <DashboardStats
                            stats={dashboardData?.stats}
                            loading={loading}
                            onViewAllAppointments={handleViewAllAppointments}
                        />

                        {/* Quick Actions */}
                        <QuickActions
                            onCreateAppointment={handleCreateAppointment}
                            onViewAppointments={handleViewAllAppointments}
                        />

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Appointments */}
                            <RecentAppointments
                                appointments={dashboardData?.recentAppointments || []}
                                loading={loading}
                                onAppointmentClick={handleAppointmentClick}
                                onEditAppointment={handleEditAppointment}
                                onViewAll={handleViewRecentAppointments}
                            />

                            {/* Upcoming Appointments */}
                            <UpcomingAppointments
                                appointments={dashboardData?.upcomingAppointments || []}
                                loading={loading}
                                onAppointmentClick={handleAppointmentClick}
                                onEditAppointment={handleEditAppointment}
                                onViewAll={handleViewUpcomingAppointments}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DashboardPage;