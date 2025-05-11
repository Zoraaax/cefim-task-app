import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Task } from "../types/TaskType"
import { TaskItem } from "./TaskItem"

export const TaskList: React.FC = () => {
    const [tasks] = useLocalStorage<Task[]>("tasks", [])

    return (
        <div>
            <h2>Liste des tâches</h2>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}