import { useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Task } from "../types/TaskType"
import { TaskItem } from "./TaskItem"

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
    const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all")

    const handleDelete = (id: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== id)
        setTasks(updatedTasks)
    }

    const handleStatusChange = (id: number, status: Task["status"]) => {
        const updatedTask = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, status}
            }
            return task
        })
        setTasks(updatedTask)
    }

    const filteredTasks = statusFilter === "all" 
        ? tasks 
        : tasks.filter((task) => task.status === statusFilter)

    return (
        <div>
            <h2>Liste des tâches</h2>
            <div>
                <button onClick={() => setStatusFilter("all")}>Toutes</button>
                <button onClick={() => setStatusFilter("En attente")}>En attente</button>
                <button onClick={() => setStatusFilter("En cours")}>En cours</button>
                <button onClick={() => setStatusFilter("Terminée")}>Terminée</button>
            </div>
            {filteredTasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDelete} 
                    onStatusChange={handleStatusChange} 
                />
            ))}
        </div>
    )
}