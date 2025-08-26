import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { clientService } from '../services/clientService';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Button from '../components/ui/Button/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EditClientForm from '../components/forms/EditClientForm/EditClientForm';
import type { Client, UpdateClientRequest } from '../types/client';
import {usePageTitle} from "../hooks/usePageTitle.ts";

const EditClientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    usePageTitle("WorkApp Ενημέρωση Πελάτη");

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const fetchClient = async () => {
            if (!id) {
                setError('Δε δόθηκε ID πελάτη');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const clientData = await clientService.getClientById(parseInt(id));
                setClient(clientData);
            } catch (err: any) {
                setError(err.message || 'Αποτυχία φόρτωσης πελάτη');
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    const handleSubmit = async (formData: UpdateClientRequest): Promise<void> => {
        if (!client || !id) return;

        try {
            setSaving(true);
            setError(null);

            const updatedClient = await clientService.updateClient(parseInt(id), formData);

            console.log('Client updated successfully:', updatedClient);

            // Navigate back to client details or list
            navigate(`/clients/${id}/view`);
        } catch (err: any) {
            console.error('Update client error:', err);
            setError(err.message || 'Αποτυχία φόρτωσης πελάτη');
            throw err;
        } finally {
            setSaving(false);
        }
    };

    const handleGoBack = () => {
        navigate(`/clients/${id}/view`);
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
                        <h2 className="text-xl font-semibold text-red-600 mb-4">Αποτυχία φόρτωσης Πελάτη</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={() => navigate('/clients')}>Πίσω</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const clientName = `${client.personalInfo?.firstName} ${client.personalInfo?.lastName}`;

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
                                    <h1 className="text-2xl font-bold text-gray-900">Ενημέρωση Πελάτη</h1>
                                    <p className="text-gray-500">Ενημέρωση πληροφοριών για {clientName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                        <EditClientForm
                            client={client}
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

export default EditClientPage;