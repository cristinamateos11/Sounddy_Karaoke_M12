//import { LRC } from "./acdc";
import { useState, useRef } from "react";
import { LRC } from "./lyrics/taylor";

const Lyrics2 = () => {

    const [letra, setLetra] = useState();

    // Obtener archivo LRC
    const lyrics = LRC;

    // Obtener referencia del audio
    const audioRef = useRef();
    console.log(audioRef);

    // Estado del audio
    const [isPlaying, setIsPlaying] = useState(false);

    // Función para iniciar la reproducción del audio
    const playAudio = () => {
        const audio = audioRef.current;
        audio.play();
        setIsPlaying(true);
    };

    // Función para detener la reproducción del audio
    const stopAudio = () => {
        const audio = audioRef.current;
        audio.pause();
        setIsPlaying(false);
    };

    // Función para reiniciar la reproducción del audio
    const resetAudio = () => {
        const audio = audioRef.current;
        audio.currentTime = 0;
        setIsPlaying(false);
    };


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
        const currentTime = audioRef.current.currentTime;
        const formattedTime = formatTime(currentTime);
        let index = obtenerTiempoLRC(formattedTime, lyrics);
        console.log(index.line);

        if (index.line !== "") {
            setLetra(index.line);
        }

        return index.line;
    };


    return (
        <>
            <div className="audio-container">
                <h2>Canción:</h2>
                <audio src="audio/you_belong_with_me.mp3" ref={audioRef} onTimeUpdate={obtenerTiempoAudio}></audio>
                <div className="audio-controls">
                    <button onClick={playAudio}>Play</button>
                    <button onClick={stopAudio}>Pause</button>
                    <button onClick={resetAudio}>Reset</button>
                </div>
            </div>

            <div className="lyrics-container">
                <p> {letra} </p>
            </div>
        </>

    );
};

export default Lyrics2;
