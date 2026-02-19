import { useState, useEffect } from "react";
import AnimeUI from "./Anime-UI";
import UpdateUI from "./Update-UI";
import { STATUS_CONFIG } from "./StatusBadge";
import StatsRow from "./StatsRow";
import api from "../../utils/api";

export default function MyList() {
    const [animeList, setAnimeList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeFilter, setActiveFilter] = useState("ALL")
    const [selectedAnime, setSelectedAnime] = useState(null)
    const name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : ""

    const getAuthData = () => {
        const token = localStorage.getItem("token")
        return { token }
    }

    useEffect(() => {
        async function fetchList() {
            const { token } = getAuthData()
            if (!token) {
                setError("User session not found")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const response = await api.get('/api/v1/watchList')
                const result = response.data

                if (result.success) {
                    setAnimeList(result.data)
                } else {
                    setError(result.errors || "Failed to load list")
                }
            } catch (err) {
                setError("Failed to fetch anime list")
            } finally {
                setLoading(false)
            }
        }
        fetchList()
    }, [])

    async function handleUpdate(updateData) {
        try {
            const response = await api.patch('/api/v1/watchList', {
                    animeId: selectedAnime.animeId,
                    ...updateData
            })

            const result = response.data
            if (result.success) {
                setAnimeList(prev => 
                    prev.map(a => 
                        a.animeId === selectedAnime.animeId 
                            ? { ...a, ...result.data }
                            : a
                    )
                )
                setSelectedAnime(null)
            }
        } catch (err) {
            console.error("Update error:", err)
        }
    }

    async function handleDelete(animeId) {
        try {
            const response = await api.delete('watchList', { data: {animeId: animeId} })

            const result = response.data
            if (result.success) {
                setAnimeList(prev => prev.filter(a => a.animeId !== animeId))
                setSelectedAnime(null)
            }
        } catch (err) {
            console.error("Delete error:", err)
        }
    }

    const filteredList = activeFilter === "ALL" 
        ? animeList 
        : animeList.filter(anime => anime.status === activeFilter)

    const counts = animeList.reduce((acc, anime) => {
        acc[anime.status] = (acc[anime.status] || 0) + 1
        return acc
    }, {})

    return (
        <div className="p-4 bg-gray-900 min-h-screen text-white">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-1">{name} Anime List</h1>
                    <p className="text-gray-400">
                        {animeList.length} Anime Tracked
                    </p>
                </header>

                <StatsRow counts={counts} />

                <div className="flex gap-2 flex-wrap mb-6">
                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                        <button
                            key={key}
                            onClick={() => setActiveFilter(key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                activeFilter === key ? `${cfg.color} text-white` : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                        >
                            {cfg.label}
                        </button>
                    ))}
                </div>

                {error ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400">⚠️ {error}</p>
                    </div>
                ) :loading ? (
                    <div className="text-center py-20 text-gray-400 text-xl">⏳ Loading...</div>
                ) : filteredList.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-4xl mb-4">📭</p>
                        <p className="text-gray-400">No anime in this category</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredList.map((anime) => ( 
                            <AnimeUI
                                key={anime.animeId} 
                                anime={anime} 
                                onClick={() => setSelectedAnime(anime)} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedAnime && (
                <UpdateUI
                    anime={selectedAnime}
                    onClose={() => setSelectedAnime(null)}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}