import { LRC } from "./data";
import { useState, useEffect, useRef } from "react";
import "./Lyrics.css";

const lyrics = LRC;

const Lyrics = ({ transcript }) => {
    const [currentLine, setCurrentLine] = useState(0);
    const [isCurrentLineBold, setIsCurrentLineBold] = useState(false);
    const [highlightedLyric, setHighlightedLyric] = useState("");
    const audioRef = useRef(null);
    const lines = lyrics.split("\n");


    // Transformar tiempo del audio en formato "minutos:segundos.milisegundos" = "01:15.350"
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, "0");
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        const milliseconds = Math.floor((time % 1) * 1000).toString().padStart(3, "0");
        return `${minutes}:${seconds}.${milliseconds}`;
        //return { minutes, seconds, milliseconds };
    };


    // Transformar tiempo del archivo LRC
    const formatTimeLRC = (time) => {
        const [minutes, seconds] = time.split(":").map(parseFloat);
        const milliseconds = parseInt((seconds % 1) * 1000);
        return { minutes, seconds: parseInt(seconds), milliseconds };
    };


    // Mantener audio y actualización del tiempo
    useEffect(() => {
        const audio = audioRef.current;
        console.log(audio);

        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);


    const handleTimeUpdate = () => {
        // Transformamos current time del audio al mismo formato que archivo LRC
        const currentTime = audioRef.current.currentTime;
        //console.log(currentTime);
        const formattedTime = formatTime(currentTime);

        // Obtener minutos y segundos por separado
        const [minutesStr, secondsStr] = formattedTime.split(":");

        const minutesAudio = parseInt(minutesStr, 10);
        const secondsAudio = parseInt(secondsStr, 10);

        console.log('Minutos y segundos de AUDIO');
        console.log(minutesAudio);
        console.log(secondsAudio);

        let index = compareLyrics(formattedTime, lyrics);
        console.log(index);
        console.log(`Current time: [${formattedTime}], Current index: ${index}`);
    };


    
    const compareLyrics = (currentTime, lyrics) => {
        const lines = lyrics.split("\n");

        const formattedTime = formatTimeLRC(currentTime);
        console.log(formattedTime)

        const minutesLRC = formattedTime.minutes;
        const secondsLRC = formattedTime.seconds;
        console.log('Minutos y segundos de LRC');
        console.log(minutesLRC)
        console.log(secondsLRC)
    };




    return (
        <div className="lyrics-container">
            <div className="audio-controls">
                <audio src="audio/Back_In_Black.mp3" ref={audioRef} />
                <button onClick={() => audioRef.current.play()}>Play</button>
                <button onClick={() => audioRef.current.pause()}>Pause</button>
            </div>
            <div className="lyrics">
                {lines.map((line, index) => (
                    <div
                        key={index}
                        className="lyric-line"
                        style={currentLine === index && isCurrentLineBold ? { fontWeight: "bold", color: "red" } : {}}
                    >
                        {line}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lyrics;
