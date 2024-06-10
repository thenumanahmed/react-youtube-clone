
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import './Video.css'
import React from 'react'

const Video = () => {
  return (
    <div className='play-container'>
      <PlayVideo />
      <Recommended />
    </div>
  )
}

export default Video
