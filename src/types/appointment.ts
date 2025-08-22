export interface AppointmentReadOnlyDTO {
    id: number;
    uuid: string;
    username: string;
    clientName: string;
    clientLastName: string;
    clientPhone: string;
    appointmentDateTime: string; // LocalDateTime as string
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'CONFIRMED';
    emailReminder: boolean;
    reminderDateTime?: string;
    reminderSent?: boolean;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}


export interface Appointment {
    id: number;
    uuid?: string;
    clientId?: number;
    clientName: string;
    clientLastName?: string;
    clientPhone?: string;
    service?: string; // Derived from notes or default
    date: string; // Formatted date
    time: string; // Formatted time
    dateTime: string; // Full datetime
    duration?: number;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    notes?: string;
    emailReminder?: boolean;
    reminderDateTime?: string;
    reminderSent?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateAppointmentRequest {
    userId: number;
    clientId: number;
    appointmentDateTime: string; // ISO format
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    emailReminder?: boolean;
    reminderDateTime?: string;
    notes?: string;
}

export interface UpdateAppointmentRequest {
    appointmentDateTime: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'CONFIRMED';
    emailReminder?: boolean;
    reminderDateTime?: string;
    notes?: string;
}

export interface AppointmentFilters {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    clientId?: number;
    userId?: number;
    page?: number;
    size?: number;
}

export interface AppointmentsResponse {
    content: Appointment[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}