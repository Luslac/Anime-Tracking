import { useState } from "react"
import SearchInput from "./ui/SearchInput"
import AnimeInfo from "./components/AnimeInfo"
import AnimeCard from "./components/AnimeCard"
import TopAnime from "./components/TopAnime"

export default function App() {

  const [selectedAnime, setSelectedAnime] = useState(null)
  const [searchAnime, setSearchAnime] = useState(null)


  function handleBack() {
  }

  if (selectedAnime) {
    return (
      <div className="bg-gray-900 min-h-screen p-4"> 
      <button 
        onClick={handleBack}
        className="m-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 border border-gray-600 active:scale-95 transition flex items-center gap-2"
      >
        ← Back
      </button>
      <AnimeCard id={selectedAnime} />
    </div>
    )
  }

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Wibu Discovery 🚀</h1>

      <div className="flex items-center gap-2 max-w-4xl mx-auto mb-6">
        <button 
          onClick={handleBack}
          className="m-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 border border-gray-600 active:scale-95 transition flex items-center gap-2"
        >
          ← Back
        </button>
        <SearchInput onSearch={setSearchAnime}/>
      </div>

      {searchAnime && <AnimeInfo query={searchAnime} onClicked={setSelectedAnime}/>}
      {!searchAnime && <TopAnime onClick={setSelectedAnime}/> }

    </div>
  )
}