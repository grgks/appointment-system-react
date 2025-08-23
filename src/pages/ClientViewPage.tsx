import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { clientService } from '../services/clientService';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Button from '../components/ui/Button/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ClientDetails from '../components/clients/ClientDetails';
import type { Client } from '../types/client';

const ClientViewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const fetchClient = async () => {
            if (!id) {
                setError(' ID πελάτη δεν δόθηκε');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const clientData = await clientService.getClientById(parseInt(id));
                setClient(clientData);
            } catch (err: any) {
                setError(err.message || 'Λάθος στη φόρτωση πελάτη');
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    const handleEdit = () => {
        navigate(`/clients/${id}/edit`);
    };

    const handleDelete = async () => {
        if (!client) return;

        const clientName = `${client.personalInfo?.firstName} ${client.personalInfo?.lastName}`;

        if (window.confirm(`Είσαι σίγουρος ότι θέλεις να διαγράψεις τον πελάτη "${clientName}"? Αυτή η επιλογή δεν μπορεί να αναιρεθεί.`)) {
            try {
                await clientService.deleteClient(client.id!);
                alert(`Ο πελάτης "${clientName}" διαγράφηκε επιτυχώς.`);
                navigate('/clients');
            } catch (err: any) {
                console.error('Delete client error:', err);

                // Έλεγχος αν είναι 401 με dependency constraint
                if (err.response?.status === 401) {
                    // εμποδίζει το axios interceptor να κάνει logout
                    err.isDeleteError = true;
                    alert(`Δεν μπορείς να διαγράψεις τον πελάτη "${clientName}" επειδή έχει ενεργά ραντεβού.\\n\n Πρέπει πρώτα να διαγράψεις όλα τα ραντεβού του πελάτη.`);
                    return;
                }

                // Άλλα errors
                if (err.response?.status === 409) {
                    alert(`Δεν μπορείς να διαγράψεις τον πελάτη "${clientName}" επειδή έχει συνδεδεμένα δεδομένα (ραντεβού). Διάγραψε πρώτα τα ραντεβού του.`);
                    return;
                }

                // Generic error
                alert(`Λάθος στη διαγραφή πελάτη: ${err.message || 'Άγνωστο λάθος'}`);
            }
        }
    };

    const handleGoBack = () => {
        navigate('/clients');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !client) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header onLogout={handleLogout} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-red-600 mb-4">Λάθος στη φόρτωση πελάτη</h2>
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
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Λεπτομέρειες Πελάτη</h1>
                                    <p className="text-gray-500">Δές και διαχειρίσου Λεπτομέρειες Πελάτη</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Client Details */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <ClientDetails
                        client={client}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ClientViewPage;