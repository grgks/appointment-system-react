import React from 'react';
import { Calendar, Clock, User, Edit, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import type { RecentAppointment } from '../../types/dashboard';

interface UpcomingAppointmentsProps {
    appointments: RecentAppointment[];
    loading?: boolean;
    onAppointmentClick?: (appointmentId: number) => void;
    onEditAppointment?: (appointmentId: number) => void;
    onViewAll?: () => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
                                                                       appointments,
                                                                       loading = false,
                                                                       onAppointmentClick,
                                                                       onEditAppointment,
                                                                       onViewAll
                                                                   }) => {
    const sortedAppointments = React.useMemo(() => {
        return [...appointments].sort((a, b) => {
            const parseDateTime = (dateStr: string, timeStr: string) => {
                try {
                    const cleanTime = timeStr.replace('at ', '');

                    const fullDateTimeStr = `${dateStr} ${cleanTime}`;

                    let date = new Date(fullDateTimeStr);

                    if (isNaN(date.getTime())) {
                        // Μετατροπή από DD/MM/YYYY σε MM/DD/YYYY format
                        const dateParts = dateStr.split('/');
                        if (dateParts.length === 3) {
                            const reformattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
                            date = new Date(`${reformattedDate} ${cleanTime}`);
                        }
                    }
                    return date.getTime();
                } catch (error) {
                    console.warn('Error parsing date:', dateStr, timeStr, error);
                    return 0;
                }
            };
            const timeA = parseDateTime(a.date, a.time);
            const timeB = parseDateTime(b.date, b.time);

            return timeA - timeB;
        });
    }, [appointments]);
    if (loading) {
        return (
            <Card title="Επόμενα Ραντεβού">
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
            title="Επόμενα Ραντεβού"
            subtitle={`${sortedAppointments.length} προγραμματισμένα`}
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
                {sortedAppointments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        Κανένα Επόμενο Ραντεβού
                    </div>
                ) : (
                    sortedAppointments.slice(0, 5).map((appointment) => (
                        <div
                            key={appointment.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                            onClick={() => onAppointmentClick?.(appointment.id)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{appointment.clientName}</p>
                                    <p className="text-sm text-gray-500">{appointment.service}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{appointment.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{appointment.time}</span>
                                    </div>
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

export default UpcomingAppointments;