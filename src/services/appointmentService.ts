import api from './api';
import { ENDPOINTS } from '../utils/constants';
import type {
    Appointment,
    AppointmentReadOnlyDTO,
    CreateAppointmentRequest,
    UpdateAppointmentRequest,
    AppointmentsResponse
} from '../types/appointment';

// Backend response structure
interface BackendPageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
}

// Transform backend AppointmentReadOnlyDTO to frontend Appointment
const transformAppointmentFromBackend = (backendAppointment: AppointmentReadOnlyDTO): Appointment => {
    const appointmentDate = new Date(backendAppointment.appointmentDateTime);

    return {
        id: backendAppointment.id,
        uuid: backendAppointment.uuid,
        clientName: (backendAppointment.clientName || '' ).trim(),
        clientLastName: backendAppointment.clientLastName,
        clientPhone: backendAppointment.clientPhone,
        service: backendAppointment.notes || 'Appointment', // Use notes as service or default
        date: appointmentDate.toLocaleDateString(),
        time: appointmentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        dateTime: backendAppointment.appointmentDateTime,
        status: backendAppointment.status.toLowerCase() as 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED',
        notes: backendAppointment.notes,
        emailReminder: backendAppointment.emailReminder,
        reminderDateTime: backendAppointment.reminderDateTime,
        reminderSent: backendAppointment.reminderSent,
        createdAt: backendAppointment.createdAt,
        updatedAt: backendAppointment.updatedAt
    };
};

export const appointmentService = {
    async getAppointments(
        page: number = 0,
        size: number = 10
    ): Promise<AppointmentsResponse> {
        try {
            console.log('AppointmentService: Fetching appointments...', { page, size });

            const params = { page, size };
            const response = await api.get<BackendPageResponse<AppointmentReadOnlyDTO>>(
                ENDPOINTS.APPOINTMENTS.LIST,
                { params }
            );

            console.log('AppointmentService: Backend response:', response.data);

            // Transform backend response to frontend format
            const transformedAppointments = response.data.content.map(transformAppointmentFromBackend);

            const appointmentsResponse: AppointmentsResponse = {
                content: transformedAppointments,
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                size: response.data.size,
                number: response.data.number
            };

            console.log('AppointmentService: Transformed response:', appointmentsResponse);
            return appointmentsResponse;
        } catch (error: any) {
            console.error('AppointmentService: Get appointments error:', error);
            throw new Error(error.response?.data?.description || 'Failed to load appointments');
        }
    },

    async getAppointmentById(id: number): Promise<Appointment> {
        try {
            console.log('AppointmentService: Fetching appointment by ID:', id);

            const response = await api.get<AppointmentReadOnlyDTO>(`${ENDPOINTS.APPOINTMENTS.BY_ID}/${id}`);

            console.log('AppointmentService: Backend appointment:', response.data);

            const transformedAppointment = transformAppointmentFromBackend(response.data);

            console.log('AppointmentService: Transformed appointment:', transformedAppointment);
            return transformedAppointment;
        } catch (error: any) {
            console.error('AppointmentService: Get appointment by ID error:', error);
            throw new Error(error.response?.data?.description || 'Failed to load appointment');
        }
    },

    async createAppointment(appointmentData: CreateAppointmentRequest): Promise<Appointment> {
        try {
            console.log('AppointmentService: Creating appointment...', appointmentData);

            const response = await api.post<AppointmentReadOnlyDTO>('/api/appointments/save', appointmentData);

            console.log('AppointmentService: Appointment created:', response.data);
            return transformAppointmentFromBackend(response.data);
        } catch (error: any) {
            console.error('AppointmentService: Create appointment error:', error);

            let errorMessage = 'Failed to create appointment';
            if (error.response?.data?.description) {
                errorMessage = error.response.data.description;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            throw new Error(errorMessage);
        }
    },

    async updateAppointment(id: number, appointmentData: UpdateAppointmentRequest): Promise<Appointment> {
        try {
            console.log('AppointmentService: Updating appointment:', { id, appointmentData });

            const response = await api.put<AppointmentReadOnlyDTO>(`/api/appointments/update/${id}`, appointmentData);

            console.log('AppointmentService: Appointment updated:', response.data);
            return transformAppointmentFromBackend(response.data);
        } catch (error: any) {
            console.error('AppointmentService: Update appointment error:', error);
            throw new Error(error.response?.data?.description || 'Failed to update appointment');
        }
    },

    async deleteAppointment(id: number): Promise<void> {
        try {
            console.log('AppointmentService: Deleting appointment:', id);

            await api.delete(`${ENDPOINTS.APPOINTMENTS.DELETE}/${id}`);

            console.log('AppointmentService: Appointment deleted:', id);
        } catch (error: any) {
            console.error('AppointmentService: Delete appointment error:', error);
            throw new Error(error.response?.data?.description || 'Failed to delete appointment');
        }
    },

    async getUpcomingAppointments(): Promise<Appointment[]> {
        try {
            console.log('AppointmentService: Fetching upcoming appointments...');

            const response = await api.get<AppointmentReadOnlyDTO[]>(ENDPOINTS.APPOINTMENTS.UPCOMING);

            console.log('AppointmentService: Upcoming appointments:', response.data);

            const transformedAppointments = response.data.map(transformAppointmentFromBackend);

            console.log('AppointmentService: Transformed upcoming appointments:', transformedAppointments);
            return transformedAppointments;
        } catch (error: any) {
            console.error('AppointmentService: Get upcoming appointments error:', error);
            throw new Error(error.response?.data?.description || 'Failed to load upcoming appointments');
        }
    },

    async markReminderAsSent(id: number): Promise<void> {
        try {
            console.log('AppointmentService: Marking reminder as sent:', id);

            await api.put(`/api/appointments/${id}/reminder/sent`);

            console.log('AppointmentService: Reminder marked as sent:', id);
        } catch (error: any) {
            console.error('AppointmentService: Mark reminder error:', error);
            throw new Error(error.response?.data?.description || 'Failed to mark reminder as sent');
        }
    }
};
