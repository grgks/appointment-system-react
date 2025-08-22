import React from 'react';
import { Edit, Trash2, Calendar, User, Phone, Bell } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge';
import type { Appointment } from '../../types/appointment';

interface AppointmentDetailsProps {
    appointment: Appointment;
    onEdit: (appointment: Appointment) => void;
    onDelete: (appointment: Appointment) => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
                                                                   appointment,
                                                                   onEdit,
                                                                   onDelete
                                                               }) => {
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
        <div className="space-y-6">
            {/* Header Card */}
            <Card>
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{appointment.clientName} </h2>
                            <p className="text-gray-500">ID ραντεβού: {appointment.id}</p>
                            <div className="flex items-center space-x-2 mt-2">
                                <Badge variant={getStatusVariant(appointment.status)}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </Badge>
                                {appointment.emailReminder && !appointment.reminderSent && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                                        <Bell className="w-3 h-3 mr-1" />
                                        Υπενθύμιση σε αναμονή
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <Button onClick={() => onEdit(appointment)} variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Ενημέρωση
                        </Button>
                        <Button
                            onClick={() => onDelete(appointment)}
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Διαγραφή
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Appointment Information */}
                <Card title="Λεπτομέρειες ραντεβού" className="h-fit">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ημερομηνία & Ώρα</label>
                            <div className="mt-1 flex items-center text-gray-900">
                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                {appointment.date} at {appointment.time}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Πελάτης</label>
                            <div className="mt-1 flex items-center text-gray-900">
                                <User className="w-4 h-4 mr-2 text-gray-400" />
                                {appointment.clientName}
                            </div>
                        </div>

                        {appointment.clientPhone && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Τηλέφωνο</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                    {appointment.clientPhone}
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Υπηρεσίες</label>
                            <p className="mt-1 text-gray-900">{appointment.service || 'Γενικά ραντεβού'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <div className="mt-1">
                                <Badge variant={getStatusVariant(appointment.status)}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Reminder Information */}
                <Card title="Ρυθμίσεις υπενθύμισης" className="h-fit">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Υπενθύμιση Email</label>
                            <p className="mt-1 text-gray-900">
                                {appointment.emailReminder ? 'Ενεργοποιημένο' : 'Απενεργοποιημένο'}
                            </p>
                        </div>

                        {appointment.emailReminder && appointment.reminderDateTime && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Υπενθύμιση Ώρας</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <Bell className="w-4 h-4 mr-2 text-gray-400" />
                                    {new Date(appointment.reminderDateTime).toLocaleString()}
                                </div>
                            </div>
                        )}

                        {appointment.emailReminder && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Υπενθύμιση Status</label>
                                <div className="mt-1">
                                    <Badge variant={appointment.reminderSent ? 'success' : 'warning'}>
                                        {appointment.reminderSent ? 'Sent' : 'Pending'}
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Notes */}
                <Card title="Notes" className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-lg p-4">
                        {appointment.notes ? (
                            <p className="text-gray-900 whitespace-pre-wrap">{appointment.notes}</p>
                        ) : (
                            <p className="text-gray-500 italic">Μη διαθέσιμη σημείωση</p>
                        )}
                    </div>
                </Card>
            </div>

            {/* System Information */}
            <Card title="System Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointment.createdAt && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Δημιουργήθηκε</label>
                            <p className="text-sm text-gray-600">
                                {new Date(appointment.createdAt).toLocaleString()}
                            </p>
                        </div>
                    )}

                    {appointment.updatedAt && appointment.updatedAt !== appointment.createdAt && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Τελευταία ενημερωμένο</label>
                            <p className="text-sm text-gray-600">
                                {new Date(appointment.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AppointmentDetails;
