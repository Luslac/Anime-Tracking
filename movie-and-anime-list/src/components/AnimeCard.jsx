import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Loading from "../ui/Loading"
import AddAnimeAlert from "../ui/Alert-Add-Anime"
import AlreadyInList from "../ui/Alert-AlreadyInList"
import AlertLogin from "../ui/Alert-Login"
import api from "../utils/api"

export default function AnimeCard() {
    const [detailAnime, setDetailAnime] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [alert, setAlert] = useState("")
    const { id } = useParams(null)

    useEffect(() => {
        async function GetDetailAnime() {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
            const data = await response.json()
            setDetailAnime(data.data)
        }
        GetDetailAnime()
    }, [id])

    if (!detailAnime) {
        return <Loading/>
    }

    async function handleClick(status) {
        const token = localStorage.getItem('token')
        if (!token) {
            setShowLogin(true)
            return
        }
        try {
            const response = await api.post('/api/v1/watchList', {
                animeId: detailAnime.mal_id,
                image_url: detailAnime.images.jpg.large_image_url,
                title: detailAnime.title,
                status: status
            })

            if (response.data.success === true) {
                setAlert("add")
            } 
        } catch (error) {
            console.log("Error response:", error.response?.data)

            if (error.response?.status === 401 || error.response?.data?.errors === "Unauthorized") {
                setShowLogin(true)
            } else if (error.response?.data?.errors === "Anime already in your list") {
                setAlert("inList")
            } else {
                console.error("Terjadi kesalahan:", error.message)
            }
        }
    }

    return (
        <div className="text-white min-h-screen bg-gray-900">
            <div className="max-w-5xl mx-auto px-4 py-6">
                {showLogin && <AlertLogin/>}

                {alert === "add" ? (
                    <AddAnimeAlert onClose={() => setAlert("")} title={detailAnime.title} />
                ) : alert === "inList" ? (
                    <AlreadyInList onClose={() => setAlert("")} title={detailAnime.title} />
                ) : null} 
                
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">

                    {/*Poster*/}
                    <img 
                        src={detailAnime.images.jpg.large_image_url} 
                        alt={detailAnime.title}
                        className="w-48 md:w-64 h-72 md:h-96 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
                    />
    
                    {/*Info*/}
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">{detailAnime.title}</h1>
                        <p className="text-gray-400 text-base md:text-lg mb-4">{detailAnime.title_japanese}</p>
            
                        {/*Stats*/}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-xs md:text-sm">Score</p>
                                <p className="text-lg md:text-2xl font-bold text-yellow-400 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg> {detailAnime.score}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-xs md:text-sm">Rank</p>
                                <p className="text-lg md:text-2xl font-bold">#{detailAnime.rank}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-xs md:text-sm">Episodes</p>
                                <p className="text-base md:text-xl font-bold">{detailAnime.episodes || 'N/A'}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-xs md:text-sm">Status</p>
                                <p className={`text-base md:text-xl font-bold ${detailAnime.airing ? 'text-green-400' : 'text-blue-400'}`}>
                                    {detailAnime.status}
                                </p>
                            </div>
                        </div>
            
                        {/*Genres*/}
                        <div className="mb-4">
                            <p className="text-gray-400 text-xs md:text-sm mb-2">Genres</p>
                            <div className="flex flex-wrap gap-2">
                                {detailAnime.genres?.map((genre) => (
                                    <span 
                                        key={genre.mal_id} 
                                        className="bg-purple-600 px-2 py-1 md:px-3 rounded-full text-xs md:text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                            
                        {/*Details*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                            <p><span className="text-gray-400">Type:</span> {detailAnime.type}</p>
                            <p><span className="text-gray-400">Studio:</span> {detailAnime.studios?.map(s => s.name).join(', ') || 'N/A'}</p>
                            <p><span className="text-gray-400">Aired:</span> {detailAnime.aired?.string}</p>
                            <p><span className="text-gray-400">Duration:</span> {detailAnime.duration}</p>
                        </div>
                    </div>
                </div>
                            
                {/*Synopsis*/}
                <div className="bg-gray-800 p-4 md:p-6 rounded-lg mb-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Synopsis</h2>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">{detailAnime.synopsis}</p>
                </div>
                            
                {/*Trailer*/}
                {detailAnime.trailer?.embed_url && (
                    <div className="bg-gray-800 p-4 md:p-6 rounded-lg mb-6">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Trailer</h2>
                        <iframe 
                            src={detailAnime.trailer.embed_url}
                            className="w-full aspect-video rounded"
                            allowFullScreen
                        />
                    </div>
                )}
                
                {/*Add to List*/}
                <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
                    <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Add to My List</h2>
            
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
                        <button 
                            className="flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 bg-green-600 hover:bg-green-700 rounded-lg transition active:scale-95 group"
                            onClick={() => handleClick("WATCHING")}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-medium text-xs md:text-sm">Watching</span>
                        </button>
            
                        <button 
                            className="flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition active:scale-95 group"
                            onClick={() => handleClick("COMPLETED")}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-medium text-xs md:text-sm">Completed</span>
                        </button>
            
                        <button 
                            className="flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition active:scale-95 group"
                            onClick={() => handleClick("PLAN_TO_WATCH")}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="font-medium text-xs md:text-sm text-center">Plan to Watch</span>
                        </button>
            
                        <button 
                            className="flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition active:scale-95 group"
                            onClick={() => handleClick('ON_HOLD')}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-medium text-xs md:text-sm">On Hold</span>
                        </button>
            
                        <button 
                            className="flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 bg-red-600 hover:bg-red-700 rounded-lg transition active:scale-95 group"
                            onClick={() => handleClick('DROPPED')}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-medium text-xs md:text-sm">Dropped</span>
                        </button>
                    </div>
                </div>
                <div className="bg-gray-800 p-8 md:p-6 rounded-lg mt-4">
                    <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Link To Watch</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
                        {detailAnime.streaming?.map((link) => 
                            <a 
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                className="bg-purple-600 text-center px-3 py-2 rounded-lg text-sm hover:bg-purple-700"
                            >
                                {link.name}
                            </a>
                        )} 
                    </div>
                </div>
            </div>
        </div>
    )
}