export const SET_SONG = 'SET_SONG'
export const RANDOM = 'RANDOM'
export const REPEAT = 'OPTIONS'
export const PLAYING = 'PLAYING'
export const SONGS = 'SONGS'

export default (state, action) => {
  switch (action.type) {
    case SET_SONG:
      return { ...state, songs: action.data,}
    case SONGS:
      return { ...state, currentSong: action.data, playing: true,}
    case RANDOM:
      return {...state, random: action.data,}
    case REPEAT:
      return {...state, repeat: action.data,  }
    case PLAYING:
      return { ...state, playing: action.data,}
    default:
      return state
  }
}
