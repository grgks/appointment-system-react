import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, RefreshCw } from 'lucide-react';
import { useSecurity } from '../hooks/useSecurity';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import SecurityMetrics from '../components/security/SecurityMetrics';
import SecurityEventsList from '../components/security/SecurityEventsList';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button/Button';

const SecurityDashboardPage: React.FC = () => {
    const { events, metrics, loading, error, refetch } = useSecurity(100);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    usePageTitle('Security Dashboard - WorkApp');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    const handleRefresh = async () => {
        console.log('Refreshing security data...');
        await refetch();
    };

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
                            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Απαγορευμένη Πρόσβαση
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Access Denied. Admin privileges required.
                            </p>
                            <Button onClick={handleBackToDashboard}>
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
                                <Button onClick={handleBackToDashboard}>
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
                                    onClick={handleBackToDashboard}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Επιστροφή στο Dashboard"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </button>
                                <div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">
                                                Security Dashboard
                                            </h1>
                                            <p className="text-gray-500">
                                                Παρακολούθηση ασφάλειας συστήματος
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {/* CRUD Logs Button - ΝΕΟ! */}
                                <button
                                    onClick={() => navigate('/security/crud-logs')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 hover:shadow-lg"
                                >
                                    <Shield className="w-4 h-4" />
                                    <span>CRUD Logs</span>
                                </button>

                                {/* Refresh Button */}
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
                </div>

                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/*<div className="space-y-4">  /!* ΗΤΑΝ space-y-8 *!/*/}
                    {/*    /!* Security Metrics *!/*/}
                    {/*    <SecurityMetrics metrics={metrics || undefined} loading={loading} />*/}

                    {/*    /!* Security Events List *!/*/}
                    {/*    <SecurityEventsList events={events} loading={loading} limit={100} />*/}
                    {/*</div>*/}


                    {/*<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">*/}
                    {/*    /!* LEFT: Security Metrics *!/*/}
                    {/*    <div className="lg:col-span-1">*/}
                    {/*        <SecurityMetrics metrics={metrics || undefined} loading={loading} />*/}
                    {/*    </div>*/}

                    {/*    /!* RIGHT: Security Events List *!/*/}
                    {/*    <div className="lg:col-span-2">*/}
                    {/*        <SecurityEventsList events={events} loading={loading} limit={100} />*/}
                    {/*    </div>*/}

                    <div className="space-y-6">
                        {/* Metrics Cards - Πάνω */}
                        <SecurityMetrics metrics={metrics || undefined} loading={loading} />

                        {/* Events List - Κάτω */}
                        <SecurityEventsList events={events} loading={loading} limit={100} />

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SecurityDashboardPage;