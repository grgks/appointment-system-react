import api from './api';
import { ENDPOINTS } from '../utils/constants';
import type {
    Client,
    ClientReadOnlyDTO,
    CreateClientRequest,
    UpdateClientRequest,
    ClientsResponse
} from '../types/client';

// Backend response structure
interface BackendPageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
}

// Transform backend ClientReadOnlyDTO to frontend Client
const transformClientFromBackend = (backendClient: ClientReadOnlyDTO): Client => {
    return {
        id: backendClient.id,
        uuid: backendClient.uuid,
        personalInfo: {
            firstName: backendClient.personalInfo.firstName,
            lastName: backendClient.personalInfo.lastName,
            email: backendClient.personalInfo.email,
            phone: backendClient.personalInfo.phone,
            dateOfBirth: backendClient.personalInfo.dateOfBirth,
            gender: backendClient.personalInfo.gender,
            address: backendClient.personalInfo.address,
            cityName: backendClient.personalInfo.cityName, // Keep original cityName
            city: backendClient.personalInfo.cityName ? {
                name: backendClient.personalInfo.cityName,
                postalCode: undefined // Backend doesn't send postal code in this DTO
            } : undefined
        },
        user: undefined, // ClientReadOnlyDTO doesn't include user info
        vat: backendClient.vat,
        notes: backendClient.notes,
        isActive: true, // Default to true since we don't get this from ClientReadOnlyDTO
        createdAt: backendClient.createdAt,
        updatedAt: backendClient.updatedAt
    };
};

export const clientService = {
    async getClients(
        page: number = 0,
        size: number = 10
        // Removed unused filters parameter
    ): Promise<ClientsResponse> {
        try {
            console.log('ClientService: Fetching clients...', { page, size });

            const params = { page, size };
            const response = await api.get<BackendPageResponse<ClientReadOnlyDTO>>(
                ENDPOINTS.CLIENTS.LIST,
                { params }
            );

            console.log('ClientService: Backend response:', response.data);

            // Transform backend response to frontend format
            const transformedClients = response.data.content.map(transformClientFromBackend);

            const clientsResponse: ClientsResponse = {
                content: transformedClients,
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                size: response.data.size,
                number: response.data.number
            };

            console.log('ClientService: Transformed response:', clientsResponse);
            return clientsResponse;
        } catch (error: any) {
            console.error('ClientService: Get clients error:', error);
            throw new Error(error.response?.data?.description || 'Failed to load clients');
        }
    },

    async getClientById(id: number): Promise<Client> {
        try {
            console.log('ClientService: Fetching client by ID:', id);

            const response = await api.get<ClientReadOnlyDTO>(`${ENDPOINTS.CLIENTS.BY_ID}/${id}`);

            console.log('ClientService: Backend client:', response.data);

            const transformedClient = transformClientFromBackend(response.data);

            console.log('ClientService: Transformed client:', transformedClient);
            return transformedClient;
        } catch (error: any) {
            console.error('ClientService: Get client by ID error:', error);
            throw new Error(error.response?.data?.description || 'Failed to load client');
        }
    },

    async createClient(clientData: CreateClientRequest): Promise<Client> {
        try {
            console.log('ClientService: Creating client...', clientData);

            const response = await api.post<ClientReadOnlyDTO>(ENDPOINTS.CLIENTS.CREATE, clientData);

            console.log('ClientService: Client created:', response.data);
            return transformClientFromBackend(response.data);
        } catch (error: any) {
            console.error('ClientService: Create client error:', error);

            let errorMessage = 'Failed to create client';
            if (error.response?.data?.description) {
                errorMessage = error.response.data.description;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            throw new Error(errorMessage);
        }
    },

    async updateClient(id: number, clientData: UpdateClientRequest): Promise<Client> {
        try {
            console.log('ClientService: Updating client:', { id, clientData });

            const response = await api.put<ClientReadOnlyDTO>(`${ENDPOINTS.CLIENTS.UPDATE}/${id}`, clientData);

            console.log('ClientService: Client updated:', response.data);
            return transformClientFromBackend(response.data);
        } catch (error: any) {
            console.error('ClientService: Update client error:', error);
            throw new Error(error.response?.data?.description || 'Λάθος στην ενημέρωση πελάτη' );
        }
    },

    async deleteClient(id: number): Promise<void> {
        try {
            console.log('ClientService: Deleting client:', id);

            await api.delete(`${ENDPOINTS.CLIENTS.DELETE}/${id}`);

            console.log('ClientService: Client deleted:', id);
        } catch (error: any) {
            console.error('ClientService: Delete client error:', error);
            if (error.response?.status === 401) {
                error.isConstraintError = true;
                throw new Error('Δεν μπορείς να διαγράψεις τον πελάτη επειδή έχει ενεργά ραντεβού. Διάγραψε πρώτα όλα τα ραντεβού του πελάτη.');
            }

            if (error.response?.status === 409) {
                throw new Error('Δεν μπορείς να διαγράψεις τον πελάτη επειδή έχει συνδεδεμένα δεδομένα. Διάγραψε πρώτα τα ραντεβού του.');
            }
            throw new Error(error.response?.data?.description || 'Αποτυχία διαγραφής πελάτη');
        }
    },

    async searchClients(query: string): Promise<Client[]> {
        try {
            console.log('ClientService: Searching clients:', query);

            // Use the search endpoint
            const response = await api.get<ClientReadOnlyDTO[]>(ENDPOINTS.CLIENTS.SEARCH, {
                params: { name: query }
            });

            console.log('ClientService: Search results:', response.data);

            const transformedClients = response.data.map(transformClientFromBackend);

            console.log('ClientService: Transformed search results:', transformedClients);
            return transformedClients;
        } catch (error: any) {
            console.error('ClientService: Search clients error:', error);
            throw new Error(error.response?.data?.description || 'Αποτυχία αναζήτησης πελάτη');
        }
    },

    //(static data-cities)
    async getCities() {
        return [
            { id: 1, name: 'ΑΤΤΙΚΗ', postalCode: '10431' },
            { id: 2, name: 'ΠΕΡΙΣΤΕΡΙ', postalCode: '12131' },
            { id: 3, name: 'ΘΕΣΣΑΛΟΝΙΚΗ', postalCode: '54622' },
            { id: 4, name: 'ΤΡΙΠΟΛΗ', postalCode: '22100' },
            { id: 5, name: 'ΠΑΤΡΑ', postalCode: '26331' },
            { id: 6, name: 'ΠΥΡΓΟΣ', postalCode: '27100' },
            { id: 7, name: 'ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ', postalCode: '68100' },
            { id: 8, name: 'ΔΡΑΜΑ', postalCode: '66100' },
            { id: 9, name: 'ΓΙΑΝΝΕΝΑ', postalCode: '45110' },
            { id: 10, name: 'ΚΡΗΤΗ', postalCode: '70013' },
            { id: 11, name: 'ΑΙΓΑΙΟΥ', postalCode: '81100' },
            { id: 12, name: 'ΠΡΕΒΕΖΑ', postalCode: '48100' },
            { id: 13, name: 'ΣΠΑΡΤΗ', postalCode: '23100' }
        ];
    }
};