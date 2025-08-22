import React from 'react';
import { Clock, User, Edit, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import type { RecentAppointment } from '../../types/dashboard';
import { APPOINTMENT_STATUS_COLORS } from '../../utils/constants';

interface RecentAppointmentsProps {
    appointments: RecentAppointment[];
    loading?: boolean;
    onAppointmentClick?: (appointmentId: number) => void;
    onEditAppointment?: (appointmentId: number) => void;
    onViewAll?: () => void;
}

const RecentAppointments: React.FC<RecentAppointmentsProps> = ({
                                                                   appointments,
                                                                   loading = false,
                                                                   onAppointmentClick,
                                                                   onEditAppointment,
                                                                   onViewAll
                                                               }) => {
    if (loading) {
        return (
            <Card title="Πρόσφατα Ραντεβού">
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="animate-pulse flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <Card
            title="Πρόσφατα Ραντεβού"
            subtitle={`${appointments.length} appointments`}
            action={
                onViewAll ? (
                    <button
                        onClick={onViewAll}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                        Δες όλα τα ραντεβού
                        <ArrowRight className="w-4 h-4" />
                    </button>
                ) : undefined
            }
        >
            <div className="space-y-4">
                {appointments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        Κανένα Πρόσφατο Ραντεβού
                    </div>
                ) : (
                    appointments.slice(0, 5).map((appointment) => (
                        <div
                            key={appointment.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                            onClick={() => onAppointmentClick?.(appointment.id)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{appointment.clientName}</p>
                                    <p className="text-sm text-gray-500">{appointment.service}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {appointment.date} at {appointment.time}
                                        </span>
                                    </div>
                                    <Badge variant={APPOINTMENT_STATUS_COLORS[appointment.status] as any}>
                                        {appointment.status}
                                    </Badge>
                                </div>

                                {onEditAppointment && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditAppointment(appointment.id);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-600 transition-all duration-200"
                                        title="Ενημέρωση Ραντεβού"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default RecentAppointments;