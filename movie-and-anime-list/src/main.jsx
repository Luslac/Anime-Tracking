import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router"
import AnimeCard from './components/AnimeCard.jsx'
import { App } from './App.jsx'
import AnimeInfo from './components/AnimeInfo.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import MyList from './components/MyList/MyList.jsx'
import Home from './pages/Home.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path='/mylist' element={<MyList/>}/>
            <Route path='/anime/detail/:id' element={<AnimeCard/>}/>
            <Route path='/anime/search' element={<AnimeInfo/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
