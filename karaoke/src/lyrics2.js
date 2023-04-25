import { LRC } from "./data";
import { useState, useEffect, useRef } from "react";


const Lyrics2 = () => {

    const [letra, setLetra] = useState();

    // Obtener archivo LRC
    const lyrics = LRC;
    //console.log(lyrics);

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


    // Mantener audio y actualización del tiempo
    // useEffect(() => {
    //     const audio = audioRef.current;
    //     console.log(audio);

    //     audio.addEventListener('timeupdate', obtenerTiempoAudio);

    //     // return () => {
    //     //     audio.removeEventListener('timeupdate', obtenerTiempoAudio);
    //     // };
    // }, []);


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


    // Obtiene minutos, segundos y linea del archivo LRC
    const obtenerTiempoLRC = (currentTime, lyrics) => {
        const formattedTime = formatTimeLRC(currentTime);
        const lines = lyrics.split("\n"); // separar cada linia
        let tiempoLRC = { minutes: 0, seconds: 0, line: "" };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const timeMatch = line.match(/\[(\d{2}):(\d{2})/);

            if (timeMatch) {
                const minutesLRC = parseInt(timeMatch[1], 10);
                const secondsLRC = parseInt(timeMatch[2], 10);

                if (formattedTime.minutes === minutesLRC && formattedTime.seconds === secondsLRC) {
                    //tiempoLRC = { minutes: minutesLRC, seconds: secondsLRC, line: line };
                    tiempoLRC = { minutes: minutesLRC, seconds: secondsLRC, line: line.replace(/\[[^\]]*\]/g, '') };
                    break;
                }
            }
        }
        // console.log('Minutos y segundos de LRC');
        // console.log(tiempoLRC.minutes);
        // console.log(tiempoLRC.seconds);
        // console.log(tiempoLRC.line);
        return tiempoLRC;
    };


    // Probar obtenerTiempoLRC
    // const tiempoLRC = obtenerTiempoLRC('00:31', lyrics);
    // console.log(tiempoLRC); // imprime objeot con min,sec,line
    // console.log(tiempoLRC.minutes); // 0
    // console.log(tiempoLRC.seconds); //  31
    // console.log(tiempoLRC.line); // linia


    // Obtiene minutos, segundos y linea del AUDIO
    const obtenerTiempoAudio = () => {
        const currentTime = audioRef.current.currentTime;
        const formattedTime = formatTime(currentTime);
        const [minutesStr, secondsStr] = formattedTime.split(":");

        const minutesAudio = parseInt(minutesStr, 10);
        const secondsAudio = parseInt(secondsStr, 10);

        // console.log('Minutos y segundos de AUDIO');
        // console.log(minutesAudio);
        // console.log(secondsAudio);

        let index = obtenerTiempoLRC(formattedTime, lyrics);
        //console.log(index);
        console.log(index.line);

        if (!index.line == "") {
            setLetra(index.line);
        }

        
        //console.log(`Current time: [${formattedTime}], Current index: ${index}`);
        return index.line;
        //return { minutesAudio, secondsAudio };
    };




    return (
        <>
            <div className="audio-container">
                <h2>Canción:</h2>
                <audio src="audio/Back_In_Black.mp3" ref={audioRef} onTimeUpdate={obtenerTiempoAudio}></audio>
                <div className="audio-controls">
                    <button onClick={playAudio}>Play</button>
                    <button onClick={stopAudio}>Pause</button>
                    <button onClick={resetAudio}>Reset</button>
                </div>
            </div>

            <p> {letra} </p>
            
            <div className="lyrics-container">
                {/* {lyrics} */}
                <button onClick={obtenerTiempoAudio}>Obtener karaoke</button>
            </div>
        </>

    );
};

export default Lyrics2;
