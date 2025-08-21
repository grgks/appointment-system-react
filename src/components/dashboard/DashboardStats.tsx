import React from 'react';
import { Calendar, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import StatCard from '../ui/StatCard.tsx';
import type { DashboardStats as DashboardStatsType } from '../../types/dashboard';

interface DashboardStatsProps {
    stats?: DashboardStatsType;
    loading?: boolean;
    onViewAllAppointments?: () => void;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
                                                           stats,
                                                           loading = false,
                                                           onViewAllAppointments
                                                       }) => {
    if (loading || !stats) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <StatCard
                        key={index}
                        title="Φόρτωση..."
                        value="--"
                        loading={true}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 px-5">Συνοπτικά Στοιχεία :</h2>
                {onViewAllAppointments && (
                    <button
                        onClick={onViewAllAppointments}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                        Δες όλα τα ραντεβού
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Συνολικά Ραντεβού"
                    value={stats.totalAppointments}
                    change={stats.appointmentGrowth}
                    changeType={stats.appointmentGrowth?.startsWith('+') ? 'positive' : 'negative'}
                    icon={<Calendar className="w-6 h-6" />}
                />

                <StatCard
                    title="Συνολικοί Πελάτες"
                    value={stats.totalClients}
                    change={stats.clientGrowth}
                    changeType={stats.clientGrowth?.startsWith('+') ? 'positive' : 'negative'}
                    icon={<Users className="w-6 h-6" />}
                />

                <StatCard
                    title="Σημερινά Ραντεβού"
                    value={stats.todayAppointments}
                    icon={<Clock className="w-6 h-6" />}
                />

                <StatCard
                    title="Ραντεβού σε αναμονή"
                    value={stats.pendingAppointments}
                    icon={<CheckCircle className="w-6 h-6" />}
                />
            </div>
        </div>
    );
};

export default DashboardStats;