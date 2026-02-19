import { useState } from "react";
import { STATUS_CONFIG } from "./StatusBadge";

export default function UpdateUI({ anime, onClose, onUpdate, onDelete }) {
    const [status, setStatus] = useState(anime.status)
    const [rating, setRating] = useState(anime.rating || 0)
    const [score, setScore] = useState(anime.score || 0)
    const [episodesWatched, setEpisodesWatched] = useState(anime.episodesWatched || 0)
    const [notes, setNotes] = useState(anime.notes || "")
    const [isFavorite, setIsFavorite] = useState(anime.isFavorite || false)

    const handleSave = () => {
        onUpdate({ status, rating, score, episodesWatched, notes, isFavorite })
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a2332] border border-gray-700 rounded-xl w-full max-w-lg shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-4 p-5 border-b border-gray-700">
                    <img src={anime.image_url} alt={anime.title} className="w-14 h-20 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-lg leading-tight line-clamp-2">{anime.title}</h3>
                        <div className={`mt-1 inline-block bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300`}>
                            Current: {STATUS_CONFIG[anime.status]?.label}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition text-xl">✕</button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Status Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(STATUS_CONFIG).filter(([key]) => key !== "ALL").map(([key, cfg]) => (
                                <button
                                    key={key}
                                    onClick={() => setStatus(key)}
                                    className={`py-2 px-3 rounded-lg text-xs font-medium transition ${status === key ? `${cfg.color} text-white ring-2 ring-white/30` : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                                >
                                    {cfg.label}
                                </button>
                            ))}
                        </div>
                    </div>
                        {/* Your Rating */} 
                        <div className="max-h-[70vh]">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Your Rating
                            </label>
                            <div className="grid grid-cols-5 w-40  gap-1">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setRating(n)}
                                        className={`aspect-square rounded text-xs font-bold transition ${
                                            rating === n
                                                ? "bg-yellow-500 text-gray-900 ring-2 ring-yellow-300"
                                                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                                        }`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            {rating > 0 && (
                                <button
                                    onClick={() => setRating(0)}
                                    className="mt-2 text-xs text-gray-500 hover:text-gray-300 transition"
                                >
                                    Clear rating
                                </button>
                            )}
                        </div>
                    
                    {/* Episodes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Progress</label>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setEpisodesWatched(p => Math.max(0, p - 1))} className="w-10 h-10 bg-gray-800 rounded-lg font-bold text-white hover:bg-gray-700">−</button>
                            <span className="text-2xl font-bold text-white w-10 text-center">{episodesWatched}</span>
                            <button onClick={() => setEpisodesWatched(p => p + 1)} className="w-10 h-10 bg-gray-800 rounded-lg font-bold text-white hover:bg-gray-700">+</button>
                            <span className="text-gray-500 text-sm">episodes</span>
                        </div>
                    </div>

                    {/* Favorite Toggle */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-400">Mark as Favorite</label>
                        <button onClick={() => setIsFavorite(!isFavorite)} className={`text-2xl transition ${isFavorite ? "grayscale-0" : "grayscale opacity-40"}`}>❤️</button>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition text-sm"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-5 border-t border-gray-700">
                    <button onClick={() => onDelete(anime.animeId)} className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg text-sm hover:bg-red-600/30">Remove</button>
                    <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700">Cancel</button>
                    <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Save Changes</button>
                </div>
            </div>
        </div>
    )
}