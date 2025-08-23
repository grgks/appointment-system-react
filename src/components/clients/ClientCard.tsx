import React, { useState } from 'react';
import { MoreVertical, Eye, Edit, Trash2, Mail, Phone, MapPin, Building } from 'lucide-react';
import type { Client } from '../../types/client';

interface ClientCardProps {
    client: Client;
    onView: (client: Client) => void;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onView, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);

    const clientName = `${client.personalInfo?.firstName || 'Unknown'} ${client.personalInfo?.lastName || 'User'}`;
    const email = client.personalInfo?.email || 'Χωρίς email';
    const phone = client.personalInfo?.phone || 'Χωρίς αρ. τηλεφώνου';
    const city = client.personalInfo?.city?.name || 'Χωρίς πόλη';
    const initials = clientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();


    const isActive = client.isActive ?? true;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                {/* Client & Name */}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {initials}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{clientName}</h3>
                        <p className="text-sm text-gray-500">ID Πελάτη: {client.id}</p>
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
                                        onView(client);
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Δες Λεπτομέρειες</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onEdit(client);
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Ενημέρωση Πελάτη</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(client);
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Διαγραφή Πελάτη</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Client Info */}
            <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{email}</span>
                </div>

                {phone !== 'Χωρίς αρ. τηλεφώνου' && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{phone}</span>
                    </div>
                )}

                {city !== 'Χωρίς πόλη' && (
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{city}</span>
                    </div>
                )}

                {client.vat && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span>ΑΦΜ: {client.vat}</span>
                    </div>
                )}
            </div>

            {/* Status */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                        isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {isActive ? 'Active' : 'Inactive'}
                    </span>

                    <button
                        onClick={() => onView(client)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Δες λεπτομέρειες
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientCard;