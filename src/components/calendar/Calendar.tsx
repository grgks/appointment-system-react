import React, { useState, useEffect } from 'react';
import {ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, Plus, X} from 'lucide-react';
import { appointmentService } from '../../services/appointmentService';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge';
import type { Appointment } from '../../types/appointment';

interface CalendarProps {
    onAppointmentClick?: (appointment: Appointment) => void;
    onCreateAppointment?: (date: Date) => void;
    onDateSelect?: (date: Date) => void;
}

interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    appointments: Appointment[];
}

const Calendar: React.FC<CalendarProps> = ({
                                               onAppointmentClick,
                                               onCreateAppointment,
                                               onDateSelect
                                           }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);


    const monthNames = [
        'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
        'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
    ];


    const dayNames = ['Κυρ', 'Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ'];

    useEffect(() => {
        loadAppointments();
    }, [currentDate]);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            // Get appointments for the current month
            const response = await appointmentService.getAppointments(0, 100);
            const monthAppointments = response.content.filter(apt => {
                const aptDate = new Date(apt.dateTime);
                return aptDate >= startOfMonth && aptDate <= endOfMonth;
            });

            setAppointments(monthAppointments);
        } catch (error) {
            console.error('Failed to load appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateCalendarDays = (): CalendarDay[] => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDayOfMonth.getDay();

        const days: CalendarDay[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Previous month days
        const daysFromPrevMonth = firstDayOfWeek;
        const prevMonth = new Date(year, month - 1, 0);
        for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const date = new Date(year, month - 1, prevMonth.getDate() - i);
            days.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
                appointments: getAppointmentsForDay(date)
            });
        }

        // Current month days
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const date = new Date(year, month, day);
            days.push({
                date,
                isCurrentMonth: true,
                isToday: isSameDay(date, today),
                isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
                appointments: getAppointmentsForDay(date)
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            days.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
                appointments: getAppointmentsForDay(date)
            });
        }

        return days;
    };

    const isSameDay = (date1: Date, date2: Date): boolean => {
        return date1.toDateString() === date2.toDateString();
    };

    const getAppointmentsForDay = (date: Date): Appointment[] => {
        return appointments.filter(apt => {
            const aptDate = new Date(apt.dateTime);
            return isSameDay(aptDate, date);
        });
    };

    const handleDateClick = (day: CalendarDay) => {
        setSelectedDate(day.date);
        onDateSelect?.(day.date);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
    };

    const handleCreateAppointment = (date: Date) => {
        onCreateAppointment?.(date);
    };

    const formatTime = (dateTimeString: string): string => {
        return new Date(dateTimeString).toLocaleTimeString('el-GR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            case 'completed': return 'info';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const calendarDays = generateCalendarDays();

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Calendar Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <CalendarIcon className="w-6 h-6" />
                        <h2 className="text-xl font-semibold">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={handlePrevMonth}
                            variant="outline"
                            size="sm"
                            className="text-white border-white/20 hover:bg-white/10"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <Button
                            onClick={handleToday}
                            variant="outline"
                            size="sm"
                            className="text-white border-white/20 hover:bg-white/10 px-4"
                        >
                            Σήμερα
                        </Button>

                        <Button
                            onClick={handleNextMonth}
                            variant="outline"
                            size="sm"
                            className="text-white border-white/20 hover:bg-white/10"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="px-6 py-2 bg-blue-50 text-blue-600 text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>Φόρτωση ραντεβού...</span>
                    </div>
                </div>
            )}

            {/* Calendar */}
            <div className="p-6">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {dayNames.map((day) => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`
                                min-h-[120px] p-1 border border-gray-100 rounded-lg cursor-pointer transition-all duration-200 group
                                ${day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
                                ${day.isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                                ${day.isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
                                hover:shadow-md
                            `}
                            onClick={() => handleDateClick(day)}
                        >
                            {/* Date number */}
                            <div className="flex items-center justify-between mb-1">
                                <span className={`
                                    text-sm font-medium
                                    ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                                    ${day.isToday ? 'text-blue-600 font-bold' : ''}
                                `}>
                                    {day.date.getDate()}
                                </span>

                                {day.isCurrentMonth && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCreateAppointment(day.date);
                                        }}
                                        className="opacity-0 hover:opacity-100 p-1 rounded-full hover:bg-blue-100 transition-all duration-200"
                                        title="Νέο ραντεβού"
                                    >
                                        <Plus className="w-3 h-3 text-blue-600" />
                                    </button>
                                )}
                            </div>

                            {/* Appointments */}
                            <div className="space-y-1">
                                {day.appointments.slice(0, 3).map((appointment) => {
                                    const appointmentDate = new Date(appointment.dateTime);
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const isPastAppointment = appointmentDate < today;

                                    return (
                                        <div
                                            key={appointment.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onAppointmentClick?.(appointment);
                                            }}
                                            className="relative p-1 rounded text-xs bg-blue-100 hover:bg-blue-200 transition-colors cursor-pointer"
                                            title={`${appointment.clientName} - ${formatTime(appointment.dateTime)}`}
                                        >
                                            {/* X για παλιά ραντεβού */}
                                            {isPastAppointment && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded z-10 pointer-events-none">
                                                    <X className="w-8 h-8 text-red-600/70" strokeWidth={3} />
                                                </div>
                                            )}

                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-3 h-3 text-blue-600" />
                                                <span className="font-medium text-blue-800 truncate">
                                                    {formatTime(appointment.dateTime)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1 mt-0.5">
                                                <User className="w-3 h-3 text-gray-500" />
                                                <span className="text-gray-700 truncate">
                                                    {appointment.clientName}
                                                </span>
                                            </div>
                                            <Badge
                                                variant={getStatusColor(appointment.status) as any}
                                            >
                                                {appointment.status}
                                            </Badge>
                                        </div>
                                    );
                                })}

                                {day.appointments.length > 3 && (
                                    <div className="text-xs text-gray-500 text-center">
                                        +{day.appointments.length - 3} περισσότερα
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">
                            {selectedDate.toLocaleDateString('el-GR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </h3>
                        <Button
                            onClick={() => handleCreateAppointment(selectedDate)}
                            size="sm"
                            className="flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Νέο Ραντεβού</span>
                        </Button>
                    </div>

                    {getAppointmentsForDay(selectedDate).length > 0 ? (
                        <div className="mt-3 space-y-2">
                            {getAppointmentsForDay(selectedDate).map((appointment) => (
                                <div
                                    key={appointment.id}
                                    onClick={() => onAppointmentClick?.(appointment)}
                                    className="p-3 bg-white rounded border hover:shadow-md cursor-pointer transition-shadow"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {appointment.clientName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {formatTime(appointment.dateTime)} • {appointment.service || 'Ραντεβού'}
                                            </div>
                                        </div>
                                        <Badge variant={getStatusColor(appointment.status) as any}>
                                            {appointment.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-2 text-sm text-gray-500">
                            Δεν υπάρχουν ραντεβού για αυτή την ημερομηνία
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calendar;