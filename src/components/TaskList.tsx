import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Task } from "../types/TaskType"
import { TaskItem } from "./TaskItem"

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])

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

    console.log(tasks)

    return (
        <div>
            <h2>Liste des tâches</h2>
            {tasks.map((task) => (
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