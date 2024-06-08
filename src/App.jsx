import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'
import { Routes,Route } from 'react-router-dom'

const App = () => {
  const [sidebar,setSidebar] = useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar}/>} />
        <Route path="/video/:categoryId/:videoId" element={<Video/>} />
      </Routes>
    </div>
  )
}

export default App

