import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router"
import AnimeCard from './components/AnimeCard.jsx'
import TopAnime from './components/TopAnime.jsx'
import { App } from './App.jsx'
import AnimeInfo from './components/AnimeInfo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<TopAnime/>}/>
            <Route path='/anime/detail/:id' element={<AnimeCard/>}/>
            <Route path='/anime/search' element={<AnimeInfo/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
