import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';

interface ClientSearchProps {
    onSearch: (query: string) => void;
    onClear: () => void;
    isSearching?: boolean;
    searchResultsCount?: number;
}

const ClientSearch: React.FC<ClientSearchProps> = ({
                                                       onSearch,
                                                       onClear,
                                                       isSearching = false,
                                                       searchResultsCount = 0
                                                   }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        onClear();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Card>
            <div className="flex items-center space-x-4">
                <div className="flex-1">
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Αναζήτηση πελατών με όνομα..."
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <Button
                    onClick={handleSearch}
                    disabled={!searchQuery.trim()}
                    className="flex items-center gap-2"
                >
                    <Search className="w-4 h-4" />
                    Αναζήτηση
                </Button>

                {isSearching && (
                    <Button
                        onClick={handleClear}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <X className="w-4 h-4" />
                        Καθαρισμός
                    </Button>
                )}
            </div>

            {isSearching && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                        Found {searchResultsCount} client{searchResultsCount !== 1 ? 's' : ''} matching "{searchQuery}"
                    </p>
                </div>
            )}
        </Card>
    );
};

export default ClientSearch;