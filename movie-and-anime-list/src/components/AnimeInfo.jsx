import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import { useParams, useSearchParams } from "react-router";
import { Link } from "react-router";

export default function AnimeInfo() {
    const [anime, setAnime] = useState([])
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState(null) 

    const [searchQuery] = useSearchParams()
    const query = searchQuery.get("search")
    console.log(`Query Hasil Adalah = ${query}`)

    useEffect(() => { 
        async function GetAnime() {
            try {
                setLoading(true) 
                setError(null)
                
                const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
                
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`)
                }
                
                const data = await response.json()
                setAnime(data.data)
                
            } catch (err) {
                console.error("Fetch error:", err)
                setError(err.message) 
                setAnime([])
            } finally {
                setLoading(false)
            }
        }

        GetAnime()
    }, [query])

    


    if (loading) {
        return (
            <Loading/>
        )
    }


    if (error) {
        return (
            <div className="p-3 text-white text-center">
                <p className="text-xl text-red-400">⚠️ Error: {error}</p>
                <p className="text-sm text-gray-400 mt-2">API might be down. Try again later.</p>
            </div>
        )
    }


    if (anime.length === 0) {
        return (
            <div className="p-3 text-white text-center">
                <p className="text-xl">No results found for "{query}"</p>
            </div>
        )
    }

    return (
        <div className="p-4 bg-gray-900 min-h-screen text-white">
            <div className="max-w-4xl mx-auto">
                {anime.map((item) => (
                    <Link to={`/anime/detail/${item.mal_id}`}
                        key={`info-${item.mal_id}`} 
                        className="bg-gray-800 rounded-lg p-4 mb-4 flex gap-4 cursor-pointer hover:bg-gray-700 transition"
                        >

                        {/* Poster */}
                        <img 
                            src={item.images.jpg.image_url} 
                            alt={item.title}
                            className="w-32 h-48 object-cover rounded"
                        />

                        {/* Detail */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                            
                            <div className="flex gap-4 text-sm text-gray-400 mb-3">
                                <span>⭐ {item.score}</span>
                                <span>📺 {item.episodes || '?'} eps</span>
                                <span className={item.airing ? "text-green-400" : "text-red-400"}>
                                    {item.airing ? "🔴 Airing" : "✅ Finished"}
                                </span>
                            </div>

                            <p className="text-sm text-gray-300 line-clamp-4">
                                {item.synopsis}
                            </p>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}