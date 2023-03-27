import React, { useState, useEffect, useRef, useContext } from 'react'
import playerContext from '../context/ExportContext'

function Controls() {
    const { currentSong, nextSong, prevSong, repeat, random, playing, toggleRandom, toggleRepeat, togglePlaying, handleEnd, songslist } = useContext(playerContext)

    const [statevolum, setStateVolum] = useState(0.3)
    const [setDur] = useState(0)
    const [setCurrentTime] = useState(0)

    const audio = useRef('audio_tag')

    useEffect(() => {
        audio.current.volume = statevolum
        if (playing) {
            toggleAudio()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong])

    const toggleAudio = () => audio.current.paused ? audio.current.play() : audio.current.pause()

    const handleVolume = (q) => {    
        setStateVolum(q);      
        audio.current.volume = q    
    }

    return (
        <div>
            <audio onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)} onCanPlay={(e) => setDur(e.target.duration)} onEnded={handleEnd} ref={audio} type="audio/mpeg" preload="true" src={songslist[currentSong].url} />

            <div>
                <div>
                    <div onClick={prevSong} className="prev"><i class='bx bx-skip-previous-circle'></i></div>

                    <div onClick={() => { togglePlaying(); toggleAudio() }} className="play-pause">
                        <div className={!playing ? '' : 'hide'}><i class='bx bx-play-circle'></i></div>
                        <div className={!playing ? 'hide' : ''}><i class='bx bx-pause-circle' ></i></div>
                    </div>

                    <div onClick={nextSong} className="next"><i class='bx bx-skip-next-circle'></i></div>
                </div>

                <div>
                    <div onClick={toggleRandom} className={'random ' + (random ? 'active' : '')} ><i class='bx bx-shuffle'></i></div>
                    <div onClick={toggleRepeat} className={'repeat ' + (repeat ? 'active' : '')} ><i class='bx bx-sync' ></i></div>
                </div>

                <div className="volum">
                    <div><i className="fas fa-volume-down"></i></div>
                    <input value={Math.round(statevolum * 100)} type="range" name="" id="" onChange={(e) => handleVolume(e.target.value / 100)} />
                </div>
            </div>
        </div>
    )
}

export default Controls
