import api from './api';
import { ENDPOINTS } from '../utils/constants';
import type { DashboardData, DashboardStats, RecentAppointment } from '../types/dashboard';

export const dashboardService = {
    async getDashboardData(): Promise<DashboardData> {
        try {
            console.log('Starting dashboard data fetch...');

            // Get appointments and clients data
            const [appointmentsResponse, clientsResponse, upcomingResponse] = await Promise.all([
                api.get(ENDPOINTS.APPOINTMENTS.LIST + '?page=0&size=50'), // Recent appointments
                api.get(ENDPOINTS.CLIENTS.LIST + '?page=0&size=10'),       // Total clients count
                api.get(ENDPOINTS.APPOINTMENTS.UPCOMING)                   // Upcoming appointments
            ]);

            console.log('Raw API responses:', {
                appointments: appointmentsResponse.data,
                clients: clientsResponse.data,
                upcoming: upcomingResponse.data
            });

            const appointments = appointmentsResponse.data.content || [];
            const totalClients = clientsResponse.data.totalElements || 0;
            const upcomingAppointments = upcomingResponse.data || [];

            console.log('Processed data:', {
                appointmentsCount: appointments.length,
                totalClients,
                upcomingCount: upcomingAppointments.length
            });

            // Calculate stats from the data
            const stats: DashboardStats = {
                totalAppointments: appointmentsResponse.data.totalElements || 0,
                totalClients: totalClients,
                todayAppointments: appointments.filter((apt: any) => {
                    const appointmentDate = new Date(apt.appointmentDateTime).toDateString();
                    const today = new Date().toDateString();
                    return appointmentDate === today;
                }).length,
                pendingAppointments: appointments.filter((apt: any) =>
                    apt.status === 'PENDING'
                ).length,
                appointmentGrowth: '+12%', // Mock data
                clientGrowth: '+8%'        // Mock data
            };

            console.log('Calculated stats:', stats);


            const recentAppointments: RecentAppointment[] = appointments.slice(0, 5).map((apt: any) => {
                console.log('Processing recent appointment:', apt);

                //Use the correct fields from AppointmentReadOnlyDTO
                // const firstName = apt.clientName || '';
                // const lastName = apt.clientLastName || '';
                // const clientName = lastName ? `${firstName} ${lastName}`.trim() : firstName || 'Unknown Client';
                const clientName = (apt.clientName || 'Unknown Client').trim();

                const appointmentDate = new Date(apt.appointmentDateTime);
                const date = appointmentDate.toLocaleDateString('el-GR');
                const time = appointmentDate.toLocaleTimeString('el-GR', {hour: '2-digit', minute:'2-digit'});

                console.log('Transformed appointment:', {
                    id: apt.id,
                    clientName,
                    originalData: { clientName: apt.clientName, clientLastName: apt.clientLastName }
                });

                return {
                    id: apt.id,
                    clientName,
                    service: apt.notes || 'Appointment',
                    date,
                    time,
                    status: apt.status?.toLowerCase() as 'confirmed' | 'pending' | 'completed' | 'cancelled'
                };
            });


            const formattedUpcoming: RecentAppointment[] = upcomingAppointments.slice(0, 5).map((apt: any) => {
                console.log('Processing upcoming appointment:', apt);

                // const firstName = apt.clientName || '';
                // const lastName = apt.clientLastName || '';
                // const clientName = lastName ? `${firstName} ${lastName}`.trim() : firstName || 'Unknown Client';
                const clientName = (apt.clientName || 'Unknown Client').trim();

                const appointmentDate = new Date(apt.appointmentDateTime);
                const date = appointmentDate.toLocaleDateString('el-GR');
                const time = appointmentDate.toLocaleTimeString('el-GR', {hour: '2-digit', minute:'2-digit'});

                return {
                    id: apt.id,
                    clientName,
                    service: apt.notes || 'Appointment',
                    date,
                    time,
                    status: apt.status?.toLowerCase() as 'confirmed' | 'pending' | 'completed' | 'cancelled'
                };
            });

            const result = {
                stats,
                recentAppointments,
                upcomingAppointments: formattedUpcoming
            };

            console.log('Final dashboard data:', result);
            return result;

        } catch (error: any) {
            console.error('Dashboard service error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            throw new Error(error.response?.data?.description || error.message || 'Failed to load dashboard data');
        }
    },

    async getStats(): Promise<DashboardStats> {
        try {
            const [appointmentsResponse, clientsResponse] = await Promise.all([
                api.get(ENDPOINTS.APPOINTMENTS.LIST + '?page=0&size=1'),
                api.get(ENDPOINTS.CLIENTS.LIST + '?page=0&size=1')
            ]);

            return {
                totalAppointments: appointmentsResponse.data.totalElements || 0,
                totalClients: clientsResponse.data.totalElements || 0,
                todayAppointments: 0, // Would need to calculate
                pendingAppointments: 0 // Would need to calculate
            };
        } catch (error: any) {
            throw new Error(error.response?.data?.description || 'Failed to load stats');
        }
    },

    async getRecentAppointments(): Promise<RecentAppointment[]> {
        try {
            const response = await api.get(ENDPOINTS.APPOINTMENTS.LIST + '?page=0&size=5');
            const appointments = response.data.content || [];

            return appointments.map((apt: any) => {
                // const firstName = apt.clientName || '';
                // const lastName = apt.clientLastName || '';
                // const clientName = lastName ? `${firstName} ${lastName}`.trim() : firstName || 'Unknown Client';
                const clientName = (apt.clientName || 'Unknown Client').trim();
                return {
                    id: apt.id,
                    clientName,
                    service: apt.notes || 'Appointment',
                    date: new Date(apt.appointmentDateTime).toLocaleDateString('el-GR'),
                    time: new Date(apt.appointmentDateTime).toLocaleTimeString('el-GR', {hour: '2-digit', minute:'2-digit'}),
                    status: apt.status?.toLowerCase() as 'confirmed' | 'pending' | 'completed' | 'cancelled'
                };
            });
        } catch (error: any) {
            throw new Error(error.response?.data?.description || 'Failed to load recent appointments');
        }
    },

    async getUpcomingAppointments(): Promise<RecentAppointment[]> {
        try {
            const response = await api.get(ENDPOINTS.APPOINTMENTS.UPCOMING);
            const appointments = response.data || [];

            return appointments.slice(0, 5).map((apt: any) => {
                // const firstName = apt.clientName || '';
                // const lastName = apt.clientLastName || '';
                // const clientName = lastName ? `${firstName} ${lastName}`.trim() : firstName || 'Unknown Client';
                const clientName = (apt.clientName || 'Unknown Client').trim();

                return {
                    id: apt.id,
                    clientName,
                    service: apt.notes || 'Appointment',
                    date: new Date(apt.appointmentDateTime).toLocaleDateString('el-GR'),
                    time: new Date(apt.appointmentDateTime).toLocaleTimeString('el-GR', {hour: '2-digit', minute:'2-digit'}),
                    status: apt.status?.toLowerCase() as 'confirmed' | 'pending' | 'completed' | 'cancelled'
                };
            });
        } catch (error: any) {
            throw new Error(error.response?.data?.description || 'Failed to load upcoming appointments');
        }
    }
};