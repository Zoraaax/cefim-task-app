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

    const getStatusColor = (status: Task["status"]) => {
        switch (status) {
            case "En attente":
                return "bg-yellow-100 text-yellow-800"
            case "En cours":
                return "bg-blue-100 text-blue-800"
            case "Terminée":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                <button 
                    onClick={() => setIsDeletePopupOpen(true)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                    <FaTrash />
                </button>
            </div>
            
            <p className="text-gray-600 mb-4">{task.description}</p>
            
            <div className="flex flex-wrap gap-4 items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
                
                <span className="text-gray-500 text-sm">
                    Date de fin: {new Date(task.endDate).toLocaleDateString()}
                </span>
            </div>

            <div className="mt-4">
                <select 
                    value={task.status} 
                    onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="En attente">En attente</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminée">Terminée</option>
                </select>
            </div>

            <DeletePopup 
                id={task.id} 
                onDelete={handleDelete} 
                onCancel={handleCancel} 
                isOpen={isDeletePopupOpen} 
            />
        </div>
    )
}