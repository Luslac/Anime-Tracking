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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
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
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{item.score}</span>
                            </span>

                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span>{item.episodes || '?'} eps</span>
                            </span>

                            <span className={`flex items-center gap-1 ${item.airing ? "text-green-400" : "text-blue-400"}`}>
                                {item.airing ? (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
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