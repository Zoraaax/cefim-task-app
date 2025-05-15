import React from 'react'

interface SearchBarProps {
    onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher une tâche..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchBar