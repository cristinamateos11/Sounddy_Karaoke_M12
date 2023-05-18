import React, { useContext, useState } from 'react'
import playerContext from '../../context/playerContext'

import './lista.css'

function Playlist() {
  const { SetCurrent, currentSong, songslist } = useContext(playerContext);
  const [hiden, setHiden] = useState(false);

  const onMusic = () => {
    if (hiden) {
      setHiden(false);
    } else {
      setHiden(true);
    }
  }

  return (
    <div className="lista">
      <button className='btn-list ' onClick={onMusic}><i class='bx bxl-deezer'></i></button>

      <ul className={'list-ul  ' + (hiden ? 'trans-ul' : '')}>
        {songslist.map((song, i) => (
          <li className={'songContainer ' + (currentSong === i ? 'selected' : '')} key={i} onClick={() => { SetCurrent(i) }}>
            <div className="player"><i class='bx bx-play'></i></div>

            <div className="info-list">
              <p className="">{song.title}</p>
              <p className="">{song.artistName}</p>
            </div>

            <div className='actions'>
              <p><i class='bx bx-heart' ></i></p>
              <p><i class='bx bx-dots-horizontal-rounded'></i></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist
