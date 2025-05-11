import type { Task } from "../types/TaskType"

type TaskItemProps = {
    task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <div key={task.id} className="mb-4 p-4 border rounded shadow">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p className="mt-2">{task.description}</p>
            <p className="mt-2">Status: {task.status}</p>
            <p className="mt-2">Date de fin: {new Date(task.endDate).toLocaleDateString()}</p>
        </div>
    )
}