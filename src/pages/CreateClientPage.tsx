import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useClients } from '../hooks/useClients';
import CreateClientForm from '../components/forms/CreateClientForm/CreateClientForm';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import type { CreateClientRequest } from '../types/client';

const CreateClientPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { createClient } = useClients();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCreateClient = async (clientData: CreateClientRequest): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            console.log('CreateClientPage: Creating client...', clientData);

            const newClient = await createClient(clientData);

            console.log('CreateClientPage: Client created successfully:', newClient);

            // Show success message
            alert(`Ο πελάτης "${clientData.personalInfo.firstName} ${clientData.personalInfo.lastName}" δημιουργήθηκε επιτυχώς!`);

            // Navigate back to dashboard or clients list
            navigate('/dashboard');

        } catch (err: any) {
            console.error('CreateClientPage: Create client error:', err);
            setError(err.message || 'Αποτυχία στη δημιουργία πελάτη.Παρακαλώ δοκιμάστε ξανά.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate('/dashboard');
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
                                <button
                                    onClick={handleGoBack}
                                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Πίσω
                                </button>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Δημιουργία νέου Πελάτη</h1>
                                    <p className="text-gray-500">Add a new client to the system</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <CreateClientForm
                            onSubmit={handleCreateClient}
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

export default CreateClientPage;