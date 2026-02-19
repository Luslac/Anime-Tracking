export const STATUS_CONFIG = {
    ALL: { label: "All", color: "bg-gray-600", dot: "bg-gray-400" },
    WATCHING: { label: "Watching", color: "bg-green-600", dot: "bg-green-400" },
    COMPLETED: { label: "Completed", color: "bg-purple-600", dot: "bg-purple-400" },
    PLAN_TO_WATCH: { label: "Plan to Watch", color: "bg-blue-600", dot: "bg-blue-400" },
    ON_HOLD: { label: "On Hold", color: "bg-yellow-600", dot: "bg-yellow-400" },
    DROPPED: { label: "Dropped", color: "bg-red-600", dot: "bg-red-400" },
}

export default function StatusBadge({ status, className = "" }) {
    const config = STATUS_CONFIG[status]
    if (!config) return null

    return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
            {config.label}
        </div>
    )
}