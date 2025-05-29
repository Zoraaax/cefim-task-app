import { FaTrash, FaTimes } from "react-icons/fa"

type DeletePopupProps = {
    id: number
    onDelete: (id: number) => void
    onCancel: () => void
    isOpen: boolean
}

export const DeletePopup: React.FC<DeletePopupProps> = ({ id, onDelete, onCancel, isOpen }) => {
    if (!isOpen) return null

    return (
        <>
            <div 
                className="fixed inset-0 bg-slate-700/50 z-20"
                onClick={onCancel}
            />
            
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-30 w-[90%] max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Supprimer la tâche</h2>
                    <button 
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <p className="text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.
                </p>

                <div className="flex justify-end gap-4">
                    <button 
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Annuler
                    </button>
                    <button 
                        onClick={() => onDelete(id)}
                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                    >
                        <FaTrash size={16} />
                        Supprimer
                    </button>
                </div>
            </div>
        </>
    )
}