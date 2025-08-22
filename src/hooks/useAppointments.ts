import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { appointmentService } from '../services/appointmentService';
import type { Appointment, CreateAppointmentRequest, AppointmentsResponse, UpdateAppointmentRequest } from '../types/appointment';

interface UseAppointmentsReturn {
    appointments: Appointment[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
    createAppointment: (appointmentData: CreateAppointmentRequest) => Promise<Appointment>;
    updateAppointment: (id: number, appointmentData: UpdateAppointmentRequest) => Promise<Appointment>;
    deleteAppointment: (id: number) => Promise<void>;
    loadAppointments: (page?: number, size?: number) => Promise<void>;
    changePage: (page: number) => Promise<void>;
    refetch: () => Promise<void>;
}

export const useAppointments = (
    initialPage: number = 0,
    initialSize: number = 10
): UseAppointmentsReturn => {
    const { isAuthenticated } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        totalPages: 0,
        totalElements: 0,
        currentPage: initialPage,
        pageSize: initialSize
    });

    const loadAppointments = useCallback(async (
        page: number = pagination.currentPage,
        size: number = pagination.pageSize
    ): Promise<void> => {
        if (!isAuthenticated) {
            console.log('Appointments: User not authenticated, skipping fetch');
            return;
        }

        try {
            console.log('Appointments: Loading appointments...', { page, size });
            setLoading(true);
            setError(null);

            const response: AppointmentsResponse = await appointmentService.getAppointments(page, size);

            console.log('Appointments: Data loaded successfully:', response);
            setAppointments(response.content);
            setPagination({
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.number,
                pageSize: response.size
            });
        } catch (err: any) {
            console.error('Appointments: Load error:', err);
            setError(err.message || 'Αποτυχία φόρτωσης ραντεβού');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, pagination.currentPage, pagination.pageSize]);

    const changePage = useCallback(async (page: number): Promise<void> => {
        await loadAppointments(page, pagination.pageSize);
    }, [loadAppointments, pagination.pageSize]);

    const createAppointment = useCallback(async (appointmentData: CreateAppointmentRequest): Promise<Appointment> => {
        try {
            console.log('Appointments: Creating appointment...', appointmentData);
            setLoading(true);
            setError(null);

            const newAppointment = await appointmentService.createAppointment(appointmentData);

            console.log('Appointments: Appointment created successfully:', newAppointment);

            // Refresh the appointments list after creation
            await loadAppointments(pagination.currentPage, pagination.pageSize);

            return newAppointment;
        } catch (err: any) {
            console.error('Appointments: Create error:', err);
            setError(err.message || 'Αποτυχία δημιουργίας ραντεβού');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [loadAppointments, pagination.currentPage, pagination.pageSize]);

    const updateAppointment = useCallback(async (id: number, appointmentData: UpdateAppointmentRequest): Promise<Appointment> => {
        try {
            console.log('Appointments: Updating appointment...', { id, appointmentData });
            setLoading(true);
            setError(null);

            const updatedAppointment = await appointmentService.updateAppointment(id, appointmentData);

            console.log('Appointments: Appointment updated successfully:', updatedAppointment);

            // Update the appointment in the local state
            setAppointments(prev => prev.map(appointment =>
                appointment.id === id ? updatedAppointment : appointment
            ));

            return updatedAppointment;
        } catch (err: any) {
            console.error('Appointments: Update error:', err);
            setError(err.message || 'Αποτυχία ενημέρωσης ραντεβού');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteAppointment = useCallback(async (id: number): Promise<void> => {
        try {
            console.log('Appointments: Deleting appointment...', id);
            setLoading(true);
            setError(null);

            await appointmentService.deleteAppointment(id);

            console.log('Appointments: Appointment deleted successfully');

            // Remove the appointment from local state
            setAppointments(prev => prev.filter(appointment => appointment.id !== id));

            // Update pagination
            setPagination(prev => ({
                ...prev,
                totalElements: prev.totalElements - 1
            }));
        } catch (err: any) {
            console.error('Appointments: Delete error:', err);
            setError(err.message || 'Αποτυχία Διαγραφής Ραντεβού');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(async (): Promise<void> => {
        await loadAppointments(pagination.currentPage, pagination.pageSize);
    }, [loadAppointments, pagination.currentPage, pagination.pageSize]);

    // Load appointments on mount and when auth changes
    useEffect(() => {
        if (isAuthenticated) {
            loadAppointments();
        } else {
            setAppointments([]);
            setError(null);
        }
    }, [isAuthenticated, loadAppointments]);

    return {
        appointments,
        loading,
        error,
        totalPages: pagination.totalPages,
        totalElements: pagination.totalElements,
        currentPage: pagination.currentPage,
        pageSize: pagination.pageSize,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        loadAppointments,
        changePage,
        refetch
    };
};
