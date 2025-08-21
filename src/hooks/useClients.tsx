import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { clientService } from '../services/clientService';
import type { Client, CreateClientRequest, ClientsResponse } from '../types/client';

interface UseClientsReturn {
    clients: Client[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
    createClient: (clientData: CreateClientRequest) => Promise<Client>;
    updateClient: (id: number, clientData: Partial<Client>) => Promise<Client>;
    deleteClient: (id: number) => Promise<void>;
    searchClients: (query: string) => Promise<Client[]>;
    loadClients: (page?: number, size?: number) => Promise<void>;
    changePage: (page: number) => Promise<void>;
    refetch: () => Promise<void>;
}

export const useClients = (
    initialPage: number = 0,
    initialSize: number = 10
): UseClientsReturn => {
    const { isAuthenticated } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        totalPages: 0,
        totalElements: 0,
        currentPage: initialPage,
        pageSize: initialSize
    });

    const loadClients = useCallback(async (
        page: number = pagination.currentPage,
        size: number = pagination.pageSize
    ): Promise<void> => {
        if (!isAuthenticated) {
            console.log('Clients: User not authenticated, skipping fetch');
            return;
        }

        try {
            console.log('Clients: Loading clients...', { page, size });
            setLoading(true);
            setError(null);


            const response: ClientsResponse = await clientService.getClients(page, size);

            console.log('Clients: Data loaded successfully:', response);
            setClients(response.content);
            setPagination({
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.number,
                pageSize: response.size
            });
        } catch (err: any) {
            console.error('Clients: Load error:', err);
            setError(err.message || 'Αποτυχία φόρτωσης Πελατών');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, pagination.currentPage, pagination.pageSize]);

    const changePage = useCallback(async (page: number): Promise<void> => {
        await loadClients(page, pagination.pageSize);
    }, [loadClients, pagination.pageSize]);

    const createClient = useCallback(async (clientData: CreateClientRequest): Promise<Client> => {
        try {
            console.log('Clients: Creating client...', clientData);
            setLoading(true);
            setError(null);

            const newClient = await clientService.createClient(clientData);

            console.log('Clients: Client created successfully:', newClient);

            // Refresh the clients list after creation
            await loadClients(pagination.currentPage, pagination.pageSize);

            return newClient;
        } catch (err: any) {
            console.error('Clients: Create error:', err);
            setError(err.message || 'Αποτυχία δημιουργίας Πελάτη');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [loadClients, pagination.currentPage, pagination.pageSize]);

    const updateClient = useCallback(async (id: number, clientData: Partial<Client>): Promise<Client> => {
        try {
            console.log('Clients: Updating client...', { id, clientData });
            setLoading(true);
            setError(null);

            const updatedClient = await clientService.updateClient(id, clientData as any);

            console.log('Clients: Client updated successfully:', updatedClient);

            // Update  client in  local state
            setClients(prev => prev.map(client =>
                client.id === id ? updatedClient : client
            ));

            return updatedClient;
        } catch (err: any) {
            console.error('Clients: Update error:', err);
            setError(err.message || 'Αποτυχία ενημέρωσης Πελάτη');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteClient = useCallback(async (id: number): Promise<void> => {
        try {
            console.log('Clients: Deleting client...', id);
            setLoading(true);
            setError(null);

            await clientService.deleteClient(id);

            console.log('Clients: Client deleted successfully');

            // Remove client from local state
            setClients(prev => prev.filter(client => client.id !== id));

            // Update pagination
            setPagination(prev => ({
                ...prev,
                totalElements: prev.totalElements - 1
            }));
        } catch (err: any) {
            console.error('Clients: Delete error:', err);
            setError(err.message || 'Αποτυχία Διαγραφής Πελάτη');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const searchClients = useCallback(async (query: string): Promise<Client[]> => {
        try {
            console.log('Clients: Searching clients...', query);

            const results = await clientService.searchClients(query);

            console.log('Clients: Search completed:', results);
            return results;
        } catch (err: any) {
            console.error('Clients: Search error:', err);
            setError(err.message || 'Αποτυχία αναζήτησης Πελάτη');
            return [];
        }
    }, []);

    const refetch = useCallback(async (): Promise<void> => {
        await loadClients(pagination.currentPage, pagination.pageSize);
    }, [loadClients, pagination.currentPage, pagination.pageSize]);

    // Load clients on mount and when auth changes
    useEffect(() => {
        if (isAuthenticated) {
            loadClients();
        } else {
            setClients([]);
            setError(null);
        }
    }, [isAuthenticated, loadClients]);

    return {
        clients,
        loading,
        error,
        totalPages: pagination.totalPages,
        totalElements: pagination.totalElements,
        currentPage: pagination.currentPage,
        pageSize: pagination.pageSize,
        createClient,
        updateClient,
        deleteClient,
        searchClients,
        loadClients,
        changePage,
        refetch
    };
};