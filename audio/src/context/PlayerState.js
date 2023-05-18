import React, { useReducer } from 'react'
import playerContext from './playerContext'
import playerReducer from './playerReducer'
import { song_list } from '../docs/songs'

import {
  SET_CURRENT_SONG,
  TOGGLE_RANDOM,
  TOGGLE_REPEAT,
  TOGGLE_PLAYING,
  SET_SONGS_ARRAY,
} from '../docs/types'

const PlayerState = (props) => {
  const initialState = { currentSong: 0, songslist: song_list, repeat: false, random: false, playing: false, audio: null, }
  const [state, dispatch] = useReducer(playerReducer, initialState)

  const songsSet = (songArr) => dispatch({ type: SET_SONGS_ARRAY, data: songArr })

  const togglePlaying = () => dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true })

  const SetCurrent = (id) => dispatch({ type: SET_CURRENT_SONG, data: id })

  const prevSong = () => {
    if (state.random) {
      return SetCurrent(~~(Math.random() * state.songslist.length))
    }
    if (state.currentSong === 0) {
      return SetCurrent(state.songslist.length - 1)
    } else {
      return SetCurrent(state.currentSong - 1)
    }
  }

  const nextSong = () => {
    if (state.random) {
      return SetCurrent(~~(Math.random() * state.songslist.length))
    }
    if (state.currentSong === state.songslist.length - 1) {
      SetCurrent(0)
    } else {
      SetCurrent(state.currentSong + 1)
    }
  }

  // Repeat and Random
  const toggleRepeat = (id) => dispatch({ type: TOGGLE_REPEAT, data: state.repeat ? false : true });
  
  const toggleRandom = (id) => dispatch({ type: TOGGLE_RANDOM, data: state.random ? false : true });

  return (
    <playerContext.Provider
    value={{currentSong: state.currentSong, songslist: state.songslist, repeat: state.repeat, random: state.random, playing: state.playing, audio: state.audio,
    nextSong, prevSong, SetCurrent, toggleRandom, toggleRepeat, togglePlaying, songsSet}}
    >

      {props.children}

    </playerContext.Provider>
  )
}

export default PlayerState
