import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import TvShows from './components/TvShows'
import People from './components/People'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-screen h-screen bg-[#1F1E24] flex'>

        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/movie/Details/:id' element={<movieDetails />} />

          <Route path='/tvShows' element={<TvShows />} />
          <Route path='/people' element={<People />} />
        </Routes>


      </div>
    </>
  )
}

export default App
