interface ProgressBarProps {
    progress: number
    progressPercentage: number | string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, progressPercentage }) => {
    return (
        <div className="w-full h-4 bg-gray-200 rounded-full">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}>
                <span className="text-white text-xs">{progressPercentage}</span>
            </div>
        </div>
    )
}