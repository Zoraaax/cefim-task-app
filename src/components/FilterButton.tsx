interface FilterButtonProps {
    status: string
    onClick: () => void
    isActive: boolean
}

export const FilterButton: React.FC<FilterButtonProps> = ({ status, onClick, isActive }) => {
    const buttonClass = `bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors ${isActive ? 'bg-blue-900' : ''}`

    return (
        <button className={buttonClass} onClick={onClick}>{status}</button>
    )
}   