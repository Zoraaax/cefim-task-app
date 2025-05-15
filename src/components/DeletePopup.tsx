import { FaTrash, FaTimes } from "react-icons/fa"

type DeletePopupProps = {
    id: number
    onDelete: (id: number) => void
    onCancel: () => void
    isOpen: boolean
}

export const DeletePopup: React.FC<DeletePopupProps> = ({ id, onDelete, onCancel, isOpen }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2>Supprimer la tâche ?</h2>
                <button onClick={() => onDelete(id)}><FaTrash /></button>
                <button onClick={() => onCancel()}><FaTimes /></button>
            </div>
        </div>
    )
}