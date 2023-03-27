import React, { useReducer } from 'react'
import { song_list } from '../docs/songs'

import playerContext from './ExportContext'
import typeAction from '../docs/type_action'

import { SET_SONG, RANDOM, REPEAT, PLAYING, SONGS } from '../docs/type_action'

const ExportState = (props) => {
  const modelState = { currentSong: 0, songslist: song_list, repeat: false, random: false, playing: false, audio: null }
  const [state, dispatch] = useReducer(typeAction, modelState)

  const togglePlaying = () => dispatch({ type: PLAYING, data: state.playing ? false : true })
  const toggleRepeat = () => dispatch({ type: REPEAT, data: state.repeat ? false : true })
  const toggleRandom = () => dispatch({ type: RANDOM, data: state.random ? false : true })
 
  const songsSet = (songArr) => dispatch({ type: SONGS, data: songArr })
  const setCurrent = (id) => dispatch({ type: SET_SONG, data: id })

  const prevSong = () => {
    if (state.currentSong === 0) {
      setCurrent(state.songslist.length - 1)
    } else {
      setCurrent(state.currentSong - 1)
    }
  }

  const nextSong = () => {
    if (state.currentSong === state.songslist.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(state.currentSong + 1)
    }
  }

  return (
    <playerContext.Provider
      value={{
        currentSong: state.currentSong, songslist: state.songslist, repeat: state.repeat, random: state.random, playing: state.playing, audio: state.audio, nextSong, prevSong, setCurrent, toggleRandom, toggleRepeat, togglePlaying, songsSet,
      }}
    >
      {props.children}
    </playerContext.Provider>
  )
}

export default ExportState
