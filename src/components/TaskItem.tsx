import { useState } from "react"
import type { Task } from "../types/TaskType"
import { DeletePopup } from "./DeletePopup"
import { FaTrash } from "react-icons/fa"
type TaskItemProps = {
    task: Task
    onDelete: (id: number) => void
    onStatusChange: (id: number, status: Task["status"]) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onStatusChange }) => {

    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

    const handleDelete = () => {
        onDelete(task.id)
        setIsDeletePopupOpen(false)
    }

    const handleCancel = () => {
        setIsDeletePopupOpen(false)
    }

    return (
        <div key={task.id} className="mb-4 p-4 border rounded shadow">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p className="mt-2">{task.description}</p>
            <p className="mt-2">Status: {task.status}</p>
            <p className="mt-2">Date de fin: {new Date(task.endDate).toLocaleDateString()}</p>
            <button onClick={() => setIsDeletePopupOpen(true)}><FaTrash /></button>
            <DeletePopup 
                id={task.id} 
                onDelete={handleDelete} 
                onCancel={handleCancel} 
                isOpen={isDeletePopupOpen} 
            />
            <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}>
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Terminée">Terminée</option>
            </select>
        </div>
    )
}