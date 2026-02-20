import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import { useNavigate, useSearchParams } from "react-router";
import { Link } from "react-router";
import SearchInput from "../ui/SearchInput";

export default function AnimeInfo() {
    const [anime, setAnime] = useState([])
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState(null) 
    const [searchQuery] = useSearchParams()
    const query = searchQuery.get("search")
    const navigate = useNavigate()

    useEffect(() => { 
        async function GetAnime() {
            try {
                setLoading(true) 
                setError(null)
                
                const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
                
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`)
                }
                
                const result = await response.json()
                const data = result.data.filter(a => 
                    !a.genres.some(genre => genre.name === "Hentai")
                ) 
                console.log(data)
                setAnime(data)
                
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
                <p className="text-xl text-red-400">⚠️ Error </p>
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

            <div className="max-w-7xl mx-auto px-4 md:px-4 py-3 md:py-5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-3 py-2 md:px-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-lg active:scale-95 transition flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                        ← Back
                    </button>
                    <SearchInput />
                </div>
            </div>


            <div className="max-w-4xl mx-auto">
                {anime.map((item) => (
                    <Link 
                        to={`/anime/detail/${item.mal_id}`}
                        key={`info-${item.mal_id}`} 
                        className="bg-gray-800 rounded-lg p-3 md:p-4 mb-3 md:mb-4 flex flex-col sm:flex-row gap-3 md:gap-4 cursor-pointer hover:bg-gray-700 transition"
                    >

                        <img 
                            src={item.images.jpg.image_url} 
                            alt={item.title}
                            className="w-24 h-36 sm:w-32 sm:h-48 object-cover rounded mx-auto sm:mx-0 flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 line-clamp-2">{item.title}</h2>

                            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-2 md:mb-3">
                                <span className="flex items-center gap-1">
                                    <span>⭐</span>
                                    <span>{item.score}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span>📺</span>
                                    <span>{item.episodes || '?'} eps</span>
                                </span>
                                <span className={`flex items-center gap-1 ${item.airing ? "text-green-400" : "text-red-400"}`}>
                                    <span>{item.airing ? "🔴" : "✅"}</span>
                                    <span>{item.airing ? "Airing" : "Finished"}</span>
                                </span>
                            </div>
                
                            <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 sm:line-clamp-4">
                                {item.synopsis}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}