export interface DashboardStats {
    totalAppointments: number;
    totalClients: number;
    todayAppointments: number;
    pendingAppointments: number;
    monthlyRevenue?: number;
    appointmentGrowth?: string;
    clientGrowth?: string;
    revenueGrowth?: string;
}

export interface RecentAppointment {
    id: number;
    clientName: string;
    service: string;
    date: string;
    time: string;
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
    duration?: number;
    notes?: string;
}

export interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
    color?: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recentAppointments: RecentAppointment[];
    upcomingAppointments: RecentAppointment[];
}

export interface RecentAppointment {
    id: number;
    clientName: string;  // Αυτό θα έρχεται από personalInfo.firstName + lastName
    service: string;
    date: string;
    time: string;
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}



