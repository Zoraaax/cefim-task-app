import { useState } from "react"
import { FaPlus, FaTimes } from "react-icons/fa"
import { TaskForm } from "./TaskForm"
import type { Task } from "../types/TaskType"

type TaskFormModalProps = {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({ tasks, setTasks }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button 
                className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-900 transition-colors shadow-lg z-10" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaPlus size={24} />
            </button>
            
            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-slate-700/50 z-20"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-30 w-[90%] max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Nouvelle tâche</h2>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <TaskForm 
                            tasks={tasks} 
                            setTasks={setTasks} 
                            onClose={() => setIsOpen(false)} 
                        />
                    </div>
                </>
            )}
        </div>
    )
}