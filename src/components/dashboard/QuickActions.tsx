import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users } from 'lucide-react';
import Card from '../ui/Card';

interface QuickActionsProps {
    onCreateAppointment?: () => void;
    onViewAppointments?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
                                                       onCreateAppointment
                                                   }) => {
    const navigate = useNavigate();

    const actions = [
        {
            id: 'new Appointment',
            title: 'Νέο Ραντεβού',
            description: 'Schedule a new appointment',
            icon: <Plus className="w-6 h-6" />,
            color: 'bg-blue-500 hover:bg-blue-600',
            onClick: onCreateAppointment || (() => console.log('New appointment'))
        },
        {
            id: 'view-calendar',
            title: 'Προβολή Ημερολογίου',
            description: 'Check today\'s schedule',
            icon: <Calendar className="w-6 h-6" />,
            color: 'bg-green-500 hover:bg-green-600',
            onClick: () => navigate('/calendar') //Navigate to calendar page
        },
        {
            id: 'manage-clients',
            title: 'Διαχείριση Πελατών',
            description: 'View and edit clients',
            icon: <Users className="w-6 h-6" />,
            color: 'bg-purple-500 hover:bg-purple-600',
            onClick: () => navigate('/clients') //Navigate to clients list instead of create
        },
        //settings button
        // {
        //     id: 'settings',
        //     title: 'Ρυθμίσεις',
        //     description: 'Configure your account',
        //     icon: <Settings className="w-6 h-6" />,
        //     color: 'bg-gray-500 hover:bg-gray-600',
        //     onClick: () => console.log('Settings') // Future: navigate('/settings')
        // }
    ];

    return (
        <Card title="Γρήγορες Επιλογές" subtitle="Quick actions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        onClick={action.onClick}
                        className={`p-4 rounded-lg text-white text-left transition-colors duration-200 ${action.color}`}
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            {action.icon}
                            <h3 className="font-medium">{action.title}</h3>
                        </div>
                        <p className="text-sm opacity-90">{action.description}</p>
                    </button>
                ))}
            </div>
        </Card>
    );
};

export default QuickActions;