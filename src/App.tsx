import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import CreateClientPage from './pages/CreateClientPage';
import ClientsListPage from './pages/ClientsListPage';
import ClientViewPage from './pages/ClientViewPage';
import EditClientPage from './pages/EditClientPage';
import AppointmentsListPage from './pages/AppointmentsListPage';
import AppointmentViewPage from './pages/AppointmentViewPage';
import CreateAppointmentPage from './pages/CreateAppointmentPage';
import EditAppointmentPage from './pages/EditAppointmentPage';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/common/LoadingSpinner';
import CalendarPage from "./pages/CalendarPage.tsx";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

function App() {
    const { loading } = useAuth();

    // Initialize session on mount
    useEffect(() => {
        if (!sessionStorage.getItem('activeSession')) {
            sessionStorage.setItem('activeSession', 'true');
        }
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <SignUpPage />
                            </PublicRoute>
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Client Management Routes */}
                    <Route
                        path="/clients"
                        element={
                            <ProtectedRoute>
                                <ClientsListPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/clients/create"
                        element={
                            <ProtectedRoute>
                                <CreateClientPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/clients/:id/view"
                        element={
                            <ProtectedRoute>
                                <ClientViewPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/clients/:id/edit"
                        element={
                            <ProtectedRoute>
                                <EditClientPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Appointment Management Routes */}
                    <Route
                        path="/appointments"
                        element={
                            <ProtectedRoute>
                                <AppointmentsListPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/appointments/create"
                        element={
                            <ProtectedRoute>
                                <CreateAppointmentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/calendar"
                        element={<ProtectedRoute>
                            <CalendarPage />
                    </ProtectedRoute>}
                    />
                    <Route
                        path="/appointments/:id/view"
                        element={
                            <ProtectedRoute>
                                <AppointmentViewPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/appointments/:id/edit"
                        element={
                            <ProtectedRoute>
                                <EditAppointmentPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* 404 */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;