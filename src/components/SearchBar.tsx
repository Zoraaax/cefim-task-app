import React from 'react'
import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
    onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <div className="flex flex-row gap-2 mx-2 border-2 border-slate-700 rounded-md w-2/12 items-center md:w-6/12 sm:w-10/12">
            <input
                type="text"
                placeholder="Rechercher une tâche..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-2 py-1 rounded-md focus:outline-none text-slate-700 placeholder:text-slate-700"
            />
            <FaSearch className="text-slate-700 items-center mr-2" />
        </div>
    )
}

export default SearchBar