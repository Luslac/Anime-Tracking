import { useNavigate } from "react-router";
import SeasonalAnime from "../components/AnimeThisSeason";
import TopAnime from "../components/TopAnime";
import SearchInput from "../ui/SearchInput";
import UpComingAnime from "../components/UpComing-Anime";
import Footer from "../ui/Footer";


export default function Home() {
    const navigate = useNavigate()
    
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col text-white">
            <div className="top-16 z-40">
                <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4">
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
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 flex-grow">
                
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

                <Footer/>
            </div>
        </div>
    )
}