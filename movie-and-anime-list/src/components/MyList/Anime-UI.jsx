import StatusBadge from "./StatusBadge";

export default function AnimeUI({ anime, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer group border border-transparent hover:border-gray-600"
        >
            <div className="relative">
                <img
                    src={anime.image_url}
                    alt={anime.title}
                    className="w-full aspect-[2/3] object-cover"
                />
                <div className="absolute top-2 left-2 shadow-lg">
                    <StatusBadge status={anime.status} />
                </div>
                {anime.isFavorite && (
                    <div className="absolute top-2 right-2 text-sm">❤️</div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Edit</span>
                </div>
            </div>

            <div className="p-2">
                <h3 className="text-xs font-bold line-clamp-2 mb-1">{anime.title}</h3>
                <div className="flex items-center justify-between">
                    {anime.rating > 0 && (
                        <span className="text-xs text-yellow-400">⭐ {anime.rating}/10</span>
                    )}
                    {anime.rating <= 0 && (
                        <span className="text-xs text-yellow-400">⭐ ?</span>
                    )}
                    {anime.episodesWatched > 0 && (
                        <span className="text-xs text-gray-400">
                            {anime.episodesWatched} eps
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}