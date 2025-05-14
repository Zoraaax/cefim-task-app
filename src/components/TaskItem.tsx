import type { Task } from "../types/TaskType"
import { FaTrash } from "react-icons/fa"

type TaskItemProps = {
    task: Task
    onDelete: (id: number) => void
    onStatusChange: (id: number, status: Task["status"]) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onStatusChange }) => {
    return (
        <div key={task.id} className="mb-4 p-4 border rounded shadow">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p className="mt-2">{task.description}</p>
            <p className="mt-2">Status: {task.status}</p>
            <p className="mt-2">Date de fin: {new Date(task.endDate).toLocaleDateString()}</p>
            <button onClick={() => onDelete(task.id)}><FaTrash /></button>
            <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}>
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Terminée">Terminée</option>
            </select>
        </div>
    )
}