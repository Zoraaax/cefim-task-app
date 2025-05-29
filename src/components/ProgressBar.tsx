interface ProgressBarProps {
    progress: number
    progressPercentage: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, progressPercentage }) => {
    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progression</span>
                <span className="text-sm font-medium text-gray-700">{progressPercentage}</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
                    style={{ 
                        width: `${progress}%`,
                        backgroundColor: progress === 100 ? '#10B981' : '#3B82F6'
                    }}
                />
            </div>
        </div>
    )
}