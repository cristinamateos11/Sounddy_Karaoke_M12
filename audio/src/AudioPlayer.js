import React from 'react'

import Playlist from './components/lista/Lista'
import Controls from './components/controls/Controls'

import PlayerState from './context/PlayerState'
import Disco from './components/discobtn'

import './main.css';

function AudioPlayer() {
  return (
    <PlayerState>
      <Playlist />
      <Disco />
      <Controls />
    </PlayerState>
  )
}

export default AudioPlayer
