import { STATUS_CONFIG } from "./StatusBadge";

export default function StatsRow({ counts }) {
    const statsItems = Object.entries(STATUS_CONFIG).filter(([key]) => key !== "ALL");

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {statsItems.map(([key, cfg]) => (
                <div 
                    key={key} 
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                    <div className={`w-2 h-2 rounded-full ${cfg.dot} mb-2`}></div>
                    <p className="text-2xl font-bold text-white">
                        {counts[key] || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider font-semibold">
                        {cfg.label}
                    </p>
                </div>
            ))}
        </div>
    );
}