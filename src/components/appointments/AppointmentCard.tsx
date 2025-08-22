import React, { useState } from 'react';
import { MoreVertical, Eye, Edit, Trash2, Calendar, Clock, User, Phone } from 'lucide-react';
import Badge from '../ui/Badge';
import type { Appointment } from '../../types/appointment';

interface AppointmentCardProps {
    appointment: Appointment;
    onView: (appointment: Appointment) => void;
    onEdit: (appointment: Appointment) => void;
    onDelete: (appointment: Appointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
                                                             appointment,
                                                             onView,
                                                             onEdit,
                                                             onDelete
                                                         }) => {
    const [showMenu, setShowMenu] = useState(false);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'success';
            case 'Pending': return 'warning';
            case 'Completed': return 'success';
            case 'Cancelled': return 'danger';
            default: return 'default';
        }
    };
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                {/* Appointment Info */}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.clientName}</h3>
                        <p className="text-sm text-gray-500">ID: {appointment.id}</p>
                    </div>
                </div>

                {/* Menu Button */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {showMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowMenu(false)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                <button
                                    onClick={() => {
                                        onView(appointment);
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Λεπτομέρειες</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onEdit(appointment);
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Ενημέρωση ραντεβού</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(appointment);
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Διαγραφή ραντεβού</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{appointment.date}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{appointment.time}</span>
                </div>

                {appointment.clientPhone && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{appointment.clientPhone}</span>
                    </div>
                )}

                {appointment.service && (
                    <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{appointment.service}</span>
                    </div>
                )}
            </div>

            {/* Status and Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Badge variant={getStatusVariant(appointment.status)}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                        {appointment.emailReminder && !appointment.reminderSent && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Υπενθύμιση σε αναμονή
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => onView(appointment)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Λεπτομέρειες
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;