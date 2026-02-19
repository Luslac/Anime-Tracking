import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import { useParams } from "react-router";
import AlertLogin from "../ui/Alert-Login";
import AddAnimeAlert from "../ui/Alert-Add-Anime";
import AlreadyInList from "../ui/Alert-AlreadyInList";

export default function AnimeCard() {
    const [detailAnime, setDetailAnime] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [alert, setAlert] = useState("")
    const { id } = useParams(null)
    const API_URL = import.meta.env.VITE_URL_API
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
        try {
            const token = localStorage.getItem('token')
            const response = await api.post('/api/v1/watchList', {
            animeId: detailAnime.mal_id,
            image_url: detailAnime.images.jpg.large_image_url,
            title: detailAnime.title,
            status: status
        })
            const result = response.data
            if (result.success == true) {
                setAlert("add")
            } 
            if (result.status == 401 || result.errors == "Unauthorized") {
                setShowLogin(true)
            }
            if (result.errors == "Anime already in your list") {
                setAlert("inList")
            } else {
            console.log(result.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="text-white">
            <div className="max-w-5xl mx-auto">
                {showLogin && ( 
                    <AlertLogin/>
                )}
                {alert == "add" ? (
                    <AddAnimeAlert 
                    onClose={() => setAlert("")}
                    title={detailAnime.title}
                    />
                ) : alert == "inList" ? (<AlreadyInList
                    onClose={() => setAlert("")}
                    title={detailAnime.title}
                    />) : <></>} 
                {/*Header*/}
                <div className="flex gap-6 mb-8">
                    
                    {/*Poster*/}
                    <img 
                        src={detailAnime.images.jpg.large_image_url} 
                        alt={detailAnime.title}
                        className="w-64 h-96 object-cover rounded-lg shadow-lg"
                    />

                    {/*Title*/}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2">{detailAnime.title}</h1>
                        <p className="text-gray-400 text-lg mb-4">{detailAnime.title_japanese}</p>

                        {/*Stats*/}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-sm">Score</p>
                                <p className="text-2xl font-bold text-yellow-400">⭐ {detailAnime.score}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-sm">Rank</p>
                                <p className="text-2xl font-bold">#{detailAnime.rank}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-sm">Episodes</p>
                                <p className="text-xl font-bold">{detailAnime.episodes || 'N/A'}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-sm">Status</p>
                                <p className={`text-xl font-bold ${detailAnime.airing ? 'text-green-400' : 'text-blue-400'}`}>
                                    {detailAnime.status}
                                </p>
                            </div>
                        </div>

                        {/*Genres*/}
                        <div className="mb-4">
                            <p className="text-gray-400 text-sm mb-2">Genres</p>
                            <div className="flex flex-wrap gap-2">
                                {detailAnime.genres?.map((genre) => (
                                    <span 
                                        key={genre.mal_id} 
                                        className="bg-purple-600 px-3 py-1 rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/*More Info*/}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><span className="text-gray-400">Type:</span> {detailAnime.type}</p>
                            <p><span className="text-gray-400">Studio:</span> {detailAnime.studios?.map(s => s.name).join(', ') || 'N/A'}</p>
                            <p><span className="text-gray-400">Aired:</span> {detailAnime.aired?.string}</p>
                            <p><span className="text-gray-400">Duration:</span> {detailAnime.duration}</p>
                        </div>
                    </div>
                </div>

                {/*Sinopsis*/}
                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                    <p className="text-gray-300 leading-relaxed">{detailAnime.synopsis}</p>
                </div>

                {/*Trailer*/}
                {detailAnime.trailer?.embed_url && (
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                        <iframe 
                            src={detailAnime.trailer.embed_url}
                            className="w-full aspect-video rounded"
                            allowFullScreen
                        />
                    </div>
                )}
            <div className="bg-gray-800 p-6 rounded-lg mt-6">
                <h2 className="text-2xl font-bold mb-4">Add to My List</h2>

                {/*Add To List*/} 
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <button className="flex flex-col items-center gap-2 p-4 bg-green-600 hover:bg-green-700 rounded-lg transition active:scale-95 group"
                    onClick={() => handleClick("WATCHING")}>
                        <span className="text-2xl group-hover:scale-110 transition">📺</span>
                        <span className="font-medium text-sm">Watching</span>
                    </button>

                    <button className="flex flex-col items-center gap-2 p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition active:scale-95 group"
                    onClick={() => handleClick("COMPLETED")}>
                        <span className="text-2xl group-hover:scale-110 transition">✅</span>
                        <span className="font-medium text-sm">Completed</span>
                    </button>

                    <button className="flex flex-col items-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition active:scale-95 group"
                    onClick={() => handleClick("PLAN_TO_WATCH")}>
                        <span className="text-2xl group-hover:scale-110 transition">📋</span>
                        <span className="font-medium text-sm">Plan to Watch</span>
                    </button>

                    <button className="flex flex-col items-center gap-2 p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition active:scale-95 group"
                    onClick={() => handleClick('ON_HOLD')}>
                        <span className="text-2xl group-hover:scale-110 transition">🔒</span>
                        <span className="font-medium text-sm">On Hold</span>
                    </button>

                    <button className="flex flex-col items-center gap-2 p-4 bg-red-600 hover:bg-red-700 rounded-lg transition active:scale-95 group"
                    onClick={() => handleClick('DROPPED')}>
                        <span className="text-2xl group-hover:scale-110 transition">❌</span>
                        <span className="font-medium text-sm">Dropped</span>
                    </button>
                </div>
            </div>
                
            </div>
        </div>
    )
}