import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon?: React.ReactNode;
    loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
                                               title,
                                               value,
                                               change,
                                               changeType = 'neutral',
                                               icon,
                                               loading = false
                                           }) => {
    const changeColors = {
        positive: 'text-green-600 bg-green-50',
        negative: 'text-red-600 bg-red-50',
        neutral: 'text-gray-600 bg-gray-50'
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                {icon && (
                    <div className="text-blue-500">
                        {icon}
                    </div>
                )}
            </div>

            <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {change && (
                    <span className={`text-xs px-2 py-1 rounded-full ${changeColors[changeType]}`}>
            {change}
          </span>
                )}
            </div>
        </div>
    );
};

export default StatCard;