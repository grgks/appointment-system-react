import React from 'react';

interface Column {
    key: string;
    title: string;
    width?: string;
    render?: (value: any, record: any) => React.ReactNode;
}

interface TableProps {
    columns: Column[];
    data: any[];
    loading?: boolean;
    onRowClick?: (record: any) => void;
}

const Table: React.FC<TableProps> = ({
                                         columns,
                                         data,
                                         loading = false,
                                         onRowClick
                                     }) => {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="animate-pulse">
                    {/* Header skeleton */}
                    <div className="border-b border-gray-200 px-6 py-4">
                        <div className="flex space-x-4">
                            {columns.map((_, index) => (
                                <div key={index} className="h-4 bg-gray-200 rounded flex-1"></div>
                            ))}
                        </div>
                    </div>
                    {/* Rows skeleton */}
                    {[...Array(5)].map((_, rowIndex) => (
                        <div key={rowIndex} className="border-b border-gray-100 px-6 py-4">
                            <div className="flex space-x-4">
                                {columns.map((_, colIndex) => (
                                    <div key={colIndex} className="h-4 bg-gray-100 rounded flex-1"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ width: column.width }}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((record, index) => (
                        <tr
                            key={index}
                            onClick={() => onRowClick?.(record)}
                            className={`hover:bg-gray-50 transition-colors duration-150 ${
                                onRowClick ? 'cursor-pointer' : ''
                            }`}
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {column.render
                                        ? column.render(record[column.key], record)
                                        : record[column.key]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {data.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Τα δεδομένα δεν είναι διαθέσιμα</p>
                </div>
            )}
        </div>
    );
};

export default Table;
