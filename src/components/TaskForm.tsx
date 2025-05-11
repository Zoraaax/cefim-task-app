import { useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Task } from "../types/TaskType"

export const TaskForm: React.FC = () => {
    const [task, setTask] = useState<Task>({
        id: Math.random(),
        title: "",
        description: "",
        status: "En attente",
        endDate: new Date(),
    })

    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        if (name === "endDate") {
            setTask({ ...task, endDate: new Date(value) })
        } else {
            setTask({ ...task, [name]: value })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newTask: Task = {
            ...task,
            endDate: new Date(task.endDate),
        }

        setTasks([...tasks, newTask])

        setTask({
            id: Math.random(),
            title: "",
            description: "",
            status: "En attente",
            endDate: new Date(),
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Titre</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700">Statut</label>
                <select
                    id="status"
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="En attente">En attente</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminée">Terminée</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="endDate" className="block text-gray-700">Date de fin</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={task.endDate.toISOString().split('T')[0]}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Ajouter
            </button>
        </form>
    )
}