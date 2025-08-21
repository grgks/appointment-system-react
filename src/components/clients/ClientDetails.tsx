import React from 'react';
import { Edit, Trash2, Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge';
import type { Client } from '../../types/client';

interface ClientDetailsProps {
    client: Client;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onEdit, onDelete }) => {
    const clientName = `${client.personalInfo?.firstName || 'Unknown'} ${client.personalInfo?.lastName || 'User'}`;
    const initials = clientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();


    const isActive = client.isActive ?? true;

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card>
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{clientName}</h2>
                            <p className="text-gray-500">ID Πελάτη: {client.id}</p>
                            {client.uuid && (
                                <p className="text-gray-500 text-sm">UUID Πελάτη: {client.uuid}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <Button onClick={() => onEdit(client)} variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Ενημέρωση
                        </Button>
                        <Button
                            onClick={() => onDelete(client)}
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
                {/* Personal Information */}
                <Card title="Προσωπικές Πληροφορίες" className="h-fit">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ονομα & Επώνυμο</label>
                            <p className="mt-1 text-gray-900">{clientName}</p>
                        </div>

                        {client.personalInfo?.email && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                    {client.personalInfo.email}
                                </div>
                            </div>
                        )}

                        {client.personalInfo?.phone && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Αρ. τηλεφώνου</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                    {client.personalInfo.phone}
                                </div>
                            </div>
                        )}

                        {client.personalInfo?.dateOfBirth && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ημερομηνία Γέννησης</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                    {new Date(client.personalInfo.dateOfBirth).toLocaleDateString()}
                                </div>
                            </div>
                        )}

                        {client.personalInfo?.gender && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Φύλο</label>
                                <p className="mt-1 text-gray-900">
                                    {client.personalInfo.gender === 'MALE' ? 'Male' :
                                        client.personalInfo.gender === 'FEMALE' ? 'Female' : 'Other'}
                                </p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* address */}
                <Card title="Contact & Location" className="h-fit">
                    <div className="space-y-4">
                        {client.personalInfo?.address && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Διεύθυνση</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    {client.personalInfo.address}
                                </div>
                            </div>
                        )}

                        {client.personalInfo?.city?.name && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Πόλη</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    {client.personalInfo.city.name}
                                    {client.personalInfo.city.postalCode &&
                                        ` (${client.personalInfo.city.postalCode})`
                                    }
                                </div>
                            </div>
                        )}

                        {!client.personalInfo?.city?.name && client.personalInfo?.cityName && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Πόλη</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    {client.personalInfo.cityName}
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Business Information */}
                <Card title="Επαγγελματικές Πληροφορίες" className="h-fit">
                    <div className="space-y-4">
                        {client.vat ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">ΑΦΜ</label>
                                <div className="mt-1 flex items-center text-gray-900">
                                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                                    {client.vat}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">Δε δόθηκε ΑΦΜ</p>
                        )}
                    </div>
                </Card>

                {/* Notes */}
                <Card title="Σημειώσεις:" className="h-fit">
                    <div className="bg-gray-50 rounded-lg p-4">
                        {client.notes ? (
                            <p className="text-gray-900 whitespace-pre-wrap">{client.notes}</p>
                        ) : (
                            <p className="text-gray-500 italic">Μη διαθέσιμες σημειώσεις</p>
                        )}
                    </div>
                </Card>
            </div>

            {/*  Status & Timestamps */}
            <Card title="Πληροφορίες Λογαριασμού">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <Badge variant={isActive ? 'success' : 'danger'}>
                            {isActive ? 'Active Client' : 'Inactive Client'}
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        {client.createdAt && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Δημιουργήθηκε</label>
                                <p className="text-sm text-gray-600">
                                    {new Date(client.createdAt).toLocaleString()}
                                </p>
                            </div>
                        )}

                        {client.updatedAt && client.updatedAt !== client.createdAt && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Τελευταία Ενημέρωση</label>
                                <p className="text-sm text-gray-600">
                                    {new Date(client.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ClientDetails;