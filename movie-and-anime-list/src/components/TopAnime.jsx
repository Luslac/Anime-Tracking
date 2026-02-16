import { useState, useEffect } from "react";
import { Link } from "react-router";
import Loading from "../ui/Loading";

export default function TopAnime() {
    const [topAnime, setTopAnime] = useState([])

    useEffect(() => {
        async function getAnime() {
            const response = await fetch('https://api.jikan.moe/v4/top/anime')
            const data = await response.json()
            
            setTopAnime(data.data) 
        }
    
        getAnime()
    }, []) 
    
    if (!topAnime) {
        return <Loading/>
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topAnime.map((anime) => (
            <Link 
                key={`top-${anime.mal_id}`}
                className="bg-gray-800 p-2 rounded hover:scale-105 transition"
                to={`/anime/detail/${anime.mal_id}`}>

                <img 
                    src={anime.images.jpg.image_url} 
                    alt={anime.title} 
                    className="w-full aspect-[2/3] object-cover rounded"
                />
            
                <h3 className="mt-2 text-sm font-bold">{anime.title}</h3>
                <p className="text-xs text-yellow-400">⭐ {anime.score}</p>
            </Link>))}
        </div>
    )
}