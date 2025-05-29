import { useState } from "react"
import type { Task } from "../types/TaskType"

type TaskFormProps = {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
    onClose: () => void
}

export const TaskForm: React.FC<TaskFormProps> = ({ tasks, setTasks, onClose }) => {
    const [task, setTask] = useState<Task>({
        id: Math.random(),
        title: "",
        description: "",
        status: "En attente",
        endDate: new Date(),
    })

    const [errors, setErrors] = useState({
        title: "",
        description: ""
    })

    const validateForm = () => {
        const newErrors = {
            title: "",
            description: ""
        }
        let isValid = true

        if (!task.title.trim()) {
            newErrors.title = "Le titre est requis"
            isValid = false
        }

        if (!task.description.trim()) {
            newErrors.description = "La description est requise"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        if (name === "endDate") {
            setTask({ ...task, endDate: new Date(value) })
        } else {
            setTask({ ...task, [name]: value })
            // Clear error when user starts typing
            if (errors[name as keyof typeof errors]) {
                setErrors(prev => ({ ...prev, [name]: "" }))
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        const newTask: Task = {
            ...task,
            endDate: new Date(task.endDate),
        }

        setTasks([...tasks, newTask])
        onClose()
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
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
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