import React, { useState, useEffect, useRef, useContext } from 'react'
import playerContext from '../../context/playerContext'

import Microfono from '../micro/Microphone'

import './control.css'
import './wave.css'

function Controls() {
  const audio = useRef('audio_tag')

  const { currentSong, nextSong, prevSong, repeat, random, playing, toggleRandom, toggleRepeat, togglePlaying, songslist } = useContext(playerContext)

  const [statevolum, setStateVolum] = useState(0.3)
  const [letra, setLetra] = useState();
  const [end, setEnd] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [dur, setDur] = useState(0)

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s
  }

  useEffect(() => {
    audio.current.volume = statevolum
    if (playing) {
      toggleAudio()
    }
  }, [currentSong])

  const toggleAudio = () => audio.current.paused ? audio.current.play() : audio.current.pause()

  const handleVolume = (q) => {
    setStateVolum(q)
    audio.current.volume = q
  }

  // Transformar tiempo del audio en formato "minutos:segundos.milisegundos" = "01:15.350"
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    const milliseconds = Math.floor((time % 1) * 1000).toString().padStart(3, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  // Transformar tiempo del archivo LRC
  const formatTimeLRC = (time) => {
    const [minutes, seconds] = time.split(":").map(parseFloat);
    const milliseconds = parseInt((seconds % 1) * 1000);
    return { minutes, seconds: parseInt(seconds), milliseconds };
  };

  // Obtener archivo LRC
  const lyrics = songslist[currentSong].letra;

  // Obtiene minutos, segundos y linea del archivo LRC
  const obtenerTiempoLRC = (currentTime, lyrics) => {
    const formattedTime = formatTimeLRC(currentTime);
    const lines = lyrics.split("\n");
    let tiempoLRC = { minutes: 0, seconds: 0, line: "" };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const timeMatch = line.match(/\[(\d{2}):(\d{2})/);

      if (timeMatch) {
        const minutesLRC = parseInt(timeMatch[1], 10);
        const secondsLRC = parseInt(timeMatch[2], 10);

        if (formattedTime.minutes === minutesLRC && formattedTime.seconds === secondsLRC) {
          tiempoLRC = { minutes: minutesLRC, seconds: secondsLRC, line: line.replace(/\[[^\]]*\]/g, '') };
          break;
        }
      }
    }
    return tiempoLRC;
  };

  // Obtiene minutos, segundos y linea del AUDIO
  const obtenerTiempoAudio = () => {
    const currentTime = audio.current.currentTime;
    const formattedTime = formatTime(currentTime);
    let index = obtenerTiempoLRC(formattedTime, lyrics);
    // console.log(index.line);

    if (index.line !== "") {
      setLetra(index.line);
    }
    return index.line;
  };

  const endMusic = () => {
    setEnd(true);
  }
  const startMusic = () => {
    setEnd(false);
    setLetra('');
  }

  return (
    <>
      <audio onTimeUpdate={obtenerTiempoAudio} onPlay={startMusic} onEnded={endMusic} ref={audio} type="audio/mpeg" preload="true" src={songslist[currentSong].fileUrl} />

      <Microfono end={end}/>

      <div className="lyrics-container">
        <p>{letra}</p>
      </div>

      <div className='box-img'>
        <img src={`imgs/${songslist[currentSong].img}`} alt='' />
      </div>

      <div className="info-music">
        <div>
          <p>{songslist[currentSong].title}</p>
          <p className='artist'>{songslist[currentSong].artistName}</p>
        </div>
      </div>

      <div className="controller">
        <div className="main_control">
          <p className="prev btns-1c " onClick={prevSong}><i class='bx bx-skip-previous'></i></p>

          <p className="play/stop" onClick={() => { togglePlaying(); toggleAudio() }}>
            <div><p className={'play  btns-1c ' + (!playing ? '' : 'hide')}><i class='bx bx-play-circle'></i></p></div>
            <div><p className={'stop  btns-1c ' + (!playing ? 'hide' : '')}><i class='bx bx-pause-circle'></i></p></div>
          </p>

          <p className="next btns-1c " onClick={nextSong}><i class='bx bx-skip-next' ></i></p>
        </div>

        <div className="secon_control">
          <div className="action-aditional">
            <p onClick={toggleRandom} className={'random btns-2c ' + (random ? 'active' : '')}><i class='bx bx-shuffle' ></i></p>
            <p onClick={toggleRepeat} className={'repeat btns-2c ' + (repeat ? 'active' : '')}><i class='bx bx-repeat'></i></p>
          </div>

          <div className='volum'>
            <p><i class='bx bxs-volume-full'></i><input value={Math.round(statevolum * 100)} type="range" name="volBar" id="volBar" onChange={(e) => handleVolume(e.target.value / 100)} /></p>
          </div>
        </div>
      </div>


    </>
  )
}

export default Controls
