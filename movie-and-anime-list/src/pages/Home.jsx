import { useNavigate } from "react-router";
import SeasonalAnime from "../components/AnimeThisSeason";
import TopAnime from "../components/TopAnime";
import SearchInput from "../ui/SearchInput";
import UpComingAnime from "../components/UpComing-Anime";


export default function Home() {
    const navigate = useNavigate()
    
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className=" top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-lg active:scale-95 transition flex items-center gap-2"
                        >
                            ← Back
                        </button>
                        <SearchInput />
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
                
                {/* Top Anime Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold">Top Anime</h2>
                            <p className="text-gray-400 text-sm mt-1">Highest rated anime of all time</p>
                        </div>
                    </div>
                    <TopAnime />
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold">This Season</h2>
                            <p className="text-gray-400 text-sm mt-1">Currently airing anime</p>
                        </div>
                    </div>
                    <SeasonalAnime />
                </section>
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold">Up Coming</h2>
                            <p className="text-gray-400 text-sm mt-1">New Anime Soon</p>
                        </div>
                    </div>
                    <UpComingAnime />
                </section>
            </div>
        </div>
    )
}