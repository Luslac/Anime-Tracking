import { useState, useEffect } from "react"
import { Link } from "react-router"


export default function UpComingAnime() {
    const [upComing, setUpComing] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const CACHE_KEY = "UpComingAnime"
        const CACHE_DURATION = 60 * 60 * 1000

        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
            const { data, timestamp } = JSON.parse(cached)
            const isExpired = Date.now() - timestamp > CACHE_DURATION

            if (!isExpired && data) {
                setUpComing(data)
                setLoading(false)
                return
            }
        }

        async function getAnime() {
            try {
                setLoading(true)
                const response = await fetch("https://api.jikan.moe/v4/seasons/upcoming")
                

                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`)
                }

                const result = await response.json()

                if (result && result.data) {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        data: result.data,
                        timestamp: Date.now()
                    }))
                    setUpComing(result.data)
                } else {
                    console.error("Data structure not as expected:", result)
                }
            } catch (error) {
                console.error(`Fetch Error: ${error}`)
            } finally {
                setLoading(false)
            }
        }

        getAnime()
    }, [])

    if (loading) return <div className="text-center py-10">Loading Up Coming Anime...</div>

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {upComing?.map((anime) => (
                <Link
                    key={`top-${anime.mal_id}`}
                    className="bg-gray-800 p-2 rounded-lg hover:scale-105 transition group"
                    to={`/anime/detail/${anime.mal_id}`}
                >
                    <div className="relative">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            className="w-full aspect-[2/3] object-cover rounded"
                        />
                    </div>

                    <h3 className="mt-2 text-sm font-bold line-clamp-2 group-hover:text-blue-400 transition">
                        {anime.title}
                    </h3>
                    <p className="text-xs text-yellow-400 mt-1">⭐ {anime.score || "N/A"}</p>
                </Link>
            ))}
        </div>
    );
}