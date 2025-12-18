import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ArrowLeft, RefreshCw } from 'lucide-react';
import { useSecurity } from '../hooks/useSecurity';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import SecurityEventsList from '../components/security/SecurityEventsList';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button/Button';
import type { SecurityEvent } from '../types/security';

const SecurityCrudLogPage: React.FC = () => {
    const { events, loading, error, refetch } = useSecurity(200);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    usePageTitle('CRUD Activity Logs - WorkApp');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleBackToSecurity = () => {
        navigate('/security');
    };

    const handleRefresh = async () => {
        console.log('Refreshing CRUD logs...');
        await refetch();
    };

    // Filter only CRUD events (exclude authentication events)
    const crudEvents = useMemo(() => {
        const crudEventTypes = [
            'USER_CREATED', 'USER_UPDATED', 'USER_DELETED',
            'CLIENT_CREATED', 'CLIENT_UPDATED', 'CLIENT_DELETED',
            'APPOINTMENT_CREATED', 'APPOINTMENT_UPDATED', 'APPOINTMENT_DELETED'
        ];

        return events.filter((event: SecurityEvent) =>
            crudEventTypes.includes(event.eventType)
        );
    }, [events]);

    // Check if user has admin role
    const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN' ||
        user?.role === 'SUPER_ADMIN' || user?.role === 'ROLE_SUPER_ADMIN';

    if (loading) {
        return <LoadingSpinner />;
    }

    // Access denied if not admin
    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header onLogout={handleLogout} />
                <div className="flex-1 flex items-center justify-center">
                    <Card>
                        <div className="text-center py-8 px-6">
                            <Database className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Απαγορευμένη Πρόσβαση
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Access Denied. Admin privileges required.
                            </p>
                            <Button onClick={() => navigate('/dashboard')}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Επιστροφή στο Dashboard
                            </Button>
                        </div>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header onLogout={handleLogout} />
                <div className="flex-1 flex items-center justify-center">
                    <Card>
                        <div className="text-center py-8 px-6">
                            <h2 className="text-xl font-semibold text-red-600 mb-4">
                                Σφάλμα Φόρτωσης
                            </h2>
                            <p className="text-gray-600 mb-6">{error}</p>
                            <div className="flex gap-3 justify-center">
                                <Button onClick={refetch} variant="outline">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Δοκίμασε Ξανά
                                </Button>
                                <Button onClick={handleBackToSecurity}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Επιστροφή
                                </Button>
                            </div>
                        </div>
                    </Card>
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
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleBackToSecurity}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Επιστροφή στο Security Dashboard"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </button>
                                <div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                            <Database className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">
                                                CRUD Activity Logs
                                            </h1>
                                            <p className="text-gray-500">
                                                Καταγραφή λειτουργιών δημιουργίας, ενημέρωσης και διαγραφής
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleRefresh}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                title="Ανανέωση δεδομένων"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <div className="text-center py-4">
                                <div className="text-3xl font-bold text-blue-600">
                                    {crudEvents.length}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Σύνολο CRUD Events</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="text-center py-4">
                                <div className="text-3xl font-bold text-green-600">
                                    {crudEvents.filter(e => e.eventType.includes('CREATED')).length}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Δημιουργίες</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="text-center py-4">
                                <div className="text-3xl font-bold text-indigo-600">
                                    {crudEvents.filter(e => e.eventType.includes('UPDATED')).length}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Ενημερώσεις</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="text-center py-4">
                                <div className="text-3xl font-bold text-orange-600">
                                    {crudEvents.filter(e => e.eventType.includes('DELETED')).length}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Διαγραφές</p>
                            </div>
                        </Card>
                    </div>

                    {/* CRUD Events List */}
                    <SecurityEventsList
                        events={crudEvents}
                        loading={loading}
                        limit={200}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SecurityCrudLogPage;