import React from 'react'
import Controls from './components/AudioController'
import AudioContext from './context/AudioContext'

function AudioPlayer() {
  return (
    <AudioContext>
        <Controls />
    </AudioContext>
  )
}

export default AudioPlayer
