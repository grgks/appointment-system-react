import React from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import Card from '../ui/Card';
import Table from '../dashboard/Table';
import Badge from '../ui/Badge';
import type { SecurityEvent } from '../../types/security';
import { EVENT_TYPE_LABELS, EVENT_TYPE_COLORS } from '../../types/security';

interface SecurityEventsListProps {
    events: SecurityEvent[];
    loading?: boolean;
    limit?: number;
}

const SecurityEventsList: React.FC<SecurityEventsListProps> = ({
                                                                   events,
                                                                   loading = false,
                                                                   limit = 50
                                                               }) => {
    // Reusing  Table component
    const columns = [
        {
            key: 'timestamp',
            title: 'Ημερομηνία / Ώρα',
            width: '180px',
            render: (value: string) => {
                const date = new Date(value + 'Z');   // UTC Zulu time
                return (
                    <div>
                        <div className="font-medium text-gray-900">
                            {date.toLocaleDateString('el-GR')}
                        </div>
                        <div className="text-sm text-gray-500">
                            {date.toLocaleTimeString('el-GR', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'eventType',
            title: 'ΤΎΠΟΣ EVENT',
            width: '200px',
            render: (value: string) => {
                const label = EVENT_TYPE_LABELS[value as keyof typeof EVENT_TYPE_LABELS];
                return (
                    <div>
                        <div className="font-medium text-gray-900">
                            {label?.el || value}
                        </div>
                        <div className="text-xs text-gray-500">
                            {label?.en || value}
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'username',
            title: 'ΧΡΗΣΤΗΣ',
            width: '150px',
            render: (value: string | null) => (
                <span className="font-mono text-sm text-gray-900">
                    {value || 'unknown'}
                </span>
            )
        },
        {
            key: 'ipAddress',
            title: 'IP ΔΙΕΥΘΥΝΣΗ',
            width: '150px',
            render: (value: string | null) => (
                <span className="font-mono text-sm text-gray-600">
                    {value || '-'}
                </span>
            )
        },
        {
            key: 'success',
            title: 'Status',
            width: '120px',
            render: (value: boolean, record: any) => {
                const color = EVENT_TYPE_COLORS[record.eventType as keyof typeof EVENT_TYPE_COLORS];
                return (
                    <div className="flex items-center space-x-2">
                        {value ? (
                            <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <Badge variant="success">Success</Badge>
                            </>
                        ) : (
                            <>
                                <XCircle className="w-4 h-4 text-red-500" />
                                <Badge variant={color as any}>Failed</Badge>
                            </>
                        )}
                    </div>
                );
            }
        },
        {
            key: 'userAgent',
            title: 'User Agent',
            render: (value: string | null) => (
                <span className="text-sm text-gray-500 truncate block max-w-xs" title={value || undefined}>
                    {value || '-'}
                </span>
            )
        }
    ];

    // Sort events by timestamp (newest first)
    const sortedEvents = React.useMemo(() => {
        return [...events]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, limit);
    }, [events, limit]);

    return (
        <Card
            title="Security Events"
            subtitle={`${sortedEvents.length} πρόσφατα events`}
            action={
                <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Last 24 hours</span>
                </div>
            }
        >
            {sortedEvents.length === 0 && !loading ? (
                <div className="text-center py-12">
                    <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Κανένα security event</p>
                </div>
            ) : (
                <Table
                    columns={columns}
                    data={sortedEvents}
                    loading={loading}
                />
            )}
        </Card>
    );
};

export default SecurityEventsList;