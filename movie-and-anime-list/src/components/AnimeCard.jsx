import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import { useParams } from "react-router";

export default function AnimeCard() {
    const [detailAnime, setDetailAnime] = useState(null)
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

    return (
        <div className="text-white">
            <div className="max-w-5xl mx-auto">
                
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

                {/*Synopsis*/}
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

            </div>
        </div>
    )
}