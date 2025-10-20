import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useClients } from '../hooks/useClients.ts';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Button from '../components/ui/Button/Button';
import ClientsList from '../components/clients/ClientsList';
import ClientSearch from '../components/clients/ClientSearch';
import type { Client } from '../types/client';
import {usePageTitle} from "../hooks/usePageTitle.ts";

const ClientsListPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    usePageTitle("WorkApp Λίστα Πελατών");



    // Create ref for the clients list
    const clientsListRef = useRef<HTMLDivElement>(null);

    // Get pagination data from useClients hook
    const {
        clients,
        loading,
        error,
        totalElements,
        totalPages,
        currentPage,
        pageSize,
        changePage,
        deleteClient,
        searchClients
    } = useClients();

    const [searchResults, setSearchResults] = useState<Client[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = async (query: string) => {
        try {
            const results = await searchClients(query);
            setSearchResults(results);
            setIsSearching(true);
        } catch (err) {
            console.error('Search error:', err);
        }
    };

    const handleClearSearch = () => {
        setSearchResults([]);
        setIsSearching(false);
    };

    const handleView = (client: Client) => {
        navigate(`/clients/${client.id}/view`);
    };

    const handleEdit = (client: Client) => {
        navigate(`/clients/${client.id}/edit`);
    };

    const handleDelete = async (client: Client) => {
        const clientName = `${client.personalInfo?.firstName} ${client.personalInfo?.lastName}`;
       // console.log('handleDelete called for:', client.id, clientName);

        if (!window.confirm(`Είσαι σίγουρος ότι θέλεις να διαγράψεις τον πελάτη "${clientName}"? Αυτή η ενέργεια δεν αναιρείται.`)) {
            //console.log('User cancelled delete');
            return;
        }
        try {
            const { selfDelete } = await deleteClient(client.id!);

            if (selfDelete) {
                logout();          // useAuth logout
                navigate('/login'); // redirect στο login
            } else {
                alert(`Ο πελάτης "${clientName}" διαγράφηκε επιτυχώς.`);
            }
        } catch (err: any) {
            console.error('Error deleting client:', err);
            alert(`Αποτυχία στη διαγραφή του πελάτη: ${err.message || err}`);
        }
    };

    const handleCreateNew = () => {
        navigate('/clients/create');
    };

    const handleGoBack = () => {
        navigate('/dashboard');
    };

    // Enhanced page change handler with scroll to top
    const handlePageChange = async (page: number) => {
        try {
            // Scroll to top of clients list smoothly
            if (clientsListRef.current) {
                clientsListRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Change page
            await changePage(page);
        } catch (err) {
            console.error('Page change error:', err);
        }
    };

    const displayClients = isSearching ? searchResults : clients;

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
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Πελάτες</h1>
                                    <p className="text-gray-500">
                                        {isSearching
                                            ? `${searchResults.length} αποτελέσματα αναζήτησης`
                                            : `${totalElements} συνολικοί Πελάτες`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-6">
                        {/* Search */}
                        <ClientSearch
                            onSearch={handleSearch}
                            onClear={handleClearSearch}
                            isSearching={isSearching}
                            searchResultsCount={searchResults.length}
                        />

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Clients List with Pagination */}
                        <div ref={clientsListRef}>
                            <ClientsList
                                clients={displayClients}
                                loading={loading}
                                totalElements={isSearching ? searchResults.length : totalElements}
                                totalPages={isSearching ? 1 : totalPages}
                                currentPage={isSearching ? 0 : currentPage}
                                pageSize={pageSize}
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onCreateNew={handleCreateNew}
                                onPageChange={isSearching ? undefined : handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ClientsListPage;