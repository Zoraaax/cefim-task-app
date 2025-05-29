import { useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Task } from "../types/TaskType"
import { TaskItem } from "./TaskItem"
import SearchBar from "./SearchBar"
import { ProgressBar } from "./ProgressBar"
import { FilterButton } from "./FilterButton"
import { TaskFormModal } from "./TaskFormModal"

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
    const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all")
    const [searchQuery, setSearchQuery] = useState("")

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

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    const handleFilterClick = (status: Task["status"] | "all") => {
        setStatusFilter(status)
    }

    const filteredTasks = tasks
        .filter((task) => {
            if (statusFilter === "all") return true
            return task.status === statusFilter
        })
        .filter((task) => 
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    
    const calculateProgress = () => {
        if (filteredTasks.length === 0) return 0
        const completedTasks = filteredTasks.filter(task => task.status === "Terminée").length
        return (completedTasks / filteredTasks.length) * 100
    }
    
    const getProgressText = () => {
        if (filteredTasks.length === 0) return "Aucune tâche"
        const progress = calculateProgress()
        if (progress === 0) return "Aucune tâche terminée"
        if (progress === 100) return "Toutes les tâches sont terminées"
        return `${Math.round(progress)}% des tâches terminées`
    }

    return (
        <div>
            <h2 className="text-2xl font-bold ml-2 my-2">Liste des tâches</h2>
            <div className="flex flex-row gap-2 ml-2">
                <FilterButton 
                    status="Toutes" 
                    onClick={() => handleFilterClick("all")} 
                    isActive={statusFilter === "all"}
                />
                <FilterButton 
                    status="En attente" 
                    onClick={() => handleFilterClick("En attente")} 
                    isActive={statusFilter === "En attente"}
                />
                <FilterButton 
                    status="En cours" 
                    onClick={() => handleFilterClick("En cours")} 
                    isActive={statusFilter === "En cours"}
                />
                <FilterButton 
                    status="Terminée" 
                    onClick={() => handleFilterClick("Terminée")} 
                    isActive={statusFilter === "Terminée"}
                />
            </div>
            <ProgressBar 
                progress={calculateProgress()} 
                progressPercentage={getProgressText()} 
            />
            <SearchBar onSearch={handleSearch} />
            <TaskFormModal tasks={tasks} setTasks={setTasks} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredTasks.map((task) => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onDelete={handleDelete} 
                        onStatusChange={handleStatusChange} 
                    />
                ))}
            </div>
        </div>
    )
}