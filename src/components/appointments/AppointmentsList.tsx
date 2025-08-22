import React from 'react';
import { Plus } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button/Button';
import Pagination from '../ui/Pagination/Pagination';
import AppointmentCard from './AppointmentCard';
import type { Appointment } from '../../types/appointment';

interface AppointmentsListProps {
    appointments: Appointment[];
    loading?: boolean;
    totalElements?: number;
    totalPages?: number;
    currentPage?: number;
    pageSize?: number;
    onView: (appointment: Appointment) => void;
    onEdit: (appointment: Appointment) => void;
    onDelete: (appointment: Appointment) => void;
    onCreateNew: () => void;
    onPageChange?: (page: number) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
                                                               appointments,
                                                               loading = false,
                                                               totalElements = 0,
                                                               totalPages = 0,
                                                               currentPage = 0,
                                                               pageSize = 10,
                                                               onView,
                                                               onEdit,
                                                               onDelete,
                                                               onCreateNew,
                                                               onPageChange
                                                           }) => {
    if (loading) {
        return (
            <Card title="Ραντεβού" subtitle="φόρτωση ραντεβού...">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="animate-pulse bg-white rounded-xl border border-gray-100 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-200 rounded"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card
                title="Ραντεβού"
                subtitle={`${totalElements} συνολικά ραντεβού`}
                action={
                    <Button onClick={onCreateNew} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Προγραμμάτισε ραντεβού
                    </Button>
                }
            >
                {appointments.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4">Δε βρέθηκαν ραντεβού.</div>
                        <Button onClick={onCreateNew}>
                            <Plus className="w-4 h-4 mr-2" />
                            Προγραμμάτισε νέο Ραντεβού
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </Card>

            {/* Pagination */}
            {onPageChange && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    size={pageSize}
                    onPageChange={onPageChange}
                    disabled={loading}
                />
            )}
        </div>
    );
};

export default AppointmentsList;