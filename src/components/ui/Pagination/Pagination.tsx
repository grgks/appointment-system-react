import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Button from '../Button/Button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    size: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   totalElements,
                                                   size,
                                                   onPageChange,
                                                   disabled = false
                                               }) => {
    if (totalPages <= 1) return null;

    const startItem = currentPage * size + 1;
    const endItem = Math.min((currentPage + 1) * size, totalElements);

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(0, currentPage - delta);
             i <= Math.min(totalPages - 1, currentPage + delta);
             i++) {
            range.push(i);
        }

        if (range[0] > 0) {
            rangeWithDots.push(0);
            if (range[0] > 1) {
                rangeWithDots.push(-1);
            }
        }

        rangeWithDots.push(...range);

        if (range[range.length - 1] < totalPages - 1) {
            if (range[range.length - 1] < totalPages - 2) {
                rangeWithDots.push(-1);
            }
            rangeWithDots.push(totalPages - 1);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-between py-4 border-t border-gray-200 bg-white px-4 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={disabled || currentPage === 0}
                >
                    Προηγούμενο
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={disabled || currentPage >= totalPages - 1}
                >
                    Επόμενο
                </Button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className="text-sm text-gray-700">
                    Βλέπεις <span className="font-medium">{startItem}</span> έως{' '}
                    <span className="font-medium">{endItem}</span> από{' '}
                    <span className="font-medium">{totalElements}</span> αποτελέσματα
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(0)}
                        disabled={disabled || currentPage === 0}
                        className="p-2"
                        title="Πρώτη σελίδα"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={disabled || currentPage === 0}
                        className="p-2"
                        title="Προηγούμενη σελίδα"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {visiblePages.map((page, index) => (
                        page === -1 ? (
                            <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                                ...
                            </span>
                        ) : (
                            <Button
                                key={page}
                                variant={currentPage === page ? "primary" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(page)}
                                disabled={disabled}
                                className="min-w-[40px]"
                            >
                                {page + 1}
                            </Button>
                        )
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={disabled || currentPage >= totalPages - 1}
                        className="p-2"
                        title="Επόμενη σελίδα"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(totalPages - 1)}
                        disabled={disabled || currentPage >= totalPages - 1}
                        className="p-2"
                        title="Τελευταία σελίδα"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;