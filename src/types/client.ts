export interface City {
    id: number;
    name: string;
    postalCode: string;
}

// Backend DTOs
export interface PersonalInfoReadOnlyDTO {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string; // LocalDate comes as string
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    address?: string;
    cityName?: string; // Backend sends cityName, not city object
    createdAt?: string;
    updatedAt?: string;
}

export interface UserReadOnlyDTO {
    id: number;
    uuid: string;
    username: string;
    email: string;
    role: 'CLIENT' | 'ADMIN' | 'EMPLOYEE';
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ClientReadOnlyDTO {
    id: number;
    uuid: string;
    personalInfo: PersonalInfoReadOnlyDTO;
    vat?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface Client {
    id: number;
    uuid?: string;
    personalInfo?: {
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
        dateOfBirth?: string;
        gender?: 'MALE' | 'FEMALE' | 'OTHER';
        address?: string;
        city?: { name: string; postalCode?: string }; // Transformed from cityName
        cityName?: string; //  from backend
    };
    user?: UserReadOnlyDTO; // null from ClientReadOnlyDTO
    vat?: string;
    notes?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

//interfaces for create/update
export interface CreateClientRequest {
    isActive: boolean;
    user: {
        isActive: boolean;
        username: string;
        password: string;
        email: string;
        role: 'CLIENT' | 'ADMIN' | 'EMPLOYEE';
    };
    personalInfo: {
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
        dateOfBirth?: string;
        gender?: 'MALE' | 'FEMALE' | 'OTHER';
        address?: string;
        cityId?: number;
    };
    vat?: string;
    notes?: string;
}

export interface UpdateClientRequest {
    id: number;
    user?: Partial<UserReadOnlyDTO>;
    personalInfo?: Partial<PersonalInfoReadOnlyDTO>;
    vat?: string;
    notes?: string;
}

export interface CreateClientFormData {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    cityId?: number;
    dateOfBirth?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    vat?: string;
    notes?: string;
}

export interface ClientFilters {
    search?: string;
    isActive?: boolean;
    cityId?: number;
    page?: number;
    size?: number;
}

export interface ClientsResponse {
    content: Client[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}