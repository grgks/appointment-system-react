import React from 'react';
import { Plus } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button/Button';
import Pagination from '../ui/Pagination/Pagination';
import ClientCard from './ClientCard';
import type { Client } from '../../types/client';

interface ClientsListProps {
    clients: Client[];
    loading?: boolean;
    totalElements?: number;
    totalPages?: number;
    currentPage?: number;
    pageSize?: number;
    onView: (client: Client) => void;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
    onCreateNew: () => void;
    onPageChange?: (page: number) => void;
}

const ClientsList: React.FC<ClientsListProps> = ({
                                                     clients,
                                                     loading = false,
                                                     totalElements = 0,
                                                     totalPages = 0,
                                                     currentPage = 0,
                                                     pageSize = 10,
                                                     onView,
                                                     onEdit,
                                                     onDelete,
                                                     onCreateNew,
                                                     onPageChange
                                                 }) => {
    if (loading) {
        return (
            <Card title="Πελάτες" subtitle="Φόρτωση Πελατών...">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="animate-pulse bg-white rounded-xl border border-gray-100 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-200 rounded"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card
                title="Πελάτες"
                subtitle={`${totalElements} συνολικοί πελάτες`}
                action={
                    <Button onClick={onCreateNew} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Εισαγωγή Πελάτη
                    </Button>
                }
            >
                {clients.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4">Δε βρέθηκαν Πελάτες.</div>
                        <Button onClick={onCreateNew}>
                            <Plus className="w-4 h-4 mr-2" />
                            Δημιουργία πελάτη
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map((client) => (
                            <ClientCard
                                key={client.id}
                                client={client}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </Card>

            {/* Pagination - Show only if we have pagination and multiple pages */}
            {onPageChange && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    size={pageSize}
                    onPageChange={onPageChange}
                    disabled={loading}
                />
            )}
        </div>
    );
};

export default ClientsList;